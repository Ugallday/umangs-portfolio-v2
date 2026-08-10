import { getPostBySlug, listPublishedPosts } from "@/core/application/use-cases/post-use-cases";
import type { PostEntity } from "@/core/domain/entities/post.entity";
import { MdxPostRepository } from "@/core/infrastructure/repositories/mdx-post-repository";

/**
 * The seam for writing, matching features/projects/api.ts. Pages call
 * getPosts() / getPost() and never touch MdxPostRepository directly.
 */
const repository = new MdxPostRepository();

export async function getPosts(): Promise<readonly PostEntity[]> {
  return listPublishedPosts(repository);
}

export async function getPost(slug: string): Promise<PostEntity | null> {
  return getPostBySlug(repository, slug);
}
