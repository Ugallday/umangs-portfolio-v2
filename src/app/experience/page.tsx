import type { Metadata } from "next";

import { ExperienceSection } from "@/features/portfolio/sections";
import { SectionPage } from "@/features/portfolio/section-page";
import { buildSectionMetadata } from "@/features/portfolio/page-metadata";
import { getProject } from "@/features/projects";

export const revalidate = 3600;

export const metadata: Metadata = buildSectionMetadata({
  title: "Experience",
  description:
    "Technology lead at Nepal South Asia International Travels & Tours — turning a paper-run travel agency into a system.",
  path: "/experience",
});

export default async function ExperiencePage(): Promise<React.JSX.Element> {
  const flagshipProject = await getProject("nsa-travels");

  if (!flagshipProject) {
    throw new Error("NSA Travels case study is required to render the experience page.");
  }

  return (
    <SectionPage>
      <ExperienceSection project={flagshipProject} headingLevel="h1" standalone />
    </SectionPage>
  );
}
