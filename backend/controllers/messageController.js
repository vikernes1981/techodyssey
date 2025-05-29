import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chatdb = new sqlite3.Database(path.join(__dirname, '../data/chat.db'));

// Get all messages
export const getAllMessages = (req, res) => {
  chatdb.all('SELECT * FROM messages ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ messages: rows });
  });
};

// Update a message (content only for simplicity)
export const updateMessage = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  chatdb.run('UPDATE messages SET content = ? WHERE id = ?', [content, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
};

// Delete a message
export const deleteMessage = (req, res) => {
  const { id } = req.params;
  chatdb.run('DELETE FROM messages WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
};

