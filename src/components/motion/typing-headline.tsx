import type { CSSProperties } from "react";

/**
 * TypingHeadline
 *
 * Types the hero headline out once on load, then leaves a blinking caret.
 *
 * Deliberately not a client component and deliberately not stateful. Every
 * character is rendered up front and only its `opacity` is animated, on a
 * per-character `animation-delay`. That buys three things a JS typewriter
 * does not:
 *
 *   - the full headline is in the server-rendered HTML for crawlers,
 *   - the heading occupies its final box from the first frame, so nothing
 *     below it shifts while the animation runs,
 *   - no hydration flash, because there is no state to reconcile.
 *
 * `animation-fill-mode: forwards` plus a finite iteration count is what makes
 * this run exactly once. The reduced-motion opt-out lives beside the keyframes
 * in globals.css.
 */

/** ~26ms a character reads as typing without holding the hero hostage. */
const CHAR_STEP_MS = 26;
/** Short enough to land crisply rather than read as a fade-in. */
const CHAR_FADE_MS = 90;

interface CharModel {
  readonly char: string;
  readonly delayMs: number;
}

export function TypingHeadline({
  text,
  className,
}: {
  readonly text: string;
  readonly className?: string;
}): React.JSX.Element {
  // Spaces consume a step of their own so the rhythm stays even across words.
  let step = 0;
  const words: readonly (readonly CharModel[])[] = text.split(" ").map((word) => {
    const chars = [...word].map((char) => ({ char, delayMs: step++ * CHAR_STEP_MS }));
    step += 1;
    return chars;
  });

  const caretDelayMs = text.length * CHAR_STEP_MS + CHAR_FADE_MS;

  return (
    // aria-label carries the heading for assistive tech, so the split-up
    // character spans are never announced one letter at a time.
    <h1 className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((chars, wordIndex) => (
          <span key={`${wordIndex}-${chars.map((c) => c.char).join("")}`}>
            {wordIndex > 0 ? " " : null}
            {/* inline-block keeps a word from breaking between its own
                characters; the space above stays a normal break opportunity. */}
            <span className="inline-block whitespace-nowrap">
              {chars.map(({ char, delayMs }) => (
                <span
                  key={`${delayMs}-${char}`}
                  className="type-char"
                  style={{ animationDelay: `${delayMs}ms` }}
                >
                  {char}
                </span>
              ))}
            </span>
          </span>
        ))}
        <span
          className="type-caret"
          style={{ animationDelay: `${caretDelayMs}ms` } as CSSProperties}
        />
      </span>
    </h1>
  );
}
