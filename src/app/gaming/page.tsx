import type { Metadata } from "next";

import { GamingSection } from "@/features/portfolio/sections";
import { SectionPage } from "@/features/portfolio/section-page";
import { buildSectionMetadata } from "@/features/portfolio/page-metadata";

export const metadata: Metadata = buildSectionMetadata({
  title: "Gaming",
  description:
    "Seven thousand hours in Dota 2, a first-place finish at an intercollege Valorant tournament, and what competitive play taught me that engineering did not.",
  path: "/gaming",
});

export default function GamingPage(): React.JSX.Element {
  return (
    <SectionPage>
      <GamingSection headingLevel="h1" standalone />
    </SectionPage>
  );
}
