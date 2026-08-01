export const siteConfig = {
  name: "The Origami Engineer",
  shortName: "Origami Engineer",
  description:
    "An engineering portfolio platform documenting software architecture, case studies, and research — not a brochure.",
  url: "https://theorigamiengineer.dev",
  author: {
    name: "Aalok",
    twitter: "@your_handle",
  },
  nav: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Projects", href: "/projects" },
    { label: "Research", href: "/research" },
    { label: "Journal", href: "/journal" },
    { label: "Engineering", href: "/engineering" },
    { label: "About", href: "/about" },
  ],
  socials: {
    github: "https://github.com/your-handle",
    linkedin: "https://linkedin.com/in/your-handle",
    email: "hello@theorigamiengineer.dev",
  },
} as const;

export type SiteConfig = typeof siteConfig;
