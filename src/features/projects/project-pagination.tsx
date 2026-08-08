import Link from "next/link";

import type { ProjectEntity } from "@/core/domain/entities/project.entity";

/**
 * Where to go after the last section.
 *
 * A case study used to end on "what comes next" and then simply stop, leaving
 * the footer as the only thing below it. Someone who has just read three
 * thousand words about one system is the most likely person in the building to
 * read a second one, so the page now offers the next one by name.
 */
export function ProjectPagination({
  previous,
  next,
}: {
  readonly previous: ProjectEntity | null;
  readonly next: ProjectEntity | null;
}): React.JSX.Element | null {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="More projects"
      className="border-border-subtle mt-16 grid gap-4 border-t pt-10 sm:grid-cols-2"
    >
      {previous ? <PaginationLink project={previous} direction="previous" /> : <span />}
      {next ? <PaginationLink project={next} direction="next" /> : null}
    </nav>
  );
}

function PaginationLink({
  project,
  direction,
}: {
  readonly project: ProjectEntity;
  readonly direction: "previous" | "next";
}): React.JSX.Element {
  const isNext = direction === "next";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`fold-panel fold-hover group flex flex-col rounded-3xl p-5 sm:p-6 ${
        isNext ? "sm:items-end sm:text-right" : ""
      }`}
    >
      <span className="text-text-muted text-xs tracking-[0.24em] uppercase">
        {isNext ? "Next" : "Previous"}
      </span>
      <span className="text-text-primary mt-3 text-lg font-semibold tracking-tight">
        {project.title}
      </span>
      <span className="text-text-secondary mt-2 line-clamp-2 text-sm leading-6">
        {project.visual.label}
      </span>
      <span
        className="text-accent-default mt-4 text-sm transition group-hover:translate-x-1"
        aria-hidden="true"
      >
        {isNext ? "Read it →" : "← Read it"}
      </span>
    </Link>
  );
}
