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
    <main className="mx-auto flex min-h-[60vh] max-w-prose flex-col items-center justify-center gap-5 px-6 text-center">
      <div className="fold-panel rounded-[2rem] p-8 sm:p-10">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-text-primary text-2xl font-semibold tracking-tight"
        >
          Something folded incorrectly.
        </h1>
        <p className="text-text-secondary mt-4">
          An unexpected error occurred while rendering this page. It has been logged.
        </p>
      </div>
      <button
        type="button"
        onClick={reset}
        className="bg-accent-default text-text-on-accent hover:bg-accent-hover inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition"
      >
        Try again
      </button>
    </main>
  );
}
