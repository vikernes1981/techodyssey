// components/TerminalChat.jsx

import { useState, useRef, useCallback } from 'react';
import Header from './Header';
import Intro from './Intro';
import Chapters from './Chapters';
import Challenges from './Challenges';
import Missions from './Missions';
import MissionPlay from './MissionPlay';

const HEADER_HEIGHT = 56;

export default function TerminalChat() {
  // Game flow state
  const [stage, setStage] = useState('intro'); // 'intro', 'chapters', 'challenges', 'missions', 'play'
  const [chapterId, setChapterId] = useState(null);
  const [challengeId, setChallengeId] = useState(null);
  const [mission, setMission] = useState(null);
  const [xp, setXp] = useState(0);
  const [tries, setTries] = useState(0);

  // UI refs/state
  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  // Centralized ref for current slow typing skip function
  const skipCurrentTypingRef = useRef(null);
  // Track if assistant is typing so we only skip when it matters
  const [typingAssistant, setTypingAssistant] = useState(false);

  // This is called by all subcomponents' TerminalMessages via prop
  const handleTypingAssistantChange = useCallback((isTyping) => {
    setTypingAssistant(isTyping);
  }, []);

  // Stage handlers
  const handleIntroContinue = () => setStage('chapters');
  const handleSelectChapter = (id) => {
    setChapterId(id);
    setStage('challenges');
  };
  const handleSelectChallenge = (id) => {
    setChallengeId(id);
    setStage('missions');
  };
  const handleSelectMission = (missionObj) => {
    setMission(missionObj);
    setStage('play');
  };
  const handleMissionComplete = () => {
    setMission(null);
    setStage('missions');
  };

  // Scroll-to-bottom button logic (optional)
  const [showScrollButton, setShowScrollButton] = useState(false);
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    setShowScrollButton(scrollHeight - scrollTop - clientHeight > 120);
  };
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowScrollButton(false);
  };

  return (
    <div className="bg-black text-green-400 font-mono h-screen flex flex-col overflow-hidden relative min-h-0">
      {/* Fixed Header */}
      <Header className="fixed top-0 left-0 w-full z-20" />

      {/* XP & Tries always visible, fixed in top-right */}
      <div className="fixed top-2 right-4 text-green-400 z-30">
        XP: {xp} | Tries: {tries}
      </div>

      {/* Main scrollable window */}
      <div
        className="flex-1 overflow-y-auto text-green-400 pt-14 px-4 min-h-0"
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onClick={() => {
          if (typingAssistant && skipCurrentTypingRef.current) {
            skipCurrentTypingRef.current();
          }
        }}
        onTouchStart={() => {
          if (typingAssistant && skipCurrentTypingRef.current) {
            skipCurrentTypingRef.current();
          }
        }}
      >
        {stage === 'intro' && (
          <Intro
            onContinue={handleIntroContinue}
            skipCurrentTypingRef={skipCurrentTypingRef}
            setTypingAssistant={handleTypingAssistantChange}
          />
        )}
        {stage === 'chapters' && (
          <Chapters
            onSelectChapter={handleSelectChapter}
            skipCurrentTypingRef={skipCurrentTypingRef}
            setTypingAssistant={handleTypingAssistantChange}
          />
        )}
        {stage === 'challenges' && chapterId && (
          <Challenges
            chapterId={chapterId}
            onSelectChallenge={handleSelectChallenge}
            skipCurrentTypingRef={skipCurrentTypingRef}
            setTypingAssistant={handleTypingAssistantChange}
          />
        )}
        {stage === 'missions' && challengeId && (
          <Missions
            challengeId={challengeId}
            onSelectMission={handleSelectMission}
            skipCurrentTypingRef={skipCurrentTypingRef}
            setTypingAssistant={handleTypingAssistantChange}
          />
        )}
        {stage === 'play' && mission && (
          <MissionPlay
            mission={mission}
            challengeId={challengeId}
            xp={xp}
            tries={tries}
            setXp={setXp}
            setTries={setTries}
            onComplete={handleMissionComplete}
            inputRef={inputRef}
            bottomRef={bottomRef}
            skipCurrentTypingRef={skipCurrentTypingRef}
            setTypingAssistant={handleTypingAssistantChange}
          />
        )}
        <div ref={bottomRef} />
      </div>

      {/* "Scroll to bottom" button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-20 right-4 bg-green-600 hover:bg-green-500 text-black font-bold py-1 px-2 rounded shadow z-10"
        >
          ↓ Scroll
        </button>
      )}

      {/* Input bar should be handled in MissionPlay or globally here if you want */}
    </div>
  );
}
