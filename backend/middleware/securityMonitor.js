// middleware/securityMonitor.js
import { securityConfig, securityUtils, validators } from '../security/config.js';

// Security event types
const SECURITY_EVENTS = {
  SUSPICIOUS_REQUEST: 'SUSPICIOUS_REQUEST',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  CORS_VIOLATION: 'CORS_VIOLATION',
  POTENTIAL_ATTACK: 'POTENTIAL_ATTACK',
  EXCESSIVE_REQUESTS: 'EXCESSIVE_REQUESTS'
};

// In-memory security metrics (in production, use Redis or database)
const securityMetrics = {
  requests: new Map(), // IP -> request count in current window
  suspicious: new Map(), // IP -> suspicious activity count
  blocked: new Map(), // IP -> blocked request count
  startTime: Date.now()
};

// Security logging utility
const securityLogger = {
  log: (level, event, data) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      event,
      ...data
    };
    
    if (level === 'critical' || level === 'warning') {
      console.warn(`[SECURITY ${level.toUpperCase()}]`, JSON.stringify(logEntry, null, 2));
    } else if (securityConfig.monitoring.enableSecurityLogging) {
      console.log(`[SECURITY ${level.toUpperCase()}]`, JSON.stringify(logEntry, null, 2));
    }
  },
  
  info: (event, data) => securityLogger.log('info', event, data),
  warning: (event, data) => securityLogger.log('warning', event, data),
  critical: (event, data) => securityLogger.log('critical', event, data)
};

// Security monitoring middleware
export const securityMonitor = (req, res, next) => {
  const startTime = Date.now();
  const requestId = securityUtils.generateRequestId();
  const clientIP = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('User-Agent') || 'Unknown';
  const origin = req.get('Origin');
  
  // Add request metadata
  req.security = {
    requestId,
    clientIP,
    userAgent,
    origin,
    startTime,
    suspicious: false,
    blocked: false
  };
  
  // Track request metrics
  const currentRequests = securityMetrics.requests.get(clientIP) || { count: 0, window: Date.now() };
  
  // Reset window if needed (5-minute sliding window)
  if (Date.now() - currentRequests.window > 5 * 60 * 1000) {
    currentRequests.count = 0;
    currentRequests.window = Date.now();
  }
  
  currentRequests.count++;
  securityMetrics.requests.set(clientIP, currentRequests);
  
  // Check for excessive requests
  if (currentRequests.count > securityConfig.thresholds.maxRequestsPerSecond * 300) { // 5 minutes
    securityLogger.warning(SECURITY_EVENTS.EXCESSIVE_REQUESTS, {
      clientIP,
      requestCount: currentRequests.count,
      userAgent,
      url: req.originalUrl
    });
  }
  
  // Check for suspicious patterns
  const isSuspicious = validators.isSuspiciousRequest(req.originalUrl, userAgent);
  if (isSuspicious) {
    req.security.suspicious = true;
    
    const suspiciousCount = (securityMetrics.suspicious.get(clientIP) || 0) + 1;
    securityMetrics.suspicious.set(clientIP, suspiciousCount);
    
    securityLogger.warning(SECURITY_EVENTS.SUSPICIOUS_REQUEST, {
      clientIP,
      userAgent,
      url: req.originalUrl,
      suspiciousCount,
      requestId
    });
    
    // Block after 5 suspicious requests
    if (suspiciousCount >= 5) {
      req.security.blocked = true;
      securityMetrics.blocked.set(clientIP, (securityMetrics.blocked.get(clientIP) || 0) + 1);
      
      securityLogger.critical(SECURITY_EVENTS.POTENTIAL_ATTACK, {
        clientIP,
        userAgent,
        url: req.originalUrl,
        suspiciousCount,
        action: 'BLOCKED',
        requestId
      });
      
      return res.status(403).json({
        error: 'Request blocked',
        message: 'Suspicious activity detected',
        requestId
      });
    }
  }
  
  // Check CORS violations
  if (origin && !securityUtils.isOriginAllowed(origin)) {
    securityLogger.warning(SECURITY_EVENTS.CORS_VIOLATION, {
      clientIP,
      origin,
      userAgent,
      url: req.originalUrl,
      requestId
    });
  }
  
  // Log request if enabled
  if (securityConfig.monitoring.enableRequestLogging) {
    securityLogger.info('REQUEST_START', {
      method: req.method,
      url: req.originalUrl,
      clientIP,
      userAgent: userAgent.substring(0, 100),
      requestId
    });
  }
  
  // Monitor response
  const originalSend = res.send;
  res.send = function(data) {
    const responseTime = Date.now() - startTime;
    
    // Log response if enabled
    if (securityConfig.monitoring.enableRequestLogging) {
      securityLogger.info('REQUEST_END', {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        responseTime,
        clientIP,
        requestId,
        dataSize: data ? Buffer.byteLength(data) : 0
      });
    }
    
    // Log slow requests
    if (responseTime > 5000) { // 5 seconds
      securityLogger.warning('SLOW_REQUEST', {
        method: req.method,
        url: req.originalUrl,
        responseTime,
        clientIP,
        requestId
      });
    }
    
    originalSend.call(this, data);
  };
  
  next();
};

