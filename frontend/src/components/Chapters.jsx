// components/Chapters.jsx

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TerminalMessages from './TerminalMessages';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const HEADER_HEIGHT = 56;

export default function Chapters({ onSelectChapter, skipCurrentTypingRef, setTypingAssistant }) {
  const [chapters, setChapters] = useState([]);
  const [messages, setMessages] = useState([]);
  const [typingAssistant] = useState(true);
  const [allMessagesRevealed, setAllMessagesRevealed] = useState(false);
  const scrollContainerRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/rhcsa-game/chapters`)
      .then(res => {
        setChapters(res.data || []);
        const msg = res.data && res.data.length
          ? res.data[0].story || "Select a chapter to begin."
          : "No chapters available.";
        setMessages([
          { role: 'assistant', content: msg }
        ]);
        setTypingAssistant(true);
      })
      .catch(() => {
        setMessages([{ role: 'assistant', content: 'Error loading chapters.' }]);
        setTypingAssistant(true);
      });
  }, []);

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
      {allMessagesRevealed && chapters.length > 0 && (
        <div className="flex flex-col gap-2 mt-4">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              className="rounded px-4 py-2 font-bold text-black bg-green-800 hover:bg-green-600"
              onClick={() => onSelectChapter(chapter.id)}
              style={{ outline: 'none' }}
            >
              {chapter.name}
            </button>
          ))}
        </div>
      )}
      <div ref={bottomRef} />
    </>
  );
}
