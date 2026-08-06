import { afterEach, describe, expect, it, vi } from "vitest";

import { ConsoleErrorTrackerService } from "@/core/infrastructure/services/console-error-tracker.service";
import { VercelAnalyticsService } from "@/core/infrastructure/services/vercel-analytics.service";

const track = vi.hoisted(() => vi.fn());
vi.mock("@vercel/analytics", () => ({ track }));

afterEach(() => {
  vi.restoreAllMocks();
  track.mockClear();
});

describe("ConsoleErrorTrackerService", () => {
  it("logs the message, the stack, and any extra context", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const error = new Error("boom");

    new ConsoleErrorTrackerService().captureException(error, { route: "/projects" });

    expect(spy).toHaveBeenCalledWith(
      "[error-tracker]",
      "boom",
      expect.objectContaining({ stack: error.stack, route: "/projects" }),
    );
  });

  it("works without a context argument", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    new ConsoleErrorTrackerService().captureException(new Error("bare"));
    expect(spy).toHaveBeenCalledOnce();
  });
});

describe("VercelAnalyticsService", () => {
  it("forwards named events with their properties", () => {
    new VercelAnalyticsService().trackEvent("resume_download", { source: "hero" });
    expect(track).toHaveBeenCalledWith("resume_download", { source: "hero" });
  });

  it("forwards a bare event with no properties", () => {
    new VercelAnalyticsService().trackEvent("resume_download");
    expect(track).toHaveBeenCalledWith("resume_download", undefined);
  });

  it("records page views under a single stable event name", () => {
    new VercelAnalyticsService().trackPageView("/projects/vat-billing-system");
    expect(track).toHaveBeenCalledWith("page_view", { path: "/projects/vat-billing-system" });
  });
});
