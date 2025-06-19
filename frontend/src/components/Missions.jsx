// components/Missions.jsx

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TerminalMessages from './TerminalMessages';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const HEADER_HEIGHT = 56;

export default function Missions({ challengeId, onSelectMission, skipCurrentTypingRef, setTypingAssistant }) {
  const [challenge, setChallenge] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingAssistant] = useState(true);
  const [allMessagesRevealed, setAllMessagesRevealed] = useState(false);
  const scrollContainerRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!challengeId) return;
    axios.get(`${API_BASE_URL}/rhcsa-game/challenge/${challengeId}`)
      .then(res => {
        setChallenge(res.data || null);
        const { story, briefing, prompt } = res.data || {};
        const msg = `${story ? story + '\n\n' : ''}${briefing ? briefing + '\n\n' : ''}${prompt || ''}`.trim();
        setMessages([
          { role: 'assistant', content: msg }
        ]);
        setTypingAssistant(true);
      })
      .catch(() => {
        setMessages([{ role: 'assistant', content: 'Error loading missions.' }]);
        setTypingAssistant(true);
      });
  }, [challengeId]);

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
      {allMessagesRevealed && challenge && challenge.options && (
        <div className="flex flex-col gap-2 mt-4">
          {challenge.options.map((mission) => (
            <button
              key={mission.id}
              className="rounded px-4 py-2 font-bold text-black bg-green-800 hover:bg-green-600"
              onClick={() => onSelectMission(mission)}
              style={{ outline: 'none' }}
            >
              {mission.title || mission.name}
            </button>
          ))}
        </div>
      )}
      <div ref={bottomRef} />
    </>
  );
}
