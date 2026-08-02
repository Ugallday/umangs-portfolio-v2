import type { Metadata } from "next";

import { SkillsSection } from "@/features/portfolio/sections";
import { SectionPage } from "@/features/portfolio/section-page";
import { buildSectionMetadata } from "@/features/portfolio/page-metadata";

export const metadata: Metadata = buildSectionMetadata({
  title: "Skills",
  description:
    "Languages, frameworks, databases, tools, and working concepts — grouped by what they actually let me build.",
  path: "/skills",
});

export default function SkillsPage(): React.JSX.Element {
  return (
    <SectionPage>
      <SkillsSection headingLevel="h1" standalone />
    </SectionPage>
  );
}
