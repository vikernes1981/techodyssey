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
  'http://localhost:5173', // for local dev
  'https://blog.techodyssey.org',
  'http://192.168.0.84',
];

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type, Authorization");
  next();
});

// Middleware
app.use(helmet()); // Add security headers
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json()); // Limit JSON payload size

// Routes
app.use('/api/', authRoutes);
app.use('/api/', chatRoute);
app.use('/api/', messageRoutes);
app.use("/api/gpt", gpt);
app.use('/api/rhcsa-game', rhcsaGameRoute);

// Handle 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});
// Global error handler (add at end, after all other app.use/routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// Start the server
if (process.env.NODE_ENV !== 'test') {
  
  app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:5000');
});
}
export default app;
