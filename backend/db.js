import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

// Ensure the data directory exists
const dbDir = path.resolve('./data');
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

// Get DB filenames from environment variables, fallback to default
const blogDbFile = process.env.DB_FILE || path.join(dbDir, 'blog.db');
const chatDbFile = process.env.CHAT_DB_FILE || path.join(dbDir, 'chat.db');

// --- Blog DB ---
const blogDb = await open({
  filename: blogDbFile,
  driver: sqlite3.Database
});

await blogDb.exec(`
  CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    image TEXT,
    content TEXT NOT NULL
  );
`);
await blogDb.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );
`);
await blogDb.exec(`
  CREATE TABLE IF NOT EXISTS snippets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    code TEXT NOT NULL,
    language TEXT,
    tags TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

// --- Chat DB ---
const chatDb = await open({
  filename: chatDbFile,
  driver: sqlite3.Database
});

await chatDb.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conversation_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    tokens_input INTEGER,
    tokens_output INTEGER,
    cost REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);
await chatDb.exec(`
  CREATE TABLE IF NOT EXISTS usage_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    input_tokens INTEGER,
    output_tokens INTEGER,
    cost REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export { blogDb, chatDb };
