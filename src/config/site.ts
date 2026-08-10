export const siteConfig = {
  name: "Aalok Bhandari",
  shortName: "Aalok Bhandari",
  description:
    "Aalok Bhandari builds software that has to be correct — accounting, compliance, and operations systems for businesses that can't afford to be wrong. Double-entry ledgers, multi-tenant PostgreSQL, and offline-first sync, built in Nepal and running in production.",
  url: "https://www.aalokbhandari.com.np",
  location: "Nepal",
  author: {
    name: "Aalok Bhandari",
    twitter: "@alokbndry10",
  },
  nav: [
    { label: "Now", href: "/now" },
    { label: "About", href: "/about" },
    { label: "Background", href: "/background" },
    { label: "Projects", href: "/projects" },
    { label: "Writing", href: "/writing" },
    { label: "Skills", href: "/skills" },
    { label: "Workflow", href: "/workflow" },
    { label: "Contact", href: "/contact" },
  ],
  /**
   * Reachable, but not presented alongside the case studies. /gaming is a
   * personal page; giving it a top-level slot next to the work costs more with
   * admissions committees and employers than it earns.
   */
  footerNav: [{ label: "Gaming", href: "/gaming" }],
  socials: {
    github: "https://github.com/aalokbhandari",
    linkedin: "https://www.linkedin.com/in/alokbndry10/",
    instagram: "https://www.instagram.com/by.aalok/",
    email: "aalokbhandari.dev@gmail.com",
  },
  whatsapp: {
    number: "9779813014395",
    href: "https://wa.me/9779813014395",
  },
} as const;

export type SiteConfig = typeof siteConfig;
