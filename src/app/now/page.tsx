import type { Metadata } from "next";

import { NowSection } from "@/features/portfolio/sections";
import { SectionPage } from "@/features/portfolio/section-page";
import { buildSectionMetadata } from "@/features/portfolio/page-metadata";

export const metadata: Metadata = buildSectionMetadata({
  title: "Now",
  description:
    "A dated snapshot of what I am building, what is next, and what I am deliberately not doing — rewritten monthly.",
  path: "/now",
});

export default function NowPage(): React.JSX.Element {
  return (
    <SectionPage>
      <NowSection headingLevel="h1" standalone />
    </SectionPage>
  );
}
