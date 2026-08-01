"use client";

import { useEffect } from "react";

import { errorTracker } from "@/core/infrastructure/services/console-error-tracker.service";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.JSX.Element {
  useEffect(() => {
    errorTracker.captureException(error, { digest: error.digest, scope: "root-layout" });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-2xl font-semibold">The application failed to load.</h1>
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            Reload
          </button>
        </main>
      </body>
    </html>
  );
}
