import { getBrandGlyph } from "@/components/ui/brand-glyphs";
import { resolveTechGlyph } from "@/components/ui/tech-logos";
import { cn } from "@/core/utils/cn";

/**
 * A technology, with its mark.
 *
 * The glyph is drawn in `currentColor` so a wall of logos reads as one typographic
 * object rather than as a bag of clashing brand colours; the brand's own colour is
 * held back for hover, where it identifies a single item without shouting over the
 * page. Anything the vendored set has no mark for falls back to a monogram cut from
 * its own name, which keeps the row's rhythm intact instead of leaving a hole.
 */
export function TechBadge({
  label,
  glyphId,
  className,
}: {
  readonly label: string;
  /** Only needed where the label alone does not identify the product. */
  readonly glyphId?: string | undefined;
  readonly className?: string;
}): React.JSX.Element {
  const resolved = glyphId ?? resolveTechGlyph(label);
  const glyph = resolved ? getBrandGlyph(resolved) : undefined;

  return (
    <span
      className={cn(
        "border-border-default text-text-secondary hover:border-border-strong hover:text-text-primary group inline-flex items-center gap-2 rounded-full border py-1 pr-3 pl-1.5 text-xs font-medium transition",
        className,
      )}
      style={glyph ? ({ "--brand": glyph.hex } as React.CSSProperties) : undefined}
    >
      <span className="bg-surface-overlay text-text-muted inline-flex h-6 w-6 items-center justify-center rounded-full transition group-hover:text-[var(--brand)]">
        {glyph ? (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className="h-3.5 w-3.5"
            fill="currentColor"
          >
            <path d={glyph.path} />
          </svg>
        ) : (
          <span aria-hidden="true" className="font-serif text-[10px] leading-none">
            {monogram(label)}
          </span>
        )}
      </span>
      {label}
    </span>
  );
}

/**
 * Initials for a name with no vendored mark: one letter per word for a
 * multi-word name, otherwise the first two characters.
 */
function monogram(label: string): string {
  const words = label
    .replace(/[()]/g, "")
    .split(/[\s.]+/)
    .filter(Boolean);

  if (words.length > 1) {
    return words
      .slice(0, 2)
      .map((word) => word[0] ?? "")
      .join("")
      .toUpperCase();
  }

  return (words[0] ?? label).slice(0, 2).toUpperCase();
}
