import { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import TerminalMessages from './TerminalMessages';

// API base URL, fallback to localhost if not set in environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function Missions({ 
  challengeId, 
  onSelectMission, 
  skipCurrentTypingRef, 
  setTypingAssistant 
}) {
  // State for challenge info, messages, loading/error, and UI state
  const [challenge, setChallenge] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [typingAssistant, setTypingAssistantState] = useState(true);
  const [allMessagesRevealed, setAllMessagesRevealed] = useState(false);
  const [loadedChallengeId, setLoadedChallengeId] = useState(null);
  
  // Refs for scrolling, aborting requests, and loading state
  const scrollContainerRef = useRef(null);
  const bottomRef = useRef(null);
  const abortControllerRef = useRef(null);
  const isLoadingRef = useRef(false);

  // Loads challenge and missions data from API
  const loadChallengeData = useCallback(async (currentChallengeId) => {
    if (isLoadingRef.current) {
      return; // Prevent duplicate loads
    }
    // Abort any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    try {
      isLoadingRef.current = true;
      setLoading(true);
      setError(null);

      // Fetch missions for the challenge
      const missionsResponse = await axios.get(
        `${API_BASE_URL}/rhcsa-game/missions/${currentChallengeId}`,
        { 
          signal: abortControllerRef.current.signal,
          timeout: 8000 
        }
      );

      // Missions data fallback handling
      const missionsData = missionsResponse.data.missions || 
                          missionsResponse.data || 
                          [];

      // Default challenge info
      const challengeInfo = {
        id: currentChallengeId,
        title: `Challenge ${currentChallengeId.split('_')[1] || '1'}`,
        briefing: 'Select a mission below to begin your hands-on training.',
        options: missionsData
      };

      // Optionally fetch challenge metadata (title, briefing)
      if (missionsData.length > 0) {
        try {
          const challengeResponse = await axios.get(
            `${API_BASE_URL}/rhcsa-game/challenge/${currentChallengeId}`,
            { 
              signal: abortControllerRef.current.signal,
              timeout: 5000 
            }
          );
          
          const challengeData = challengeResponse.data.challenge || challengeResponse.data;
          if (challengeData) {
            challengeInfo.title = challengeData.title || challengeInfo.title;
            challengeInfo.briefing = challengeData.briefing || challengeData.prompt || challengeInfo.briefing;
          }
        } catch (challengeError) {
          // Ignore challenge metadata errors, fallback to defaults
        }
      }

      setChallenge(challengeInfo);
      setLoadedChallengeId(currentChallengeId);

      // Compose welcome message for the terminal
      const welcomeMessage = `🎯 Mission Selection

${challengeInfo.briefing}

Choose your mission from the available options below. Each mission is a hands-on exercise designed to build your Linux administration skills.

📋 Mission Guidelines:
• Read each mission description carefully
• Missions build upon each other progressively  
• Use hints if you get stuck
• Practice makes perfect!

${missionsData.length > 0 ? 'Select a mission to begin:' : 'No missions are currently available for this challenge.'}`;

      setMessages([{
        role: 'assistant', 
        content: welcomeMessage,
        timestamp: new Date().toISOString(),
        id: 'mission-selection'
      }]);
      
      setTypingAssistantState(true);
      if (setTypingAssistant) {
        setTypingAssistant(true);
      }

    } catch (error) {
      // Handle abort/cancel separately
      if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
        isLoadingRef.current = false;
        setLoading(false);
        return;
      }

      // Compose error message based on error type
      let errorMessage = '⚠️ Error loading missions for this challenge.';
      if (error.response?.status === 429) {
        errorMessage = '⚠️ Too many requests. Please wait a moment before trying again.';
      } else if (error.response?.status === 404) {
        errorMessage = '⚠️ Challenge not found. Please verify the challenge exists.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = '⚠️ Connection timeout. Please check your internet connection.';
      }

      setError(errorMessage);
      setMessages([{ 
        role: 'assistant', 
        content: `${errorMessage}

If the problem persists, please check:
• Your internet connection
• That the challenge data is properly configured
• Try refreshing the page

Debug info: ${error.message}`,
        timestamp: new Date().toISOString(),
        id: 'mission-error'
      }]);
      
      setTypingAssistantState(true);
      if (setTypingAssistant) {
        setTypingAssistant(true);
      }
    } finally {
      isLoadingRef.current = false;
      setLoading(false);
    }

  }, [setTypingAssistant]);


  // Effect: Load challenge data when challengeId changes
  useEffect(() => {
    if (!challengeId) return;
    if (loadedChallengeId !== challengeId && !isLoadingRef.current) {
      loadChallengeData(challengeId);
    }
    // Cleanup: abort any ongoing request on unmount or challengeId change
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      isLoadingRef.current = false;
    };

  }, [challengeId]);


  // Called when assistant finishes typing all messages
  const handleAssistantDone = useCallback(() => {
    setTypingAssistantState(false);
    if (setTypingAssistant) {
      setTypingAssistant(false);
    }
    setAllMessagesRevealed(true);
  }, [setTypingAssistant]);

  // Retry handler for error state
  const handleRetry = useCallback(() => {
    setError(null);
    setLoadedChallengeId(null);
    isLoadingRef.current = false;
    setLoading(false);
    setTimeout(() => {
      loadChallengeData(challengeId);
    }, 100);
  }, [challengeId]);

  return (
    <div className="missions-container w-full max-w-none">
      {/* Header */}
      <div className="border border-green-600 rounded-lg p-4 mb-6 bg-gray-900/30">
        <div className="text-center">
          <div className="text-green-300 text-lg font-bold mb-2">
            🎯 Mission Selection 🎯
          </div>
          <div className="text-green-500 text-sm">
            Choose your hands-on Linux administration exercise
          </div>
        </div>
      </div>

      {/* Loading spinner and cancel button */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
            <div className="text-green-500 animate-pulse">
              Loading missions...
            </div>
            <div className="text-green-600 text-sm mt-2">
              Challenge ID: {challengeId}
            </div>
            <button 
              onClick={() => {
                if (abortControllerRef.current) {
                  abortControllerRef.current.abort();
                }
                isLoadingRef.current = false;
                setLoading(false);
                setError('Loading cancelled by user');
              }}
              className="mt-4 text-xs text-green-600 hover:text-green-400 underline"
            >
              Cancel Loading
            </button>
          </div>
        </div>
      )}

      {/* Error display with retry/refresh options */}
      {error && !loading && (
        <div className="bg-red-900/20 border border-red-600 rounded-lg p-6 my-6">
          <div className="flex items-start space-x-3">
            <div className="text-red-500 text-xl">⚠️</div>
            <div className="flex-1">
              <div className="text-red-400 font-bold text-lg mb-2">
                Mission Loading Error
              </div>
              <div className="text-red-300 mb-4">
                {error}
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={handleRetry}
                  className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors text-sm font-bold"
                >
                  🔄 Retry Loading
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors text-sm"
                >
                  🔄 Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content: terminal messages and mission selection */}
      {!loading && !error && (
        <>
          {/* Terminal-style assistant messages */}
          <TerminalMessages
            messages={messages}
            typingAssistant={typingAssistant}
            setTypingAssistant={setTypingAssistantState}
            onAssistantDone={handleAssistantDone}
            scrollContainerRef={scrollContainerRef}
            bottomRef={bottomRef}
            headerOffset={0}
            skipCurrentTypingRef={skipCurrentTypingRef}
            showTimestamps={false}
            className="missions-messages"
          />
          
          {/* Mission selection grid, shown after assistant is done */}
          {allMessagesRevealed && challenge && challenge.options && challenge.options.length > 0 && (
            <div className="mt-8">
              <div className="mb-6 p-4 bg-green-900/20 border border-green-600 rounded-lg">
                <div className="text-green-300 font-bold mb-2">🚀 Available Missions</div>
                <div className="text-green-400 text-sm">
                  Select any mission to start your hands-on training
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {challenge.options.map((mission, index) => (
                  <div
                    key={mission.id || `mission-${index}`}
                    className="group border-2 border-green-600 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:border-green-500 hover:bg-green-900/10 hover:shadow-md bg-gray-900/20"
                    onClick={() => onSelectMission(mission)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-green-300 font-bold text-lg mb-2">
                          {mission.title || mission.name || `Mission ${index + 1}`}
                        </h3>
                        {mission.action && (
                          <p className="text-green-400 text-sm mb-3 leading-relaxed">
                            <span className="text-green-500 font-semibold">Task:</span> {mission.action}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-4">
                            <div>
                              <span className="text-green-500">Type:</span>
                              <span className="text-green-400 font-bold ml-1">Hands-on</span>
                            </div>
                            <div>
                              <span className="text-green-500">Est. Time:</span>
                              <span className="text-green-400 font-bold ml-1">5-10 min</span>
                            </div>
                          </div>
                          <div className="text-green-300 group-hover:text-green-200 font-bold">
                            Start →
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Quick start button for first mission */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => challenge.options.length > 0 && onSelectMission(challenge.options[0])}
                  className="px-6 py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg transition-colors duration-200 transform hover:scale-105"
                >
                  🚀 Quick Start - First Mission
                </button>
              </div>
            </div>
          )}

          {/* No missions available state */}
          {allMessagesRevealed && challenge && (!challenge.options || challenge.options.length === 0) && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <div className="text-green-500 text-xl font-bold mb-2">
                No Missions Available
              </div>
              <div className="text-green-400 mb-6">
                Missions for this challenge are being prepared.
              </div>
              <button 
                onClick={handleRetry}
                className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded font-bold"
              >
                🔄 Refresh Missions
              </button>
            </div>
          )}
        </>
      )}

      {/* Dummy div for scroll-to-bottom reference */}
      <div ref={bottomRef} />
    </div>
  );
}
