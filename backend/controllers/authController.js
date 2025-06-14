import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { blogDb } from '../db.js';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

// Register a new user
export const registerUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    const error = new Error('Username and password are required.');
    error.status = 400;
    return next(error);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await blogDb.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error(err);
    if (err.message.includes('UNIQUE constraint')) {
      const error = new Error('Username already exists.');
      error.status = 400;
      return next(error);
    }
    const error = new Error('Server error.');
    error.status = 500;
    return next(error);
  }
};

// Login a user
export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    const error = new Error('Username and password are required.');
    error.status = 400;
    return next(error);
  }

  try {
    const user = await blogDb.get('SELECT * FROM users WHERE username = ?', [username]);

    if (!user) {
      const error = new Error('Invalid username or password.');
      error.status = 401;
      return next(error);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error('Invalid username or password.');
      error.status = 401;
      return next(error);
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    const error = new Error('Server error.');
    error.status = 500;
    return next(error);
  }
};

// Validate token
export const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = new Error('No token provided.');
    error.status = 401;
    return next(error);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: 'Token is valid.', user: decoded });
  } catch (err) {
    console.error(err);
    const error = new Error('Invalid token.');
    error.status = 401;
    return next(error);
  }
};
