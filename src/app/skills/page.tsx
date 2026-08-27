import type { Metadata } from "next";

import { SkillsSection } from "@/features/portfolio/sections";
import { SectionPage } from "@/features/portfolio/section-page";
import { buildSectionMetadata } from "@/features/portfolio/page-metadata";

export const metadata: Metadata = buildSectionMetadata({
  title: "Skills",
  description:
    "The data warehousing, ETL, and BI stack I use day to day at UTA and Weber State, what I'm still learning, and the concepts behind both.",
  path: "/skills",
});

export default function SkillsPage(): React.JSX.Element {
  return (
    <SectionPage>
      <SkillsSection headingLevel="h1" standalone />
    </SectionPage>
  );
}
