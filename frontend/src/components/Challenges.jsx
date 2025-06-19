// components/Challenges.jsx

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TerminalMessages from './TerminalMessages';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const HEADER_HEIGHT = 56;

export default function Challenges({ chapterId, onSelectChallenge, skipCurrentTypingRef, setTypingAssistant }) {
  const [challenges, setChallenges] = useState([]);
  const [messages, setMessages] = useState([]);
  const [typingAssistant] = useState(true);
  const [allMessagesRevealed, setAllMessagesRevealed] = useState(false);
  const scrollContainerRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!chapterId) return;
    axios.get(`${API_BASE_URL}/rhcsa-game/challenges/${chapterId}`)
      .then(res => {
        setChallenges(res.data || []);
        const first = res.data && res.data[0];
        const msg = first
          ? `${first.story ? first.story + '\n\n' : ''}${first.briefing ? first.briefing + '\n\n' : ''}${first.prompt || ''}`.trim()
          : "Select a challenge to continue.";
        setMessages([
          { role: 'assistant', content: msg }
        ]);
        setTypingAssistant(true);
      })
      .catch(() => {
        setMessages([{ role: 'assistant', content: 'Error loading challenges.' }]);
        setTypingAssistant(true);
      });
  }, [chapterId]);

  const handleAssistantDone = () => {
    setTypingAssistant(false);
    setAllMessagesRevealed(true);
  };

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
      {allMessagesRevealed && challenges.length > 0 && (
        <div className="flex flex-col gap-2 mt-4">
          {challenges.map((challenge) => (
            <button
              key={challenge.id}
              className="rounded px-4 py-2 font-bold text-black bg-green-800 hover:bg-green-600"
              onClick={() => onSelectChallenge(challenge.id)}
              style={{ outline: 'none' }}
            >
              {challenge.title}
            </button>
          ))}
        </div>
      )}
      <div ref={bottomRef} />
    </>
  );
}
