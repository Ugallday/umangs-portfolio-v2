import { describe, expect, it } from "vitest";

import { MdxProjectRepository } from "@/core/infrastructure/repositories/mdx-project-repository";

const repository = new MdxProjectRepository();

/**
 * These run against the real content/projects directory rather than a fixture.
 * That is the point: the repository's job is to prove the actual MDX files on
 * disk parse against the schema, so a malformed or half-migrated frontmatter
 * fails CI here instead of at build time on a route nobody opened.
 */
describe("MdxProjectRepository", () => {
  it("loads every published project without a schema violation", async () => {
    const projects = await repository.findAllPublished();
    expect(projects.length).toBeGreaterThan(0);
  });

  it("returns published projects sorted by order", async () => {
    const orders = (await repository.findAllPublished()).map((project) => project.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it("excludes drafts", async () => {
    const projects = await repository.findAllPublished();
    expect(projects.every((project) => project.status === "published")).toBe(true);
  });

  it("finds a project by slug", async () => {
    const project = await repository.findBySlug("vat-billing-system");
    expect(project?.slug).toBe("vat-billing-system");
  });

  /**
   * findBySlug swallows both "no such file" and "frontmatter failed to parse"
   * into null, because the caller's only sensible response to either is a 404.
   */
  it("returns null for a slug with no file behind it", async () => {
    await expect(repository.findBySlug("does-not-exist")).resolves.toBeNull();
  });

  it("returns null rather than escaping the content directory", async () => {
    await expect(repository.findBySlug("../../package.json")).resolves.toBeNull();
  });
});
