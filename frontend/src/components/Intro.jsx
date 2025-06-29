// components/Intro.jsx

import { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import TerminalMessages from './TerminalMessages';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Enterprise-grade game introduction component
 * Features: Enhanced storytelling, professional animations, error handling
 */
export default function Intro({ 
  onContinue, 
  skipCurrentTypingRef, 
  setTypingAssistant,
  typingSpeed = 'normal',
  enableSounds = true 
}) {
  const [messages, setMessages] = useState([]);
  const [introState, setIntroState] = useState({
    loading: true,
    error: null,
    allMessagesRevealed: false,
    showContinue: false
  });
  
  const [typingAssistant] = useState(true);
  const [currentTime] = useState(new Date());
  
  // Refs for enhanced control
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const continueTimeoutRef = useRef(null);

  // Enhanced intro loading with better error handling
  useEffect(() => {
    const loadIntroStory = async () => {
      try {
        setIntroState(prev => ({ ...prev, loading: true, error: null }));
        
        const response = await axios.get(`${API_BASE_URL}/rhcsa-game/intro`, {
          timeout: 10000 // 10 second timeout
        });
        
        const introStory = Array.isArray(response.data.intro) 
          ? response.data.intro[0] 
          : response.data.intro;

        if (!introStory) {
          throw new Error('No intro story received from server');
        }

        // Enhanced intro message with metadata
        const welcomeMessage = {
          role: 'assistant',
          content: introStory,
          timestamp: new Date().toISOString(),
          id: 'intro-story'
        };

        setMessages([welcomeMessage]);
        setIntroState(prev => ({ ...prev, loading: false }));
        
        if (setTypingAssistant) {
          setTypingAssistant(true);
        }
        
      } catch (error) {
        console.error('Failed to load intro:', error);
        
        let errorMessage = 'Failed to load introduction.';
        if (error.code === 'ECONNABORTED') {
          errorMessage = 'Connection timeout. Please check your internet connection.';
        } else if (error.response?.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (error.response?.status === 404) {
          errorMessage = 'Game content not found. Please contact support.';
        }

        setIntroState(prev => ({ 
          ...prev, 
          loading: false, 
          error: errorMessage 
        }));

        // Fallback intro story for offline experience
        const fallbackStory = `Welcome to the Red Hat Odyssey!

In the year 2150, humanity made a quantum leap into the digital age, transcending the boundaries of the physical world.

As the world's reliance on technology grew, so did the need for skilled administrators to navigate the complexities of the digital realm.

You, a seasoned cybernaut, have honed your skills in the art of Red Hat administration, mastering the intricacies of Linux systems.

Today, you embark on a journey that will test your knowledge, courage, and resilience like never before.

Welcome to the Red Hat Odyssey, where legends are born and destinies are forged amidst the endless expanse of cyberspace.

Your mission, should you choose to accept it, is to conquer the challenges that lie ahead and emerge as the ultimate master of Red Hat administration.

Are you ready to begin your journey?`;

        setMessages([{
          role: 'assistant',
          content: fallbackStory,
          timestamp: new Date().toISOString(),
          id: 'fallback-intro'
        }]);

        if (setTypingAssistant) {
          setTypingAssistant(true);
        }
      }
    };

    loadIntroStory();
  }, [setTypingAssistant]);

  // Enhanced focus management
  useEffect(() => {
    if (introState.allMessagesRevealed && inputRef.current) {
      // Delay focus to ensure smooth UX
      const focusTimeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      
      return () => clearTimeout(focusTimeout);
    }
  }, [introState.allMessagesRevealed]);

  // Enhanced keyboard handling with multiple continue options
  useEffect(() => {
    if (!introState.allMessagesRevealed) return;

    const handleKeyDown = (e) => {
      // Multiple ways to continue for better UX
      if (
        e.key === 'Enter' || 
        e.key === ' ' || 
        e.key === 'ArrowRight' ||
        e.key === 'ArrowDown'
      ) {
        e.preventDefault();
        handleContinue();
      }
      
      // Escape to restart intro (advanced feature)
      if (e.key === 'Escape') {
        e.preventDefault();
        window.location.reload();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [introState.allMessagesRevealed]);

  // Enhanced continue handler with smooth transitions
  const handleContinue = useCallback(() => {
    if (!introState.allMessagesRevealed) return;
    
    // Add slight delay for better UX
    setIntroState(prev => ({ ...prev, showContinue: false }));
    
    continueTimeoutRef.current = setTimeout(() => {
      if (onContinue) {
        onContinue();
      }
    }, 150);
  }, [introState.allMessagesRevealed, onContinue]);

  // Handle typing completion with enhanced UX
  const handleAssistantDone = useCallback(() => {
    if (setTypingAssistant) {
      setTypingAssistant(false);
    }
    
    setIntroState(prev => ({ 
      ...prev, 
      allMessagesRevealed: true,
      showContinue: true 
    }));

    // Auto-focus for immediate interaction
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 200);
  }, [setTypingAssistant]);

  // Format session start time
  const formatStartTime = useCallback(() => {
    return currentTime.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }, [currentTime]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeout(continueTimeoutRef.current);
    };
  }, []);

  return (
    <div className="intro-container w-full max-w-none">
      {/* Enhanced Terminal Session Header */}
      <div className="border border-green-600 rounded-lg p-4 mb-6 bg-gray-900/30">
        <div className="text-center mb-4">
          <div className="text-green-300 text-lg font-bold mb-2">
            ╭─────────────────────────────────────────────────────╮
          </div>
          <div className="text-green-300 text-lg font-bold mb-1">
            │           🚀 RED HAT CERTIFICATION ODYSSEY 🚀        │
          </div>
          <div className="text-green-300 text-lg font-bold mb-2">
            ╰─────────────────────────────────────────────────────╯
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <div className="text-green-500">
              <span className="font-bold">Session Started:</span> {formatStartTime()}
            </div>
            <div className="text-green-500">
              <span className="font-bold">Terminal:</span> RHCSA Training Environment v2.0
            </div>
            <div className="text-green-500">
              <span className="font-bold">User:</span> trainee@redhat-odyssey
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-green-500">
              <span className="font-bold">Mode:</span> Interactive Learning
            </div>
            <div className="text-green-500">
              <span className="font-bold">Difficulty:</span> Progressive
            </div>
            <div className="text-green-500">
              <span className="font-bold">Support:</span> Hints & Examples Available
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {introState.loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
            <div className="text-green-500 animate-pulse">
              Initializing Red Hat Odyssey...
            </div>
            <div className="text-green-600 text-sm mt-2">
              Loading training environment
            </div>
          </div>
        </div>
      )}

      {/* Error State with Retry */}
      {introState.error && (
        <div className="bg-red-900/20 border border-red-600 rounded-lg p-6 my-6">
          <div className="flex items-start space-x-3">
            <div className="text-red-500 text-xl">⚠️</div>
            <div className="flex-1">
              <div className="text-red-400 font-bold text-lg mb-2">
                Connection Error
              </div>
              <div className="text-red-300 mb-4">
                {introState.error}
              </div>
              <div className="text-red-200 text-sm mb-4">
                Don't worry - the game will continue with offline content.
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors text-sm font-bold"
              >
                🔄 Retry Connection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Story Content */}
      {!introState.loading && (
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
            className="intro-messages"
          />

          {/* Enhanced Continue Interface */}
          {introState.showContinue && (
            <div className="mt-8 p-6 border border-green-600 rounded-lg bg-green-900/10">
              <div className="text-center">
                <div className="text-green-300 text-xl font-bold mb-4 animate-pulse">
                  ⚡ Ready to Begin Your Journey? ⚡
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
                  <button
                    onClick={handleContinue}
                    className="group relative px-8 py-4 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    <span className="flex items-center space-x-2">
                      <span>🚀</span>
                      <span>START TRAINING</span>
                      <span>🚀</span>
                    </span>
                    <div className="absolute inset-0 rounded-lg bg-green-400 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  </button>
                  
                  <div className="text-green-500 text-sm">
                    or press <kbd className="px-2 py-1 bg-gray-800 border border-green-600 rounded">ENTER</kbd>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-400">
                  <div className="flex items-center justify-center space-x-2">
                    <span>📚</span>
                    <span>Interactive Learning</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span>💡</span>
                    <span>Hint System</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span>🏆</span>
                    <span>Progress Tracking</span>
                  </div>
                </div>

                {/* Advanced Options */}
                <details className="mt-6 text-left">
                  <summary className="text-green-500 cursor-pointer hover:text-green-400 text-sm">
                    🔧 Advanced Options
                  </summary>
                  <div className="mt-3 p-3 bg-gray-900/50 rounded border border-green-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-green-500">Keyboard Shortcuts:</span>
                        <div className="text-green-400 mt-1 space-y-1">
                          <div>• <kbd className="text-xs bg-gray-800 px-1 rounded">Enter</kbd> Continue</div>
                          <div>• <kbd className="text-xs bg-gray-800 px-1 rounded">Space</kbd> Skip typing</div>
                          <div>• <kbd className="text-xs bg-gray-800 px-1 rounded">Esc</kbd> Restart</div>
                        </div>
                      </div>
                      <div>
                        <span className="text-green-500">Tips:</span>
                        <div className="text-green-400 mt-1 space-y-1">
                          <div>• Click anywhere to skip typing</div>
                          <div>• Use hints if you get stuck</div>
                          <div>• Progress is automatically saved</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          )}
        </>
      )}

      {/* Hidden Input for Focus Management */}
      <input
        ref={inputRef}
        style={{ opacity: 0, height: 0, pointerEvents: 'none' }}
        tabIndex={introState.allMessagesRevealed ? 0 : -1}
        readOnly
        aria-label="Continue to next section"
      />
      
      <div ref={bottomRef} />
    </div>
  );
}