import type { Metadata } from "next";

import { AboutSection } from "@/features/portfolio/sections";
import { SectionPage } from "@/features/portfolio/section-page";
import { buildSectionMetadata } from "@/features/portfolio/page-metadata";

export const metadata: Metadata = buildSectionMetadata({
  title: "About",
  description:
    "How a two-person family travel agency became my first real engineering project, and the timeline that followed.",
  path: "/about",
});

export default function AboutPage(): React.JSX.Element {
  return (
    <SectionPage>
      <AboutSection headingLevel="h1" standalone />
    </SectionPage>
  );
}
