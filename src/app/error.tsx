"use client";

import { useEffect, useRef } from "react";

import { errorTracker } from "@/core/infrastructure/services/console-error-tracker.service";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.JSX.Element {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    errorTracker.captureException(error, { digest: error.digest });
    // Move focus to the error heading so screen reader users aren't left
    // stranded on whatever element had focus when the crash happened.
    headingRef.current?.focus();
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-prose flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-display text-text-primary">
        Something folded incorrectly.
      </h1>
      <p className="text-text-secondary">
        An unexpected error occurred while rendering this page. It has been logged.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-accent-default px-4 py-2 text-text-on-accent hover:bg-accent-hover"
      >
        Try again
      </button>
    </main>
  );
}
