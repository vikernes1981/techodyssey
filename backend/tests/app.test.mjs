import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../server.js'; // adjust path if needed
import { blogDb, chatDb } from '../db.js';

// Clean test DBs before/after each suite
before(async () => {
  await blogDb.exec('DELETE FROM users');
  await chatDb.exec('DELETE FROM messages');
  await chatDb.exec('DELETE FROM usage_log');
});

after(async () => {
  await blogDb.exec('DELETE FROM users');
  await chatDb.exec('DELETE FROM messages');
  await chatDb.exec('DELETE FROM usage_log');
});

// --- AUTH ---
test('Register new user', async () => {
  const res = await request(app)
    .post('/api/register')
    .send({ username: 'testuser', password: 'pass123' });
  assert.equal(res.status, 201);
  assert.equal(res.body.message, 'User registered successfully.');
});

test('Reject duplicate user registration', async () => {
  await request(app).post('/api/register').send({ username: 'testuser2', password: 'pass123' });
  const res = await request(app).post('/api/register').send({ username: 'testuser2', password: 'pass123' });
  assert.equal(res.status, 400);
  assert.match(res.body.error, /exists/i);
});

test('Login with correct credentials', async () => {
  await request(app).post('/api/register').send({ username: 'loginuser', password: '123456' });
  const res = await request(app).post('/api/saymellon').send({ username: 'loginuser', password: '123456' });
  assert.equal(res.status, 200);
  assert.ok(res.body.token);
});

test('Login with wrong password fails', async () => {
  await request(app).post('/api/register').send({ username: 'failuser', password: 'correct' });
  const res = await request(app).post('/api/saymellon').send({ username: 'failuser', password: 'wrong' });
  assert.equal(res.status, 401);
  assert.match(res.body.error, /invalid/i);
});

// --- MESSAGES ---
let msgId;

test('Create message directly in DB', async () => {
  const { lastID } = await chatDb.run(
    `INSERT INTO messages (conversation_id, role, content) VALUES (?, ?, ?)`,
    'main', 'user', 'hello'
  );
  msgId = lastID;
  assert(msgId);
});

test('Get all messages', async () => {
  const res = await request(app).get('/api/messages');
  assert.equal(res.status, 200);
  assert(Array.isArray(res.body.messages));
  assert(res.body.messages.some(m => m.id === msgId));
});

test('Update message', async () => {
  const res = await request(app)
    .put(`/api/messages/${msgId}`)
    .send({ content: 'edited' });
  assert.equal(res.status, 200);
  assert(res.body.success || res.body.changes > 0);
});

test('Delete message', async () => {
  const res = await request(app).delete(`/api/messages/${msgId}`);
  assert.equal(res.status, 200);
  assert(res.body.success || res.body.changes > 0);
});

// --- CHAT ---
test('Chat endpoint replies', async () => {
  const res = await request(app)
    .post('/api/chat')
    .send({ message: 'Hello, assistant!' });
  assert.equal(res.status, 200);
  assert.ok(res.body.reply);
});
