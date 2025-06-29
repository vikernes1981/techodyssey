// routes/rhcsaGameRoute.js

import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { param, validationResult } from 'express-validator';
import intro from '../data/intro.js'; 
import {
  processMissionAttempt,
  getMissionById,
  getAllChapters,
  getChapterById,
  getChallengesByChapterId,
  getChallengeById,
  getMissionsByChallengeId
} from '../services/rhcsaGameService.js';

const router = Router();

// ============================================================================
// ROUTE-SPECIFIC SECURITY MIDDLEWARE
// ============================================================================

// Stricter rate limiting for data-heavy endpoints
const strictRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, // 20 requests per 5 minutes
  message: {
    error: 'Rate limit exceeded for this endpoint',
    retryAfter: 300
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Very strict rate limiting for mission attempts
const missionAttemptLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 attempts per minute
  message: {
    error: 'Too many mission attempts. Please wait before trying again.',
    retryAfter: 60
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false // Count all attempts
});

// Parameter validation middleware
const validateChapterId = [
  param('chapterId')
    .trim()
    .matches(/^chapter_\d+$/)
    .withMessage('Chapter ID must be in format: chapter_X where X is a number')
    .isLength({ max: 20 })
    .withMessage('Chapter ID too long')
];

const validateChallengeId = [
  param('challengeId')
    .trim()
    .matches(/^challenge_\d+$/)
    .withMessage('Challenge ID must be in format: challenge_X where X is a number')
    .isLength({ max: 20 })
    .withMessage('Challenge ID too long')
];

const validateMissionId = [
  param('missionId')
    .trim()
    .isAlphanumeric('en-US', { ignore: '_' })
    .withMessage('Mission ID must be alphanumeric with underscores only')
    .isLength({ min: 1, max: 50 })
    .withMessage('Mission ID must be between 1 and 50 characters')
];

// Input sanitization and validation middleware
const sanitizeAndValidate = (req, res, next) => {
  // Remove any potential script tags or suspicious patterns
  for (const key in req.params) {
    if (typeof req.params[key] === 'string') {
      req.params[key] = req.params[key]
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '');
    }
  }
  
  // Check for path traversal attempts
  for (const key in req.params) {
    if (req.params[key].includes('..') || req.params[key].includes('/')) {
      return res.status(400).json({
        error: 'Invalid parameter format',
        message: 'Parameters cannot contain path traversal sequences'
      });
    }
  }
  
  next();
};

// Error handling middleware for validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn(`Route validation failed for ${req.ip}: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({
      error: 'Invalid request parameters',
      details: errors.array().map(err => ({
        parameter: err.param,
        message: err.msg,
        receivedValue: err.value
      }))
    });
  }
  next();
};

// Security headers for game data
const addGameSecurityHeaders = (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
};

// ============================================================================
// ROUTES WITH ENHANCED SECURITY
// ============================================================================

// Get game intro - public endpoint with basic rate limiting
router.get('/intro', strictRateLimit, (req, res) => {
  try {
    console.log(`Intro requested by ${req.ip}`);
    
    // Add cache headers for static content
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    
    res.json({ 
      intro,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }); 
  } catch (error) {
    console.error('Error serving intro:', error);
    res.status(500).json({ error: 'Failed to load game introduction' });
  }
});

