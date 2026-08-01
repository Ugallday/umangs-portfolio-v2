import type { ProjectRepositoryContract } from "@/core/contracts/repositories/project-repository.contract";
import type { ProjectEntity } from "@/core/domain/entities/project.entity";

/**
 * listPublishedProjects
 *
 * A use case is a plain function taking its dependencies as arguments
 * (constructor injection would be overkill for a function this small — see
 * docs/adr/0006-di-pattern-without-a-container.md for why this codebase
 * uses composition-at-the-call-site instead of a DI framework).
 */
export async function listPublishedProjects(
  repository: ProjectRepositoryContract,
): Promise<readonly ProjectEntity[]> {
  return repository.findAllPublished();
}

export async function getProjectBySlug(
  repository: ProjectRepositoryContract,
  slug: string,
): Promise<ProjectEntity | null> {
  return repository.findBySlug(slug);
}