// Input validation monitoring middleware
export const validationMonitor = (req, res, next) => {
  const originalStatus = res.status;
  
  res.status = function(code) {
    if (code === 400) {
      securityLogger.warning(SECURITY_EVENTS.VALIDATION_FAILED, {
        clientIP: req.security?.clientIP,
        userAgent: req.security?.userAgent,
        url: req.originalUrl,
        method: req.method,
        body: securityUtils.maskSensitiveData(req.body),
        params: req.params,
        requestId: req.security?.requestId
      });
    }
    
    return originalStatus.call(this, code);
  };
  
  next();
};

// Rate limit monitoring middleware
export const rateLimitMonitor = (req, res, next) => {
  const originalStatus = res.status;
  
  res.status = function(code) {
    if (code === 429) {
      securityLogger.warning(SECURITY_EVENTS.RATE_LIMIT_EXCEEDED, {
        clientIP: req.security?.clientIP,
        userAgent: req.security?.userAgent,
        url: req.originalUrl,
        method: req.method,
        requestId: req.security?.requestId
      });
    }
    
    return originalStatus.call(this, code);
  };
  
  next();
};

// Security metrics endpoint
export const getSecurityMetrics = (req, res) => {
  const uptime = Date.now() - securityMetrics.startTime;
  const totalRequests = Array.from(securityMetrics.requests.values())
    .reduce((sum, data) => sum + data.count, 0);
  
  const metrics = {
    uptime: Math.floor(uptime / 1000), // seconds
    totalRequests,
    uniqueIPs: securityMetrics.requests.size,
    suspiciousRequests: Array.from(securityMetrics.suspicious.values())
      .reduce((sum, count) => sum + count, 0),
    blockedRequests: Array.from(securityMetrics.blocked.values())
      .reduce((sum, count) => sum + count, 0),
    topIPs: Array.from(securityMetrics.requests.entries())
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 10)
      .map(([ip, data]) => ({ ip: ip.replace(/\d+$/, 'XXX'), count: data.count })),
    securityEvents: {
      suspicious: securityMetrics.suspicious.size,
      blocked: securityMetrics.blocked.size
    },
    timestamp: new Date().toISOString()
  };
  
  res.json(metrics);
};

// Cleanup old metrics (call periodically)
export const cleanupMetrics = () => {
  const now = Date.now();
  const oldThreshold = 24 * 60 * 60 * 1000; // 24 hours
  
  // Clean old request data
  for (const [ip, data] of securityMetrics.requests.entries()) {
    if (now - data.window > oldThreshold) {
      securityMetrics.requests.delete(ip);
    }
  }
  
  securityLogger.info('METRICS_CLEANUP', {
    remainingIPs: securityMetrics.requests.size,
    cleanupTime: new Date().toISOString()
  });
};

// Start periodic cleanup
setInterval(cleanupMetrics, 60 * 60 * 1000); // Every hour

export { SECURITY_EVENTS, securityLogger };