export const siteConfig = {
  name: "Umang Gupta",
  shortName: "Umang Gupta",
  // Mirrors the hero: introduces the person, not the portfolio. Concrete
  // enough to be worth indexing, but the domain argument belongs to the
  // case studies.
  description:
    "Umang Gupta is a data analyst and final-year Computer Science student at Weber State University. Data warehousing, ETL, and BI reporting for real production systems - SQL Server, SSIS, Power BI, and Python - plus applied ML research, heading into a MS in Data Science or Computer Science.",
  url: "https://www.umanggupta.com.np",
  location: "Utah, US",
  author: {
    name: "Umang Gupta",
  },
  nav: [
    { label: "About", href: "/about" },
    { label: "Background", href: "/background" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/skills" },
    { label: "Workflow", href: "/workflow" },
    // Deliberately adjacent to Contact: the two things a recruiter or an
    // admissions reader goes looking for are the CV and a way to reach me.
    { label: "Résumé", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ],
  footerNav: [] as { label: string; href: string }[],
  socials: {
    github: "https://github.com/Ugallday",
    linkedin: "https://www.linkedin.com/in/umangupta1",
    email: "umanggupta.ug2004@gmail.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
