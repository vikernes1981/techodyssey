import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open the SQLite database
const initializeDatabase = async () => {
  const db = await open({
    filename: './blog.db',
    driver: sqlite3.Database
  });

  // Create the entries table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      image TEXT,
      content TEXT NOT NULL
    );
  `);

  // Create the users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);

  // Create the snippets table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS snippets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      code TEXT NOT NULL,
      language TEXT,
      tags TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
};

const db = await initializeDatabase();

export default db;
