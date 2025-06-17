import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import SlowTypingAssistant from "./SlowTypingAssistant";

export default function TerminalMessages({
  messages,
  typingAssistant,
  onAssistantDone,
  scrollContainerRef,
  bottomRef,
  headerOffset,
  skipCurrentTypingRef
}) {
  const [revealedCount, setRevealedCount] = useState(messages.length);
  const slowTypingRef = useRef(null);

  useEffect(() => {
    if (!typingAssistant) {
      setRevealedCount(messages.length);
      return;
    }
    let lastUser = -1;
    for (let i = messages.length - 1; i >= 0; --i) {
      if (messages[i].role === "user") {
        lastUser = i;
        break;
      }
    }
    setRevealedCount(lastUser + 1);
  }, [messages, typingAssistant]);

  let slowTypeCount = 0;
  for (let i = revealedCount; i < messages.length; ++i) {
    if (messages[i].role === "assistant") slowTypeCount++;
    else break;
  }
  const currentlyTypingIdx = slowTypeCount > 0 ? revealedCount : null;

  useEffect(() => {
    if (skipCurrentTypingRef) {
      skipCurrentTypingRef.current = () => {
        if (slowTypingRef.current) {
          slowTypingRef.current.skip();
        }
      };
    }
  }, [skipCurrentTypingRef, currentlyTypingIdx]);

  const handleSlowTyped = () => {
    setRevealedCount((count) => count + 1);
  };

  useEffect(() => {
    if (
      typingAssistant &&
      revealedCount >= messages.length
    ) {
      if (onAssistantDone) onAssistantDone();
    }
  }, [revealedCount, messages.length, typingAssistant, onAssistantDone]);

  return (
    <>
      {messages.map((msg, i) => {
        if (i < revealedCount) {
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
          return (
            <div key={i} className="whitespace-pre-wrap my-1">
              <span>
                <SlowTypingAssistant
                  ref={slowTypingRef}
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
          return <div key={i} />;
        }
      })}
    </>
  );
}
