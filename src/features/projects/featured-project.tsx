import Link from "next/link";

import { FoldReveal } from "@/components/motion/fold-reveal";
import { actionClass } from "@/components/ui/action";
import { Pill } from "@/components/ui/pill";
import type { ProjectEntity } from "@/core/domain/entities/project.entity";
import { DiagramPanel } from "@/features/projects/diagram-panel";
import { getProjectDiagram } from "@/features/projects/diagrams";
import { ProjectMetrics } from "@/features/projects/project-metrics";

/**
 * The homepage's one deep slot: the project a visitor should open first.
 *
 * Everything rendered here comes from the project's own frontmatter and its
 * registered diagram, so promoting a different project later is a one-line
 * change in `app/page.tsx` rather than an edit to this file.
 *
 * The homepage's <h1> is the hero headline, so this section leads with an <h2>
 * and its card title is an <h3>.
 */
export function FeaturedProject({
  project,
}: {
  readonly project: ProjectEntity;
}): React.JSX.Element {
  const diagram = getProjectDiagram(project.slug);

  return (
    <section id="featured" className="border-border-subtle scroll-mt-24 border-t py-20 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-14">
        <div className="space-y-4">
          <p className="text-text-muted text-xs font-medium tracking-[0.32em] uppercase">
            Featured project
          </p>
          <h2 className="text-text-primary max-w-xs text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.visual.label}
          </h2>
          <p className="text-text-muted text-sm leading-7">
            The system a real business closes its books on — not a demo, and not a tutorial project.
          </p>
        </div>

        <div className="space-y-5">
          <FoldReveal>
            <article className="fold-panel rounded-3xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <Pill>{project.phase}</Pill>
                <p className="text-text-muted text-xs tracking-[0.24em] uppercase">
                  {project.period}
                </p>
              </div>
              <h3 className="text-text-primary mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                {project.title}
              </h3>
              <p className="text-text-secondary mt-4 max-w-3xl text-base leading-8">
                {project.summary}
              </p>

              <ProjectMetrics metrics={project.metrics} className="mt-7" />

              <div className="mt-7 flex flex-wrap gap-2">
                {project.techStack.map((item) => (
                  <Pill key={item}>{item}</Pill>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={`/projects/${project.slug}`} className={actionClass({ size: "md" })}>
                  Read the case study
                </Link>
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className={actionClass({ variant: "secondary", size: "md" })}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          </FoldReveal>

          {diagram ? (
            <FoldReveal delayMs={60}>
              <DiagramPanel diagram={diagram} />
            </FoldReveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
