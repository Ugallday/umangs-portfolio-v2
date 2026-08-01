import type { ProjectEntity } from "@/core/domain/entities/project.entity";

/**
 * ProjectRepositoryContract
 *
 * application/use-cases/*.ts depend on this interface only. Today,
 * MdxProjectRepository (core/infrastructure/repositories/) implements it by
 * reading content/projects/*.mdx. If projects later move to Supabase, a
 * SupabaseProjectRepository implementing this same contract is swapped in
 * at the single call site in features/projects/api.ts — no use case,
 * component, or page changes. See docs/adr/0002-mdx-typed-collections.md.
 */
export interface ProjectRepositoryContract {
  findBySlug(slug: string): Promise<ProjectEntity | null>;
  findAllPublished(): Promise<readonly ProjectEntity[]>;
}
