import { describe, expect, it } from "vitest";

import { sectionLabel } from "@/features/projects/section-label";

describe("sectionLabel", () => {
  it("humanises a hyphenated slug", () => {
    expect(sectionLabel("what-was-built")).toBe("What was built");
    expect(sectionLabel("offline-sync")).toBe("Offline sync");
    expect(sectionLabel("sync-hardening")).toBe("Sync hardening");
  });

  it("capitalises a single word", () => {
    expect(sectionLabel("performance")).toBe("Performance");
    expect(sectionLabel("testing")).toBe("Testing");
  });

  it("keeps acronyms upper case", () => {
    expect(sectionLabel("ai")).toBe("AI");
    expect(sectionLabel("ocr")).toBe("OCR");
  });

  it("restores punctuation a slug cannot carry", () => {
    expect(sectionLabel("whats-next")).toBe("What's next");
    expect(sectionLabel("multi-tenant")).toBe("Multi-tenant");
  });

  // "Hook" is a writing term. A reader opening the page should not be shown
  // the vocabulary the content model happens to use internally.
  it("renames the internal ones", () => {
    expect(sectionLabel("hook")).toBe("Overview");
  });

  it("never returns a raw slug for an unknown id", () => {
    expect(sectionLabel("some-new-section")).toBe("Some new section");
  });
});
