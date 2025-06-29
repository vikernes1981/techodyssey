// components/MissionPlay.jsx - FIXED VERSION

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TerminalMessages from './TerminalMessages';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

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
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typingAssistant] = useState(false);
  const [awaitingContinue, setAwaitingContinue] = useState(false);
  const [missionId, setMissionId] = useState(null); // Track mission ID separately
  const inputRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [awaitingContinue]);

  useEffect(() => {
    // Only initialize if this is a new mission
    if (!mission?.id || mission.id === missionId) return;
    
    console.log('Initializing new mission:', mission.id);
    setMissionId(mission.id);
    
    // Initialize messages with mission info
    const initialMessages = [
      { 
        role: 'assistant', 
        content: `🎯 **${mission.title || mission.name}**`,
        timestamp: new Date().toISOString()
      },
      { 
        role: 'assistant', 
        content: `**Task:** ${mission.action || 'Complete the following exercise'}`,
        timestamp: new Date().toISOString()
      }
    ];

    // Add mission intro if available
    if (mission.intro) {
      initialMessages.push({
        role: 'assistant', 
        content: mission.intro,
        timestamp: new Date().toISOString()
      });
    }

    // Add instruction prompt
    initialMessages.push({
      role: 'assistant', 
      content: '💻 **Ready for your command:**\n\nType your Linux command below and press Enter to execute it.',
      timestamp: new Date().toISOString()
    });

    setMessages(initialMessages);
    setTypingAssistant(false);
    setAwaitingContinue(false);
    setInput('');
    if (setTries) {
      setTries(0); // Ensure this is always called with a number
    }
  }, [mission?.id, missionId, setTries]); // Only run when mission ID actually changes

  const handleAssistantDone = () => {
    setTypingAssistant(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    const userInput = input.trim();
    
    console.log('Current input before clearing:', input);
    setInput(''); // Clear input
    console.log('Input cleared, submitting:', userInput);

    // Add user input to messages immediately
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userInput,
      timestamp: new Date().toISOString()
    }]);

    try {
      console.log('Submitting mission attempt:', {
        input: userInput,
        challengeId,
        missionId: mission.id,
        tries: typeof tries === 'number' ? tries : 0,
        xp: typeof xp === 'number' ? xp : 0
      });

      const res = await axios.post(`${API_BASE_URL}/rhcsa-game/mission/attempt`, {
        input: userInput,
        challengeId,
        missionId: mission.id,
        tries: typeof tries === 'number' ? tries : 0, // Ensure it's always a number
        xp: typeof xp === 'number' ? xp : 0 // Ensure it's always a number
      });

      console.log('Mission attempt response:', res.data);
      const data = res.data;

      // Handle the response based on success/failure
      if (data.success) {
        // Success response
        let successMessage = data.output || '✅ Correct!';
        
        // Add mission extras if available
        if (data.missionExtras) {
          const extras = data.missionExtras;
          let extraContent = '';
          
          if (extras.output) {
            extraContent += `\n\n📋 **Example Output:**\n\`\`\`\n${extras.output}\n\`\`\``;
          }
          
          if (extras.aspects && Array.isArray(extras.aspects)) {
            extraContent += `\n\n🔍 **Command Breakdown:**\n${extras.aspects.map(aspect => `• ${aspect}`).join('\n')}`;
          }
          
          if (extras.options && Array.isArray(extras.options)) {
            extraContent += `\n\n⚙️ **Command Options:**\n${extras.options.map(option => `• ${option}`).join('\n')}`;
          }
          
          if (extras.outro) {
            extraContent += `\n\n${extras.outro}`;
          }
          
          successMessage += extraContent;
        }

        setMessages(prev => [...prev, {
          role: 'assistant',
          content: successMessage,
          timestamp: new Date().toISOString()
        }]);

        setAwaitingContinue(true);
        setTries(0);
      } else {
        // Failure response
        let failureMessage = data.output || '❌ Incorrect command.';
        
        if (data.hint) {
          failureMessage += `\n\n💡 **Hint:** ${data.hint}`;
        }
        
        failureMessage += '\n\nTry again! Remember to check the command syntax and options.';

        setMessages(prev => [...prev, {
          role: 'assistant',
          content: failureMessage,
          timestamp: new Date().toISOString()
        }]);

        setTries(prev => prev + 1);
      }

      // Update XP
      if (typeof data.xp === 'number') {
        setXp(data.xp);
      }

    } catch (err) {
      console.error('Mission attempt error:', err);
      
      let errorMessage = '⚠️ **System Error**\n\nUnable to process your command. ';
      
      if (err.response?.status === 404) {
        errorMessage += 'Mission not found. Please check the mission configuration.';
      } else if (err.response?.status >= 500) {
        errorMessage += 'Server error. Please try again in a moment.';
      } else if (err.code === 'ECONNABORTED') {
        errorMessage += 'Connection timeout. Please check your internet connection.';
      } else {
        errorMessage += 'Please try again or contact support if the issue persists.';
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage,
        timestamp: new Date().toISOString()
      }]);
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
    <div className="mission-play-container w-full max-w-none">
      {/* Enhanced Header */}
      <div className="border border-green-600 rounded-lg p-4 mb-6 bg-gray-900/30">
        <div className="text-center">
          <div className="text-green-300 text-lg font-bold mb-2">
            🎮 Mission In Progress 🎮
          </div>
          <div className="text-green-500 text-sm">
            {mission.title || mission.name} • XP: {xp} • Attempts: {tries}
          </div>
        </div>
      </div>

      {/* Terminal Messages */}
      <TerminalMessages
        messages={messages}
        typingAssistant={typingAssistant}
        setTypingAssistant={setTypingAssistant}
        onAssistantDone={handleAssistantDone}
        scrollContainerRef={scrollContainerRef}
        bottomRef={bottomRef}
        headerOffset={0}
        skipCurrentTypingRef={skipCurrentTypingRef}
        showTimestamps={false}
        className="mission-play-messages"
      />
      
      {/* Command Input */}
      {!awaitingContinue && (
        <div className="border-t border-green-700 flex items-center bg-black px-4 py-3 mt-4 rounded-b-lg">
          <span className="mr-3 text-green-400 font-bold text-lg">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => {
              console.log('Input changing to:', e.target.value);
              setInput(e.target.value);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSubmit();
                e.preventDefault();
              }
            }}
            className="bg-black text-green-400 outline-none flex-1 font-mono text-lg"
            placeholder="Enter your Linux command here..."
            autoFocus
            disabled={typingAssistant}
          />
          <div className="ml-4 text-green-600 text-sm">
            Press Enter to execute
          </div>
        </div>
      )}
      
      {/* Mission Complete - Continue Prompt */}
      {awaitingContinue && (
        <div className="mt-6">
          <div className="bg-green-900/20 border border-green-600 rounded-lg p-6">
            <div className="text-center">
              <div className="text-green-300 text-xl font-bold mb-2">
                🎉 Mission Complete! 🎉
              </div>
              <div className="text-green-400 mb-4">
                Great job! You've successfully completed this mission.
              </div>
              <button
                onClick={onComplete}
                className="px-6 py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg transition-colors duration-200 transform hover:scale-105"
              >
                📋 Return to Mission Menu
              </button>
              <div className="text-green-600 text-sm mt-3">
                Or press Enter anywhere to continue
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}