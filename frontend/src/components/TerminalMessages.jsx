import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import SlowTypingAssistant from "./SlowTypingAssistant";

/**
 * Enterprise-grade terminal message display component
 * Features: Enhanced performance, error handling, accessibility, visual polish
 */
export default function TerminalMessages({
  messages = [],
  typingAssistant = false,
  onAssistantDone,
  scrollContainerRef,
  bottomRef,
  headerOffset = 0,
  skipCurrentTypingRef,
  typingSpeed = 'normal',
  showTimestamps = false,
  enableSounds = false,
  maxMessages = 1000, // Performance limit
  className = ""
}) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [error, setError] = useState(null);
  const slowTypingRef = useRef(null);
  const lastMessagesLength = useRef(0);
  const messageRefs = useRef(new Map());

  // Performance: Memoize processed messages
  const processedMessages = useMemo(() => {
    if (!Array.isArray(messages)) {
      console.warn('TerminalMessages: messages prop should be an array');
      return [];
    }
    
    // Limit messages for performance
    const limitedMessages = messages.slice(-maxMessages);
    
    return limitedMessages.map((msg, index) => ({
      ...msg,
      id: msg.id || `msg-${index}`,
      timestamp: msg.timestamp || new Date().toISOString(),
      role: msg.role || 'assistant'
    }));
  }, [messages, maxMessages]);

  // Enhanced reveal logic with error handling
  useEffect(() => {
    try {
      if (!typingAssistant) {
        setRevealedCount(processedMessages.length);
        return;
      }

      // Find last user message to determine reveal point
      let lastUserIndex = -1;
      for (let i = processedMessages.length - 1; i >= 0; i--) {
        if (processedMessages[i].role === "user") {
          lastUserIndex = i;
          break;
        }
      }
      
      setRevealedCount(lastUserIndex + 1);
    } catch (err) {
      console.error('Error in reveal logic:', err);
      setError('Error processing messages');
    }
  }, [processedMessages, typingAssistant]);

  // Calculate current typing message
  const currentlyTypingInfo = useMemo(() => {
    if (!typingAssistant || revealedCount >= processedMessages.length) {
      return null;
    }

    let slowTypeCount = 0;
    for (let i = revealedCount; i < processedMessages.length; i++) {
      if (processedMessages[i].role === "assistant") {
        slowTypeCount++;
      } else {
        break;
      }
    }

    return slowTypeCount > 0 ? {
      index: revealedCount,
      message: processedMessages[revealedCount]
    } : null;
  }, [processedMessages, revealedCount, typingAssistant]);

  // Enhanced skip functionality
  useEffect(() => {
    if (skipCurrentTypingRef) {
      skipCurrentTypingRef.current = () => {
        if (slowTypingRef.current) {
          slowTypingRef.current.skip();
        }
      };
    }
  }, [skipCurrentTypingRef, currentlyTypingInfo]);

  // Handle slow typing completion
  const handleSlowTyped = useCallback(() => {
    setRevealedCount(count => count + 1);
  }, []);

  // Check if all messages are revealed and notify parent
  useEffect(() => {
    if (
      typingAssistant &&
      revealedCount >= processedMessages.length &&
      processedMessages.length > 0
    ) {
      if (onAssistantDone) {
        // Small delay to ensure smooth UX
        setTimeout(() => {
          onAssistantDone();
        }, 100);
      }
    }
  }, [revealedCount, processedMessages.length, typingAssistant, onAssistantDone]);

  // Enhanced message ref management
  const setMessageRef = useCallback((element, messageId) => {
    if (element) {
      messageRefs.current.set(messageId, element);
    } else {
      messageRefs.current.delete(messageId);
    }
  }, []);

  // Format timestamp for display
  const formatTimestamp = useCallback((timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return '';
    }
  }, []);

  // Enhanced markdown components with better styling
  const markdownComponents = useMemo(() => ({
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      
      if (inline) {
        return (
          <code 
            className="bg-gray-800 text-green-300 px-1 py-0.5 rounded text-sm font-mono border border-gray-700"
            {...props}
          >
            {children}
          </code>
        );
      }
      
      return (
        <div className="my-4 border border-green-600 rounded-lg overflow-hidden">
          {language && (
            <div className="bg-gray-800 px-3 py-1 text-green-300 text-xs border-b border-green-600">
              {language}
            </div>
          )}
          <pre className="bg-black p-4 overflow-x-auto">
            <code className="text-green-400 font-mono text-sm" {...props}>
              {children}
            </code>
          </pre>
        </div>
      );
    },
    
    pre: ({ children }) => (
      <div className="my-4 border border-green-600 rounded-lg overflow-hidden">
        <pre className="bg-black p-4 overflow-x-auto text-green-400 font-mono text-sm">
          {children}
        </pre>
      </div>
    ),
    
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-green-600 pl-4 my-4 text-green-300 italic">
        {children}
      </blockquote>
    ),
    
    h1: ({ children }) => (
      <h1 className="text-2xl font-bold text-green-300 my-4 border-b border-green-600 pb-2">
        {children}
      </h1>
    ),
    
    h2: ({ children }) => (
      <h2 className="text-xl font-bold text-green-300 my-3">
        {children}
      </h2>
    ),
    
    h3: ({ children }) => (
      <h3 className="text-lg font-bold text-green-300 my-2">
        {children}
      </h3>
    ),
    
    ul: ({ children }) => (
      <ul className="list-none my-3 space-y-1">
        {children}
      </ul>
    ),
    
    li: ({ children }) => (
      <li className="flex items-start">
        <span className="text-green-500 mr-2">▸</span>
        <span>{children}</span>
      </li>
    ),
    
    a: ({ href, children }) => (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-300 underline hover:text-green-200 transition-colors"
      >
        {children}
      </a>
    )
  }), []);

  // Error boundary fallback
  if (error) {
    return (
      <div className="text-red-400 bg-red-900/20 border border-red-600 rounded p-4 my-2">
        <div className="font-bold">Terminal Messages Error</div>
        <div className="text-sm mt-1">{error}</div>
        <button 
          onClick={() => setError(null)}
          className="mt-2 text-xs bg-red-800 hover:bg-red-700 px-2 py-1 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (processedMessages.length === 0) {
    return (
      <div className="text-green-600 text-sm italic my-4">
        No messages yet...
      </div>
    );
  }

  return (
    <div className={`terminal-messages ${className}`}>
      {processedMessages.map((msg, index) => {
        const isRevealed = index < revealedCount;
        const isCurrentlyTyping = currentlyTypingInfo?.index === index;
        const messageId = msg.id || `msg-${index}`;

        // Skip unrevealed messages that aren't currently typing
        if (!isRevealed && !isCurrentlyTyping) {
          return <div key={messageId} />;
        }

        const messageContent = (() => {
          // User messages
          if (msg.role === "user") {
            return (
              <div 
                className="whitespace-pre-wrap my-3 group"
                ref={(el) => setMessageRef(el, messageId)}
              >
                {showTimestamps && (
                  <div className="text-green-600 text-xs mb-1 opacity-60">
                    [{formatTimestamp(msg.timestamp)}]
                  </div>
                )}
                <div className="flex items-start">
                  <span className="text-green-500 mr-2 font-bold select-none">$</span>
                  <span className="text-green-400 font-mono">
                    {msg.content}
                  </span>
                </div>
              </div>
            );
          }

          // Assistant messages - typing vs revealed
          if (isCurrentlyTyping) {
            return (
              <div 
                className="whitespace-pre-wrap my-3"
                ref={(el) => setMessageRef(el, messageId)}
              >
                {showTimestamps && (
                  <div className="text-green-600 text-xs mb-1 opacity-60">
                    [{formatTimestamp(msg.timestamp)}]
                  </div>
                )}
                <SlowTypingAssistant
                  ref={slowTypingRef}
                  text={msg.content}
                  onDone={handleSlowTyped}
                  scrollContainerRef={scrollContainerRef}
                  bottomRef={bottomRef}
                  headerOffset={headerOffset}
                  typingSpeed={typingSpeed}
                  enableSound={enableSounds}
                  className="text-green-400"
                />
              </div>
            );
          }

          // Revealed assistant messages
          return (
            <div 
              className="whitespace-pre-wrap my-3 animate-fadeIn"
              ref={(el) => setMessageRef(el, messageId)}
            >
              {showTimestamps && (
                <div className="text-green-600 text-xs mb-1 opacity-60">
                  [{formatTimestamp(msg.timestamp)}]
                </div>
              )}
              <div className="prose prose-invert prose-pre:bg-black prose-pre:text-green-400 max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight, rehypeSanitize]}
                  components={markdownComponents}
                  className="text-green-400 leading-relaxed"
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          );
        })();

        return (
          <div 
            key={messageId}
            className={`
              message-container
              ${msg.role === 'user' ? 'user-message' : 'assistant-message'}
              ${isCurrentlyTyping ? 'typing' : 'revealed'}
            `}
            data-message-id={messageId}
            data-role={msg.role}
          >
            {messageContent}
          </div>
        );
      })}

      {/* Loading indicator for typing assistant */}
      {typingAssistant && !currentlyTypingInfo && revealedCount < processedMessages.length && (
        <div className="flex items-center text-green-600 my-3 animate-pulse">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="ml-3 text-sm">Processing...</span>
        </div>
      )}

      {/* Performance warning for large message counts */}
      {messages.length > maxMessages && (
        <div className="text-yellow-400 text-xs my-2 opacity-60">
          Showing last {maxMessages} messages for performance
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}