export interface ErrorContext {
  readonly [key: string]: string | number | boolean | undefined;
}

export interface ErrorTrackerContract {
  captureException(error: Error, context?: ErrorContext): void;
}
