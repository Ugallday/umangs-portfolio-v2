import { describe, expect, it, vi } from "vitest";

import {
  getProjectBySlug,
  listPublishedProjects,
} from "@/core/application/use-cases/project-use-cases";
import type { ProjectRepositoryContract } from "@/core/contracts/repositories/project-repository.contract";
import type { ProjectEntity } from "@/core/domain/entities/project.entity";

const project = { slug: "vat-billing-system" } as ProjectEntity;

function fakeRepository(
  overrides: Partial<ProjectRepositoryContract> = {},
): ProjectRepositoryContract {
  return {
    findAllPublished: vi.fn(async () => [project]),
    findBySlug: vi.fn(async () => project),
    ...overrides,
  };
}

/**
 * The use cases are deliberately thin — the value they carry is that call
 * sites depend on the contract rather than on MdxProjectRepository. These
 * tests pin that indirection: a fake with no filesystem behind it satisfies
 * them completely.
 */
describe("project use cases", () => {
  it("listPublishedProjects delegates to the repository", async () => {
    const repository = fakeRepository();
    await expect(listPublishedProjects(repository)).resolves.toEqual([project]);
    expect(repository.findAllPublished).toHaveBeenCalledOnce();
  });

  it("getProjectBySlug passes the slug through", async () => {
    const repository = fakeRepository();
    await expect(getProjectBySlug(repository, "vat-billing-system")).resolves.toEqual(project);
    expect(repository.findBySlug).toHaveBeenCalledWith("vat-billing-system");
  });

  it("getProjectBySlug surfaces a missing project as null rather than throwing", async () => {
    const repository = fakeRepository({ findBySlug: vi.fn(async () => null) });
    await expect(getProjectBySlug(repository, "nope")).resolves.toBeNull();
  });
});
