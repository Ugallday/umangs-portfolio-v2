import type { Metadata } from "next";

import { ProjectsSection } from "@/features/portfolio/sections";
import { SectionPage } from "@/features/portfolio/section-page";
import { buildSectionMetadata } from "@/features/portfolio/page-metadata";
import { getProjects } from "@/features/projects";

export const revalidate = 3600;

export const metadata: Metadata = buildSectionMetadata({
  title: "Projects",
  description:
    "The UTA fleet availability data warehouse, EV fleet automation, ObfuScope research, and personal data projects, labelled by stage.",
  path: "/projects",
});

export default async function ProjectsPage(): Promise<React.JSX.Element> {
  const projects = await getProjects();

  return (
    <SectionPage>
      <ProjectsSection projects={projects} headingLevel="h1" standalone />
    </SectionPage>
  );
}
