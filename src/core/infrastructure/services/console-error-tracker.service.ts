import type {
  ErrorContext,
  ErrorTrackerContract,
} from "@/core/contracts/services/error-tracker.contract";

/**
 * ConsoleErrorTrackerService
 *
 * Default implementation of ErrorTrackerContract. Structured logging today;
 * when a hosted error tracker is added, it becomes a new file implementing
 * the same contract (e.g. sentry-error-tracker.service.ts) swapped in at
 * the composition root — error.tsx and global-error.tsx never change.
 */
export class ConsoleErrorTrackerService implements ErrorTrackerContract {
  captureException(error: Error, context?: ErrorContext): void {
    console.error("[error-tracker]", error.message, { stack: error.stack, ...context });
  }
}

export const errorTracker: ErrorTrackerContract = new ConsoleErrorTrackerService();
