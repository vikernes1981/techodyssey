import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";

/**
 * Slow-typing for a message.
 * - Any key or global tap/click instantly completes via parent ref.
 * - Calls onDone when finished (for input enabling, etc).
 */
const SlowTypingAssistant = forwardRef(function SlowTypingAssistant(
  {
    text,
    onDone,
    scrollContainerRef,
    bottomRef,
    headerOffset,
  },
  ref // <- for imperative skipping
) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);
  const skipRef = useRef(false);

  // Imperative skip for parent (global tap)
  useImperativeHandle(ref, () => ({
    skip() {
      handleSkip();
    },
  }));

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setDone(false);
    skipRef.current = false;

    function type() {
      setDisplayed(text.slice(0, i + 1));
      if (
        scrollContainerRef &&
        scrollContainerRef.current &&
        bottomRef &&
        bottomRef.current
      ) {
        const scrollElem = scrollContainerRef.current;
        const bottomElem = bottomRef.current;
        const target = bottomElem.offsetTop - (headerOffset || 0);
        scrollElem.scrollTo({ top: target, behavior: "auto" });
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
      if (!done && !skipRef.current) {
        handleSkip(event);
      }
    }
    window.addEventListener("keydown", handleKey, true);

    return () => {
      window.removeEventListener("keydown", handleKey, true);
      clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line
  }, [text, scrollContainerRef, bottomRef, headerOffset]);

  function handleSkip(event) {
    if (!done && !skipRef.current) {
      skipRef.current = true;
      setDisplayed(text);
      setDone(true);
      clearTimeout(timerRef.current);
      if (onDone) onDone();
      if (
        scrollContainerRef &&
        scrollContainerRef.current &&
        bottomRef &&
        bottomRef.current
      ) {
        const scrollElem = scrollContainerRef.current;
        const bottomElem = bottomRef.current;
        const target = bottomElem.offsetTop - (headerOffset || 0);
        scrollElem.scrollTo({ top: target, behavior: "auto" });
      }
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }

  return (
    <div
      style={{
        cursor: !done ? "pointer" : undefined,
        display: "block",
        width: "100%",
        minHeight: "2.5em",
        userSelect: "none",
        position: "relative",
      }}
    >
      {displayed}
      {!done && <span className="animate-pulse">|</span>}
    </div>
  );
});

export default SlowTypingAssistant;
