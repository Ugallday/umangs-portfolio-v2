import Link from "next/link";
import { Fragment } from "react";

import { FoldReveal } from "@/components/motion/fold-reveal";
import { FoldField } from "@/components/three/fold-field";
import type { ProjectEntity } from "@/core/domain/entities/project.entity";
import { DiagramPanel } from "@/features/projects/diagram-panel";
import { getProjectDiagram } from "@/features/projects/diagrams";
import { actionClass } from "@/components/ui/action";
import { Pill } from "@/components/ui/pill";
import { TechBadge } from "@/components/ui/tech-badge";
import { ProjectContents } from "@/features/projects/project-contents";
import { ProjectMetrics } from "@/features/projects/project-metrics";
import { ProjectPagination } from "@/features/projects/project-pagination";
import { getSchemaModel } from "@/features/projects/schema/model";
import { SchemaPanel } from "@/features/projects/schema/schema-panel";
import { sectionLabel } from "@/features/projects/section-label";

/**
 * The diagram belongs next to "what was built", but the shorter academic
 * practicals have no such section — there we fall back to the last section so
 * the diagram still renders instead of silently disappearing.
 */
function diagramAnchorId(project: ProjectEntity): string | undefined {
  const preferred = project.sections.find((section) => section.id === "what-was-built");
  return (preferred ?? project.sections.at(-1))?.id;
}

/**
 * The explorer follows the project's own "schema" section where the case study
 * has written one, and otherwise sits with the diagram — the two are answering
 * the same question and should not end up on opposite ends of the page.
 */
function schemaAnchorId(project: ProjectEntity): string | undefined {
  const preferred = project.sections.find((section) => section.id === "schema");
  return (preferred ?? project.sections.find((section) => section.id === "what-was-built"))?.id;
}

export function ProjectDetail({
  project,
  previous = null,
  next = null,
}: {
  readonly project: ProjectEntity;
  readonly previous?: ProjectEntity | null;
  readonly next?: ProjectEntity | null;
}): React.JSX.Element {
  const diagram = getProjectDiagram(project.slug);
  const anchorId = diagramAnchorId(project);
  const schema = getSchemaModel(project.slug);
  const schemaAnchor = schemaAnchorId(project);
  const externalLinks = project.links.filter((link) => link.href.startsWith("http"));

  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
      {/* `relative` so the ambient layer is bounded by the hero rather than
          drifting behind the body copy further down. */}
      <header className="relative">
        <FoldField className="opacity-40" />
        <FoldReveal>
          {/* items-start, not items-end. Bottom-aligning a short left column
              against the taller metadata card pushed the title down by most of
              a viewport on every project with a brief summary — the page opened
              on empty space. Both columns now start at the top. */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:items-start">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Pill>{project.phase}</Pill>
                <p className="text-text-muted text-xs tracking-[0.24em] uppercase">
                  {project.period}
                </p>
              </div>
              <h1 className="text-text-primary max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="text-accent-default text-base leading-7">{project.visual.label}</p>
              <p className="text-text-secondary max-w-3xl text-lg leading-8">{project.summary}</p>
              <div className="flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className={actionClass()}
                  >
                    {link.label}
                  </a>
                ))}
                <Link href="/projects" className={actionClass({ variant: "secondary" })}>
                  Back to projects
                </Link>
              </div>
            </div>

            <div className="fold-panel rounded-3xl p-6 sm:p-8">
              <p className="text-text-muted text-xs tracking-[0.24em] uppercase">
                {project.visual.eyebrow}
              </p>
              <p className="text-text-secondary mt-3 text-sm leading-7">
                {project.visual.description}
              </p>

              <dl className="border-border-subtle mt-6 grid gap-4 border-t pt-6 text-sm">
                <div>
                  <dt className="text-text-muted">Role</dt>
                  <dd className="text-text-primary mt-1">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-text-muted">Organization</dt>
                  <dd className="text-text-primary mt-1">{project.organization}</dd>
                </div>
                {externalLinks.length > 0 ? (
                  <div>
                    <dt className="text-text-muted">Live</dt>
                    <dd className="mt-1 grid gap-1">
                      {externalLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-accent-default hover:text-accent-hover transition"
                        >
                          {link.label}
                        </a>
                      ))}
                    </dd>
                  </div>
                ) : null}
              </dl>

              <div className="border-border-subtle mt-6 border-t pt-6">
                <p className="text-text-muted text-xs tracking-[0.24em] uppercase">Built with</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((item) => (
                    <TechBadge key={item} label={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FoldReveal>
      </header>

      {project.metrics.length > 0 ? (
        <FoldReveal delayMs={60}>
          <ProjectMetrics metrics={project.metrics} className="mt-12" />
        </FoldReveal>
      ) : null}

      <div className="mt-16 grid gap-10 xl:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] xl:gap-14">
        <ProjectContents sections={project.sections} />

        <div className="grid gap-5">
          {project.sections.map((section, index) => (
            <Fragment key={section.id}>
              <FoldReveal delayMs={index * 50}>
                <section id={section.id} className="fold-panel scroll-mt-24 rounded-3xl p-6 sm:p-8">
                  <div className="flex items-baseline gap-3">
                    <span
                      aria-hidden="true"
                      className="text-accent-default font-serif text-xs tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-text-muted text-xs tracking-[0.24em] uppercase">
                      {sectionLabel(section.id)}
                    </p>
                  </div>
                  <h2 className="text-text-primary mt-3 text-2xl font-semibold tracking-tight text-balance">
                    {section.heading}
                  </h2>
                  <p className="text-text-secondary mt-4 max-w-4xl text-base leading-8">
                    {section.body}
                  </p>
                  {section.bullets.length > 0 ? (
                    <ul className="text-text-secondary mt-5 grid gap-3 text-sm leading-7 sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="border-border-subtle bg-surface-base flex items-start gap-3 rounded-2xl border p-4"
                        >
                          <span
                            className="bg-accent-default mt-2 h-1.5 w-1.5 rounded-full"
                            aria-hidden="true"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              </FoldReveal>
              {section.id === anchorId && diagram ? (
                <FoldReveal delayMs={index * 50 + 40}>
                  <DiagramPanel diagram={diagram} />
                </FoldReveal>
              ) : null}
              {section.id === schemaAnchor && schema ? (
                <FoldReveal delayMs={index * 50 + 60}>
                  <SchemaPanel model={schema} />
                </FoldReveal>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>

      <ProjectPagination previous={previous} next={next} />
    </article>
  );
}
