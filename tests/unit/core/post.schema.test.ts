import { describe, expect, it } from "vitest";

import { postFrontmatterSchema } from "@/core/infrastructure/mdx/schemas/post.schema";

/** The minimum frontmatter a post file can carry and still be valid. */
function validFrontmatter(overrides: Record<string, unknown> = {}) {
  return {
    slug: "testing-a-double-entry-ledger",
    title: "How I test a double-entry ledger under concurrent offline sync",
    summary: "Three app instances, an in-memory PostgREST stand-in, and the invariants between.",
    publishedOn: "2026-08-10",
    topics: ["Correctness"],
    sections: [{ id: "the-problem", heading: "Heading", paragraphs: ["A paragraph."] }],
    status: "published",
    ...overrides,
  };
}

describe("postFrontmatterSchema", () => {
  it("accepts frontmatter with only the required fields", () => {
    expect(() => postFrontmatterSchema.parse(validFrontmatter())).not.toThrow();
  });

  /**
   * The regex is the whole point of typing `publishedOn` as a string: an
   * unquoted YAML date arrives from gray-matter as a Date in the server's own
   * zone, which shifts the rendered day for readers west of the author.
   */
  it("rejects a date that arrived as a Date rather than a quoted string", () => {
    expect(() =>
      postFrontmatterSchema.parse(validFrontmatter({ publishedOn: new Date("2026-08-10") })),
    ).toThrow();
  });

  it("rejects a date that is not ISO YYYY-MM-DD", () => {
    expect(() =>
      postFrontmatterSchema.parse(validFrontmatter({ publishedOn: "10 August 2026" })),
    ).toThrow();
    expect(() =>
      postFrontmatterSchema.parse(validFrontmatter({ publishedOn: "2026-8-10" })),
    ).toThrow();
  });

  it("rejects an unknown status", () => {
    expect(() => postFrontmatterSchema.parse(validFrontmatter({ status: "archived" }))).toThrow();
  });

  it("accepts a draft, so a malformed draft still fails at build time", () => {
    expect(() => postFrontmatterSchema.parse(validFrontmatter({ status: "draft" }))).not.toThrow();
  });

  it("requires at least one topic, one section, and one paragraph", () => {
    expect(() => postFrontmatterSchema.parse(validFrontmatter({ topics: [] }))).toThrow();
    expect(() => postFrontmatterSchema.parse(validFrontmatter({ sections: [] }))).toThrow();
    expect(() =>
      postFrontmatterSchema.parse(
        validFrontmatter({ sections: [{ id: "a", heading: "b", paragraphs: [] }] }),
      ),
    ).toThrow();
  });

  it("rejects a summary longer than 280 characters", () => {
    expect(() =>
      postFrontmatterSchema.parse(validFrontmatter({ summary: "x".repeat(281) })),
    ).toThrow();
  });
});
