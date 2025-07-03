import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class RHCSAGameService {
  constructor() {
    this.dataPath = path.join(__dirname, '../data');
    this.cache = new Map();
    this.cacheTimeout = 2 * 60 * 1000; // Cache duration in milliseconds
  }

  // Helper to get data from cache or load and cache it if expired/missing
  async getFromCache(key, loader) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    try {
      const data = await loader();
      this.cache.set(key, { data, timestamp: Date.now() });
      return data;
    } catch (error) {
      console.error(`Error loading ${key}:`, error);
      return null;
    }
  }

  // Load all chapters, dynamically discovering challenges for each chapter
  async getAllChapters() {
    return await this.getFromCache('all_chapters', async () => {
      try {
        // Possible locations for chapters.js
        const possiblePaths = [
          path.join(this.dataPath, 'chapters.js'),
          path.join(this.dataPath, 'chapters', 'chapters.js'),
          path.join(this.dataPath, 'chapters', 'chapter1', 'chapters.js')
        ];
        
        let chaptersFilePath = null;
        for (const possiblePath of possiblePaths) {
          if (fs.existsSync(possiblePath)) {
            chaptersFilePath = possiblePath;
            break;
          }
        }
        
        if (!chaptersFilePath) {
          // Fallback structure if chapters.js is missing
          return [{
            id: "chapter_1",
            name: "Local Storage",
            story: "Master local storage management in Red Hat Enterprise Linux.",
            challenges: await this.getChallengesByChapterId("chapter_1")
          }];
        }
        
        // Dynamically import chapters.js as ES module
        const fileUrl = `file://${chaptersFilePath}?t=${Date.now()}`;
        const chaptersModule = await import(fileUrl);
        const baseChapters = chaptersModule.default || chaptersModule;
        
        if (!Array.isArray(baseChapters)) {
          console.error('chapters.js should export an array');
          return [];
        }

        // Attach challenges to each chapter
        const updatedChapters = [];
        for (const chapter of baseChapters) {
          const challenges = await this.getChallengesByChapterId(chapter.id);
          updatedChapters.push({
            ...chapter,
            challenges: challenges
          });
        }

        console.log(`Loaded ${updatedChapters.length} chapters with dynamic challenges`);
        return updatedChapters;
      } catch (error) {
        console.error('Error loading chapters:', error);
        return [];
      }
    });
  }

  // Load all challenges for a given chapter ID
  async getChallengesByChapterId(chapterId) {
    return await this.getFromCache(`challenges_${chapterId}`, async () => {
      const challenges = [];
      // Map chapter IDs to their directory structure
      const chapterDirectoryMap = {
        'chapter_1': 'chapters/chapter1',
        'chapter_2': 'chapters/chapter2',
        'chapter_3': 'chapters/chapter3'
      };

      const challengesDir = chapterDirectoryMap[chapterId] || `chapters/${chapterId}`;
      const challengesPath = path.join(this.dataPath, challengesDir, 'challenges');
      
      try {
        if (!fs.existsSync(challengesPath)) {
          console.warn(`Challenges directory not found: ${challengesPath}`);
          return [];
        }
        
        const files = fs.readdirSync(challengesPath);
        
        for (const file of files) {
          if (file.endsWith('.js') && file.startsWith('challenge_')) {
            try {
              const challengeFilePath = path.join(challengesPath, file);
              const fileUrl = `file://${challengeFilePath}?t=${Date.now()}`;
              const challengeModule = await import(fileUrl);
              const challengeData = challengeModule.default || challengeModule;
              
              if (challengeData && challengeData.id) {
                challenges.push(challengeData);
              }
            } catch (error) {
              console.warn(`Could not load challenge ${file}:`, error.message);
            }
          }
        }
        
        // Sort challenges by numeric part of their ID
        challenges.sort((a, b) => {
          const aNum = parseInt((a.id || '').split('_')[1]) || 0;
          const bNum = parseInt((b.id || '').split('_')[1]) || 0;
          return aNum - bNum;
        });
        
        console.log(`Loaded ${challenges.length} challenges for ${chapterId}:`, challenges.map(c => c.id));
        return challenges;
      } catch (error) {
        console.error(`Error loading challenges for ${chapterId}:`, error);
        return [];
      }
    });
  }

  // Get a chapter by its ID
  async getChapterById(chapterId) {
    const chapters = await this.getAllChapters();
    return chapters.find(chapter => chapter.id === chapterId) || null;
  }

  // Get a challenge by its ID, searching all chapters
  async getChallengeById(challengeId) {
    const chapters = await this.getAllChapters();
    for (const chapter of chapters) {
      const challenge = chapter.challenges.find(ch => ch.id === challengeId);
      if (challenge) return challenge;
    }
    return null;
  }

  // Get all missions (options) for a challenge
  async getMissionsByChallengeId(challengeId) {
    const challenge = await this.getChallengeById(challengeId);
    return challenge?.options || [];
  }

  // Get a specific mission by challenge and mission ID
  async getMissionById(challengeId, missionId) {
    const missions = await this.getMissionsByChallengeId(challengeId);
    return missions.find(mission => mission.id === missionId) || null;
  }

  // Evaluate a user's mission attempt and return result, XP, and hints
  async processMissionAttempt({ input, challengeId, missionId, tries, xp }) {
    try {
      const mission = await this.getMissionById(challengeId, missionId);
      console.log('Mission attempt:', { challengeId, missionId, input: input?.substring(0, 50) });
      if (!mission) {
        console.error('Mission not found:', challengeId, missionId);
        return {
          success: false,
          output: "Mission not found",
          xp: xp
        };
      }

      const userInput = input.trim();
      const correctCommand = mission.solution;
      console.log('Comparing:', { userInput, correctCommand });
      
      if (userInput === correctCommand) {
        // Correct answer: award XP
        const xpGain = Math.max(10 - tries, 1);
        return {
          success: true,
          output: `✅ Correct! You earned ${xpGain} XP.`,
          xp: xp + xpGain,
          xpDelta: xpGain,
          complete: true,
          missionExtras: {
            output: mission.output,
            aspects: mission.aspects,
            options: mission.options,
            outro: mission.outro
          }
        };
      } else {
        // Incorrect answer: provide hint and apply XP penalty
        const hintIndex = Math.min(tries, (mission.hints?.length || 1) - 1);
        const hint = mission.hints?.[hintIndex] || "Check the command syntax and try again.";
        const xpPenalty = Math.min(5, xp);
        return {
          success: false,
          output: "❌ Incorrect command.",
          hint: hint,
          xp: Math.max(0, xp - xpPenalty),
          xpDelta: -xpPenalty
        };
      }
    } catch (error) {
      console.error('Error processing mission attempt:', error);
      return {
        success: false,
        output: "Error processing your command. Please try again.",
        xp: xp
      };
    }
  }

  // Clear the in-memory cache (useful for development)
  clearCache() {
    this.cache.clear();
    console.log('RHCSA Game Service cache cleared');
  }
}

// Singleton instance
const gameService = new RHCSAGameService();

// Export service methods
export const getAllChapters = async () => await gameService.getAllChapters();
export const getChapterById = async (chapterId) => await gameService.getChapterById(chapterId);
export const getChallengesByChapterId = async (chapterId) => await gameService.getChallengesByChapterId(chapterId);
export const getChallengeById = async (challengeId) => await gameService.getChallengeById(challengeId);
export const getMissionsByChallengeId = async (challengeId) => await gameService.getMissionsByChallengeId(challengeId);
export const getMissionById = async (challengeId, missionId) => await gameService.getMissionById(challengeId, missionId);
export const processMissionAttempt = async (attemptData) => await gameService.processMissionAttempt(attemptData);

// Development utility to clear cache
export const clearCache = () => gameService.clearCache();

export default gameService;
