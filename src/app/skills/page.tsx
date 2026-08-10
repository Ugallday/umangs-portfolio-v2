import type { Metadata } from "next";

import { SkillsSection } from "@/features/portfolio/sections";
import { SectionPage } from "@/features/portfolio/section-page";
import { buildSectionMetadata } from "@/features/portfolio/page-metadata";

export const metadata: Metadata = buildSectionMetadata({
  title: "Skills",
  description:
    "Eight technologies I would be happy to be questioned on for an hour, what I am learning properly and not claiming yet, and the concepts behind both.",
  path: "/skills",
});

export default function SkillsPage(): React.JSX.Element {
  return (
    <SectionPage>
      <SkillsSection headingLevel="h1" standalone />
    </SectionPage>
  );
}
