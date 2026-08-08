import { getBrandGlyph } from "@/components/ui/brand-glyphs";
import { resolveTechGlyph } from "@/components/ui/tech-logos";
import { cn } from "@/core/utils/cn";

/**
 * A brand mark at display size, for the places where the logo is the subject
 * rather than a label's ornament — a game card, a masthead.
 *
 * Like TechBadge it renders in `currentColor` and holds the brand's own colour
 * back for hover; unlike TechBadge it has no text beside it, so the name is
 * carried in the accessible label instead of being dropped.
 */
export function BrandMark({
  label,
  glyphId,
  className,
}: {
  readonly label: string;
  readonly glyphId?: string | undefined;
  readonly className?: string;
}): React.JSX.Element | null {
  const resolved = glyphId ?? resolveTechGlyph(label);
  const glyph = resolved ? getBrandGlyph(resolved) : undefined;

  if (!glyph) return null;

  return (
    <span
      className={cn(
        "border-border-subtle bg-surface-overlay text-text-secondary inline-flex h-12 w-12 items-center justify-center rounded-2xl border transition group-hover:text-[var(--brand)]",
        className,
      )}
      style={{ "--brand": glyph.hex } as React.CSSProperties}
    >
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label={glyph.title}
        className="h-6 w-6"
        fill="currentColor"
      >
        <path d={glyph.path} />
      </svg>
    </span>
  );
}
