import express from 'express';
import OpenAI from 'openai';
import { chatDb } from '../db.js';  // <-- Import the new chatDb
import dotenv from 'dotenv';
dotenv.config();

import { encoding_for_model } from 'tiktoken';
const enc = encoding_for_model('gpt-4');
const USD_PER_1K_INPUT = 0.01;
const USD_PER_1K_OUTPUT = 0.03;
const USD_TO_EUR = 0.93;

const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

let memoryInjected = false;
let rememberedContext = [];

router.post('/chat', async (req, res) => {
  const { message, save } = req.body;
  if (!message) return res.status(400).json({ error: 'Missing message' });

  const isSaveCall = save === true && message?.toLowerCase().startsWith('remember');
  const cleaned = isSaveCall ? message.replace(/^remember\s+/i, '') : message;
  const sanitized = cleaned?.replace(/[\x00-\x1F\x7F]+/g, '').trim();

  if (isSaveCall) {
    await chatDb.run(
      `INSERT INTO messages (conversation_id, role, content) VALUES (?, ?, ?)`,
      'main', 'user', sanitized
    );
  }

  if (!memoryInjected || isSaveCall) {
    rememberedContext = await chatDb.all(
      `SELECT role, content FROM messages WHERE conversation_id = ?`,
      'main'
    );
    memoryInjected = true;
  }

  const systemBase = 'You are an economics guru and a coding god. The date is May 2025. Be concise and practical.';
  const memoryBlock = rememberedContext.map(r => `User: ${r.content}`).join('\n');
  const composedSystem = {
    role: 'system',
    content: `${systemBase}\n\nThe following is remembered user context:\n${memoryBlock}`
  };

  const chatHistory = [composedSystem, { role: 'user', content: sanitized }];

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: chatHistory
    });

    const reply = completion.choices[0].message.content;
    const inputTokens = chatHistory.reduce((acc, msg) => acc + enc.encode(msg.role + msg.content).length, 0);
    const outputTokens = enc.encode(reply).length;
    const inputCost = (inputTokens / 1000) * USD_PER_1K_INPUT;
    const outputCost = (outputTokens / 1000) * USD_PER_1K_OUTPUT;
    const totalCostEUR = (inputCost + outputCost) * USD_TO_EUR;

    // Track usage log regardless of memory save
    await chatDb.run(
      `INSERT INTO usage_log (input_tokens, output_tokens, cost) VALUES (?, ?, ?)`,
      inputTokens, outputTokens, totalCostEUR
    );

    res.json({
      reply,
      tokens: {
        input: inputTokens,
        output: outputTokens,
        cost: totalCostEUR.toFixed(5)
      }
    });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});

// GET /usage-total
router.get('/usage-total', async (req, res) => {
  try {
    const row = await chatDb.get(`SELECT SUM(cost) as total FROM usage_log`);
    res.json({ total: row.total || 0 });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch usage total' });
  }
});

export default router;
