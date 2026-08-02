"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/layout/theme-provider";

/**
 * Consumes the toggle the ThemeProvider has always exposed but nothing ever
 * rendered — light mode was fully defined in tokens.css and unreachable.
 */
export function ThemeToggle(): React.JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      className="border-border-subtle bg-surface-overlay text-text-secondary hover:border-border-strong hover:text-text-primary inline-flex h-10 w-10 items-center justify-center rounded-full border transition"
    >
      {theme === "dark" ? (
        <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}
