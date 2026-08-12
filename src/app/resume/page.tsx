import type { Metadata } from "next";

import { buildSectionMetadata } from "@/features/portfolio/page-metadata";
import { Resume } from "@/features/portfolio/resume";
import { SectionPage } from "@/features/portfolio/section-page";

export const metadata: Metadata = buildSectionMetadata({
  title: "Résumé",
  description:
    "Aalok Bhandari's CV — four years rebuilding a working travel agency in software, a multi-tenant offline-first accounting system, and a B.Sc. CSIT in progress.",
  path: "/resume",
});

export default function ResumePage(): React.JSX.Element {
  return (
    <SectionPage>
      <Resume />
    </SectionPage>
  );
}
