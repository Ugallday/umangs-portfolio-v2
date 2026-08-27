import type { Metadata } from "next";

import { buildSectionMetadata } from "@/features/portfolio/page-metadata";
import { Resume } from "@/features/portfolio/resume";
import { SectionPage } from "@/features/portfolio/section-page";

export const metadata: Metadata = buildSectionMetadata({
  title: "Résumé",
  description:
    "Umang Gupta's CV — data warehousing and BI reporting at the Utah Transit Authority and Weber State, applied ML research, and a Computer Science degree finishing December 2026.",
  path: "/resume",
});

export default function ResumePage(): React.JSX.Element {
  return (
    <SectionPage>
      <Resume />
    </SectionPage>
  );
}
