import type { Metadata } from "next";

import { AboutSection } from "@/features/portfolio/sections";
import { SectionPage } from "@/features/portfolio/section-page";
import { buildSectionMetadata } from "@/features/portfolio/page-metadata";

export const metadata: Metadata = buildSectionMetadata({
  title: "About",
  description:
    "From Nepal to Weber State University, and how two analyst roles at a university and a transit agency ran alongside the degree.",
  path: "/about",
});

export default function AboutPage(): React.JSX.Element {
  return (
    <SectionPage>
      <AboutSection headingLevel="h1" standalone />
    </SectionPage>
  );
}
