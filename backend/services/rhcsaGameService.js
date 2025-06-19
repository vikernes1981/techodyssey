// services/rhcsaGameService.js
import chapters from '../data/chapters/chapters.js';

/**
 * Returns the mission object by its ID for the given challenge.
 * @param {string} challengeId
 * @param {string} missionId
 * @returns {Object|null}
 */
function getMissionById(challengeId, missionId) {
  const challenge = getChallengeById(challengeId);
  if (!challenge || !challenge.options) return null;
  return challenge.options.find(m => m.id === missionId) || null;
}

/**
 * Validates the user input for the current mission.
 * @param {Object} opts - { input, challengeId, missionId, tries, xp }
 * @returns {Object} - result for frontend
 */
function processMissionAttempt({ input, challengeId, missionId, tries, xp }) {
  const mission = getMissionById(challengeId, missionId);
  console.log('challengeId:', challengeId);
  console.log('missionId:', missionId);
  const challenge = getChallengeById(challengeId);
  console.log('Found challenge:', !!challenge, challenge && challenge.id);
  if (challenge) {
    console.log('Mission IDs in challenge:', challenge.options.map(m => m.id));
  }
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
  console.log('User input:', trimmedInput);
  console.log('Expected solution:', mission.solution);
  if (trimmedInput === mission.solution) {
    success = true;
    xpDelta = 10;
    message = `✅ Correct! You earned 10 XP.`;
    complete = true;
    // include output, aspects, options in response
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
        outro: mission.outro
      }
    };
  } else {
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
 * Returns challenge briefing data by challenge ID.
 * @param {string} challengeId
 * @returns {Object|null}
 */
function getChallengeBriefing(challengeId) {
  const challenge = getChallengeById(challengeId);
  if (!challenge) return null;
  const { id, title, story, briefing, prompt } = challenge;
  return { id, title, story, briefing, prompt };
}

// Get all chapters (with meta info and challenge references)
function getAllChapters() {
  return chapters.map(({ id, name, story }) => ({
    id,
    name,
    story
  }));
}

// Get a full chapter object by chapterId (including its challenges)
function getChapterById(chapterId) {
  return chapters.find((c) => c.id === chapterId) || null;
}

// Get all challenges for a chapter
function getChallengesByChapterId(chapterId) {
  const chapter = chapters.find((c) => c.id === chapterId);
  if (!chapter) return [];
  return chapter.challenges.map(({ id, title, story, briefing, prompt }) => ({
    id,
    title,
    story,
    briefing,
    prompt
  }));
}

// Get full challenge object by challengeId (searches all chapters)
function getChallengeById(challengeId) {
  for (const chapter of chapters) {
    const challenge = chapter.challenges.find((ch) => ch.id === challengeId);
    if (challenge) return challenge;
  }
  return null;
}

// Get all missions for a challenge
function getMissionsByChallengeId(challengeId) {
  const challenge = getChallengeById(challengeId);
  return challenge ? challenge.options : [];
}

export {
  processMissionAttempt,
  getMissionById,
  getChallengeBriefing,
  getAllChapters,
  getChapterById,
  getChallengesByChapterId,
  getChallengeById,
  getMissionsByChallengeId
};
