export const siteConfig = {
  name: "Aalok Bhandari",
  shortName: "Aalok Bhandari",
  description:
    "Aalok Bhandari is a BSc CSIT student at Tribhuvan University specializing in software engineering, digital transformation, AI-assisted development, and practical software systems. Explore projects, engineering philosophy, and real-world software built to solve operational challenges.",
  url: "https://www.aalokbhandari.com.np",
  location: "Nepal",
  author: {
    name: "Aalok Bhandari",
    twitter: "@alokbndry10",
  },
  nav: [
    { label: "About", href: "/about" },
    { label: "Background", href: "/background" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/skills" },
    { label: "Workflow", href: "/workflow" },
    { label: "Gaming", href: "/gaming" },
    { label: "Contact", href: "/contact" },
  ],
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
