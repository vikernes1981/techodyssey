import express from "express";
import { spawn } from "child_process";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function validateLinuxCommand(userCommand) {
  return new Promise((resolve, reject) => {
    const py = spawn("python3", ["game/game_engine.py"]);
    let result = "";

    py.stdout.on("data", (data) => result += data.toString());
    py.stderr.on("data", (err) => console.error("Python error:", err.toString()));

    py.on("close", () => {
      try {
        const parsed = JSON.parse(result);
        resolve(parsed);
      } catch {
        reject("Failed to parse game_engine.py output");
      }
    });

    py.stdin.write(userCommand + "\n");
    py.stdin.end();
  });
}

router.post("/", async (req, res) => {
  const userCommand = req.body.message;

  try {
    const result = await validateLinuxCommand(userCommand);

    const gptPrompt = `
You are TerminalGPT, a sarcastic AI mentor trapped in a CLI.
You're training a rookie sysadmin in a Linux simulation.

User typed: ${userCommand}
Result: ${result.valid ? "✅ CORRECT" : "❌ WRONG"}
Hint: ${result.hint}
Chapter: ${result.chapter}

Respond with a short narrative update, some commentary, and the next goal if needed.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: gptPrompt }],
    });

    res.json({ reply: completion.choices[0].message.content, validation: result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Validation or GPT failed." });
  }
});

export default router;