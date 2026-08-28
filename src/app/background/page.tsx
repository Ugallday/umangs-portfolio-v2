import type { Metadata } from "next";

import { BackgroundSection } from "@/features/portfolio/background";
import { SectionPage } from "@/features/portfolio/section-page";
import { buildSectionMetadata } from "@/features/portfolio/page-metadata";
import { getProject } from "@/features/projects";

export const revalidate = 3600;

export const metadata: Metadata = buildSectionMetadata({
  title: "Background",
  description:
    "A Computer Science degree at Weber State and two analyst roles run alongside it, mapped on one timeline to the work each one fed.",
  path: "/background",
});

/**
 * The project the page closes on - the flagship, since the timeline above it
 * leads directly into the internship where this project was built.
 */
const CLOSING_PROJECT_SLUG = "uta-fleet-availability-warehouse";

export default async function BackgroundPage(): Promise<React.JSX.Element> {
  const project = await getProject(CLOSING_PROJECT_SLUG);

  if (!project) {
    throw new Error(`"${CLOSING_PROJECT_SLUG}" is required to render the background page.`);
  }

  return (
    <SectionPage>
      <BackgroundSection project={project} />
    </SectionPage>
  );
}
