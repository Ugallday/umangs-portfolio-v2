import { SiteShell } from "@/features/portfolio/shell";
import {
  AboutSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  HeroSection,
  PhilosophySection,
  ProjectsSection,
  SkillsSection,
} from "@/features/portfolio/sections";
import { getProject, getProjects } from "@/features/projects";

export const revalidate = 3600;

export default async function HomePage(): Promise<React.JSX.Element> {
  const [projects, flagshipProject] = await Promise.all([getProjects(), getProject("nsa-travels")]);

  if (!flagshipProject) {
    throw new Error("NSA Travels case study is required to render the homepage.");
  }

  return (
    <SiteShell>
      <HeroSection />
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <AboutSection />
        <ExperienceSection project={flagshipProject} />
        <ProjectsSection projects={projects} />
        <EducationSection />
        <SkillsSection />
        <PhilosophySection />
        <ContactSection />
      </div>
    </SiteShell>
  );
}
