import { ChevronDown } from "lucide-react";

/**
 * The open/closed affordance inside a <summary>.
 *
 * This replaced the word "Fold", which was doing three things badly: it read
 * as a label rather than a control, it never said which way it would go, and
 * it rotated 180° on open — animating a word upside down, which is nonsense
 * for text and only ever made sense for an arrow.
 *
 * A chevron pointing at what it will reveal is the convention people already
 * know. It is decorative here: the <summary> is the real control and carries
 * the accessible name, so this is hidden from assistive technology.
 *
 * Requires `group` on the surrounding <details>.
 */
export function FoldToggle(): React.JSX.Element {
  return (
    <span
      aria-hidden="true"
      className="border-border-subtle bg-surface-overlay text-text-muted group-hover:border-border-strong group-hover:text-text-primary group-open:border-accent-default group-open:text-accent-default inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-200 group-open:rotate-180"
    >
      <ChevronDown className="h-4 w-4" />
    </span>
  );
}
