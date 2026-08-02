import { SiteShell } from "@/features/portfolio/shell";
import { ProjectsSection } from "@/features/portfolio/sections";
import { getProjects } from "@/features/projects";

export const revalidate = 3600;

export default async function ProjectsPage(): Promise<React.JSX.Element> {
  const projects = await getProjects();

  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="max-w-3xl space-y-5 pb-12">
          <p className="text-text-muted text-xs tracking-[0.3em] uppercase">Projects</p>
          <h1 className="text-text-primary text-4xl font-semibold tracking-tight sm:text-5xl">
            The portfolio work, grouped by stage.
          </h1>
          <p className="text-text-secondary text-lg leading-8">
            The flagship case study sits alongside active concepts and academic practicals, because
            the portfolio is meant to show how the thinking develops over time.
          </p>
        </div>
        <ProjectsSection projects={projects} />
      </div>
    </SiteShell>
  );
}
