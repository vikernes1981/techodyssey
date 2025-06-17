// services/rhcsaGameService.js

import challenge_1 from '../data/chapters/chapter1/challenges/challenge_1.js';
import partitions_filesystem from '../data/chapters/chapter1/challenges/missions/partitions_filesystem.js';

/**
 * Returns the mission object by its ID from challenge_1.
 * @param {string} missionId
 * @returns {Object|null}
 */
function getMissionById(missionId) {
  return partitions_filesystem.find(m => m.id === missionId) || null;
}

/**
 * Validates the user input for the current mission.
 * @param {Object} opts - { input, missionId, tries, xp }
 * @returns {Object} - result for frontend
 */
function processMissionAttempt({ input, missionId, tries, xp }) {
  const mission = getMissionById(missionId);

  if (!mission) {
    return {
      output: 'Invalid mission.',
      success: false,
      xp,
      hint: null,
      complete: false
    };
  }

  const trimmedInput = input.trim();
  let success = false;
  let xpDelta = 0;
  let message = '';
  let hint = null;
  let complete = false;

if (trimmedInput === mission.solution) {
  success = true;
  xpDelta = 10;
  message = `✅ Correct! You earned 10 XP.`;
  complete = true;
  // NEW: include output, aspects, options in response
  return {
    output: message,
    success,
    xp: Math.max(0, xp + xpDelta),
    xpDelta,
    complete,
    missionExtras: {
      output: mission.output,
      aspects: mission.aspects,
      options: mission.options,
      outro: mission.outro,
    }
  };
}
 else {
    success = false;
    xpDelta = xp > 0 ? -5 : 0;
    message = `❌ Incorrect.`;

    // Hints logic
    if (Array.isArray(mission.hints) && tries < mission.hints.length) {
      hint = mission.hints[tries];
    } else if (Array.isArray(mission.hints) && mission.hints.length > 0) {
      hint = mission.hints[mission.hints.length - 1]; // Show last hint/answer
    }
  }

  // Prevent XP from dropping below zero
  const newXp = Math.max(0, xp + xpDelta);

  return {
    output: message,
    success,
    xp: newXp,
    xpDelta,
    hint,
    complete
  };
}

/**
 * Returns all required intro/briefing data for Challenge 1.
 */
function getFirstMissionBriefing() {
  return {
    questNumber: challenge_1.questNumber,
    description: challenge_1.description,
    story: challenge_1.story,
    briefing: challenge_1.briefing,
    prompt: challenge_1.prompt
  };
}

export {
  processMissionAttempt,
  getMissionById,
  getFirstMissionBriefing
};
