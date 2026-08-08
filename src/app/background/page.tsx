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

/** The project the page closes on: what the whole background produced. */
const FLAGSHIP_SLUG = "vat-billing-system";

export default async function BackgroundPage(): Promise<React.JSX.Element> {
  const project = await getProject(FLAGSHIP_SLUG);

  if (!project) {
    throw new Error(`"${FLAGSHIP_SLUG}" is required to render the background page.`);
  }

  return (
    <SectionPage>
      <BackgroundSection project={project} />
    </SectionPage>
  );
}
