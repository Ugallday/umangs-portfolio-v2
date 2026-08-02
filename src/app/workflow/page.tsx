import type { Metadata } from "next";

import { AiWorkflowSection, ToolkitSection } from "@/features/portfolio/sections";
import { SectionPage } from "@/features/portfolio/section-page";
import { buildSectionMetadata } from "@/features/portfolio/page-metadata";

export const metadata: Metadata = buildSectionMetadata({
  title: "Workflow",
  description:
    "How I use AI as an engineering assistant across research, architecture, prototyping, refactoring, testing, and review — and the tools behind each stage of the workflow.",
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
