// components/TerminalChat.jsx

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import Intro from './Intro';
import Chapters from './Chapters';
import Challenges from './Challenges';
import Missions from './Missions';
import MissionPlay from './MissionPlay';

/**
 * Enterprise-grade RHCSA Game Terminal Controller
 * Features: Enhanced UI, performance optimization, accessibility, error handling
 */
export default function TerminalChat() {
  // Game flow state with enhanced structure
  const [gameState, setGameState] = useState({
    stage: 'intro', // 'intro', 'chapters', 'challenges', 'missions', 'play'
    chapterId: null,
    challengeId: null,
    mission: null,
    isLoading: false,
    error: null
  });

  // Player statistics with enhanced tracking
  const [playerStats, setPlayerStats] = useState({
    xp: 0,
    tries: 0,
    totalCommands: 0,
    correctCommands: 0,
    hintsUsed: 0,
    timeSpent: 0,
    level: 1,
    achievements: []
  });

  // UI state management
  const [uiState, setUiState] = useState({
    showScrollButton: false,
    terminalFocused: true,
    lastActivity: Date.now(),
    soundEnabled: true,
    typingSpeed: 'normal'
  });

  // Enhanced refs for better control
  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const skipCurrentTypingRef = useRef(null);
  const gameStartTime = useRef(Date.now());
  const activityTimer = useRef(null);

  // Centralized typing assistant state
  const [typingAssistant, setTypingAssistant] = useState(false);

  // Performance: Memoized current time for consistent display
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced activity tracking
  useEffect(() => {
    const updateActivity = () => {
      setUiState(prev => ({
        ...prev,
        lastActivity: Date.now(),
        terminalFocused: true
      }));
    };

    const handleActivity = () => {
      updateActivity();
      clearTimeout(activityTimer.current);
      activityTimer.current = setTimeout(() => {
        setUiState(prev => ({ ...prev, terminalFocused: false }));
      }, 30000); // 30 seconds of inactivity
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      clearTimeout(activityTimer.current);
    };
  }, []);

  // Enhanced game time tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setPlayerStats(prev => ({
        ...prev,
        timeSpent: Math.floor((Date.now() - gameStartTime.current) / 1000)
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate player level based on XP
  const calculateLevel = useCallback((xp) => {
    return Math.floor(xp / 100) + 1;
  }, []);

  // Enhanced XP system with level progression
  const updatePlayerStats = useCallback((updates) => {
    setPlayerStats(prev => {
      const newStats = { ...prev, ...updates };
      const newLevel = calculateLevel(newStats.xp);
      
      // Level up achievement
      if (newLevel > prev.level) {
        newStats.level = newLevel;
        if (!newStats.achievements.includes(`level_${newLevel}`)) {
          newStats.achievements = [...newStats.achievements, `level_${newLevel}`];
        }
      }

      return newStats;
    });
  }, [calculateLevel]);

  // This is called by all subcomponents' TerminalMessages via prop
  const handleTypingAssistantChange = useCallback((isTyping) => {
    setTypingAssistant(isTyping);
  }, []);

  // Enhanced stage navigation with loading states
  const navigateToStage = useCallback((newStage, additionalState = {}) => {
    setGameState(prev => ({
      ...prev,
      stage: newStage,
      isLoading: false,
      error: null,
      ...additionalState
    }));
  }, []);

  // Stage handlers with enhanced error handling
  const handleIntroContinue = useCallback(() => {
    navigateToStage('chapters');
  }, [navigateToStage]);

  const handleSelectChapter = useCallback((id) => {
    try {
      setGameState(prev => ({ ...prev, isLoading: true }));
      navigateToStage('challenges', { chapterId: id });
    } catch (error) {
      setGameState(prev => ({ 
        ...prev, 
        error: 'Failed to load chapter',
        isLoading: false 
      }));
    }
  }, [navigateToStage]);

  const handleSelectChallenge = useCallback((id) => {
    try {
      setGameState(prev => ({ ...prev, isLoading: true }));
      navigateToStage('missions', { challengeId: id });
    } catch (error) {
      setGameState(prev => ({ 
        ...prev, 
        error: 'Failed to load challenge',
        isLoading: false 
      }));
    }
  }, [navigateToStage]);

  const handleSelectMission = useCallback((missionObj) => {
    try {
      setGameState(prev => ({ ...prev, isLoading: true }));
      navigateToStage('play', { mission: missionObj });
      updatePlayerStats({ totalCommands: playerStats.totalCommands + 1 });
    } catch (error) {
      setGameState(prev => ({ 
        ...prev, 
        error: 'Failed to load mission',
        isLoading: false 
      }));
    }
  }, [navigateToStage, updatePlayerStats, playerStats.totalCommands]);

  const handleMissionComplete = useCallback((success = false, hintsUsed = 0) => {
    const updates = {};
    
    if (success) {
      updates.correctCommands = playerStats.correctCommands + 1;
      // Achievement for first correct command
      if (playerStats.correctCommands === 0) {
        updates.achievements = [...playerStats.achievements, 'first_success'];
      }
    }
    
    if (hintsUsed > 0) {
      updates.hintsUsed = playerStats.hintsUsed + hintsUsed;
    }

    updatePlayerStats(updates);
    navigateToStage('missions', { mission: null });
  }, [navigateToStage, updatePlayerStats, playerStats.correctCommands, playerStats.hintsUsed, playerStats.achievements]);

  // Enhanced scroll management
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 120;
    
    setUiState(prev => ({
      ...prev,
      showScrollButton: !isNearBottom
    }));
  }, []);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    setUiState(prev => ({ ...prev, showScrollButton: false }));
  }, []);

  // Enhanced keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Global shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'h': // Go to chapters
            e.preventDefault();
            if (gameState.stage !== 'intro') {
              navigateToStage('chapters');
            }
            break;
          case 'r': // Restart current stage
            e.preventDefault();
            window.location.reload();
            break;
          case 'm': // Toggle sound
            e.preventDefault();
            setUiState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
            break;
        }
      }

      // Escape key handling
      if (e.key === 'Escape') {
        if (gameState.stage === 'play') {
          navigateToStage('missions', { mission: null });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.stage, navigateToStage]);

  // Memoized time formatters
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const formatCurrentTime = useCallback(() => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }, [currentTime]);

  // Progress calculation
  const progressPercentage = useMemo(() => {
    if (playerStats.totalCommands === 0) return 0;
    return Math.round((playerStats.correctCommands / playerStats.totalCommands) * 100);
  }, [playerStats.correctCommands, playerStats.totalCommands]);

  // Handle global click/touch for typing skip
  const handleGlobalInteraction = useCallback((e) => {
    if (typingAssistant && skipCurrentTypingRef.current) {
      skipCurrentTypingRef.current();
    }
  }, [typingAssistant]);

  // Component props for consistency
  const commonProps = useMemo(() => ({
    skipCurrentTypingRef,
    setTypingAssistant: handleTypingAssistantChange,
    typingSpeed: uiState.typingSpeed,
    enableSounds: uiState.soundEnabled
  }), [handleTypingAssistantChange, uiState.typingSpeed, uiState.soundEnabled]);

  return (
    <div className="bg-black text-green-400 font-mono h-screen flex flex-col overflow-hidden relative min-h-0">
      {/* Enhanced Terminal Header */}
      <div className="bg-gray-900 border-b border-green-600 px-4 py-2 flex items-center justify-between relative z-40">
        <div className="flex items-center space-x-4">
          {/* Traffic Lights */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full opacity-60"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-60"></div>
            <div className={`w-3 h-3 rounded-full ${uiState.terminalFocused ? 'bg-green-500' : 'bg-green-500 opacity-60'}`}></div>
          </div>
          
          {/* Terminal Title */}
          <span className="text-green-300 font-bold">
            RHCSA Training Terminal — {gameState.stage.charAt(0).toUpperCase() + gameState.stage.slice(1)}
          </span>
          
          {/* Progress Indicator */}
          {playerStats.totalCommands > 0 && (
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <span className="text-green-500">Success Rate:</span>
              <span className="text-green-300 font-bold">{progressPercentage}%</span>
            </div>
          )}
        </div>
        
        {/* Time and Status */}
        <div className="flex items-center space-x-4 text-sm">
          <span className="hidden sm:block text-green-500">
            Session: {formatTime(playerStats.timeSpent)}
          </span>
          <span className="text-green-400">
            {formatCurrentTime()}
          </span>
        </div>
      </div>

      {/* Enhanced Stats Panel */}
      <div className="bg-gray-800 border-b border-green-600 px-4 py-2 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-green-500">XP:</span>
            <span className="text-green-300 font-bold">{playerStats.xp}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500">Level:</span>
            <span className="text-green-300 font-bold">{playerStats.level}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500">Tries:</span>
            <span className="text-green-300 font-bold">{playerStats.tries}</span>
          </div>
          {playerStats.achievements.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">🏆</span>
              <span className="text-yellow-400">{playerStats.achievements.length}</span>
            </div>
          )}
        </div>
        
        {/* Settings */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setUiState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              uiState.soundEnabled 
                ? 'bg-green-700 text-green-100 hover:bg-green-600' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            title="Toggle Sound"
          >
            {uiState.soundEnabled ? '🔊' : '🔇'}
          </button>
          
          <select
            value={uiState.typingSpeed}
            onChange={(e) => setUiState(prev => ({ ...prev, typingSpeed: e.target.value }))}
            className="bg-gray-700 text-green-300 text-xs px-2 py-1 rounded border border-green-600 focus:outline-none focus:border-green-400"
            title="Typing Speed"
          >
            <option value="slow">Slow</option>
            <option value="normal">Normal</option>
            <option value="fast">Fast</option>
            <option value="instant">Instant</option>
          </select>
        </div>
      </div>

      {/* Main Terminal Content */}
      <div
        className="flex-1 overflow-y-auto text-green-400 px-4 py-2 min-h-0 scroll-smooth"
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onClick={handleGlobalInteraction}
        onTouchStart={handleGlobalInteraction}
        style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
          lineHeight: "1.6"
        }}
      >
        {/* Loading State */}
        {gameState.isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-3 text-green-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
              <span>Loading...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {gameState.error && (
          <div className="bg-red-900/20 border border-red-600 rounded p-4 my-4">
            <div className="text-red-400 font-bold">Error</div>
            <div className="text-red-300 text-sm mt-1">{gameState.error}</div>
            <button 
              onClick={() => setGameState(prev => ({ ...prev, error: null }))}
              className="mt-2 bg-red-800 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Stage Components */}
        {!gameState.isLoading && !gameState.error && (
          <>
            {gameState.stage === 'intro' && (
              <Intro
                onContinue={handleIntroContinue}
                {...commonProps}
              />
            )}
            {gameState.stage === 'chapters' && (
              <Chapters
                onSelectChapter={handleSelectChapter}
                {...commonProps}
              />
            )}
            {gameState.stage === 'challenges' && gameState.chapterId && (
              <Challenges
                chapterId={gameState.chapterId}
                onSelectChallenge={handleSelectChallenge}
                {...commonProps}
              />
            )}
            {gameState.stage === 'missions' && gameState.challengeId && (
              <Missions
                challengeId={gameState.challengeId}
                onSelectMission={handleSelectMission}
                {...commonProps}
              />
            )}
            {gameState.stage === 'play' && gameState.mission && (
              <MissionPlay
                mission={gameState.mission}
                challengeId={gameState.challengeId}
                xp={playerStats.xp}
                tries={playerStats.tries}
                setXp={(xp) => updatePlayerStats({ xp })}
                setTries={(tries) => updatePlayerStats({ tries })}
                onComplete={handleMissionComplete}
                inputRef={inputRef}
                bottomRef={bottomRef}
                {...commonProps}
              />
            )}
          </>
        )}
        
        <div ref={bottomRef} />
      </div>

      {/* Enhanced Scroll to Bottom Button */}
      {uiState.showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-6 right-6 bg-green-600 hover:bg-green-500 text-black font-bold p-3 rounded-full shadow-lg z-20 transition-all duration-200 transform hover:scale-110"
          title="Scroll to bottom"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      )}

      {/* Keyboard Shortcuts Hint */}
      {!typingAssistant && (
        <div className="absolute bottom-2 left-4 text-green-600 text-xs opacity-50">
          Shortcuts: Ctrl+H (Home) | Ctrl+M (Sound) | Ctrl+R (Restart) | Esc (Back)
        </div>
      )}
    </div>
  );
}