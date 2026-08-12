import type { Metadata } from "next";

import { BackgroundSection } from "@/features/portfolio/background";
import { SectionPage } from "@/features/portfolio/section-page";
import { buildSectionMetadata } from "@/features/portfolio/page-metadata";
import { getProject } from "@/features/projects";

export const revalidate = 3600;

export const metadata: Metadata = buildSectionMetadata({
  title: "Background",
  description:
    "A BSc CSIT degree and four years inside a working travel agency, run at the same time — mapped semester by semester to the systems each one fed.",
  path: "/background",
});

/**
 * The project the page closes on. Not the flagship — the flagship is NSA
 * Travels, and this page is already about the agency, so closing on it would
 * be circular. It closes on the engineering artifact the degree and the
 * agency jointly produced.
 */
const CLOSING_PROJECT_SLUG = "vat-billing-system";

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
