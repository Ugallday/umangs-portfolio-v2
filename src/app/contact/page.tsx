import type { Metadata } from "next";

import { ContactSection } from "@/features/portfolio/sections";
import { SectionPage } from "@/features/portfolio/section-page";
import { buildSectionMetadata } from "@/features/portfolio/page-metadata";

export const metadata: Metadata = buildSectionMetadata({
  title: "Contact",
  description: "Get in touch about systems, travel technology, or applied product work in Nepal.",
  path: "/contact",
});

export default function ContactPage(): React.JSX.Element {
  return (
    <SectionPage>
      <ContactSection headingLevel="h1" standalone />
    </SectionPage>
  );
}
