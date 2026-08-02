import type { Metadata } from "next";

import { EducationSection } from "@/features/portfolio/sections";
import { SectionPage } from "@/features/portfolio/section-page";
import { buildSectionMetadata } from "@/features/portfolio/page-metadata";

export const metadata: Metadata = buildSectionMetadata({
  title: "Education",
  description:
    "BSc CSIT at Madan Bhandari Memorial College, the semester-by-semester curriculum map, and the industry training behind it.",
  path: "/education",
});

export default function EducationPage(): React.JSX.Element {
  return (
    <SectionPage>
      <EducationSection headingLevel="h1" standalone />
    </SectionPage>
  );
}
