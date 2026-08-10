/**
 * Renders an ISO `YYYY-MM-DD` as "10 August 2026".
 *
 * Locale and time zone are both pinned. Left to the runtime's defaults the
 * server and the browser format the same post differently, which React reports
 * as a hydration mismatch — and a date built in the viewer's zone can land on
 * the previous day for anyone west of the author.
 */
export function formatPostDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
