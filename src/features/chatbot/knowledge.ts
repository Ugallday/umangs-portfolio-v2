import { siteConfig } from "@/config/site";
import {
  academicPerformanceSummary,
  coreStory,
  currentStatusSummary,
  education,
  futureGoals,
  futureGoalsLead,
  resumeEducation,
  resumeResearch,
  resumeRoles,
  resumeSummary,
  skillGroups,
  trainings,
} from "@/features/portfolio/content";
import { getProjects } from "@/features/projects";
import type { ProjectEntity } from "@/core/domain/entities/project.entity";

/**
 * The chatbot's entire knowledge base, assembled from the same content
 * module and the same MDX project files every page on the site already
 * reads from. There is no second copy of Umang's information anywhere -
 * editing content.ts or a project's .mdx file changes what the chatbot
 * knows automatically, the same way it changes what the site shows.
 *
 * This is plain-text context stuffing, not a RAG/embeddings pipeline. The
 * whole knowledge base is small enough (well under the model's context
 * window) that retrieval infrastructure would add real complexity for no
 * benefit here - see the plan discussed with the user before this was built.
 */

function formatProject(project: ProjectEntity): string {
  const metrics = project.metrics.map((m) => `${m.value} - ${m.label}`).join("; ");
  const sections = project.sections
    .map((s) => `  ${s.heading}: ${s.body}\n${s.bullets.map((b) => `    - ${b}`).join("\n")}`)
    .join("\n");
  const links = project.links.map((l) => `${l.label}: ${l.href}`).join(", ");

  return [
    `### ${project.title} (/projects/${project.slug})`,
    `Phase: ${project.phase} | Period: ${project.period} | Role: ${project.role} | Organization: ${project.organization}`,
    `Summary: ${project.summary}`,
    `Tech stack: ${project.techStack.join(", ")}`,
    metrics ? `Key metrics: ${metrics}` : "",
    sections,
    links ? `Links: ${links}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function buildKnowledgeBase(): Promise<string> {
  const projects = await getProjects();
  const projectsText = projects.map(formatProject).join("\n\n");

  const rolesText = resumeRoles
    .map(
      (role) =>
        `- ${role.title}, ${role.organization} (${role.period}, ${role.location})\n` +
        role.bullets.map((b) => `  - ${b}`).join("\n"),
    )
    .join("\n");

  const researchText = resumeResearch
    .map(
      (r) =>
        `- ${r.name} (${r.period}), see /projects/${r.slug}\n` +
        r.bullets.map((b) => `  - ${b}`).join("\n"),
    )
    .join("\n");

  const educationText = resumeEducation
    .map((e) => `- ${e.qualification}, ${e.institution} (${e.period}) - ${e.result}`)
    .join("\n");

  const skillsText = skillGroups.map((g) => `- ${g.title}: ${g.items.join(", ")}`).join("\n");

  const trainingText = trainings
    .map((t) => `- ${t.title}, ${t.provider} (${t.period}) - ${t.whyItMatters}`)
    .join("\n");

  const futureGoalsText = futureGoals.map((g) => `- ${g.year}: ${g.title} - ${g.body}`).join("\n");

  return `
# Who this is

Name: ${siteConfig.name}
Current status: ${currentStatusSummary}
Location: ${siteConfig.location}
Site: ${siteConfig.url}
GitHub: ${siteConfig.socials.github}
LinkedIn: ${siteConfig.socials.linkedin}
Email: ${siteConfig.socials.email}
Résumé (downloadable PDF): ${siteConfig.url}/resume

Summary: ${resumeSummary}

# Background

${coreStory.join("\n\n")}

# Education

${educationText}
${academicPerformanceSummary}

Degree: ${education.bachelor.degree}, ${education.bachelor.college} - ${education.bachelor.detail}

# Work experience

${rolesText}

# Projects (full case studies live at /projects/<slug> on the site)

${projectsText}

# Research

${researchText}

# Skills

${skillsText}

# Certifications / training

${trainingText}

# Where this is headed (grad school / long-term goals)

${futureGoalsLead}

${futureGoalsText}
`.trim();
}
