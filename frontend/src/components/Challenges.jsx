// components/Challenges.jsx - FIXED VERSION

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import TerminalMessages from './TerminalMessages';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Enterprise-grade challenge selection component  
 * Features: Unique intro content, enhanced UI, no content duplication
 */
export default function Challenges({ 
  chapterId, 
  onSelectChallenge, 
  skipCurrentTypingRef, 
  setTypingAssistant,
  typingSpeed = 'normal',
  enableSounds = true 
}) {
  const [challenges, setChallenges] = useState([]);
  const [messages, setMessages] = useState([]);
  const [challengeState, setChallengeState] = useState({
    loading: true,
    error: null,
    allMessagesRevealed: false,
    selectedChallenge: null,
    hoveredChallenge: null,
    chapterInfo: null
  });
  
  const [typingAssistant] = useState(true);
  const scrollContainerRef = useRef(null);
  const bottomRef = useRef(null);

  // Enhanced challenges loading with unique content
  useEffect(() => {
    if (!chapterId) return;

    const loadChallenges = async () => {
      try {
        setChallengeState(prev => ({ ...prev, loading: true, error: null }));

        const response = await axios.get(`${API_BASE_URL}/rhcsa-game/challenges/${chapterId}`, {
          timeout: 8000
        });

        // FIX: Properly handle nested response structure
        console.log('Raw challenges response:', response.data);
        
        let challengesData;
        if (response.data.challenges) {
          // Backend returns { challenges: [...], chapterId: ..., count: X, timestamp: ... }
          challengesData = response.data.challenges;
        } else if (Array.isArray(response.data)) {
          // Backend returns array directly
          challengesData = response.data;
        } else {
          // Backend returns single object - wrap in array
          challengesData = [response.data];
        }

        console.log('Processed challenges:', challengesData);
        setChallenges(challengesData);

        // Create UNIQUE welcome message for challenges (not recycling story content)
        let challengeWelcome;
        if (challengesData.length > 0) {
          const challengeList = challengesData.map((ch, idx) => 
            `${idx + 1}. ${ch.title || ch.name || 'Unnamed Challenge'} - ${getChallengeDifficulty(ch.title || ch.name || '')}`
          ).join('\n');

          const chapterName = getChapterName(chapterId);
          
          challengeWelcome = `🎯 ${chapterName} - Challenge Selection

You have successfully entered the ${chapterName} training module. 

The challenges ahead will test your practical Linux administration skills through hands-on scenarios. Each challenge is designed to simulate real-world situations you'll encounter as a Red Hat Certified System Administrator.

Available Challenges:

${challengeList}

⚡ Challenge Guidelines:
• Each challenge contains multiple hands-on missions
• Complete missions in sequence to build your skills
• Use hints if you get stuck - learning is the goal
• Your progress is automatically tracked

Choose your first challenge wisely. Each builds upon fundamental concepts while introducing new complexities.

Remember: In the real world, there's no undo button. Practice makes perfect! 🚀`;
        } else {
          challengeWelcome = `🔧 Challenge Preparation

The ${getChapterName(chapterId)} module is currently being prepared.

While you wait, ensure your environment is ready:
• Terminal access verified
• Basic Linux commands familiar
• Learning mindset activated

Challenges will be available shortly. Check back soon! 🔄`;
        }

        setMessages([{
          role: 'assistant',
          content: challengeWelcome,
          timestamp: new Date().toISOString(),
          id: 'challenges-welcome'
        }]);

        setChallengeState(prev => ({ 
          ...prev, 
          loading: false, 
          chapterInfo: { name: getChapterName(chapterId), id: chapterId }
        }));
        
        if (setTypingAssistant) {
          setTypingAssistant(true);
        }

      } catch (error) {
        console.error('Failed to load challenges:', error);
        
        let errorMessage = 'Failed to load challenges for this chapter.';
        if (error.code === 'ECONNABORTED') {
          errorMessage = 'Connection timeout. Please check your internet connection.';
        }

        setChallengeState(prev => ({ 
          ...prev, 
          loading: false, 
          error: errorMessage 
        }));

        // Fallback content with unique message
        const fallbackMessage = `⚠️ Connection Error - Limited Challenge Content

Unable to load full challenge data from server. 

Offline training content available:
• Basic command-line exercises
• Essential administration tasks
• Core concept reviews

Connect to the internet for the complete interactive challenge experience.

You can still practice with available offline content.`;

        setMessages([{
          role: 'assistant',
          content: fallbackMessage,
          timestamp: new Date().toISOString(),
          id: 'challenges-fallback'
        }]);

        if (setTypingAssistant) {
          setTypingAssistant(true);
        }
      }
    };

    loadChallenges();
  }, [chapterId, setTypingAssistant]);

  // Helper functions for unique content generation
  const getChapterName = (id) => {
    const chapterNames = {
      'chapter_1': 'Local Storage Management',
      'chapter_2': 'Network Configuration', 
      'chapter_3': 'User Management',
      'chapter_4': 'Security & Permissions',
      'chapter_5': 'System Services'
    };
    return chapterNames[id] || 'Advanced Linux Administration';
  };

  const getChallengeDifficulty = (title) => {
    if (!title) return 'Beginner Level';
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('basic') || lowerTitle.includes('create')) {
      return 'Beginner Level';
    } else if (lowerTitle.includes('configure') || lowerTitle.includes('manage')) {
      return 'Intermediate Level';
    } else {
      return 'Advanced Level';
    }
  };

  // Handle typing completion
  const handleAssistantDone = useCallback(() => {
    if (setTypingAssistant) {
      setTypingAssistant(false);
    }
    setChallengeState(prev => ({ ...prev, allMessagesRevealed: true }));
  }, [setTypingAssistant]);

  // Enhanced challenge selection
  const handleChallengeSelect = useCallback(async (challengeId) => {
    setChallengeState(prev => ({ ...prev, selectedChallenge: challengeId }));
    
    setTimeout(() => {
      if (onSelectChallenge) {
        onSelectChallenge(challengeId);
      }
    }, 150);
  }, [onSelectChallenge]);

  // Keyboard navigation
  useEffect(() => {
    if (!challengeState.allMessagesRevealed || !Array.isArray(challenges)) return;

    const handleKeyDown = (e) => {
      if (challenges.length === 0) return;

      const currentIndex = challenges.findIndex(ch => ch.id === challengeState.hoveredChallenge);
      
      switch (e.key) {
        case 'ArrowDown':
        case 'j':
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % challenges.length;
          setChallengeState(prev => ({ 
            ...prev, 
            hoveredChallenge: challenges[nextIndex].id 
          }));
          break;
          
        case 'ArrowUp':
        case 'k':
          e.preventDefault();
          const prevIndex = currentIndex <= 0 ? challenges.length - 1 : currentIndex - 1;
          setChallengeState(prev => ({ 
            ...prev, 
            hoveredChallenge: challenges[prevIndex].id 
          }));
          break;
          
        case 'Enter':
          e.preventDefault();
          if (challengeState.hoveredChallenge) {
            handleChallengeSelect(challengeState.hoveredChallenge);
          } else if (challenges.length > 0) {
            handleChallengeSelect(challenges[0].id);
          }
          break;
          
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          e.preventDefault();
          const challengeIndex = parseInt(e.key) - 1;
          if (challenges[challengeIndex]) {
            handleChallengeSelect(challenges[challengeIndex].id);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [challengeState.allMessagesRevealed, challengeState.hoveredChallenge, challenges, handleChallengeSelect]);

  // FIX: Memoized challenge statistics with enhanced safety checks
  const challengeStats = useMemo(() => {
    if (!Array.isArray(challenges)) return [];
    
    return challenges.map(challenge => {
      // Safety checks for all properties
      const title = challenge?.title || challenge?.name || 'Unnamed Challenge';
      const briefing = challenge?.briefing || challenge?.story || 'Hands-on practical Linux administration challenge with real-world scenarios.';
      
      return {
        ...challenge,
        title, // Ensure title is always defined
        briefing, // Ensure briefing is always defined
        difficulty: getChallengeDifficulty(title),
        estimatedTime: title.toLowerCase().includes('basic') ? '30-45 min' :
                      title.toLowerCase().includes('configure') ? '45-60 min' : '60-90 min',
        missions: 5 // Estimated mission count
      };
    });
  }, [challenges]);

  return (
    <div className="challenges-container w-full max-w-none">
      {/* Enhanced Header */}
      <div className="border border-green-600 rounded-lg p-4 mb-6 bg-gray-900/30">
        <div className="text-center">
          <div className="text-green-300 text-lg font-bold mb-2">
            ⚔️ {challengeState.chapterInfo?.name || 'Chapter'} Challenges ⚔️
          </div>
          <div className="text-green-500 text-sm">
            Hands-on scenarios to master your Linux administration skills
          </div>
        </div>
      </div>

      {/* Loading State */}
      {challengeState.loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
            <div className="text-green-500 animate-pulse">
              Loading challenges...
            </div>
            <div className="text-green-600 text-sm mt-2">
              Preparing hands-on scenarios
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {challengeState.error && (
        <div className="bg-red-900/20 border border-red-600 rounded-lg p-6 my-6">
          <div className="flex items-start space-x-3">
            <div className="text-red-500 text-xl">⚠️</div>
            <div className="flex-1">
              <div className="text-red-400 font-bold text-lg mb-2">
                Challenge Loading Error
              </div>
              <div className="text-red-300 mb-4">
                {challengeState.error}
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors text-sm font-bold"
              >
                🔄 Retry Loading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!challengeState.loading && (
        <>
          <TerminalMessages
            messages={messages}
            typingAssistant={typingAssistant}
            setTypingAssistant={setTypingAssistant}
            onAssistantDone={handleAssistantDone}
            scrollContainerRef={scrollContainerRef}
            bottomRef={bottomRef}
            headerOffset={0}
            skipCurrentTypingRef={skipCurrentTypingRef}
            typingSpeed={typingSpeed}
            enableSounds={enableSounds}
            showTimestamps={false}
            className="challenges-messages"
          />

          {/* Enhanced Challenge Selection */}
          {challengeState.allMessagesRevealed && challengeStats.length > 0 && (
            <div className="mt-8">
              {/* Selection Instructions */}
              <div className="mb-6 p-4 bg-green-900/20 border border-green-600 rounded-lg">
                <div className="text-green-300 font-bold mb-2">⚔️ Challenge Selection</div>
                <div className="text-green-400 text-sm space-y-1">
                  <div>• Select a challenge to begin hands-on training</div>
                  <div>• Each challenge contains multiple practical missions</div>
                  <div>• Use keyboard shortcuts for faster navigation</div>
                </div>
              </div>

              {/* Challenge Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {challengeStats.map((challenge, index) => {
                  const isSelected = challengeState.selectedChallenge === challenge.id;
                  const isHovered = challengeState.hoveredChallenge === challenge.id;
                  
                  return (
                    <div
                      key={challenge.id || `challenge-${index}`}
                      className={`
                        group relative border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 transform
                        ${isSelected 
                          ? 'border-green-400 bg-green-900/30 scale-95' 
                          : isHovered
                          ? 'border-green-500 bg-green-900/20 shadow-lg'
                          : 'border-green-600 bg-gray-900/20 hover:border-green-500 hover:bg-green-900/10 hover:shadow-md'
                        }
                      `}
                      onClick={() => handleChallengeSelect(challenge.id)}
                      onMouseEnter={() => setChallengeState(prev => ({ 
                        ...prev, 
                        hoveredChallenge: challenge.id 
                      }))}
                      onMouseLeave={() => setChallengeState(prev => ({ 
                        ...prev, 
                        hoveredChallenge: null 
                      }))}
                    >
                      {/* Challenge Number */}
                      <div className="absolute top-3 left-3 w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>

                      {/* Loading Indicator */}
                      {isSelected && (
                        <div className="absolute top-3 right-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-400"></div>
                        </div>
                      )}

                      {/* Challenge Content */}
                      <div className="ml-12">
                        <h3 className="text-green-300 font-bold text-lg mb-2">
                          {challenge.title}
                        </h3>
                        
                        <p className="text-green-400 text-sm mb-4 leading-relaxed">
                          {challenge.briefing}
                        </p>

                        {/* Challenge Metadata */}
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-green-500">Difficulty:</span>
                            <div className={`font-bold ${
                              challenge.difficulty.includes('Beginner') ? 'text-green-400' :
                              challenge.difficulty.includes('Intermediate') ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {challenge.difficulty}
                            </div>
                          </div>
                          <div>
                            <span className="text-green-500">Est. Time:</span>
                            <div className="text-green-400 font-bold">
                              {challenge.estimatedTime}
                            </div>
                          </div>
                        </div>

                        {/* Mission Count */}
                        <div className="mt-3 text-xs">
                          <span className="text-green-500">Missions:</span>
                          <div className="text-green-400 font-bold">
                            ~{challenge.missions} practical exercises
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4 bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: isHovered ? '25%' : '0%' }}
                          />
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 rounded-lg bg-green-400 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Start */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => challenges.length > 0 && handleChallengeSelect(challenges[0].id)}
                  className="px-6 py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg transition-colors duration-200 transform hover:scale-105"
                >
                  ⚔️ Start First Challenge
                </button>
              </div>

              {/* Navigation Help */}
              <div className="mt-6 text-center text-green-600 text-xs opacity-60">
                Quick select: <kbd className="bg-gray-800 px-1 rounded">1-{challenges.length}</kbd> | 
                Navigate: <kbd className="bg-gray-800 px-1 rounded mx-1">↑↓</kbd> | 
                Select: <kbd className="bg-gray-800 px-1 rounded">Enter</kbd>
              </div>
            </div>
          )}

          {/* Empty State */}
          {challengeState.allMessagesRevealed && challenges.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚔️</div>
              <div className="text-green-500 text-xl font-bold mb-2">
                No Challenges Available
              </div>
              <div className="text-green-400 mb-6">
                Challenges for this chapter are being prepared.
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded font-bold"
              >
                🔄 Refresh Challenges
              </button>
            </div>
          )}
        </>
      )}

      <div ref={bottomRef} />
    </div>
  );
}