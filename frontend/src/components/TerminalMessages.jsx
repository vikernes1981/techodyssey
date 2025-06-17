import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import SlowTypingAssistant from "./SlowTypingAssistant";

/**
 * Renders messages, using slow typing for all **new assistant messages at the end**, one after another.
 */
export default function TerminalMessages({
    messages,
    typingAssistant,
    onAssistantDone,
    scrollContainerRef,
    bottomRef,
    headerOffset,
    }) {
  // This is the index of the last "fully rendered" message
  const [revealedCount, setRevealedCount] = useState(messages.length);

  // Whenever the message array changes, re-run the typing process if needed
  useEffect(() => {
    if (!typingAssistant) {
      setRevealedCount(messages.length);
      return;
    }
    // Find how many assistant messages at the end should be slow-typed
    let lastUser = -1;
    for (let i = messages.length - 1; i >= 0; --i) {
      if (messages[i].role === "user") {
        lastUser = i;
        break;
      }
    }
    setRevealedCount(lastUser + 1);
  }, [messages, typingAssistant]);

  // Helper: how many need to be slow-typed?
  let slowTypeCount = 0;
  for (let i = revealedCount; i < messages.length; ++i) {
    if (messages[i].role === "assistant") slowTypeCount++;
    else break;
  }

  // The index of the message currently being slow-typed
  const currentlyTypingIdx =
    slowTypeCount > 0 ? revealedCount : null;

  // Callback for when one message finishes slow-typing
  const handleSlowTyped = () => {
    // Reveal the next assistant message (if any)
    setRevealedCount((count) => count + 1);
  };

  // When all are revealed, call onAssistantDone (to unlock input)
  useEffect(() => {
    if (
      typingAssistant &&
      revealedCount >= messages.length
    ) {
      if (onAssistantDone) onAssistantDone();
    }
    // Only run when these change
  }, [revealedCount, messages.length, typingAssistant, onAssistantDone]);

  return (
    <>
      {messages.map((msg, i) => {
        if (i < revealedCount) {
          // Fully revealed (either user or previously slow-typed assistant)
          if (msg.role === "user") {
            return (
              <div key={i} className="whitespace-pre-wrap my-1">
                <span className="text-green-400">$ {msg.content}</span>
              </div>
            );
          }
          return (
            <div key={i} className="whitespace-pre-wrap my-1">
              <div className="prose prose-invert prose-pre:bg-black prose-pre:text-white max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight, rehypeSanitize]}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          );
        } else if (
          i === currentlyTypingIdx &&
          msg.role === "assistant"
        ) {
          // This is the next assistant message to slow-type
          return (
            <div key={i} className="whitespace-pre-wrap my-1">
              <span>
                <SlowTypingAssistant
                  text={msg.content}
                  onDone={handleSlowTyped}
                  scrollContainerRef={scrollContainerRef}
                  bottomRef={bottomRef}
                  headerOffset={headerOffset}
                />
              </span>
            </div>
          );
        } else {
          // Not revealed yet (should never show, but fallback for safety)
          return <div key={i} />;
        }
      })}
    </>
  );
}
