import { useEffect, useRef, useState, forwardRef, useImperativeHandle, useCallback } from "react";

/**
 * SlowTypingAssistant
 * 
 * Displays text as if it's being typed out character by character, with optional skipping,
 * sound, and scroll-to-bottom support. Exposes imperative methods via ref.
 */
const SlowTypingAssistant = forwardRef(function SlowTypingAssistant(
  {
    text, // The text to display
    onDone, // Callback when typing is complete
    scrollContainerRef, // Ref to the scrollable container (for auto-scroll)
    bottomRef, // Ref to the element to scroll to
    headerOffset = 0, // Offset for scrolling (e.g., sticky header)
    typingSpeed = 'normal', // Typing speed: 'instant', 'fast', 'normal', 'slow'
    enableSound = false, // Play sound on skip
    className = "",
    cursorStyle = 'block' // Cursor style: 'block', 'line', 'underscore'
  },
  ref
) {
  // State for displayed text, typing completion, cursor visibility, and current char index
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  // Refs for timers, skip state, activity, and scroll throttling
  const timerRef = useRef(null);
  const skipRef = useRef(false);
  const cursorTimerRef = useRef(null);
  const isActiveRef = useRef(true);
  const lastScrollTimeRef = useRef(0);

  /**
   * Scrolls the container to the bottom element, throttled to ~60fps.
   */
  const throttledScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollTimeRef.current < 16) return;
    lastScrollTimeRef.current = now;

    if (
      scrollContainerRef?.current &&
      bottomRef?.current &&
      isActiveRef.current
    ) {
      const scrollElem = scrollContainerRef.current;
      const bottomElem = bottomRef.current;
      const target = bottomElem.offsetTop - (headerOffset || 0);

      requestAnimationFrame(() => {
        if (scrollElem && isActiveRef.current) {
          scrollElem.scrollTo({ top: target, behavior: "auto" });
        }
      });
    }
  }, [scrollContainerRef, bottomRef, headerOffset]);

  /**
   * Handles blinking cursor effect while typing.
   */
  useEffect(() => {
    if (!done) {
      cursorTimerRef.current = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530);
    } else {
      setShowCursor(false);
    }

    return () => {
      if (cursorTimerRef.current) {
        clearInterval(cursorTimerRef.current);
      }
    };
  }, [done]);

  /**
   * Returns the delay (ms) between each character, based on typingSpeed.
   */
  const getTypingDelay = useCallback(() => {
    const speeds = {
      instant: 0,
      fast: 12,
      normal: 18,
      slow: 35
    };
    const baseDelay = speeds[typingSpeed] || speeds.normal;
    return baseDelay + Math.random() * 8;
  }, [typingSpeed]);

  /**
   * Expose imperative methods to parent via ref.
   */
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

  /**
   * Main typing effect: types out the text character by character.
   * Handles skip, instant mode, and cleanup.
   */
  useEffect(() => {
    if (!text) {
      setDone(true);
      if (onDone) onDone();
      return;
    }

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

        throttledScroll();

        charIndex++;
        timerRef.current = setTimeout(typeCharacter, getTypingDelay());
      } else {
        setDone(true);
        if (onDone) onDone();
      }
    };

    typeCharacter();

    return () => {
      isActiveRef.current = false;
      clearTimeout(timerRef.current);
    };
  }, [text, typingSpeed, throttledScroll, getTypingDelay, onDone]);

  /**
   * Handles skipping the typing animation, showing all text at once.
   * Optionally plays a sound and calls onDone.
   */
  const handleSkip = useCallback((event) => {
    if (done || skipRef.current) return;

    skipRef.current = true;
    clearTimeout(timerRef.current);

    setDisplayed(text);
    setCurrentCharIndex(text.length);
    setDone(true);

    throttledScroll();

    // Play a short sound if enabled
    if (enableSound && typeof window !== 'undefined' && window.AudioContext) {
      try {
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
      } catch (error) {}
    }

    if (onDone) onDone();

    // Prevent default browser actions for skip keys
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, [done, text, throttledScroll, enableSound, onDone]);

  /**
   * Adds keyboard event listener for skipping typing with certain keys.
   */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!done && !skipRef.current && isActiveRef.current) {
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

  /**
   * Cleanup on unmount: clear timers and mark as inactive.
   */
  useEffect(() => {
    return () => {
      isActiveRef.current = false;
      clearTimeout(timerRef.current);
      clearInterval(cursorTimerRef.current);
    };
  }, []);

  /**
   * Renders the blinking cursor according to the chosen style.
   */
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

  // Show error if no text is provided
  if (!text) {
    return (
      <div className="text-red-400 text-sm">
        Error: No text provided to SlowTypingAssistant
      </div>
    );
  }

  // Main render: displayed text, cursor, skip hint, and progress bar for long text
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
      <span className="text-green-400">
        {displayed}
      </span>
      {renderCursor()}
      {/* Show skip hint if text is long and not done */}
      {!done && displayed.length > 20 && (
        <div className="absolute -bottom-6 right-0 text-green-600 text-xs opacity-50 animate-pulse">
          Press any key to skip
        </div>
      )}
      {/* Show progress bar for very long text */}
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
