// routes/rhcsaGameRoute.js

import { Router } from 'express';
import { processMissionAttempt, getMissionById } from '../services/rhcsaGameService.js';
import intro from '../data/intro.js'; 
import quest1 from '../data/challenge1/challenge_1.js';
import partitions_filesystem from '../data/missions/partitions_filesystem.js';

const router = Router();

router.get('/mission/:id', (req, res) => {
  const mission = partitions_filesystem.find(m => m.id === req.params.id);
  if (!mission) {
    return res.status(404).json({ error: "Mission not found" });
  }
  res.json({ mission });
});

router.get('/mission-briefing', (req, res) => {
  // For now, just send the first quest; you can expand to multi-quest later.
  const { story, briefing, prompt } = quest1;
  res.json({ story, briefing, prompt });
});

// POST /api/rhcsa-game
router.post('/', (req, res) => {
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

  // If the answer is correct, add mission extras
  if (result.success) {
    const mission = getMissionById(missionId);
    result.missionExtras = {
      output: mission.output,
      aspects: mission.aspects,
      options: mission.options,
      outro: mission.outro
    };
  }

  res.json(result);
});

router.get('/intro', (req, res) => {
  res.json({ intro }); 
});

// Serve options for challenge 1
router.get('/options', (req, res) => {
  // Defensive: only send if options exist and are array
  const options = Array.isArray(quest1.options)
    ? quest1.options
    : [];
  res.json({ options: quest1.options, story: quest1.story, briefing: quest1.briefing, prompt: quest1.prompt });
});

export default router;
