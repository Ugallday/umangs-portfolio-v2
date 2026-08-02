import type { Metadata } from "next";

import { PhilosophySection } from "@/features/portfolio/sections";
import { SectionPage } from "@/features/portfolio/section-page";
import { buildSectionMetadata } from "@/features/portfolio/page-metadata";

export const metadata: Metadata = buildSectionMetadata({
  title: "Philosophy",
  description:
    "The principles that show up again and again in my work, from travel operations to coursework.",
  path: "/philosophy",
});

export default function PhilosophyPage(): React.JSX.Element {
  return (
    <SectionPage>
      <PhilosophySection headingLevel="h1" standalone />
    </SectionPage>
  );
}
