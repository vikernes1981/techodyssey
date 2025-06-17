import { useEffect, useRef, useState } from "react";

/**
 * Slow-typing for a message.
 * - Any key instantly completes.
 * - Calls onDone when finished (for input enabling, etc).
 */
export default function SlowTypingAssistant({ text, onDone, scrollContainerRef, bottomRef, headerOffset }) {  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

useEffect(() => {
    let i = 0;
    setDisplayed('');
    setDone(false);

    function type() {
      setDisplayed(text.slice(0, i + 1));
      // Manual scroll with offset
      if (
        scrollContainerRef &&
        scrollContainerRef.current &&
        bottomRef &&
        bottomRef.current
      ) {
        const scrollElem = scrollContainerRef.current;
        const bottomElem = bottomRef.current;
        // Scroll so bottomElem is visible just **below** the header
        const target = bottomElem.offsetTop - (headerOffset || 0);
        scrollElem.scrollTo({ top: target, behavior: 'auto' });
      }
      if (i < text.length - 1) {
        i++;
        timerRef.current = setTimeout(type, 18);
      } else {
        setDone(true);
        if (onDone) onDone();
      }
    }
    type();

    function handleKey(event) {
      if (!done) {
        setDisplayed(text);
        setDone(true);
        clearTimeout(timerRef.current);
        if (onDone) onDone();
        event.preventDefault();
        event.stopPropagation();
        // Also scroll to final position after skip
        if (
          scrollContainerRef &&
          scrollContainerRef.current &&
          bottomRef &&
          bottomRef.current
        ) {
          const scrollElem = scrollContainerRef.current;
          const bottomElem = bottomRef.current;
          const target = bottomElem.offsetTop - (headerOffset || 0);
          scrollElem.scrollTo({ top: target, behavior: 'auto' });
        }
      }
    }
    window.addEventListener('keydown', handleKey, true);

    return () => {
      window.removeEventListener('keydown', handleKey, true);
      clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && <span className="animate-pulse">|</span>}
    </span>
  );
}