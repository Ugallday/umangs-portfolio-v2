import { cn } from "@/core/utils/cn";

/**
 * Icon-only external link with an accessible name and a tooltip that appears on
 * hover *and* keyboard focus — a `title` attribute would only cover hover, so
 * the label is a real element driven by group-hover/group-focus-visible.
 *
 * Focus styling is deliberately not defined here: globals.css applies a
 * :focus-visible outline to everything, so this inherits the site-wide ring.
 *
 * `className` exists so a call site can add to the shared treatment (the hero
 * card adds an accent glow) without forking the component and letting the two
 * placements drift apart.
 */
export function SocialLink({
  href,
  label,
  children,
  className,
}: {
  readonly href: string;
  readonly label: string;
  readonly children: React.ReactNode;
  readonly className?: string;
}): React.JSX.Element {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      aria-label={label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "group border-border-subtle bg-surface-overlay text-text-secondary hover:border-border-strong hover:text-text-primary relative inline-flex h-11 w-11 items-center justify-center rounded-full border transition duration-200 hover:scale-105 focus-visible:scale-105",
        className,
      )}
    >
      {children}
      <span
        role="tooltip"
        className="border-border-subtle bg-surface-raised text-text-primary pointer-events-none absolute -top-9 rounded-md border px-2 py-1 text-xs whitespace-nowrap opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {label}
      </span>
    </a>
  );
}
