import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import Intro from './Intro';
import Chapters from './Chapters';
import Challenges from './Challenges';
import Missions from './Missions';
import MissionPlay from './MissionPlay';

export default function TerminalChat() {
  // Game state: tracks current stage, selected chapter/challenge/mission, loading/error flags
  const [gameState, setGameState] = useState({
    stage: 'intro',
    chapterId: null,
    challengeId: null,
    mission: null,
    isLoading: false,
    error: null
  });

  // Player stats: XP, tries, commands, level, achievements, etc.
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

  // UI state: scroll button, focus, sound, typing speed, etc.
  const [uiState, setUiState] = useState({
    showScrollButton: false,
    terminalFocused: true,
    lastActivity: Date.now(),
    soundEnabled: true,
    typingSpeed: 'normal'
  });

  // Refs for scrolling, input, bottom anchor, typing skip, and game start time
  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const skipCurrentTypingRef = useRef(null);
  const gameStartTime = useRef(Date.now());
  const activityTimer = useRef(null);

  // Typing assistant state (for animated typing)
  const [typingAssistant, setTypingAssistant] = useState(false);

  // Current time for clock display
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    // Update clock every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Track user activity and terminal focus
  useEffect(() => {
    const updateActivity = () => {
      setUiState(prev => ({
        ...prev,
        lastActivity: Date.now(),
        terminalFocused: true
      }));
    };

    // Mark terminal as unfocused after 30s of inactivity
    const handleActivity = () => {
      updateActivity();
      clearTimeout(activityTimer.current);
      activityTimer.current = setTimeout(() => {
        setUiState(prev => ({ ...prev, terminalFocused: false }));
      }, 30000);
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

  // Cleanup on unmount: clear timers and skip typing if needed
  useEffect(() => {
    return () => {
      clearTimeout(activityTimer.current);
      if (skipCurrentTypingRef.current) {
        skipCurrentTypingRef.current();
      }
      console.log('TerminalChat cleanup executed');
    };
  }, []);

  // Track time spent in session (update every second)
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

  // Update player stats and handle level up/achievements
  const updatePlayerStats = useCallback((updates) => {
    setPlayerStats(prev => {
      const newStats = { ...prev, ...updates };
      const newLevel = calculateLevel(newStats.xp);
      if (newLevel > prev.level) {
        newStats.level = newLevel;
        if (!newStats.achievements.includes(`level_${newLevel}`)) {
          newStats.achievements = [...newStats.achievements, `level_${newLevel}`];
        }
      }
      return newStats;
    });
  }, [calculateLevel]);

  // Set typing assistant state
  const handleTypingAssistantChange = useCallback((isTyping) => {
    setTypingAssistant(isTyping);
  }, []);

  // Navigate to a new stage (e.g., chapters, challenges, missions, play)
  const navigateToStage = useCallback((newStage, additionalState = {}) => {
    if (skipCurrentTypingRef.current) {
      skipCurrentTypingRef.current();
    }
    setTypingAssistant(false);
    setGameState(prev => ({
      ...prev,
      stage: newStage,
      isLoading: false,
      error: null,
      ...additionalState
    }));
    // Scroll to top after navigation
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }, 50);
  }, []);

  // Handlers for progressing through stages
  const handleIntroContinue = useCallback(() => {
    navigateToStage('chapters');
  }, [navigateToStage]);

  const handleSelectChapter = useCallback((id) => {
    if (gameState.isLoading) return;
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
  }, [navigateToStage, gameState.isLoading]);

  const handleSelectChallenge = useCallback((id) => {
    if (gameState.isLoading) return;
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
  }, [navigateToStage, gameState.isLoading]);

  const handleSelectMission = useCallback((missionObj) => {
    if (gameState.isLoading) return;
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
  }, [navigateToStage, updatePlayerStats, playerStats.totalCommands, gameState.isLoading]);

  // Handle mission completion: update stats, go back to missions
  const handleMissionComplete = useCallback((success = false, hintsUsed = 0) => {
    const updates = {};
    if (success) {
      updates.correctCommands = playerStats.correctCommands + 1;
      if (playerStats.correctCommands === 0) {
        updates.achievements = [...playerStats.achievements, 'first_success'];
      }
    }
    if (hintsUsed > 0) {
      updates.hintsUsed = playerStats.hintsUsed + hintsUsed;
    }
    updatePlayerStats(updates);
    setGameState(prev => {
      if (prev.stage !== 'missions') {
        return {
          ...prev,
          stage: 'missions',
          isLoading: false,
          error: null
        };
      }
      return prev;
    });
    if (skipCurrentTypingRef.current) {
      skipCurrentTypingRef.current();
    }
    setTypingAssistant(false);
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }, 100);
  }, [updatePlayerStats, playerStats.correctCommands, playerStats.hintsUsed, playerStats.achievements]);

  // Show/hide scroll-to-bottom button based on scroll position
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 120;
    setUiState(prev => ({
      ...prev,
      showScrollButton: !isNearBottom
    }));
  }, []);

  // Scroll to bottom of terminal
  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    setUiState(prev => ({ ...prev, showScrollButton: false }));
  }, []);

  // Go back to previous stage (Esc shortcut)
  const handleGoBack = useCallback(() => {
    switch (gameState.stage) {
      case 'challenges':
        navigateToStage('chapters');
        break;
      case 'missions':
        navigateToStage('challenges', { chapterId: gameState.chapterId, challengeId: null });
        break;
      case 'play':
        navigateToStage('missions', { mission: null });
        break;
      default:
        break;
    }
  }, [gameState.stage, gameState.chapterId, navigateToStage]);

  // Go to chapters (Ctrl+H shortcut)
  const handleGoToChapters = useCallback(() => {
    if (gameState.stage !== 'intro') {
      navigateToStage('chapters', { chapterId: null, challengeId: null, mission: null });
    }
  }, [gameState.stage, navigateToStage]);

  // Keyboard shortcuts: Ctrl+H (chapters), Ctrl+R (reload), Ctrl+M (sound), Esc (back)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'h':
            e.preventDefault();
            handleGoToChapters();
            break;
          case 'r':
            e.preventDefault();
            window.location.reload();
            break;
          case 'm':
            e.preventDefault();
            setUiState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
            break;
        }
      }
      if (e.key === 'Escape') {
        handleGoBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGoBack, handleGoToChapters]);

  // Format seconds as MM:SS for session timer
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Format current time for clock display
  const formatCurrentTime = useCallback(() => {
    return currentTime.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }, [currentTime]);

  // Calculate success rate as a percentage
  const progressPercentage = useMemo(() => {
    if (playerStats.totalCommands === 0) return 0;
    return Math.round((playerStats.correctCommands / playerStats.totalCommands) * 100);
  }, [playerStats.correctCommands, playerStats.totalCommands]);

  // Skip typing animation on global interaction if typing assistant is active
  const handleGlobalInteraction = useCallback((e) => {
    if (typingAssistant && skipCurrentTypingRef.current) {
      skipCurrentTypingRef.current();
    }
  }, [typingAssistant]);

  // Common props for child components
  const commonProps = useMemo(() => ({
    skipCurrentTypingRef,
    setTypingAssistant: handleTypingAssistantChange,
    typingSpeed: uiState.typingSpeed,
    enableSounds: uiState.soundEnabled
  }), [handleTypingAssistantChange, uiState.typingSpeed, uiState.soundEnabled]);

  return (
    <div className="bg-black text-green-400 font-mono h-screen flex flex-col overflow-hidden relative min-h-0">
      {/* Top bar: terminal status, stage, stats, clock */}
      <div className="bg-gray-900 border-b border-green-600 px-4 py-2 flex items-center justify-between relative z-40">
        <div className="flex items-center space-x-4">
          {/* Terminal "traffic lights" */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full opacity-60"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-60"></div>
            <div className={`w-3 h-3 rounded-full ${uiState.terminalFocused ? 'bg-green-500' : 'bg-green-500 opacity-60'}`}></div>
          </div>
          <span className="text-green-300 font-bold">
            RHCSA Training Terminal — {gameState.stage.charAt(0).toUpperCase() + gameState.stage.slice(1)}
          </span>
          {/* Success rate */}
          {playerStats.totalCommands > 0 && (
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <span className="text-green-500">Success Rate:</span>
              <span className="text-green-300 font-bold">{progressPercentage}%</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4 text-sm">
          {/* Session timer */}
          <span className="hidden sm:block text-green-500">
            Session: {formatTime(playerStats.timeSpent)}
          </span>
          {/* Current time */}
          <span className="text-green-400">
            {formatCurrentTime()}
          </span>
        </div>
      </div>
      {/* Stats and controls bar */}
      <div className="bg-gray-800 border-b border-green-600 px-4 py-2 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-6">
          {/* XP, Level, Tries, Achievements */}
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
        <div className="flex items-center space-x-3">
          {/* Navigation buttons */}
          {gameState.stage !== 'intro' && (
            <>
              {(gameState.stage === 'challenges' || gameState.stage === 'missions' || gameState.stage === 'play') && (
                <button
                  onClick={handleGoBack}
                  className="text-xs px-3 py-1 rounded bg-blue-700 text-blue-100 hover:bg-blue-600 transition-colors flex items-center space-x-1"
                  title="Go Back (Esc)"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back</span>
                </button>
              )}
              <button
                onClick={handleGoToChapters}
                className="text-xs px-3 py-1 rounded bg-green-700 text-green-100 hover:bg-green-600 transition-colors flex items-center space-x-1"
                title="Go to Chapters (Ctrl+H)"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5v4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v4" />
                </svg>
                <span>Chapters</span>
              </button>
            </>
          )}
          {/* Sound toggle */}
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
          {/* Typing speed selector */}
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
      {/* Main terminal area */}
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
        {/* Loading spinner */}
        {gameState.isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-3 text-green-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
              <span>Loading...</span>
            </div>
          </div>
        )}
        {/* Error message */}
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
        {/* Main content: render stage component */}
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
        {/* Bottom anchor for scroll-to-bottom */}
        <div ref={bottomRef} />
      </div>
      {/* Scroll-to-bottom floating button */}
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
      {/* Keyboard shortcuts hint */}
      {!typingAssistant && (
        <div className="absolute bottom-2 left-4 text-green-600 text-xs opacity-50">
          Shortcuts: Ctrl+H (Chapters) | Ctrl+M (Sound) | Ctrl+R (Restart) | Esc (Back)
        </div>
      )}
    </div>
  );
}
