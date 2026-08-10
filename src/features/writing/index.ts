/**
 * Public API of the writing feature. app/ imports from here only.
 */
export { getPost, getPosts } from "@/features/writing/api";
export { formatPostDate } from "@/features/writing/format-post-date";
export { PostDetail } from "@/features/writing/post-detail";
export { WritingIndex } from "@/features/writing/writing-index";
export type { PostEntity } from "@/core/domain/entities/post.entity";
