import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import compression from 'compression';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import { body, validationResult } from 'express-validator';
import rhcsaGameRoute from './routes/rhcsaGameRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Security Configuration
const allowedOrigins = [
  'http://localhost:5173',        // local dev
  'http://localhost:3000',        // alternative dev port
  'http://192.168.0.84:5173',     // LAN dev
  'https://blog.techodyssey.org', // production domain
  ...(process.env.ADDITIONAL_ORIGINS ? process.env.ADDITIONAL_ORIGINS.split(',') : [])
];

// Trust proxy for accurate IP addresses behind load balancers
app.set('trust proxy', 1);

// ============================================================================
// SECURITY MIDDLEWARE STACK
// ============================================================================

// 1. Enhanced Helmet Configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false, // Allow embedding for educational content
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  frameguard: { action: 'deny' },
  xssFilter: true,
  referrerPolicy: { policy: 'same-origin' }
}));

// 2. Rate Limiting - Multiple Tiers
const createRateLimit = (windowMs, max, message, skipSuccessfulRequests = false) => {
  return rateLimit({
    windowMs,
    max,
    message: { error: message, retryAfter: Math.ceil(windowMs / 1000) },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests,
    keyGenerator: (req) => {
      // Use forwarded IP for better accuracy behind proxies
      return req.ip || req.connection.remoteAddress;
    },
    handler: (req, res) => {
      console.warn(`Rate limit exceeded for IP: ${req.ip}, Path: ${req.path}`);
      res.status(429).json({
        error: 'Too many requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }
  });
};

// Global rate limiting
app.use('/api/', createRateLimit(
  15 * 60 * 1000, // 15 minutes
  100, // requests per window
  'Too many API requests, please try again later.',
  true // skip successful requests
));

// Strict rate limiting for mission attempts (prevent brute force)
app.use('/api/rhcsa-game/mission/attempt', createRateLimit(
  60 * 1000, // 1 minute
  10, // attempts per minute
  'Too many mission attempts, please slow down.',
  false
));

// 3. Progressive Delay for Suspicious Activity
app.use('/api/', slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // allow 50 requests per window without delay
  delayMs: 500, // add 500ms delay after delayAfter requests
  maxDelayMs: 5000, // max delay of 5 seconds
  skipSuccessfulRequests: true
}));

// 4. Enhanced CORS with Security
app.use(cors({
  origin: function (origin, callback) {
    console.log('CORS origin check:', origin || 'No origin (likely same-origin)');
    
    // Allow requests with no origin (mobile apps, Postman, same-origin)
    if (!origin) return callback(null, true);
    
    // Check against whitelist
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Allow localhost in development
    if (NODE_ENV === 'development' && origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    
    console.warn(`CORS violation attempt from origin: ${origin}`);
    return callback(new Error(`Origin ${origin} not allowed by CORS policy`));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false, // Educational game doesn't need credentials
  maxAge: 86400 // Cache preflight for 24 hours
}));

// 5. Security Sanitization Stack
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Clean user input from malicious HTML
app.use(hpp()); // Prevent HTTP Parameter Pollution

// 6. Request Size Limits & Compression
app.use(express.json({ 
  limit: '10kb', // Small limit for game data
  type: 'application/json'
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10kb',
  parameterLimit: 20 // Limit number of parameters
}));

// Enable compression for better performance
app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  },
  level: 6, // Good balance of compression vs CPU
  threshold: 1024 // Only compress if > 1KB
}));

// ============================================================================
// SECURITY MIDDLEWARE FUNCTIONS
// ============================================================================

