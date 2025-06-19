import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes.js';
import chatRoute from './routes/chat.js';
import messageRoutes from './routes/messageRoutes.js';
import gpt from './routes/gpt.js';
import rhcsaGameRoute from './routes/rhcsaGameRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',        // local dev
  'http://192.168.0.84:5173',     // LAN dev (your phone/other device)
  'https://blog.techodyssey.org', // production domain (if using)
];

// Proper CORS middleware (no manual header setting!)
app.use(cors({
  origin: function (origin, callback) {
    console.log('CORS origin check:', origin);
    // Allow requests with no origin (like mobile apps/curl) or whitelisted web origins
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(helmet());
app.use(express.json()); // Limit JSON payload size

// Routes
app.use('/api/', authRoutes);
app.use('/api/', chatRoute);
app.use('/api/', messageRoutes);
app.use('/api/gpt', gpt);
app.use('/api/rhcsa-game', rhcsaGameRoute);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler (add at end)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// Start the server
if (process.env.NODE_ENV !== 'test') {
  app.listen(5000, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

export default app;
