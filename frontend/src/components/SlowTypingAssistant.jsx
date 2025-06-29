import { useEffect, useRef, useState, forwardRef, useImperativeHandle, useCallback } from "react";

/**
 * Enterprise-grade slow-typing component for immersive terminal experience
 * Features: Variable typing speed, enhanced cursor, performance optimization, error handling
 */
const SlowTypingAssistant = forwardRef(function SlowTypingAssistant(
  {
    text,
    onDone,
    scrollContainerRef,
    bottomRef,
    headerOffset = 0,
    typingSpeed = 'normal', // 'slow', 'normal', 'fast', 'instant'
    enableSound = false,
    className = "",
    cursorStyle = 'block' // 'block', 'line', 'underscore'
  },
  ref
) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  
  // Refs for cleanup and control
  const timerRef = useRef(null);
  const skipRef = useRef(false);
  const cursorTimerRef = useRef(null);
  const isActiveRef = useRef(true);
  const lastScrollTimeRef = useRef(0);

  // Performance: Throttled scroll function
  const throttledScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollTimeRef.current < 16) return; // ~60fps throttling
    lastScrollTimeRef.current = now;

    if (
      scrollContainerRef?.current &&
      bottomRef?.current &&
      isActiveRef.current
    ) {
      const scrollElem = scrollContainerRef.current;
      const bottomElem = bottomRef.current;
      const target = bottomElem.offsetTop - (headerOffset || 0);
      
      // Use requestAnimationFrame for smooth scrolling
      requestAnimationFrame(() => {
        if (scrollElem && isActiveRef.current) {
          scrollElem.scrollTo({ top: target, behavior: "auto" });
        }
      });
    }
  }, [scrollContainerRef, bottomRef, headerOffset]);

  // Enhanced cursor blinking with better timing
  useEffect(() => {
    if (!done) {
      cursorTimerRef.current = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530); // Authentic terminal cursor timing
    } else {
      setShowCursor(false);
    }

    return () => {
      if (cursorTimerRef.current) {
        clearInterval(cursorTimerRef.current);
      }
    };
  }, [done]);

  // Typing speed configuration
  const getTypingDelay = useCallback(() => {
    const speeds = {
      instant: 0,
      fast: 12,
      normal: 18,
      slow: 35
    };
    
    // Add slight randomness for human-like feel
    const baseDelay = speeds[typingSpeed] || speeds.normal;
    return baseDelay + Math.random() * 8;
  }, [typingSpeed]);

  // Imperative skip API for parent components
  useImperativeHandle(ref, () => ({
    skip: handleSkip,
    isComplete: () => done,
    getCurrentText: () => displayed,
    reset: () => {
      skipRef.current = false;
      setDisplayed("");
      setDone(false);
      setCurrentCharIndex(0);
    }
  }), [done, displayed]);

  // Main typing effect with enhanced performance
  useEffect(() => {
    if (!text) {
      setDone(true);
      if (onDone) onDone();
      return;
    }

    // Reset state
    setDisplayed("");
    setDone(false);
    setCurrentCharIndex(0);
    skipRef.current = false;
    isActiveRef.current = true;

    if (typingSpeed === 'instant') {
      setDisplayed(text);
      setDone(true);
      throttledScroll();
      if (onDone) onDone();
      return;
    }

    let charIndex = 0;

    const typeCharacter = () => {
      if (skipRef.current || !isActiveRef.current) return;

      if (charIndex < text.length) {
        const newDisplayed = text.slice(0, charIndex + 1);
        setDisplayed(newDisplayed);
        setCurrentCharIndex(charIndex);
        
        // Throttled scroll update
        throttledScroll();
        
        charIndex++;
        timerRef.current = setTimeout(typeCharacter, getTypingDelay());
      } else {
        // Typing complete
        setDone(true);
        if (onDone) onDone();
      }
    };

    // Start typing
    typeCharacter();

    // Cleanup function
    return () => {
      isActiveRef.current = false;
      clearTimeout(timerRef.current);
    };
  }, [text, typingSpeed, throttledScroll, getTypingDelay, onDone]);

  // Enhanced skip function with better UX
  const handleSkip = useCallback((event) => {
    if (done || skipRef.current) return;

    skipRef.current = true;
    clearTimeout(timerRef.current);
    
    // Instantly show full text
    setDisplayed(text);
    setCurrentCharIndex(text.length);
    setDone(true);
    
    // Immediate scroll to final position
    throttledScroll();
    
    // Sound effect for skip (if enabled)
    if (enableSound && typeof window !== 'undefined' && window.AudioContext) {
      try {
        // Simple beep sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (error) {
        // Silently fail if audio not supported
      }
    }
    
    if (onDone) onDone();
    
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, [done, text, throttledScroll, enableSound, onDone]);

  // Enhanced keyboard handling
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!done && !skipRef.current && isActiveRef.current) {
        // Allow common skip keys
        if (
          event.key === ' ' ||
          event.key === 'Enter' ||
          event.key === 'Escape' ||
          event.key === 'ArrowDown' ||
          event.key === 'PageDown'
        ) {
          handleSkip(event);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [done, handleSkip]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isActiveRef.current = false;
      clearTimeout(timerRef.current);
      clearInterval(cursorTimerRef.current);
    };
  }, []);

  // Cursor rendering based on style
  const renderCursor = () => {
    if (done || !showCursor) return null;

    const cursorStyles = {
      block: "bg-green-400 text-black ml-0.5 animate-pulse",
      line: "border-l-2 border-green-400 ml-0.5 animate-pulse",
      underscore: "border-b-2 border-green-400 ml-0.5 animate-pulse"
    };

    const cursorChar = cursorStyle === 'block' ? '▋' : 
                     cursorStyle === 'line' ? '' : '_';

    return (
      <span className={`${cursorStyles[cursorStyle]} inline-block`}>
        {cursorChar}
      </span>
    );
  };

  // Error boundary fallback
  if (!text) {
    return (
      <div className="text-red-400 text-sm">
        Error: No text provided to SlowTypingAssistant
      </div>
    );
  }

  return (
    <div
      className={`
        ${className}
        ${!done ? 'cursor-pointer' : ''}
        select-none
        relative
        w-full
        min-h-[2.5em]
        leading-relaxed
        transition-all
        duration-200
      `}
      onClick={!done ? handleSkip : undefined}
      onTouchStart={!done ? handleSkip : undefined}
      style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
        letterSpacing: "0.025em"
      }}
      aria-live="polite"
      aria-label={done ? "Text complete" : "Text typing in progress"}
    >
      {/* Main text content */}
      <span className="text-green-400">
        {displayed}
      </span>
      
      {/* Cursor */}
      {renderCursor()}
      
      {/* Skip hint (subtle) */}
      {!done && displayed.length > 20 && (
        <div className="absolute -bottom-6 right-0 text-green-600 text-xs opacity-50 animate-pulse">
          Press any key to skip
        </div>
      )}
      
      {/* Progress indicator for long text */}
      {!done && text.length > 200 && (
        <div className="absolute -bottom-8 left-0 w-full">
          <div className="w-full bg-gray-800 rounded-full h-1">
            <div 
              className="bg-green-600 h-1 rounded-full transition-all duration-100"
              style={{ 
                width: `${(displayed.length / text.length) * 100}%` 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
});

export default SlowTypingAssistant;