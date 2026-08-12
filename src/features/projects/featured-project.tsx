import Link from "next/link";

import { FoldReveal } from "@/components/motion/fold-reveal";
import { FoldField } from "@/components/three/fold-field";
import { actionClass } from "@/components/ui/action";
import { Pill } from "@/components/ui/pill";
import { TechBadge } from "@/components/ui/tech-badge";
import type { ProjectEntity, ProjectLink } from "@/core/domain/entities/project.entity";
import { DiagramPanel } from "@/features/projects/diagram-panel";
import { getProjectDiagram } from "@/features/projects/diagrams";
import { ProjectMetrics } from "@/features/projects/project-metrics";

/**
 * The homepage's deep slot.
 *
 * This used to be a narrow column of cards beside a heading rail, which gave
 * the two things the site is actually about less room than the navigation
 * below them. Each project now gets the full measure and a dossier treatment:
 * a standing index numeral, a live indicator where there is something to open,
 * the figures as a divided band, and its diagram underneath.
 *
 * Everything still comes from the project's own frontmatter, so promoting a
 * different project stays a one-line change in `app/page.tsx`.
 */
export function FeaturedProjects({
  projects,
}: {
  readonly projects: readonly ProjectEntity[];
}): React.JSX.Element {
  return (
    <section
      id="featured"
      className="border-border-subtle relative scroll-mt-24 border-t py-20 sm:py-24"
    >
      <FoldField className="opacity-25" />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <p className="text-text-muted text-xs font-medium tracking-[0.32em] uppercase">
            Flagship, and the system it produced
          </p>
          <h2 className="text-text-primary max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            One business, rebuilt in software while it kept trading.
          </h2>
        </div>
        <p className="text-text-muted max-w-sm text-sm leading-7">
          NSA Travels is the flagship: four years inside a working travel agency, replacing paper
          with systems people actually kept using. The VAT ledger below it is the engineering
          artifact that came out of that — live, multi-tenant, and walkable in three dimensions.
        </p>
      </div>

      <div className="mt-14 grid gap-16">
        {projects.map((project, index) => (
          <FeaturedProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

/** The thing to open, if there is one. GitHub is a source link, not a demo. */
function findLiveLink(links: readonly ProjectLink[]): ProjectLink | undefined {
  return links.find((link) => link.href.startsWith("http") && !link.href.includes("github.com"));
}

function FeaturedProjectCard({
  project,
  index,
}: {
  readonly project: ProjectEntity;
  readonly index: number;
}): React.JSX.Element {
  const diagram = getProjectDiagram(project.slug);
  const live = findLiveLink(project.links);

  return (
    <div className="space-y-5">
      <FoldReveal delayMs={index * 60}>
        <article className="fold-panel relative overflow-hidden rounded-3xl p-5 sm:rounded-[1.75rem] sm:p-10">
          {/* The index, set large and nearly out of sight. It gives the panel a
              corner to be anchored by without adding another thing to read. */}
          <span
            aria-hidden="true"
            className="text-text-primary/[0.04] font-display pointer-events-none absolute -top-6 right-2 hidden text-[9rem] leading-none font-bold tabular-nums select-none sm:block sm:text-[10rem] lg:text-[12rem]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <Pill>{project.phase}</Pill>
              <p className="text-text-muted text-xs tracking-[0.24em] uppercase">
                {project.period}
              </p>
              {live ? <LiveChip /> : null}
            </div>

            <h3 className="text-text-primary mt-5 max-w-3xl text-2xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {project.title}
            </h3>
            <p className="text-accent-default mt-3 text-base leading-7">{project.visual.label}</p>
            <p className="text-text-secondary mt-5 max-w-3xl text-base leading-8">
              {project.summary}
            </p>

            <ProjectMetrics metrics={project.metrics} className="mt-8" />

            <div className="mt-8 flex flex-wrap gap-2">
              {project.techStack.map((item) => (
                <TechBadge key={item} label={item} />
              ))}
            </div>

            <div className="border-border-subtle mt-8 flex flex-wrap gap-3 border-t pt-8">
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

function LiveChip(): React.JSX.Element {
  return (
    <span className="border-accent-default/40 text-accent-default inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-[0.18em] uppercase">
      <span className="relative flex h-1.5 w-1.5">
        <span className="bg-accent-default absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 motion-reduce:hidden" />
        <span className="bg-accent-default relative inline-flex h-1.5 w-1.5 rounded-full" />
      </span>
      Live
    </span>
  );
}
