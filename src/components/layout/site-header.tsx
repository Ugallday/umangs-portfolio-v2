"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

import { MotionToggle } from "@/components/layout/motion-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { siteConfig } from "@/config/site";

/**
 * Site header.
 *
 * Previously a bare <div> with a nav hidden below `md`, which left phone users
 * with no way to reach any section. It is now a real <header> landmark with a
 * disclosure menu on small screens.
 */
export function SiteHeader(): React.JSX.Element {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  // Navigating away should not leave the panel open behind the new page.
  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  function linkClass(href: string): string {
    const isCurrent = pathname === href;
    return isCurrent
      ? "text-text-primary transition"
      : "text-text-secondary hover:text-text-primary transition";
  }

  return (
    <header
      data-print-hide
      className="border-border-subtle sticky top-0 z-40 border-b bg-[color:var(--surface-base)]/82 backdrop-blur-xl"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="text-text-primary text-sm font-medium tracking-[0.09em] uppercase"
        >
          {siteConfig.shortName}
        </Link>

        <div className="flex items-center gap-3">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex flex-wrap items-center justify-end gap-x-5 gap-y-3 text-sm">
              {siteConfig.nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={linkClass(item.href)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <MotionToggle />
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="border-border-subtle bg-surface-overlay text-text-secondary hover:border-border-strong hover:text-text-primary inline-flex h-10 w-10 items-center justify-center rounded-full border transition md:hidden"
          >
            {isOpen ? (
              <X className="h-[18px] w-[18px]" aria-hidden="true" />
            ) : (
              <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Kept in the DOM only when open so its links never sit in the tab order
          of a closed menu. */}
      {isOpen ? (
        <nav
          id={menuId}
          aria-label="Primary mobile"
          className="border-border-subtle border-t md:hidden"
        >
          <ul className="mx-auto grid w-full max-w-7xl gap-1 px-6 py-4">
            {siteConfig.nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`${linkClass(item.href)} block rounded-xl px-3 py-3 text-base`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
