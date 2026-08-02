"use client";

import { Fragment, useEffect, useState } from "react";

import { useReducedMotion } from "@/components/motion/use-reduced-motion";

/**
 * TypingHeadline
 *
 * Types the hero headline out once, character by character, then clears the
 * caret. Never loops.
 *
 * This is driven from JS rather than by CSS `animation-delay` on purpose. The
 * headline sits inside a FoldReveal, which holds its subtree at opacity 0 until
 * an IntersectionObserver fires after hydration — a CSS animation starts when
 * the stylesheet parses, so it would run to completion behind that curtain and
 * the heading would simply fade in already finished. Starting the run from an
 * effect ties it to the moment the element is actually on screen.
 *
 * Every character is rendered from the first paint and only its `opacity`
 * changes, so the heading occupies its final box throughout and nothing below
 * it shifts while typing. `aria-label` carries the text for assistive tech, so
 * the split-up spans are never announced letter by letter.
 */

/** Reads as real typing; 48 characters land in a little under two seconds. */
const CHAR_STEP_MS = 38;

export function TypingHeadline({
  text,
  className,
}: {
  readonly text: string;
  readonly className?: string;
}): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  // null until the client takes over. Server and first client render therefore
  // agree on the finished heading, so hydration has nothing to reconcile and a
  // JS-less visitor still gets the full text.
  const [typed, setTyped] = useState<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTyped(text.length);
      return;
    }

    setTyped(0);

    let frame = 0;
    let startedAt = 0;
    let last = -1;

    const tick = (now: number): void => {
      if (startedAt === 0) {
        startedAt = now;
      }

      const next = Math.min(text.length, Math.floor((now - startedAt) / CHAR_STEP_MS));
      if (next !== last) {
        last = next;
        setTyped(next);
      }

      if (next < text.length) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, prefersReducedMotion]);

  const revealed = typed ?? text.length;
  const isDone = revealed >= text.length;

  // Spaces sit between the word wrappers rather than inside them, so they take
  // an index without being rendered as a character.
  let cursor = 0;
  const words = text.split(" ").map((word) => {
    const chars = [...word].map((char) => ({ char, index: cursor++ }));
    cursor += 1;
    return chars;
  });

  // The caret follows the last *rendered* character, so it never blinks out for
  // a frame while the count is sitting on a space.
  let caretAfter = -1;
  for (const chars of words) {
    for (const { index } of chars) {
      if (index < revealed) {
        caretAfter = index;
      }
    }
  }

  const caret = prefersReducedMotion ? null : (
    <span className="type-caret" data-done={isDone ? "true" : "false"} aria-hidden="true" />
  );

  return (
    <h1 className={className} aria-label={text}>
      <span aria-hidden="true">
        {caretAfter === -1 ? caret : null}
        {words.map((chars, wordIndex) => (
          <span key={`${wordIndex}-${chars.map((c) => c.char).join("")}`}>
            {wordIndex > 0 ? " " : null}
            {/* inline-block keeps a word from breaking between its own
                characters; the space above stays a break opportunity. */}
            <span className="inline-block whitespace-nowrap">
              {chars.map(({ char, index }) => (
                <Fragment key={index}>
                  <span style={{ opacity: index < revealed ? 1 : 0 }}>{char}</span>
                  {index === caretAfter ? caret : null}
                </Fragment>
              ))}
            </span>
          </span>
        ))}
      </span>
    </h1>
  );
}
