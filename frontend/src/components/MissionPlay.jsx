// components/MissionPlay.jsx

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TerminalMessages from './TerminalMessages';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const HEADER_HEIGHT = 56;

export default function MissionPlay({
  mission,
  challengeId,
  xp,
  tries,
  setXp,
  setTries,
  onComplete,
  skipCurrentTypingRef,
  setTypingAssistant
}) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `**${mission.title || mission.name}**` },
    { role: 'assistant', content: `**Action:** ${mission.action}` },
    { role: 'assistant', content: mission.intro },
    { role: 'assistant', content: 'Type your command:' }
  ]);
  const [input, setInput] = useState('');
  const [typingAssistant] = useState(false);
  const [awaitingContinue, setAwaitingContinue] = useState(false);
  const inputRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [awaitingContinue]);

  useEffect(() => {
    setMessages([
      { role: 'assistant', content: `**${mission.title || mission.name}**` },
      { role: 'assistant', content: `**Action:** ${mission.action}` },
      { role: 'assistant', content: mission.intro },
      { role: 'assistant', content: 'Type your command:' }
    ]);
    setTypingAssistant(false);
    setAwaitingContinue(false);
    setInput('');
    setTries(0);
  }, [mission, setTries]);

  const handleAssistantDone = () => {
    setTypingAssistant(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    const userInput = input.trim();
    setInput('');

    try {
      const res = await axios.post(`${API_BASE_URL}/rhcsa-game/mission/attempt`, {
        input: userInput,
        challengeId,
        missionId: mission.id,
        tries,
        xp
      });

      const data = res.data;

      setMessages(prev => {
        const newMessages = [
          ...prev,
          { role: 'user', content: userInput }
        ];
        if (data.success) {
          newMessages.push({
            role: 'assistant',
            content:
              data.output +
              (data.missionExtras
                ? `\n\n---\n\n${data.missionExtras.output ? "**Example Output:**\n" + data.missionExtras.output : ""}
                  ${data.missionExtras.aspects ? "\n**Command Aspects:**\n" + data.missionExtras.aspects.join('\n') : ""}
                  ${data.missionExtras.options ? "\n**Options:**\n" + data.missionExtras.options.join('\n') : ""}
                  ${data.missionExtras.outro ? "\n" + data.missionExtras.outro : ""}`
                : "")
          });
          setAwaitingContinue(true);
        } else {
          newMessages.push({
            role: 'assistant',
            content:
              data.output +
              (data.hint ? `\n\nHint: ${data.hint}` : "")
          });
        }
        return newMessages;
      });

      setXp(data.xp);

      if (data.success) {
        setTries(0);
      } else {
        setTries(prev => prev + 1);
      }

    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Game error.' }]);
    }
  };

  // Handle Enter to continue after correct answer
  useEffect(() => {
    if (!awaitingContinue) return;
    const handler = (e) => {
      if (e.key === 'Enter') {
        onComplete();
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [awaitingContinue, onComplete]);

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
      {/* Input bar, only if not finished */}
      {!awaitingContinue && (
        <div className="border-t border-green-700 flex items-center bg-black px-4 py-2 mt-2">
          <span className="mr-2 text-green-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSubmit();
                e.preventDefault();
              }
            }}
            className="bg-black text-green-400 outline-none flex-1"
            autoFocus
            disabled={typingAssistant}
          />
        </div>
      )}
      {/* Show "Press Enter..." when done */}
      {awaitingContinue && (
        <div
          className="w-full bg-black text-green-400 text-center py-3 border-t border-green-700 mt-2 cursor-pointer select-none font-bold"
          onClick={onComplete}
          onTouchStart={onComplete}
          tabIndex={0}
          style={{ fontSize: '1.2rem' }}
        >
          Tap or click anywhere to return to the mission menu
        </div>
      )}
      <div ref={bottomRef} />
    </>
  );
}
