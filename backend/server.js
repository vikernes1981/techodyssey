import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
// import postRoutes from './routes/index.js';
import authRoutes from './routes/authRoutes.js';
// import snippetRoutes from './routes/snippetRoutes.js';
import chatRoute from './routes/chat.js';
import messageRoutes from './routes/messageRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Add security headers
app.use(cors({
  origin: 'https://blog.techodyssey.org', // Frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' })); // Limit JSON payload size

// Routes
// app.use('/api/', postRoutes);
app.use('/api/', authRoutes);
// app.use('/api/', snippetRoutes);
app.use('/api/', chatRoute);
app.use('/api/', messageRoutes);

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
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
export default app;
