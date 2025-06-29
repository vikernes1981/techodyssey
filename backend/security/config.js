// security/config.js
import dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';

// Security Configuration Object
export const securityConfig = {
  // Environment settings
  environment: NODE_ENV,
  isDevelopment: NODE_ENV === 'development',
  isProduction: NODE_ENV === 'production',
  
  // Rate limiting configuration
  rateLimiting: {
    global: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // requests per window
      message: 'Too many requests, please try again later.',
      skipSuccessfulRequests: true
    },
    strict: {
      windowMs: 5 * 60 * 1000, // 5 minutes  
      max: 20, // requests per window
      message: 'Rate limit exceeded for this endpoint',
      skipSuccessfulRequests: false
    },
    missionAttempts: {
      windowMs: 60 * 1000, // 1 minute
      max: 5, // attempts per minute
      message: 'Too many mission attempts. Please wait before trying again.',
      skipSuccessfulRequests: false
    }
  },
  
  // Request size limits
  requestLimits: {
    jsonLimit: '10kb',
    urlEncodedLimit: '10kb',
    parameterLimit: 20
  },
  
  // Input validation patterns
  validation: {
    chapterId: /^chapter_\d+$/,
    challengeId: /^challenge_\d+$/,
    missionId: /^[a-zA-Z0-9_]+$/,
    input: /^[a-zA-Z0-9\s\-_.\/\+\=\[\]{}():;,'"!@#$%^&*|\\`~]*$/,
    maxInputLength: 500,
    maxParamLength: 50,
    maxTries: 100,
    maxXp: 10000
  },
  
  // Security headers configuration
  headers: {
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
      }
    },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true
    }
  },
  
  // CORS configuration
  cors: {
    allowedOrigins: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://192.168.0.84:5173',
      'https://blog.techodyssey.org',
      ...(process.env.ADDITIONAL_ORIGINS ? process.env.ADDITIONAL_ORIGINS.split(',') : [])
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: false,
    maxAge: 86400 // 24 hours
  },
  
  // Monitoring and logging
  monitoring: {
    logLevel: NODE_ENV === 'production' ? 'warn' : 'debug',
    enableRequestLogging: true,
    enableSecurityLogging: true,
    enablePerformanceLogging: NODE_ENV === 'production'
  },
  
  // Security thresholds
  thresholds: {
    maxRequestsPerSecond: 10,
    maxConcurrentRequests: 50,
    maxRequestSize: 10240, // 10KB
    maxUrlLength: 500,
    suspiciousPatterns: [
      /\.\./,
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /eval\(/i,
      /function\(/i
    ]
  }
};

// Validation helper functions
export const validators = {
  isValidChapterId: (id) => securityConfig.validation.chapterId.test(id),
  isValidChallengeId: (id) => securityConfig.validation.challengeId.test(id),
  isValidMissionId: (id) => securityConfig.validation.missionId.test(id),
  isValidInput: (input) => {
    if (!input || typeof input !== 'string') return false;
    if (input.length > securityConfig.validation.maxInputLength) return false;
    return securityConfig.validation.input.test(input);
  },
  isSuspiciousRequest: (url, userAgent = '') => {
    return securityConfig.thresholds.suspiciousPatterns.some(pattern => 
      pattern.test(url) || pattern.test(userAgent)
    );
  }
};

// Security utilities
export const securityUtils = {
  sanitizeString: (str) => {
    if (typeof str !== 'string') return '';
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  },
  
  generateRequestId: () => {
    return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  },
  
  maskSensitiveData: (data) => {
    if (typeof data === 'object' && data !== null) {
      const masked = { ...data };
      const sensitiveFields = ['solution', 'hints', 'password', 'token', 'key'];
      
      sensitiveFields.forEach(field => {
        if (masked[field]) {
          masked[field] = '[REDACTED]';
        }
      });
      
      return masked;
    }
    return data;
  },
  
  isOriginAllowed: (origin) => {
    if (!origin) return true; // Allow same-origin requests
    
    if (securityConfig.cors.allowedOrigins.includes(origin)) {
      return true;
    }
    
    // Allow localhost in development
    if (securityConfig.isDevelopment && origin.startsWith('http://localhost:')) {
      return true;
    }
    
    return false;
  }
};

export default securityConfig;