// Get all chapters
router.get('/chapters', strictRateLimit, addGameSecurityHeaders, (req, res) => {
  try {
    console.log(`Chapters list requested by ${req.ip}`);
    
    const chapters = getAllChapters();
    
    if (!chapters || chapters.length === 0) {
      return res.status(404).json({ 
        error: 'No chapters available',
        message: 'Game content is currently unavailable'
      });
    }
    
    res.json({
      chapters,
      count: chapters.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error retrieving chapters:', error);
    res.status(500).json({ error: 'Failed to retrieve chapters' });
  }
});

// Get one chapter by ID
router.get('/chapters/:chapterId', 
  validateChapterId,
  handleValidationErrors,
  sanitizeAndValidate,
  strictRateLimit,
  addGameSecurityHeaders,
  (req, res) => {
    try {
      const { chapterId } = req.params;
      console.log(`Chapter ${chapterId} requested by ${req.ip}`);
      
      const chapter = getChapterById(chapterId);
      
      if (!chapter) {
        console.warn(`Chapter not found: ${chapterId} requested by ${req.ip}`);
        return res.status(404).json({ 
          error: "Chapter not found",
          requestedId: chapterId,
          message: "The specified chapter does not exist"
        });
      }
      
      res.json({
        chapter,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error(`Error retrieving chapter ${req.params.chapterId}:`, error);
      res.status(500).json({ error: 'Failed to retrieve chapter' });
    }
  }
);

// Get all challenges for a chapter
router.get('/challenges/:chapterId',
  validateChapterId,
  handleValidationErrors,
  sanitizeAndValidate,
  strictRateLimit,
  addGameSecurityHeaders,
  (req, res) => {
    try {
      const { chapterId } = req.params;
      console.log(`Challenges for chapter ${chapterId} requested by ${req.ip}`);
      
      const challenges = getChallengesByChapterId(chapterId);
      
      if (!challenges || challenges.length === 0) {
        console.warn(`No challenges found for chapter: ${chapterId} requested by ${req.ip}`);
        return res.status(404).json({ 
          error: "No challenges found",
          chapterId,
          message: "This chapter has no available challenges"
        });
      }
      
      res.json({
        challenges,
        chapterId,
        count: challenges.length,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error(`Error retrieving challenges for chapter ${req.params.chapterId}:`, error);
      res.status(500).json({ error: 'Failed to retrieve challenges' });
    }
  }
);

// Get full challenge by ID
router.get('/challenge/:challengeId',
  validateChallengeId,
  handleValidationErrors,
  sanitizeAndValidate,
  strictRateLimit,
  addGameSecurityHeaders,
  (req, res) => {
    try {
      const { challengeId } = req.params;
      console.log(`Challenge ${challengeId} requested by ${req.ip}`);
      
      const challenge = getChallengeById(challengeId);
      
      if (!challenge) {
        console.warn(`Challenge not found: ${challengeId} requested by ${req.ip}`);
        return res.status(404).json({ 
          error: "Challenge not found",
          requestedId: challengeId,
          message: "The specified challenge does not exist"
        });
      }
      
      // Remove sensitive information like solutions from challenge overview
      const safeChallenge = {
        id: challenge.id,
        title: challenge.title,
        story: challenge.story,
        briefing: challenge.briefing,
        prompt: challenge.prompt,
        // Don't include options with solutions
        missionCount: challenge.options ? challenge.options.length : 0
      };
      
      res.json({
        challenge: safeChallenge,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error(`Error retrieving challenge ${req.params.challengeId}:`, error);
      res.status(500).json({ error: 'Failed to retrieve challenge' });
    }
  }
);

// Get all missions for a challenge (without solutions)
router.get('/missions/:challengeId',
  validateChallengeId,
  handleValidationErrors,
  sanitizeAndValidate,
  strictRateLimit,
  addGameSecurityHeaders,
  (req, res) => {
    try {
      const { challengeId } = req.params;
      console.log(`Missions for challenge ${challengeId} requested by ${req.ip}`);
      
      const missions = getMissionsByChallengeId(challengeId);
      
      if (!missions || missions.length === 0) {
        console.warn(`No missions found for challenge: ${challengeId} requested by ${req.ip}`);
        return res.status(404).json({ 
          error: "No missions found",
          challengeId,
          message: "This challenge has no available missions"
        });
      }
      
      // Remove solutions and hints for security
      const safeMissions = missions.map(mission => ({
        id: mission.id,
        title: mission.title,
        action: mission.action,
        intro: mission.intro,
        // Don't include solution, hints, or other sensitive data
      }));
      
      res.json({
        missions: safeMissions,
        challengeId,
        count: safeMissions.length,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error(`Error retrieving missions for challenge ${req.params.challengeId}:`, error);
      res.status(500).json({ error: 'Failed to retrieve missions' });
    }
  }
);

// Get a mission by challengeId and missionId (without solution)
router.get('/mission/:challengeId/:missionId',
  validateChallengeId,
  validateMissionId,
  handleValidationErrors,
  sanitizeAndValidate,
  strictRateLimit,
  addGameSecurityHeaders,
  (req, res) => {
    try {
      const { challengeId, missionId } = req.params;
      console.log(`Mission ${missionId} in challenge ${challengeId} requested by ${req.ip}`);
      
      const mission = getMissionById(challengeId, missionId);
      
      if (!mission) {
        console.warn(`Mission not found: ${missionId} in challenge ${challengeId} requested by ${req.ip}`);
        return res.status(404).json({ 
          error: "Mission not found",
          challengeId,
          missionId,
          message: "The specified mission does not exist"
        });
      }
      
      // Only return safe mission data (no solution or hints)
      const safeMission = {
        id: mission.id,
        title: mission.title,
        action: mission.action,
        intro: mission.intro,
        // Don't include solution, hints, output, aspects, options, outro
      };
      
      res.json({ 
        mission: safeMission,
        challengeId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error(`Error retrieving mission ${req.params.missionId}:`, error);
      res.status(500).json({ error: 'Failed to retrieve mission' });
    }
  }
);

// Submit an answer to a mission - Most heavily protected endpoint
router.post('/mission/attempt',
  missionAttemptLimit,
  addGameSecurityHeaders,
  (req, res) => {
    try {
      const { input, challengeId, missionId, tries, xp } = req.body;
      
      console.log(`Mission attempt: ${missionId} in ${challengeId} by ${req.ip}, tries: ${tries}`);
      
      // Additional server-side validation
      if (!input || !challengeId || !missionId || 
          typeof tries !== 'number' || typeof xp !== 'number') {
        console.warn(`Invalid mission attempt data from ${req.ip}:`, { input, challengeId, missionId, tries, xp });
        return res.status(400).json({ 
          error: 'Invalid request body',
          message: 'All fields (input, challengeId, missionId, tries, xp) are required and must be valid'
        });
      }
      
      // Rate limiting based on attempts
      if (tries > 10) {
        console.warn(`Excessive attempts detected from ${req.ip}: ${tries} tries`);
        return res.status(429).json({
          error: 'Too many attempts',
          message: 'Maximum attempts exceeded for this mission'
        });
      }
      
      // Process the attempt
      const result = processMissionAttempt({ input, challengeId, missionId, tries, xp });
      
      // Log attempt result
      console.log(`Mission attempt result for ${req.ip}: ${result.success ? 'SUCCESS' : 'FAILED'}`);
      
      // Add security metadata to response
      result.timestamp = new Date().toISOString();
      result.attemptsRemaining = Math.max(0, 10 - tries);
      
      res.json(result);
    } catch (error) {
      console.error(`Error processing mission attempt from ${req.ip}:`, error);
      res.status(500).json({ 
        error: 'Failed to process mission attempt',
        message: 'An error occurred while validating your submission'
      });
    }
  }
);

// ============================================================================
// SECURITY MONITORING ENDPOINTS
// ============================================================================

// Security status endpoint (for monitoring)
router.get('/security/status', strictRateLimit, (req, res) => {
  try {
    const securityStatus = {
      status: 'secure',
      timestamp: new Date().toISOString(),
      checksEnabled: [
        'Rate limiting',
        'Input validation',
        'XSS protection',
        'CSRF protection', 
        'Parameter pollution prevention',
        'NoSQL injection prevention'
      ],
      environment: process.env.NODE_ENV || 'development'
    };
    
    res.json(securityStatus);
  } catch (error) {
    console.error('Error retrieving security status:', error);
    res.status(500).json({ error: 'Failed to retrieve security status' });
  }
});

export default router;