// config/development.js
// Development-specific security overrides for testing

export const developmentConfig = {
  // Relaxed rate limiting for development and testing
  rateLimiting: {
    global: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // Much higher limit for development
      skipSuccessfulRequests: true
    },
    strict: {
      windowMs: 5 * 60 * 1000, // 5 minutes  
      max: 200, // Higher limit for testing
      skipSuccessfulRequests: true
    },
    missionAttempts: {
      windowMs: 60 * 1000, // 1 minute
      max: 20, // Higher limit for testing
      skipSuccessfulRequests: false
    }
  },

  // More permissive CORS for development
  cors: {
    allowedOrigins: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173',
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
      'http://192.168.0.84:5173'
    ]
  },

  // Enhanced logging for development
  monitoring: {
    logLevel: 'debug',
    enableRequestLogging: true,
    enableSecurityLogging: true,
    enablePerformanceLogging: true
  }
};

// Merge development config with production config
export const mergeConfig = (baseConfig, env = 'production') => {
  if (env === 'development' || env === 'test') {
    return {
      ...baseConfig,
      rateLimiting: {
        ...baseConfig.rateLimiting,
        ...developmentConfig.rateLimiting
      },
      cors: {
        ...baseConfig.cors,
        allowedOrigins: [
          ...baseConfig.cors.allowedOrigins,
          ...developmentConfig.cors.allowedOrigins
        ]
      },
      monitoring: {
        ...baseConfig.monitoring,
        ...developmentConfig.monitoring
      }
    };
  }
  
  return baseConfig;
};