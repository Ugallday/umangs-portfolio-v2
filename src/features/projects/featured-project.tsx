import Link from "next/link";

import { FoldReveal } from "@/components/motion/fold-reveal";
import { actionClass } from "@/components/ui/action";
import { Pill } from "@/components/ui/pill";
import { TechBadge } from "@/components/ui/tech-badge";
import type { ProjectEntity } from "@/core/domain/entities/project.entity";
import { DiagramPanel } from "@/features/projects/diagram-panel";
import { getProjectDiagram } from "@/features/projects/diagrams";
import { ProjectMetrics } from "@/features/projects/project-metrics";

/**
 * The homepage's deep slot: the projects a visitor should open first.
 *
 * Everything rendered here comes from each project's own frontmatter and its
 * registered diagram, so promoting a different project later is a one-line
 * change in `app/page.tsx` rather than an edit to this file.
 *
 * The homepage's <h1> is the hero headline, so this section leads with an <h2>
 * and each card title is an <h3>.
 */
export function FeaturedProjects({
  projects,
}: {
  readonly projects: readonly ProjectEntity[];
}): React.JSX.Element {
  return (
    <section id="featured" className="border-border-subtle scroll-mt-24 border-t py-20 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-14">
        <div className="space-y-4">
          <p className="text-text-muted text-xs font-medium tracking-[0.32em] uppercase">
            Featured projects
          </p>
          <h2 className="text-text-primary max-w-xs text-3xl font-semibold tracking-tight sm:text-4xl">
            Two systems that are deployed, not demonstrated.
          </h2>
          <p className="text-text-muted text-sm leading-7">
            One keeps a real business&rsquo;s books. One tracks what a trip actually costs. Both are
            live, and both let you walk their database in three dimensions.
          </p>
        </div>

        <div className="space-y-10">
          {projects.map((project, index) => (
            <FeaturedProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjectCard({
  project,
  index,
}: {
  readonly project: ProjectEntity;
  readonly index: number;
}): React.JSX.Element {
  const diagram = getProjectDiagram(project.slug);

  return (
    <div className="space-y-5">
      <FoldReveal delayMs={index * 60}>
        <article className="fold-panel rounded-3xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <Pill>{project.phase}</Pill>
            <p className="text-text-muted text-xs tracking-[0.24em] uppercase">{project.period}</p>
          </div>
          <h3 className="text-text-primary mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            {project.title}
          </h3>
          <p className="text-accent-default mt-2 text-sm leading-6">{project.visual.label}</p>
          <p className="text-text-secondary mt-4 max-w-3xl text-base leading-8">
            {project.summary}
          </p>

          <ProjectMetrics metrics={project.metrics} className="mt-7" />

          <div className="mt-7 flex flex-wrap gap-2">
            {project.techStack.map((item) => (
              <TechBadge key={item} label={item} />
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
        <FoldReveal delayMs={index * 60 + 60}>
          <DiagramPanel diagram={diagram} />
        </FoldReveal>
      ) : null}
    </div>
  );
}
