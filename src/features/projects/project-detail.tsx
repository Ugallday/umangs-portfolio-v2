import Link from "next/link";
import { Fragment } from "react";

import { FoldReveal } from "@/components/motion/fold-reveal";
import type { ProjectEntity } from "@/core/domain/entities/project.entity";
import { DiagramPanel } from "@/features/projects/diagram-panel";
import { getProjectDiagram } from "@/features/projects/diagrams";
import { actionClass } from "@/components/ui/action";
import { TechBadge } from "@/components/ui/tech-badge";
import { ProjectMetrics } from "@/features/projects/project-metrics";
import { getSchemaModel } from "@/features/projects/schema/model";
import { SchemaPanel } from "@/features/projects/schema/schema-panel";

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

export function ProjectDetail({ project }: { readonly project: ProjectEntity }): React.JSX.Element {
  const diagram = getProjectDiagram(project.slug);
  const anchorId = diagramAnchorId(project);
  const schema = getSchemaModel(project.slug);
  const schemaAnchor = schemaAnchorId(project);

  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
      <FoldReveal>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.65fr)] lg:items-end">
          <div className="space-y-6">
            <p className="text-text-muted text-xs tracking-[0.3em] uppercase">{project.phase}</p>
            <h1 className="text-text-primary max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="text-text-secondary max-w-3xl text-lg leading-8">{project.summary}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className={actionClass({ variant: "secondary" })}>
                Back to projects
              </Link>
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
            </div>
          </div>
          <div className="fold-panel rounded-3xl p-6 sm:p-8">
            <p className="text-text-muted text-xs tracking-[0.24em] uppercase">
              {project.visual.eyebrow}
            </p>
            <h2 className="text-text-primary mt-3 text-2xl font-semibold tracking-tight">
              {project.visual.label}
            </h2>
            <p className="text-text-secondary mt-3 text-sm leading-7">
              {project.visual.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((item) => (
                <TechBadge key={item} label={item} />
              ))}
            </div>
            <div className="border-border-subtle bg-surface-overlay mt-6 rounded-3xl border p-5">
              <p className="text-text-muted text-xs tracking-[0.24em] uppercase">
                Project metadata
              </p>
              <dl className="mt-4 grid gap-4 text-sm">
                <div>
                  <dt className="text-text-muted">Period</dt>
                  <dd className="text-text-primary mt-1">{project.period}</dd>
                </div>
                <div>
                  <dt className="text-text-muted">Role</dt>
                  <dd className="text-text-primary mt-1">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-text-muted">Organization</dt>
                  <dd className="text-text-primary mt-1">{project.organization}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </FoldReveal>

      {project.metrics.length > 0 ? (
        <FoldReveal delayMs={60}>
          <ProjectMetrics metrics={project.metrics} className="mt-12" />
        </FoldReveal>
      ) : null}

      <div className="mt-16 grid gap-5">
        {project.sections.map((section, index) => (
          <Fragment key={section.id}>
            <FoldReveal delayMs={index * 50}>
              <section className="fold-panel rounded-3xl p-6 sm:p-8">
                <p className="text-text-muted text-xs tracking-[0.24em] uppercase">{section.id}</p>
                <h2 className="text-text-primary mt-3 text-2xl font-semibold tracking-tight">
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
    </article>
  );
}
