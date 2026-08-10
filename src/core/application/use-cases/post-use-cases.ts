import type { PostRepositoryContract } from "@/core/contracts/repositories/post-repository.contract";
import type { PostEntity } from "@/core/domain/entities/post.entity";

/**
 * Plain functions taking their dependency as an argument, matching
 * project-use-cases.ts — see docs/adr/0006-di-pattern-without-a-container.md.
 */
export async function listPublishedPosts(
  repository: PostRepositoryContract,
): Promise<readonly PostEntity[]> {
  return repository.findAllPublished();
}

export async function getPostBySlug(
  repository: PostRepositoryContract,
  slug: string,
): Promise<PostEntity | null> {
  return repository.findBySlug(slug);
}
