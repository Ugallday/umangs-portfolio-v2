import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

import type { ProjectRepositoryContract } from "@/core/contracts/repositories/project-repository.contract";
import type { ProjectEntity } from "@/core/domain/entities/project.entity";
import { projectFrontmatterSchema } from "@/core/infrastructure/mdx/schemas/project.schema";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

function toEntity(frontmatter: ReturnType<typeof projectFrontmatterSchema.parse>): ProjectEntity {
  // Explicit mapping (rather than a type cast) keeps the domain entity
  // decoupled from the frontmatter schema's exact shape — the two are
  // allowed to diverge as the schema evolves without silently breaking
  // the domain contract.
  return { ...frontmatter };
}

/**
 * MdxProjectRepository
 *
 * Implements ProjectRepositoryContract by reading and validating
 * content/projects/*.mdx. This is the ONLY file in the codebase that
 * knows projects currently live as MDX files on disk.
 */
export class MdxProjectRepository implements ProjectRepositoryContract {
  async findBySlug(slug: string): Promise<ProjectEntity | null> {
    try {
      const raw = await readFile(path.join(CONTENT_DIR, `${slug}.mdx`), "utf-8");
      const { data } = matter(raw);
      const frontmatter = projectFrontmatterSchema.parse(data);
      return toEntity(frontmatter);
    } catch {
      return null;
    }
  }

  async findAllPublished(): Promise<readonly ProjectEntity[]> {
    const files = await readdir(CONTENT_DIR);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    const entities = await Promise.all(
      mdxFiles.map(async (file) => {
        const raw = await readFile(path.join(CONTENT_DIR, file), "utf-8");
        const { data } = matter(raw);
        return toEntity(projectFrontmatterSchema.parse(data));
      }),
    );

    return entities
      .filter((project) => project.status === "published")
      .sort((a, b) => a.order - b.order);
  }
}
