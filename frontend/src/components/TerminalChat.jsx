import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import Header from './Header';
import rehypeSanitize from 'rehype-sanitize';
import ManageMessagesModal from './ManageMessagesModal';
import TerminalMessages from './TerminalMessages';
console.log("API_BASE_URL (build):", import.meta.env.VITE_API_BASE_URL);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const HEADER_HEIGHT = 56; // <--- Set this to your header's exact px height!
console.log("API_BASE_URL (runtime):", API_BASE_URL);

export default function TerminalChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const skipCurrentTypingRef = useRef(null);


  // Game logic/state
  const [gameStage, setGameStage] = useState('intro');
  const [challengeId, setChallengeId] = useState(() => localStorage.getItem('challengeId') || 'filesystem');
  const [missionId, setMissionId] = useState(() => localStorage.getItem('missionId') || '');
  const [tries, setTries] = useState(() => Number(localStorage.getItem('tries')) || 0);
  const [xp, setXp] = useState(() => Number(localStorage.getItem('xp')) || 0);

  // Option selection
  const [options, setOptions] = useState([]);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(0);
  const [justReturnedToOptions, setJustReturnedToOptions] = useState(false);

  // Awaiting Enter to return to menu
  const [awaitingContinue, setAwaitingContinue] = useState(false);

  // SLOW TYPING STATE
  const [typingAssistant, setTypingAssistant] = useState(false);

  // Show option buttons only after slow-typing
  const [allMessagesRevealed, setAllMessagesRevealed] = useState(false);

  // Sync localStorage for all game state
  useEffect(() => {
    localStorage.setItem('gameStage', gameStage);
    localStorage.setItem('challengeId', challengeId);
    localStorage.setItem('missionId', missionId);
    localStorage.setItem('tries', tries);
    localStorage.setItem('xp', xp);
  }, [gameStage, challengeId, missionId, tries, xp]);

  // Show the intro, options, or mission briefing
  useEffect(() => {
    setAllMessagesRevealed(false); // Reset revealed state on stage change!
    if (gameStage === 'intro') {
      axios.get(`${API_BASE_URL}/rhcsa-game/intro`)
        .then(res => {
          const introStory = Array.isArray(res.data.intro) ? res.data.intro[0] : res.data.intro;
          setMessages([
            { role: 'assistant', content: introStory }
          ]);
          setTypingAssistant(true);
        })
        .catch((err) => {
            alert("AXIOS ERROR: " + (err && err.message ? err.message : JSON.stringify(err)));
            setMessages([
              { role: 'assistant', content: 'Error loading intro.' }
            ]);
            setTypingAssistant(true);
          });

    }
    if (gameStage === 'options') {
      axios.get(`${API_BASE_URL}/rhcsa-game/options`)
        .then(res => {
          setOptions(res.data.options || []);
          setSelectedOptionIdx(0);
          setMessages([
            { role: 'assistant', content: res.data.story || '' },
            { role: 'assistant', content: res.data.briefing || '' },
            { role: 'assistant', content: res.data.prompt || '' }
          ]);
          setTypingAssistant(true);
        })
        .catch(() => {
          setMessages([
            { role: 'assistant', content: 'Error loading options.' }
          ]);
          setTypingAssistant(true);
        });
    }
    // No auto-load for mission here; mission loads after "processing command..." on button click!
    // eslint-disable-next-line
  }, [gameStage]);

  // Always focus input after any gameStage or continue state change
  useEffect(() => {
    inputRef.current?.focus();
  }, [gameStage, awaitingContinue]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setShowScrollButton(el.scrollHeight - el.scrollTop - el.clientHeight > 100);
  };

  // Option click handler: displays "processing", fetches mission, shows mission intro
  const handleOptionSelect = async (opt, idx) => {
    setJustReturnedToOptions(false);
    setSelectedOptionIdx(idx);
    setMessages(prev => [
      ...prev,
      { role: 'user', content: opt.name },
      { role: 'assistant', content: '_Processing command..._' }
    ]);
    setTypingAssistant(true);
    setGameStage('loading');
    await new Promise(res => setTimeout(res, 2000));

    try {
      const res = await axios.get(`${API_BASE_URL}/rhcsa-game/mission/${opt.id}`);
      const { mission } = res.data;
      setMissionId(mission.id);
      setGameStage('mission');
      setTries(0);
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: `**${mission.title}**` },
        { role: 'assistant', content: `**Action:** ${mission.action}` },
        { role: 'assistant', content: mission.intro },
        { role: 'assistant', content: 'Type your command:' }
      ]);
      setTypingAssistant(true);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Error loading mission.' }
      ]);
      setTypingAssistant(true);
      setGameStage('options');
    }
    setInput('');
  };

  const sendMessage = async () => {
    if (awaitingContinue) {
      setAwaitingContinue(false);
      setInput('');
      setMissionId('');
      setTries(0);
      setSelectedOptionIdx(0);
      setJustReturnedToOptions(true);
      setGameStage('options');
      return;
    }

    if (gameStage === 'intro') {
      setMessages(prev => [
        ...prev,
        { role: 'user', content: input }
      ]);
      setInput('');
      setGameStage('options');
      return;
    }

    if (gameStage === 'mission') {
      if (!input.trim()) return;
      const userInput = input.trim();
      setInput('');

      try {
        const res = await axios.post(`${API_BASE_URL}/rhcsa-game`, {
          input: userInput,
          challengeId,
          missionId,
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
            setTypingAssistant(true);
            setAwaitingContinue(true);
          } else {
            newMessages.push({
              role: 'assistant',
              content:
                data.output +
                (data.hint ? `\n\nHint: ${data.hint}` : "")
            });
            setTypingAssistant(true);
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
        console.error(err);
        setMessages(prev => [...prev, { role: 'assistant', content: 'Game error.' }]);
        setTypingAssistant(true);
      }
    }
  };

  // Keyboard navigation for options
  useEffect(() => {
    if (gameStage !== 'options') return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'k') {
        setJustReturnedToOptions(false);
        setSelectedOptionIdx(idx => (idx === 0 ? options.length - 1 : idx - 1));
        e.preventDefault();
      } else if (e.key === 'ArrowDown' || e.key === 'j') {
        setJustReturnedToOptions(false);
        setSelectedOptionIdx(idx => (idx === options.length - 1 ? 0 : idx + 1));
        e.preventDefault();
      } else if (e.key === 'Enter') {
        if (options.length > 0 && !justReturnedToOptions) {
          handleOptionSelect(options[selectedOptionIdx], selectedOptionIdx);
        }
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line
  }, [gameStage, options, selectedOptionIdx, justReturnedToOptions]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
    return () => clearTimeout(timeout);
  }, [messages, awaitingContinue]);

  const handleAssistantDone = () => {
    setTypingAssistant(false);
    setAllMessagesRevealed(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div className="bg-black text-green-400 font-mono h-screen flex flex-col overflow-hidden relative min-h-0">
      {/* Fixed Header */}
      <Header className="fixed top-0 left-0 w-full z-20" />

      {/* XP & Tries always visible, fixed in top-right */}
      <div className="fixed top-2 right-4 text-green-400 z-30">
        XP: {xp} | Tries: {tries}
      </div>

      {/* Main scrollable chat area */}
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
          <TerminalMessages
            messages={messages}
            typingAssistant={typingAssistant}
            onAssistantDone={handleAssistantDone}
            scrollContainerRef={scrollContainerRef}
            bottomRef={bottomRef}
            headerOffset={HEADER_HEIGHT}
            skipCurrentTypingRef={skipCurrentTypingRef}
          />

        {/* Option buttons */}
        {gameStage === 'options' && allMessagesRevealed && (
          <div className="my-4 flex flex-col gap-2">
            {options.map((opt, idx) => (
              <button
                key={opt.id}
                className={
                  "rounded px-4 py-2 font-bold text-black " +
                  (selectedOptionIdx === idx
                    ? "bg-green-400"
                    : "bg-green-800 hover:bg-green-600")
                }
                style={{ outline: selectedOptionIdx === idx ? '2px solid #fff' : 'none' }}
                onClick={() => {
                  setJustReturnedToOptions(false);
                  handleOptionSelect(opt, idx);
                }}
              >
                {opt.name}
              </button>
            ))}
          </div>
        )}

        {awaitingContinue && (
          <div className="text-green-400 mt-4">Press Enter to return to the mission menu.</div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* "Scroll to bottom" button */}
      {showScrollButton && (
        <button
          onClick={() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-20 right-4 bg-green-600 hover:bg-green-500 text-black font-bold py-1 px-2 rounded shadow z-10"
        >
          ↓ Scroll
        </button>
      )}

      {/* Sticky Footer Input Bar */}
      <div className="border-t border-green-700 flex items-center bg-black sticky bottom-0 z-10 px-4 py-2">
        <span className="mr-2 text-green-400">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => {
            if (!awaitingContinue) setInput(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              sendMessage();
              e.preventDefault();
            }
          }}
          className="bg-black text-green-400 outline-none flex-1"
          autoFocus
          disabled={(typingAssistant && !awaitingContinue) || gameStage === 'options' || gameStage === 'loading'}
        />
      </div>

      <ManageMessagesModal isOpen={false} onClose={() => {}} />
    </div>
  );
}
