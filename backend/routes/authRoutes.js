import express from 'express';
import { registerUser, loginUser, validateToken } from '../controllers/authController.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per window
    message: 'Too many login attempts. Please try again after 15 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
  });

router.post('/register', registerUser); // POST /api/register
router.post('/saymellon',loginLimiter, loginUser);       // POST /api/login
router.post('/validate-token', validateToken); // POST /api/validate-token

export default router;
