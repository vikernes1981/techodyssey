// components/Chapters.jsx - FIXED VERSION

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import TerminalMessages from './TerminalMessages';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Enterprise-grade chapter selection component
 * Features: Enhanced UI, loading states, error handling, accessibility
 */
export default function Chapters({ 
  onSelectChapter, 
  skipCurrentTypingRef, 
  setTypingAssistant,
  typingSpeed = 'normal',
  enableSounds = true 
}) {
  const [chapters, setChapters] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chapterState, setChapterState] = useState({
    loading: true,
    error: null,
    allMessagesRevealed: false,
    selectedChapter: null,
    hoveredChapter: null
  });
  
  const [typingAssistant] = useState(true);
  const scrollContainerRef = useRef(null);
  const bottomRef = useRef(null);

  // Enhanced chapter loading with comprehensive error handling
  useEffect(() => {
    const loadChapters = async () => {
      try {
        setChapterState(prev => ({ ...prev, loading: true, error: null }));

        const response = await axios.get(`${API_BASE_URL}/rhcsa-game/chapters`, {
          timeout: 8000
        });

        // FIX 1: Properly access nested response data
        console.log('Raw response:', response.data);
        
        let chaptersData;
        if (response.data.chapters) {
          // Backend returns { chapters: [...], count: X, timestamp: ... }
          chaptersData = response.data.chapters;
        } else if (Array.isArray(response.data)) {
          // Backend returns array directly
          chaptersData = response.data;
        } else {
          // Backend returns single object - wrap in array
          chaptersData = [response.data];
        }

        console.log('Processed chapters:', chaptersData);
        setChapters(chaptersData);

        // Enhanced welcome message with chapter overview
        let welcomeMessage;
        if (chaptersData.length > 0) {
          const chapterList = chaptersData.map((ch, idx) => 
            `${idx + 1}. ${ch.name || 'Unnamed Chapter'} - ${ch.story?.split('.')[0] || 'Advanced Linux concepts'}`
          ).join('\n');

          welcomeMessage = `Welcome to the Red Hat Certification Training Program!

Your journey through Linux mastery begins here. Choose your path wisely, as each chapter builds upon the previous knowledge.

📚 Available Training Modules:

${chapterList}

Each module contains multiple challenges designed to test your practical Linux administration skills.

Select a chapter below to begin your certification journey. Remember: practice makes perfect, and every expert was once a beginner.

Good luck, future Red Hat Certified System Administrator! 🚀`;
        } else {
          welcomeMessage = `Training modules are currently being prepared.

Please check back soon for available certification content.

In the meantime, ensure your Linux environment is ready:
• Terminal access available
• Basic command line familiarity
• Curiosity and determination to learn

Your Red Hat certification journey awaits! 🔄`;
        }

        setMessages([{
          role: 'assistant',
          content: welcomeMessage,
          timestamp: new Date().toISOString(),
          id: 'chapters-welcome'
        }]);

        setChapterState(prev => ({ ...prev, loading: false }));
        
        if (setTypingAssistant) {
          setTypingAssistant(true);
        }

      } catch (error) {
        console.error('Failed to load chapters:', error);
        
        let errorMessage = 'Failed to load training modules.';
        if (error.code === 'ECONNABORTED') {
          errorMessage = 'Connection timeout. Please check your internet connection.';
        } else if (error.response?.status >= 500) {
          errorMessage = 'Server error. Training modules temporarily unavailable.';
        }

        setChapterState(prev => ({ 
          ...prev, 
          loading: false, 
          error: errorMessage 
        }));

        // Fallback chapters for offline experience
        const fallbackChapters = [
          {
            id: "chapter_1",
            name: "Local Storage Management",
            story: "Master disk partitioning, filesystem creation, and logical volume management. Essential skills for any Linux administrator managing storage systems."
          }
        ];

        setChapters(fallbackChapters);

        const fallbackMessage = `Connection Error - Loading Offline Content

Training modules loaded from local cache. Limited content available.

📚 Available Offline Modules:

1. Local Storage Management - Essential disk and filesystem operations

Connect to the internet for the complete training experience with all modules, examples, and interactive content.

You can still begin training with the available offline content.`;

        setMessages([{
          role: 'assistant',
          content: fallbackMessage,
          timestamp: new Date().toISOString(),
          id: 'chapters-fallback'
        }]);

        if (setTypingAssistant) {
          setTypingAssistant(true);
        }
      }
    };

    loadChapters();
  }, [setTypingAssistant]);

  // Handle typing completion
  const handleAssistantDone = useCallback(() => {
    if (setTypingAssistant) {
      setTypingAssistant(false);
    }
    setChapterState(prev => ({ ...prev, allMessagesRevealed: true }));
  }, [setTypingAssistant]);

  // Enhanced chapter selection with loading state
  const handleChapterSelect = useCallback(async (chapterId) => {
    setChapterState(prev => ({ ...prev, selectedChapter: chapterId }));
    
    // Small delay for visual feedback
    setTimeout(() => {
      if (onSelectChapter) {
        onSelectChapter(chapterId);
      }
    }, 150);
  }, [onSelectChapter]);

  // Keyboard navigation for chapters
  useEffect(() => {
    if (!chapterState.allMessagesRevealed) return;

    const handleKeyDown = (e) => {
      if (chapters.length === 0) return;

      const currentIndex = chapters.findIndex(ch => ch.id === chapterState.hoveredChapter);
      
      switch (e.key) {
        case 'ArrowDown':
        case 'j': // Vim-style navigation
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % chapters.length;
          setChapterState(prev => ({ 
            ...prev, 
            hoveredChapter: chapters[nextIndex].id 
          }));
          break;
          
        case 'ArrowUp':
        case 'k': // Vim-style navigation
          e.preventDefault();
          const prevIndex = currentIndex <= 0 ? chapters.length - 1 : currentIndex - 1;
          setChapterState(prev => ({ 
            ...prev, 
            hoveredChapter: chapters[prevIndex].id 
          }));
          break;
          
        case 'Enter':
          e.preventDefault();
          if (chapterState.hoveredChapter) {
            handleChapterSelect(chapterState.hoveredChapter);
          } else if (chapters.length > 0) {
            handleChapterSelect(chapters[0].id);
          }
          break;
          
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          e.preventDefault();
          const chapterIndex = parseInt(e.key) - 1;
          if (chapters[chapterIndex]) {
            handleChapterSelect(chapters[chapterIndex].id);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [chapterState.allMessagesRevealed, chapterState.hoveredChapter, chapters, handleChapterSelect]);

  // FIX 2: Enhanced chapter statistics with proper null checks
  const chapterStats = useMemo(() => {
    if (!Array.isArray(chapters)) return [];
    
    return chapters.map(chapter => {
      // Safety checks for all properties
      const name = chapter?.name || 'Unnamed Chapter';
      const story = chapter?.story || 'No description available';
      
      return {
        ...chapter,
        name, // Ensure name is always defined
        story, // Ensure story is always defined
        difficulty: name.toLowerCase().includes('storage') ? 'Beginner' :
                   name.toLowerCase().includes('network') ? 'Intermediate' :
                   name.toLowerCase().includes('security') ? 'Advanced' : 'Beginner',
        estimatedTime: name.toLowerCase().includes('storage') ? '2-3 hours' :
                      name.toLowerCase().includes('network') ? '3-4 hours' : '2-3 hours'
      };
    });
  }, [chapters]);

  return (
    <div className="chapters-container w-full max-w-none">
      {/* Enhanced Header */}
      <div className="border border-green-600 rounded-lg p-4 mb-6 bg-gray-900/30">
        <div className="text-center">
          <div className="text-green-300 text-lg font-bold mb-2">
            🎓 RED HAT CERTIFICATION TRAINING MODULES 🎓
          </div>
          <div className="text-green-500 text-sm">
            Select your learning path and begin your journey to RHCSA certification
          </div>
        </div>
      </div>

      {/* Loading State */}
      {chapterState.loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
            <div className="text-green-500 animate-pulse">
              Loading training modules...
            </div>
            <div className="text-green-600 text-sm mt-2">
              Preparing your learning environment
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {chapterState.error && (
        <div className="bg-red-900/20 border border-red-600 rounded-lg p-6 my-6">
          <div className="flex items-start space-x-3">
            <div className="text-red-500 text-xl">⚠️</div>
            <div className="flex-1">
              <div className="text-red-400 font-bold text-lg mb-2">
                Connection Warning
              </div>
              <div className="text-red-300 mb-4">
                {chapterState.error}
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
      {!chapterState.loading && (
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
            className="chapters-messages"
          />

          {/* Enhanced Chapter Selection */}
          {chapterState.allMessagesRevealed && chapterStats.length > 0 && (
            <div className="mt-8">
              {/* Selection Instructions */}
              <div className="mb-6 p-4 bg-green-900/20 border border-green-600 rounded-lg">
                <div className="text-green-300 font-bold mb-2">📋 Chapter Selection</div>
                <div className="text-green-400 text-sm space-y-1">
                  <div>• Click on any chapter to begin training</div>
                  <div>• Use <kbd className="bg-gray-800 px-1 py-0.5 rounded text-xs">↑↓</kbd> arrow keys or <kbd className="bg-gray-800 px-1 py-0.5 rounded text-xs">j/k</kbd> to navigate</div>
                  <div>• Press <kbd className="bg-gray-800 px-1 py-0.5 rounded text-xs">Enter</kbd> to select, or use number keys <kbd className="bg-gray-800 px-1 py-0.5 rounded text-xs">1-5</kbd></div>
                </div>
              </div>

              {/* Chapter Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapterStats.map((chapter, index) => {
                  const isSelected = chapterState.selectedChapter === chapter.id;
                  const isHovered = chapterState.hoveredChapter === chapter.id;
                  
                  return (
                    <div
                      key={chapter.id || `chapter-${index}`}
                      className={`
                        group relative border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 transform
                        ${isSelected 
                          ? 'border-green-400 bg-green-900/30 scale-95' 
                          : isHovered
                          ? 'border-green-500 bg-green-900/20 shadow-lg'
                          : 'border-green-600 bg-gray-900/20 hover:border-green-500 hover:bg-green-900/10 hover:shadow-md'
                        }
                      `}
                      onClick={() => handleChapterSelect(chapter.id)}
                      onMouseEnter={() => setChapterState(prev => ({ 
                        ...prev, 
                        hoveredChapter: chapter.id 
                      }))}
                      onMouseLeave={() => setChapterState(prev => ({ 
                        ...prev, 
                        hoveredChapter: null 
                      }))}
                    >
                      {/* Chapter Number */}
                      <div className="absolute top-3 left-3 w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>

                      {/* Loading Indicator for Selected */}
                      {isSelected && (
                        <div className="absolute top-3 right-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-400"></div>
                        </div>
                      )}

                      {/* Chapter Content */}
                      <div className="ml-12">
                        <h3 className="text-green-300 font-bold text-lg mb-2">
                          {chapter.name}
                        </h3>
                        
                        <p className="text-green-400 text-sm mb-4 leading-relaxed">
                          {chapter.story}
                        </p>

                        {/* Chapter Metadata */}
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-green-500">Difficulty:</span>
                            <div className={`font-bold ${
                              chapter.difficulty === 'Beginner' ? 'text-green-400' :
                              chapter.difficulty === 'Intermediate' ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {chapter.difficulty}
                            </div>
                          </div>
                          <div>
                            <span className="text-green-500">Est. Time:</span>
                            <div className="text-green-400 font-bold">
                              {chapter.estimatedTime}
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar Placeholder */}
                        <div className="mt-4 bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: isHovered ? '20%' : '0%' }}
                          />
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 rounded-lg bg-green-400 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Start Option */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => chapters.length > 0 && handleChapterSelect(chapters[0].id)}
                  className="px-6 py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg transition-colors duration-200 transform hover:scale-105"
                >
                  🚀 Quick Start - Begin First Chapter
                </button>
              </div>

              {/* Keyboard Shortcuts Help */}
              <div className="mt-6 text-center text-green-600 text-xs opacity-60">
                Keyboard shortcuts: <kbd className="bg-gray-800 px-1 rounded">1-{chapters.length}</kbd> for direct selection | 
                <kbd className="bg-gray-800 px-1 rounded mx-1">↑↓</kbd> navigate | 
                <kbd className="bg-gray-800 px-1 rounded">Enter</kbd> select
              </div>
            </div>
          )}

          {/* Empty State */}
          {chapterState.allMessagesRevealed && chapters.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <div className="text-green-500 text-xl font-bold mb-2">
                No Training Modules Available
              </div>
              <div className="text-green-400 mb-6">
                Training content is being prepared. Please check back soon.
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded font-bold"
              >
                🔄 Refresh Content
              </button>
            </div>
          )}
        </>
      )}

      <div ref={bottomRef} />
    </div>
  );
}