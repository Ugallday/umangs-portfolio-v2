import Link from "next/link";

import { cn } from "@/core/utils/cn";

/**
 * Buttons and button-styled links.
 *
 * The primary fill was inlined in five files with drifting sizes (px-4 py-2 in
 * some places, px-5 py-3 in others) and the outline variant likewise. Both
 * scales are defined once here.
 */
export type ActionVariant = "primary" | "secondary";
export type ActionSize = "sm" | "md";

const BASE = "inline-flex items-center justify-center rounded-full font-medium transition";

const VARIANT: Record<ActionVariant, string> = {
  primary: "bg-accent-default text-text-on-accent hover:bg-accent-hover",
  secondary:
    "border-border-default text-text-secondary hover:border-border-strong hover:text-text-primary border",
};

const SIZE: Record<ActionSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
};

export function actionClass({
  variant = "primary",
  size = "sm",
  className,
}: {
  readonly variant?: ActionVariant;
  readonly size?: ActionSize;
  readonly className?: string;
} = {}): string {
  return cn(BASE, VARIANT[variant], SIZE[size], className);
}

interface ActionLinkProps {
  readonly href: string;
  readonly children: React.ReactNode;
  readonly variant?: ActionVariant;
  readonly size?: ActionSize;
  readonly className?: string;
}

/** Uses next/link for internal hrefs and a plain anchor for external ones. */
export function ActionLink({
  href,
  children,
  variant,
  size,
  className,
}: ActionLinkProps): React.JSX.Element {
  const classes = actionClass({
    ...(variant ? { variant } : {}),
    ...(size ? { size } : {}),
    ...(className ? { className } : {}),
  });

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
