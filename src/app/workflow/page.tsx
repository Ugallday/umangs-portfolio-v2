import type { Metadata } from "next";

import { AiWorkflowSection, ToolkitSection } from "@/features/portfolio/sections";
import { SectionPage } from "@/features/portfolio/section-page";
import { buildSectionMetadata } from "@/features/portfolio/page-metadata";

export const metadata: Metadata = buildSectionMetadata({
  title: "Workflow",
  description:
    "How I move from a stakeholder's question to a validated number, and where AI tools fit versus where the judgment call stays mine.",
  path: "/workflow",
});

export default function WorkflowPage(): React.JSX.Element {
  return (
    <SectionPage>
      <AiWorkflowSection headingLevel="h1" standalone />
      <ToolkitSection />
    </SectionPage>
  );
}
