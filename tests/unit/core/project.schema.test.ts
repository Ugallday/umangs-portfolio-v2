import { describe, expect, it } from "vitest";

import { projectFrontmatterSchema } from "@/core/infrastructure/mdx/schemas/project.schema";

/** The minimum frontmatter a project file can carry and still be valid. */
function validFrontmatter(overrides: Record<string, unknown> = {}) {
  return {
    slug: "vat-billing-system",
    title: "VAT Billing System",
    summary: "A multi-tenant, offline-first double-entry VAT accounting system.",
    phase: "case-study",
    period: "2023-present",
    role: "Sole engineer",
    organization: "NSA Travels",
    techStack: ["JavaScript"],
    visual: {
      eyebrow: "Key project",
      label: "One ledger, many tenants",
      description: "The accounting system behind the case study.",
    },
    sections: [{ id: "hook", heading: "Heading", body: "Body" }],
    order: 1,
    status: "published",
    ...overrides,
  };
}

describe("projectFrontmatterSchema", () => {
  it("accepts frontmatter with only the required fields", () => {
    expect(() => projectFrontmatterSchema.parse(validFrontmatter())).not.toThrow();
  });

  /**
   * These defaults are what let an existing project file stay valid when a new
   * optional field is introduced — the reason `metrics` could be added without
   * touching seven other MDX files.
   */
  it("defaults the optional list fields to empty arrays", () => {
    const parsed = projectFrontmatterSchema.parse(validFrontmatter());
    expect(parsed.metrics).toEqual([]);
    expect(parsed.links).toEqual([]);
    expect(parsed.sections[0]?.bullets).toEqual([]);
  });

  it("parses metrics when present", () => {
    const parsed = projectFrontmatterSchema.parse(
      validFrontmatter({ metrics: [{ value: "420 ms", label: "to import a day book" }] }),
    );
    expect(parsed.metrics).toEqual([{ value: "420 ms", label: "to import a day book" }]);
  });

  it("rejects a metric missing its label", () => {
    expect(() =>
      projectFrontmatterSchema.parse(validFrontmatter({ metrics: [{ value: "420 ms" }] })),
    ).toThrow();
  });

  it("rejects an empty metric value rather than rendering a blank figure", () => {
    expect(() =>
      projectFrontmatterSchema.parse(validFrontmatter({ metrics: [{ value: "", label: "x" }] })),
    ).toThrow();
  });

  it("rejects an unknown phase", () => {
    expect(() => projectFrontmatterSchema.parse(validFrontmatter({ phase: "someday" }))).toThrow();
  });

  it("rejects an unknown status", () => {
    expect(() =>
      projectFrontmatterSchema.parse(validFrontmatter({ status: "archived" })),
    ).toThrow();
  });

  // 280 characters is the cap that keeps a summary from overflowing the card
  // it renders in on the projects index.
  it("rejects a summary longer than 280 characters", () => {
    expect(() =>
      projectFrontmatterSchema.parse(validFrontmatter({ summary: "x".repeat(281) })),
    ).toThrow();
  });

  it("requires at least one tech stack entry and one section", () => {
    expect(() => projectFrontmatterSchema.parse(validFrontmatter({ techStack: [] }))).toThrow();
    expect(() => projectFrontmatterSchema.parse(validFrontmatter({ sections: [] }))).toThrow();
  });

  it("rejects a negative or fractional order", () => {
    expect(() => projectFrontmatterSchema.parse(validFrontmatter({ order: -1 }))).toThrow();
    expect(() => projectFrontmatterSchema.parse(validFrontmatter({ order: 1.5 }))).toThrow();
  });
});
