// components/Intro.jsx

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TerminalMessages from './TerminalMessages';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const HEADER_HEIGHT = 56;

export default function Intro({ onContinue, skipCurrentTypingRef, setTypingAssistant }) {
  const [messages, setMessages] = useState([]);
  const [typingAssistant] = useState(true);
  const [allMessagesRevealed, setAllMessagesRevealed] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/rhcsa-game/intro`)
      .then(res => {
        const introStory = Array.isArray(res.data.intro) ? res.data.intro[0] : res.data.intro;
        setMessages([
          { role: 'assistant', content: introStory }
        ]);
        setTypingAssistant(true);
      })
      .catch((err) => {
        setMessages([
          { role: 'assistant', content: 'Error loading intro.' }
        ]);
        setTypingAssistant(true);
      });
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [allMessagesRevealed]);

  useEffect(() => {
    if (!allMessagesRevealed) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        onContinue();
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allMessagesRevealed, onContinue]);

  const handleAssistantDone = () => {
    setTypingAssistant(false);
    setAllMessagesRevealed(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // ONLY return the actual content; no outer layout/styling div
  return (
    <>
      <TerminalMessages
        messages={messages}
        typingAssistant={typingAssistant}
        setTypingAssistant={setTypingAssistant}
        onAssistantDone={handleAssistantDone}
        scrollContainerRef={scrollContainerRef}
        bottomRef={bottomRef}
        headerOffset={HEADER_HEIGHT}
        skipCurrentTypingRef={skipCurrentTypingRef}
      />
      {allMessagesRevealed && (
        <div
          className="text-green-400 mt-4 cursor-pointer select-none font-bold"
          onClick={onContinue}
          onTouchStart={onContinue}
          tabIndex={0}
          style={{ fontSize: '1rem' }}
        >
          Tap or click anywhere to continue
        </div>
      )}
      <input
        ref={inputRef}
        style={{ opacity: 0, height: 0, pointerEvents: 'none' }}
        tabIndex={-1}
        readOnly
      />
      <div ref={bottomRef} />
    </>
  );
}
