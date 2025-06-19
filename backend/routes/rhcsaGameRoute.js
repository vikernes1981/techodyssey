// routes/rhcsaGameRoute.js

import { Router } from 'express';
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

// Get game intro
router.get('/intro', (req, res) => {
  res.json({ intro }); 
});

// Get all chapters
router.get('/chapters', (req, res) => {
  const chapters = getAllChapters();
  res.json(chapters);
});

// Get one chapter by ID (full object)
router.get('/chapters/:chapterId', (req, res) => {
  const chapter = getChapterById(req.params.chapterId);
  if (!chapter) return res.status(404).json({ error: "Chapter not found" });
  res.json(chapter);
});

// Get all challenges for a chapter
router.get('/challenges/:chapterId', (req, res) => {
  const challenges = getChallengesByChapterId(req.params.chapterId);
  res.json(challenges);
});

// Get full challenge by ID
router.get('/challenge/:challengeId', (req, res) => {
  const challenge = getChallengeById(req.params.challengeId);
  if (!challenge) return res.status(404).json({ error: "Challenge not found" });
  res.json(challenge);
});

// Get all missions for a challenge
router.get('/missions/:challengeId', (req, res) => {
  const missions = getMissionsByChallengeId(req.params.challengeId);
  res.json(missions);
});

// Get a mission by challengeId and missionId
router.get('/mission/:challengeId/:missionId', (req, res) => {
  const mission = getMissionById(req.params.challengeId, req.params.missionId);
  if (!mission) {
    return res.status(404).json({ error: "Mission not found" });
  }
  res.json({ mission });
});

// Submit an answer to a mission
router.post('/mission/attempt', (req, res) => {
  const { input, challengeId, missionId, tries, xp } = req.body;

  if (
    typeof input !== 'string' ||
    typeof challengeId !== 'string' ||
    typeof missionId !== 'string' ||
    typeof tries !== 'number' ||
    typeof xp !== 'number'
  ) {
    return res.status(400).json({ error: 'Invalid request body.' });
  }

  const result = processMissionAttempt({ input, challengeId, missionId, tries, xp });

  res.json(result);
});

export default router;
