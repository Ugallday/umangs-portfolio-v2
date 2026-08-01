import {
  getProjectBySlug,
  listPublishedProjects,
} from "@/core/application/use-cases/project-use-cases";
import type { ProjectEntity } from "@/core/domain/entities/project.entity";
import { MdxProjectRepository } from "@/core/infrastructure/repositories/mdx-project-repository";

/**
 * features/projects/api.ts
 *
 * This is the seam. Every page/component in features/projects/ calls
 * getProjects() / getProject() — never MdxProjectRepository directly.
 * The day content moves to Supabase, `repository` below becomes
 * `new SupabaseProjectRepository()` and this is the only line that changes.
 */
const repository = new MdxProjectRepository();

export async function getProjects(): Promise<readonly ProjectEntity[]> {
  return listPublishedProjects(repository);
}

export async function getProject(slug: string): Promise<ProjectEntity | null> {
  return getProjectBySlug(repository, slug);
}
