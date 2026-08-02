"use client";

import { useEffect } from "react";

import { errorTracker } from "@/core/infrastructure/services/console-error-tracker.service";
import { actionClass } from "@/components/ui/action";

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
        <main className="mx-auto flex min-h-screen max-w-prose flex-col items-center justify-center gap-5 px-6 text-center">
          <div className="fold-panel rounded-3xl p-8 sm:p-10">
            <p className="text-text-muted text-xs tracking-[0.3em] uppercase">Global error</p>
            <h1 className="text-text-primary mt-4 text-2xl font-semibold tracking-tight">
              The application failed to load.
            </h1>
          </div>
          <button type="button" onClick={reset} className={actionClass()}>
            Reload
          </button>
        </main>
      </body>
    </html>
  );
}
