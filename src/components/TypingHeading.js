import React, { useEffect, useState } from "react";
import "./TypingHeading.css";

// Segments let parts of the heading keep their own styling (e.g. the accent name)
const SEGMENTS = [
  { text: "Hi, I'm " },
  { text: "Cyrus.", className: "hero-accent" },
];

const FULL_TEXT = SEGMENTS.map((s) => s.text).join("");
const START_DELAY = 2300; // waits for the page loader to finish
const TYPE_SPEED = 110;
const DELETE_SPEED = 55;
const HOLD_FULL = 2200; // pause once fully typed
const HOLD_EMPTY = 500; // pause before retyping

function TypingHeading() {
  const [typed, setTyped] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reducedMotion) {
      setTyped(FULL_TEXT.length);
      return undefined;
    }

    let delay;
    let next;
    if (!started) {
      delay = START_DELAY;
      next = () => setStarted(true);
    } else if (!deleting && typed === FULL_TEXT.length) {
      delay = HOLD_FULL;
      next = () => setDeleting(true);
    } else if (deleting && typed === 0) {
      delay = HOLD_EMPTY;
      next = () => setDeleting(false);
    } else if (deleting) {
      delay = DELETE_SPEED;
      next = () => setTyped(typed - 1);
    } else {
      // Small jitter so it feels like real typing
      delay = TYPE_SPEED + Math.random() * 60;
      next = () => setTyped(typed + 1);
    }

    const timer = setTimeout(next, delay);
    return () => clearTimeout(timer);
  }, [typed, deleting, started, reducedMotion]);

  let index = 0;
  const caret = <span className="typing-caret" key="caret" />;

  return (
    <>
      <span className="typing-sr-only">{FULL_TEXT}</span>
      <span aria-hidden="true">
        {typed === 0 && caret}
        {SEGMENTS.map(({ text, className }) => (
          <span key={text} className={className}>
            {Array.from(text).map((char) => {
              index += 1;
              // Untyped characters stay in the layout (hidden) so lines never reflow while typing
              return (
                <React.Fragment key={index}>
                  <span className={index > typed ? "typing-char--pending" : undefined}>{char}</span>
                  {index === typed && caret}
                </React.Fragment>
              );
            })}
          </span>
        ))}
      </span>
    </>
  );
}

export default TypingHeading;
