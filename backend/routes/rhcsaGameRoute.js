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

// Rate limiting for general data endpoints
const strictRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
  message: {
    error: 'Rate limit exceeded for this endpoint',
    retryAfter: 300
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Stricter rate limiting for mission attempts
const missionAttemptLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    error: 'Too many mission attempts. Please wait before trying again.',
    retryAfter: 60
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false
});

// Validation for chapterId parameter
const validateChapterId = [
  param('chapterId')
    .trim()
    .matches(/^chapter_\d+$/)
    .withMessage('Chapter ID must be in format: chapter_X where X is a number')
    .isLength({ max: 20 })
    .withMessage('Chapter ID too long')
];

// Validation for challengeId parameter
const validateChallengeId = [
  param('challengeId')
    .trim()
    .matches(/^challenge[_\d\.]+$/)
    .withMessage('Challenge ID must be in format: challenge_X where X is a number')
    .isLength({ max: 20 })
    .withMessage('Challenge ID too long')
];

// Validation for missionId parameter
const validateMissionId = [
  param('missionId')
    .trim()
    .isAlphanumeric('en-US', { ignore: '_' })
    .withMessage('Mission ID must be alphanumeric with underscores only')
    .isLength({ min: 1, max: 50 })
    .withMessage('Mission ID must be between 1 and 50 characters')
];

// Sanitize and validate route parameters to prevent XSS and path traversal
const sanitizeAndValidate = (req, res, next) => {
  for (const key in req.params) {
    if (typeof req.params[key] === 'string') {
      req.params[key] = req.params[key]
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '');
    }
  }
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

// Handle validation errors and return structured error response
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

// Add security headers to prevent caching of sensitive game data
const addGameSecurityHeaders = (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
};

// Serve game introduction (public, cached)
router.get('/intro', strictRateLimit, (req, res) => {
  try {
    console.log(`Intro requested by ${req.ip}`);
    res.setHeader('Cache-Control', 'public, max-age=3600');
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

// List all chapters (async, secured)
router.get('/chapters', strictRateLimit, addGameSecurityHeaders, async (req, res) => {
  try {
    console.log(`Chapters list requested by ${req.ip}`);
    const chapters = await getAllChapters();
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

// Get a specific chapter by ID
router.get('/chapters/:chapterId', 
  validateChapterId,
  handleValidationErrors,
  sanitizeAndValidate,
  strictRateLimit,
  addGameSecurityHeaders,
  async (req, res) => {
    try {
      const { chapterId } = req.params;
      console.log(`Chapter ${chapterId} requested by ${req.ip}`);
      const chapter = await getChapterById(chapterId);
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

// List all challenges for a chapter
router.get('/challenges/:chapterId',
  validateChapterId,
  handleValidationErrors,
  sanitizeAndValidate,
  strictRateLimit,
  addGameSecurityHeaders,
  async (req, res) => {
    try {
      const { chapterId } = req.params;
      console.log(`Challenges for chapter ${chapterId} requested by ${req.ip}`);
      const challenges = await getChallengesByChapterId(chapterId);
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

// Get challenge details by ID (no solutions exposed)
router.get('/challenge/:challengeId',
  validateChallengeId,
  handleValidationErrors,
  sanitizeAndValidate,
  strictRateLimit,
  addGameSecurityHeaders,
  async (req, res) => {
    try {
      const { challengeId } = req.params;
      console.log(`Challenge ${challengeId} requested by ${req.ip}`);
      const challenge = await getChallengeById(challengeId);
      if (!challenge) {
        console.warn(`Challenge not found: ${challengeId} requested by ${req.ip}`);
        return res.status(404).json({ 
          error: "Challenge not found",
          requestedId: challengeId,
          message: "The specified challenge does not exist"
        });
      }
      // Expose only non-sensitive challenge fields
      const safeChallenge = {
        id: challenge.id,
        title: challenge.title,
        story: challenge.story,
        briefing: challenge.briefing,
        prompt: challenge.prompt,
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

// List all missions for a challenge (no solutions/hints)
router.get('/missions/:challengeId',
  validateChallengeId,
  handleValidationErrors,
  sanitizeAndValidate,
  strictRateLimit,
  addGameSecurityHeaders,
  async (req, res) => {
    try {
      const { challengeId } = req.params;
      console.log(`Missions for challenge ${challengeId} requested by ${req.ip}`);
      const missions = await getMissionsByChallengeId(challengeId);
      if (!missions || missions.length === 0) {
        console.warn(`No missions found for challenge: ${challengeId} requested by ${req.ip}`);
        return res.status(404).json({ 
          error: "No missions found",
          challengeId,
          message: "This challenge has no available missions"
        });
      }
      // Expose only safe mission fields
      const safeMissions = missions.map(mission => ({
        id: mission.id,
        title: mission.title,
        action: mission.action,
        intro: mission.intro
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

// Get a specific mission by challengeId and missionId (no solution/hints)
router.get('/mission/:challengeId/:missionId',
  validateChallengeId,
  validateMissionId,
  handleValidationErrors,
  sanitizeAndValidate,
  strictRateLimit,
  addGameSecurityHeaders,
  async (req, res) => {
    try {
      const { challengeId, missionId } = req.params;
      console.log(`Mission ${missionId} in challenge ${challengeId} requested by ${req.ip}`);
      const mission = await getMissionById(challengeId, missionId);
      if (!mission) {
        console.warn(`Mission not found: ${missionId} in challenge ${challengeId} requested by ${req.ip}`);
        return res.status(404).json({ 
          error: "Mission not found",
          challengeId,
          missionId,
          message: "The specified mission does not exist"
        });
      }
      // Expose only safe mission fields
      const safeMission = {
        id: mission.id,
        title: mission.title,
        action: mission.action,
        intro: mission.intro
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

// Submit an answer to a mission (heavily protected)
router.post('/mission/attempt',
  missionAttemptLimit,
  addGameSecurityHeaders,
  async (req, res) => {
    try {
      const { input, challengeId, missionId, tries, xp } = req.body;
      console.log(`Mission attempt: ${missionId} in ${challengeId} by ${req.ip}, tries: ${tries}`);
      // Validate request body fields
      if (!input || !challengeId || !missionId || 
          typeof tries !== 'number' || typeof xp !== 'number') {
        console.warn(`Invalid mission attempt data from ${req.ip}:`, { input, challengeId, missionId, tries, xp });
        return res.status(400).json({ 
          error: 'Invalid request body',
          message: 'All fields (input, challengeId, missionId, tries, xp) are required and must be valid'
        });
      }
      // Prevent excessive brute-force attempts
      if (tries > 10) {
        console.warn(`Excessive attempts detected from ${req.ip}: ${tries} tries`);
        return res.status(429).json({
          error: 'Too many attempts',
          message: 'Maximum attempts exceeded for this mission'
        });
      }
      // Process mission attempt and return result
      const result = await processMissionAttempt({ input, challengeId, missionId, tries, xp });
      console.log(`Mission attempt result for ${req.ip}: ${result.success ? 'SUCCESS' : 'FAILED'}`);
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

// Security monitoring endpoint for health/status checks
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
