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

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5000',
  'http://192.168.0.84:5173',
  'https://blog.techodyssey.org',
  ...(process.env.ADDITIONAL_ORIGINS ? process.env.ADDITIONAL_ORIGINS.split(',') : [])
];

// Trust proxy for accurate IP addresses behind load balancers
app.set('trust proxy', 1);

// ===================== Security Middleware Stack =====================

// Helmet for HTTP headers security
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
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  frameguard: { action: 'deny' },
  xssFilter: true,
  referrerPolicy: { policy: 'same-origin' }
}));

// Rate limiting for API abuse prevention
const createRateLimit = (windowMs, max, message, skipSuccessfulRequests = false) => {
  return rateLimit({
    windowMs,
    max,
    message: { error: message, retryAfter: Math.ceil(windowMs / 1000) },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests,
    keyGenerator: (req) => req.ip || req.connection.remoteAddress,
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

// Global API rate limit
app.use('/api/', createRateLimit(
  15 * 60 * 1000,
  100,
  'Too many API requests, please try again later.',
  true
));

// Stricter rate limit for mission attempts
app.use('/api/rhcsa-game/mission/attempt', createRateLimit(
  60 * 1000,
  10,
  'Too many mission attempts, please slow down.',
  false
));

// Slow down repeated requests to prevent brute force
app.use('/api/', slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: () => 500,
  maxDelayMs: 5000,
  skipSuccessfulRequests: true,
  validate: { delayMs: false }
}));

// CORS configuration for allowed origins and methods
app.use(cors({
  origin: function (origin, callback) {
    console.log('CORS origin check:', origin || 'No origin (likely same-origin)');
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    if (NODE_ENV === 'development' && origin.startsWith('http://localhost:')) return callback(null, true);
    console.warn(`CORS violation attempt from origin: ${origin}`);
    return callback(new Error(`Origin ${origin} not allowed by CORS policy`));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false,
  maxAge: 86400
}));

// Sanitize data to prevent NoSQL injection and XSS
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Limit request body size and parameter count
app.use(express.json({
  limit: '10kb',
  type: 'application/json'
}));
app.use(express.urlencoded({
  extended: true,
  limit: '10kb',
  parameterLimit: 20
}));

// Enable gzip compression for responses
app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  },
  level: 6,
  threshold: 1024
}));

// ===================== Middleware Functions =====================

// Validate mission attempt input
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

// Validate and sanitize path parameters
const validatePathParams = (req, res, next) => {
  const params = { ...req.params };
  for (const [key, value] of Object.entries(params)) {
    if (typeof value !== 'string') {
      return res.status(400).json({
        error: 'Invalid parameter type',
        parameter: key
      });
    }
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

// Set additional security headers and remove server info
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  res.removeHeader('X-Powered-By');
  next();
});

// Log all incoming requests and flag suspicious patterns
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('User-Agent') || 'Unknown';
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - IP: ${ip} - UA: ${userAgent.substring(0, 100)}`);
  if (req.originalUrl.includes('..') ||
      req.originalUrl.includes('<script') ||
      req.originalUrl.length > 500) {
    console.warn(`[SECURITY] Suspicious request from ${ip}: ${req.originalUrl}`);
  }
  next();
});

// ===================== Health & Monitoring Endpoints =====================

// Health check endpoint for uptime and memory stats
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

// Readiness endpoint for load balancer checks
app.get('/ready', (req, res) => {
  res.status(200).json({ status: 'READY', timestamp: new Date().toISOString() });
});

// API call statistics middleware
const apiCallCounter = {
  total: 0,
  byEndpoint: new Map(),
  byIP: new Map(),
  byUserAgent: new Map(),
  startTime: Date.now()
};

app.use('/api/', (req, res, next) => {
  apiCallCounter.total++;
  const endpoint = req.originalUrl;
  apiCallCounter.byEndpoint.set(endpoint, (apiCallCounter.byEndpoint.get(endpoint) || 0) + 1);
  const ip = req.ip || req.connection.remoteAddress;
  apiCallCounter.byIP.set(ip, (apiCallCounter.byIP.get(ip) || 0) + 1);
  const userAgent = req.get('User-Agent') || 'Unknown';
  const component = extractComponent(req.originalUrl);
  apiCallCounter.byUserAgent.set(component, (apiCallCounter.byUserAgent.get(component) || 0) + 1);
  console.log(`🔢 API Call #${apiCallCounter.total}: ${component} -> ${endpoint}`);
  next();
});

// Identify frontend component from URL for stats
function extractComponent(url) {
  if (url.includes('/intro')) return 'Intro.jsx';
  if (url.includes('/chapters')) return 'Chapters.jsx';
  if (url.includes('/challenges')) return 'Challenges.jsx';
  if (url.includes('/missions')) return 'Missions.jsx';
  if (url.includes('/mission/attempt')) return 'MissionPlay.jsx';
  if (url.includes('/health') || url.includes('/ready')) return 'HealthCheck';
  return 'Unknown';
}

// Endpoint to get API usage statistics
app.get('/api/stats', (req, res) => {
  const uptime = Date.now() - apiCallCounter.startTime;
  res.json({
    totalCalls: apiCallCounter.total,
    uptime: Math.floor(uptime / 1000),
    callsPerMinute: Math.round((apiCallCounter.total / (uptime / 60000)) * 100) / 100,
    byEndpoint: Object.fromEntries(apiCallCounter.byEndpoint),
    byComponent: Object.fromEntries(apiCallCounter.byUserAgent),
    byIP: Object.fromEntries(apiCallCounter.byIP)
  });
});

// ===================== Routes =====================

// Validate path params for all rhcsa-game routes
app.use('/api/rhcsa-game', validatePathParams);

// Main game routes
app.use('/api/rhcsa-game', rhcsaGameRoute);

// Validate mission attempt input
app.use('/api/rhcsa-game/mission/attempt', validateMissionAttempt);

// ===================== Error Handling =====================

// Handle validation errors from express-validator
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

// 404 handler for unknown routes
app.use((req, res, next) => {
  console.warn(`404 - Route not found: ${req.method} ${req.originalUrl} from ${req.ip}`);
  res.status(404).json({
    error: 'Route not found',
    message: 'The requested endpoint does not exist',
    timestamp: new Date().toISOString()
  });
});

// Global error handler for uncaught errors
app.use((err, req, res, next) => {
  const timestamp = new Date().toISOString();
  const errorId = Math.random().toString(36).substring(2, 15);
  console.error(`[${timestamp}] Error ${errorId}:`, {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
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

// ===================== Graceful Shutdown =====================

// Graceful shutdown on termination signals
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
  setTimeout(() => {
    console.error('Forcing shutdown due to timeout');
    process.exit(1);
  }, 30000);
};

// ===================== Server Startup =====================

let server;

if (NODE_ENV !== 'test') {
  server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 RHCSA Game Server running on http://0.0.0.0:${PORT}`);
    console.log(`🛡️  Security: Enhanced`);
    console.log(`🌍 Environment: ${NODE_ENV}`);
    console.log(`📊 Memory Usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`);
  });
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
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
