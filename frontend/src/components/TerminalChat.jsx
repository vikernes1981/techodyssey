// --- FRONTEND: TerminalChat.jsx ---

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import Header from './Header';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export default function TerminalChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [tokenStats, setTokenStats] = useState({ input: 0, output: 0, cost: 0 });
  const [totalCost, setTotalCost] = useState(0);
  const [historicalCost, setHistoricalCost] = useState(0);
  const bottomRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    setShowScrollButton(!nearBottom);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const lower = input.trim().toLowerCase();
    let flags = { save: false };

    if (lower.startsWith('remember')) {
      if (!window.confirm('🧠 Save this to memory?')) {
        flags.save = false;
      } else {
        flags.save = true;
      }
    }

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const res = await axios.post(`${API_BASE_URL}/chat`, { message: input, ...flags }, { headers });
      const botMessage = { role: 'assistant', content: res.data.reply };
      setMessages(prev => [...prev, botMessage]);

      if (res.data.tokens) {
        setTokenStats({
          input: res.data.tokens.input,
          output: res.data.tokens.output,
          cost: res.data.tokens.cost,
        });
        setTotalCost(prev => prev + parseFloat(res.data.tokens.cost));
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, { role: 'assistant', content: '[Error: Failed to reach the server]' }]);
    }
  };

  const fetchHistoricalCost = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/usage-total`);
      setHistoricalCost(res.data.total || 0);
    } catch (err) {
      console.error('Failed to fetch usage total:', err);
    }
  };

  useEffect(() => {
    fetchHistoricalCost();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 50);
    return () => clearTimeout(timeout);
  }, [messages]);

  return (
    <div className="bg-black text-green-400 font-mono h-screen flex flex-col overflow-hidden relative">
      <Header />

      <div className="flex-1 overflow-y-auto px-4 pt-4" ref={scrollContainerRef} onScroll={handleScroll}>
        {messages.map((msg, i) => (
          <div key={i} className="whitespace-pre-wrap my-1">
            {msg.role === 'user' ? (
              <span className="text-green-400">$ {msg.content}</span>
            ) : (
              <div className="prose prose-invert prose-pre:bg-black prose-pre:text-white max-w-none">
                <ReactMarkdown children={msg.content} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} />
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {showScrollButton && (
        <button
          onClick={() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })}
          className="absolute bottom-24 right-4 bg-green-600 hover:bg-green-500 text-black font-bold py-1 px-2 rounded shadow z-10"
        >
          ↓ Scroll to bottom
        </button>
      )}

      <div className="p-4 flex border-t border-green-700 items-center">
        <span className="mr-2 text-green-400">$</span>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          className="bg-black text-green-400 outline-none flex-1"
          autoFocus
        />
      </div>

      <div className="text-gray-400 text-xs text-right px-4 pb-2">
        Tokens: {tokenStats.input + tokenStats.output} (Input: {tokenStats.input}, Output: {tokenStats.output})<br />
        Est. cost: €{Number(tokenStats.cost || 0).toFixed(5)}<br />
        Session total: €{Number(totalCost || 0).toFixed(5)}<br />
        All-time total: €{Number(historicalCost + totalCost).toFixed(5)}<br />
        {tokenStats.input + tokenStats.output > 80000 && (
          <div className="text-yellow-400 font-semibold">⚠️ Approaching token limit (~80K)</div>
        )}
        {tokenStats.input + tokenStats.output > 120000 && (
          <div className="text-red-400 font-bold">🚨 Max token limit exceeded — GPT may fail soon</div>
        )}
      </div>
    </div>
  );
}

