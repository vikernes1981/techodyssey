import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chatdb = new sqlite3.Database(path.join(__dirname, '../data/chat.db'));

// Get all messages
export const getAllMessages = (req, res, next) => {
  chatdb.all('SELECT * FROM messages ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      console.error(err);
      const error = new Error("Failed to fetch messages");
      error.status = 500;
      return next(error);
    }
    res.json({ messages: rows });
  });
};

// Update a message
export const updateMessage = (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!content) {
  const error = new Error("Content is required");
  error.status = 400;
  return next(error);
}

  chatdb.run('UPDATE messages SET content = ? WHERE id = ?', [content, id], function (err) {
    if (err) {
      console.error(err);
      const error = new Error("Failed to update message");
      error.status = 500;
      return next(error);
    }
    if (this.changes === 0) {
      const error = new Error("Message not found");
      error.status = 404;
      return next(error);
    }
    res.json({ success: true, changes: this.changes });
  });
};

// Delete a message
export const deleteMessage = (req, res, next) => {
  const { id } = req.params;
  chatdb.run('DELETE FROM messages WHERE id = ?', [id], function (err) {
    if (err) {
      console.error(err);
      const error = new Error("Failed to delete message");
      error.status = 500;
      return next(error);
    }
    if (this.changes === 0) {
      const error = new Error("Message not found");
      error.status = 404;
      return next(error);
    }
    res.json({ success: true, changes: this.changes });
  });
};
