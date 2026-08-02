export const siteConfig = {
  name: "Aalok Bhandari",
  shortName: "Aalok Bhandari",
  description:
    "Computer science student and systems fixer building practical software for real workflows in Nepal.",
  url: "https://theorigamiengineer.dev",
  author: {
    name: "Aalok Bhandari",
    twitter: "@alokbndry10",
  },
  nav: [
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/#projects" },
    { label: "Education", href: "/#education" },
    { label: "Skills", href: "/#skills" },
    { label: "Philosophy", href: "/#philosophy" },
    { label: "Contact", href: "/#contact" },
  ],
  socials: {
    github: "https://github.com/aalokbhandari",
    linkedin: "https://www.linkedin.com/in/alokbndry10/",
    email: "aalokbhandari@example.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
