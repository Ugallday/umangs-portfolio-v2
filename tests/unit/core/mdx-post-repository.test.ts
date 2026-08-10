import { describe, expect, it } from "vitest";

import { MdxPostRepository } from "@/core/infrastructure/repositories/mdx-post-repository";

const repository = new MdxPostRepository();

/**
 * Runs against the real content/writing directory, for the same reason the
 * project repository tests do: a draft that will not parse should fail here,
 * not on the day somebody flips its status to published.
 */
describe("MdxPostRepository", () => {
  it("parses every file on disk, drafts included", async () => {
    // findAllPublished parses first and filters second, so this throwing is
    // the signal that some file's frontmatter is malformed.
    await expect(repository.findAllPublished()).resolves.toBeDefined();
  });

  it("excludes drafts from the index", async () => {
    const posts = await repository.findAllPublished();
    expect(posts.every((post) => post.status === "published")).toBe(true);
  });

  it("returns published posts newest first", async () => {
    const dates = (await repository.findAllPublished()).map((post) => post.publishedOn);
    expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)));
  });

  /**
   * A draft must 404 rather than being served to anyone who guesses the slug —
   * otherwise "draft" means nothing. This slug is the seeded outline.
   */
  it("refuses to serve a draft by slug", async () => {
    await expect(repository.findBySlug("testing-a-double-entry-ledger")).resolves.toBeNull();
  });

  it("returns null for a slug with no file behind it", async () => {
    await expect(repository.findBySlug("does-not-exist")).resolves.toBeNull();
  });

  it("returns null rather than escaping the content directory", async () => {
    await expect(repository.findBySlug("../../package.json")).resolves.toBeNull();
  });

  /** Reading time is derived, never read from frontmatter, and never zero. */
  it("derives a non-zero reading time for every published post", async () => {
    const posts = await repository.findAllPublished();
    expect(posts.every((post) => post.readingMinutes >= 1)).toBe(true);
  });
});
