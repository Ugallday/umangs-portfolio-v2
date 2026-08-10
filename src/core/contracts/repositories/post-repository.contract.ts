import type { PostEntity } from "@/core/domain/entities/post.entity";

/**
 * PostRepositoryContract
 *
 * The same seam ProjectRepositoryContract describes, for writing. Use cases
 * depend on this interface only; MdxPostRepository reads content/writing/*.mdx
 * behind it, and is the one file that knows posts live on disk.
 */
export interface PostRepositoryContract {
  findBySlug(slug: string): Promise<PostEntity | null>;
  findAllPublished(): Promise<readonly PostEntity[]>;
}