// Input validation middleware
const validateMissionAttempt = [
  body('input')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Input must be between 1 and 500 characters')
    .matches(/^[a-zA-Z0-9\s\-_.\/\+\=\[\]{}():;,'"!@#$%^&*|\\`~]*$/)
    .withMessage('Input contains invalid characters'),
  
  body('challengeId')
    .trim()
    .isAlphanumeric('en-US', { ignore: '_' })
    .isLength({ min: 1, max: 50 })
    .withMessage('Invalid challenge ID format'),
  
  body('missionId')
    .trim()
    .isAlphanumeric('en-US', { ignore: '_' })
    .isLength({ min: 1, max: 50 })
    .withMessage('Invalid mission ID format'),
  
  body('tries')
    .isInt({ min: 0, max: 100 })
    .withMessage('Tries must be a number between 0 and 100'),
  
  body('xp')
    .isInt({ min: 0, max: 10000 })
    .withMessage('XP must be a number between 0 and 10000'),
];

// Path parameter validation middleware
const validatePathParams = (req, res, next) => {
  const params = { ...req.params };
  
  for (const [key, value] of Object.entries(params)) {
    if (typeof value !== 'string') {
      return res.status(400).json({
        error: 'Invalid parameter type',
        parameter: key
      });
    }
    
    // Basic sanitization and validation
    if (!/^[a-zA-Z0-9_-]+$/.test(value) || value.length > 50) {
      return res.status(400).json({
        error: 'Invalid parameter format',
        parameter: key,
        message: 'Parameters must be alphanumeric with underscores/hyphens, max 50 chars'
      });
    }
  }
  
  next();
};

// Security headers middleware
app.use((req, res, next) => {
  // Additional security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Remove server information
  res.removeHeader('X-Powered-By');
  
  next();
});

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('User-Agent') || 'Unknown';
  
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - IP: ${ip} - UA: ${userAgent.substring(0, 100)}`);
  
  // Log suspicious patterns
  if (req.originalUrl.includes('..') || 
      req.originalUrl.includes('<script') || 
      req.originalUrl.length > 500) {
    console.warn(`[SECURITY] Suspicious request from ${ip}: ${req.originalUrl}`);
  }
  
  next();
});

// ============================================================================
// HEALTH CHECK & MONITORING
// ============================================================================

// Health check endpoint
app.get('/health', (req, res) => {
  const healthCheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024)
    }
  };
  
  res.status(200).json(healthCheck);
});

// Readiness check for load balancers
app.get('/ready', (req, res) => {
  res.status(200).json({ status: 'READY', timestamp: new Date().toISOString() });
});

// ============================================================================
// ROUTES
// ============================================================================

// Apply validation to specific routes
app.use('/api/rhcsa-game', validatePathParams);

// Routes
app.use('/api/rhcsa-game', rhcsaGameRoute);

// Apply validation to mission attempt endpoint
app.use('/api/rhcsa-game/mission/attempt', validateMissionAttempt);

// ============================================================================
// ERROR HANDLING
// ============================================================================

// Validation error handler
app.use((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn(`Validation failed for ${req.ip}: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
        value: err.value
      }))
    });
  }
  next();
});

// 404 handler with security logging
app.use((req, res, next) => {
  console.warn(`404 - Route not found: ${req.method} ${req.originalUrl} from ${req.ip}`);
  res.status(404).json({ 
    error: 'Route not found',
    message: 'The requested endpoint does not exist',
    timestamp: new Date().toISOString()
  });
});

// Global error handler with security considerations
app.use((err, req, res, next) => {
  const timestamp = new Date().toISOString();
  const errorId = Math.random().toString(36).substring(2, 15);
  
  // Log error with context
  console.error(`[${timestamp}] Error ${errorId}:`, {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  // Don't leak internal errors in production
  const isDevelopment = NODE_ENV === 'development';
  
  const errorResponse = {
    error: 'Internal server error',
    message: isDevelopment ? err.message : 'Something went wrong',
    errorId,
    timestamp
  };
  
  if (isDevelopment) {
    errorResponse.stack = err.stack;
  }
  
  res.status(err.status || 500).json(errorResponse);
});

// ============================================================================
// GRACEFUL SHUTDOWN
// ============================================================================

const gracefulShutdown = (signal) => {
  console.log(`Received ${signal}. Starting graceful shutdown...`);
  
  server.close((err) => {
    if (err) {
      console.error('Error during server shutdown:', err);
      process.exit(1);
    }
    
    console.log('Server closed successfully');
    process.exit(0);
  });
  
  // Force shutdown after 30 seconds
  setTimeout(() => {
    console.error('Forcing shutdown due to timeout');
    process.exit(1);
  }, 30000);
};

// ============================================================================
// SERVER STARTUP
// ============================================================================

let server;

if (NODE_ENV !== 'test') {
  server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 RHCSA Game Server running on http://0.0.0.0:${PORT}`);
    console.log(`🛡️  Security: Enhanced`);
    console.log(`🌍 Environment: ${NODE_ENV}`);
    console.log(`📊 Memory Usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`);
  });
  
  // Handle graceful shutdown
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  
  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    gracefulShutdown('uncaughtException');
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    gracefulShutdown('unhandledRejection');
  });
}

export default app;