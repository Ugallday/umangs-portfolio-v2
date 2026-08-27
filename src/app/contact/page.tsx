import type { Metadata } from "next";

import { ContactSection } from "@/features/portfolio/sections";
import { SectionPage } from "@/features/portfolio/section-page";
import { buildSectionMetadata } from "@/features/portfolio/page-metadata";

export const metadata: Metadata = buildSectionMetadata({
  title: "Contact",
  description: "Get in touch about data analytics, BI reporting, or applied ML research.",
  path: "/contact",
});

export default function ContactPage(): React.JSX.Element {
  return (
    <SectionPage>
      <ContactSection headingLevel="h1" standalone />
    </SectionPage>
  );
}
