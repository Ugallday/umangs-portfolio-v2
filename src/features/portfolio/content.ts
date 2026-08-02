export interface TimelineItem {
  readonly year: string;
  readonly title: string;
  readonly body: string;
  readonly assetNote: string;
}

export interface SemesterCourse {
  readonly name: string;
  readonly link?: string;
}

export interface SemesterNode {
  readonly semester: string;
  readonly emphasis: string;
  readonly courses: readonly SemesterCourse[];
  readonly outcome: string;
}

export interface TrainingCard {
  readonly title: string;
  readonly provider: string;
  readonly period: string;
  readonly connectsTo: string;
  readonly whyItMatters: string;
}

export interface SkillGroup {
  readonly title: string;
  readonly items: readonly string[];
}

export interface Principle {
  readonly quote: string;
  readonly explanation: string;
}

export interface ContactLink {
  readonly label: string;
  readonly href: string;
  readonly description: string;
}

export const heroHeadline =
  "I didn't wait for an internship. I found a business that needed fixing.";

export const aboutOpeningParagraph =
  "Most of my classmates spent university chasing an internship offer. I spent mine turning my family's travel agency from paper ledgers and Excel sheets into something that actually runs on software — because I wanted to know if I could fix a real, messy, working business, not just study how one works.";

export const footerClosingStatement =
  "This isn't a finished portfolio. It's the first chapter of an engineer who'd rather fix one real system than talk about ten hypothetical ones. More is coming — transport records, hospitality, and whatever's broken next.";

export const coreStory = [
  "Right after finishing high school in 2022, Aalok started working inside his father's two-person travel agency, not as a favor, but because he saw a business still running on Excel sheets, paper ledgers, and manual ticket tracking.",
  "The portfolio documents what happened next: a student who used the family company as a live testbed for real software while carrying a full CSIT course load.",
  "The throughline is simple. He is not building software because code is exciting on its own. He is building it because manual work keeps eating time that should belong to people and better decisions.",
] as const;

export const timeline: readonly TimelineItem[] = [
  {
    year: "2020",
    title: "SEE at Siddhartha Banasthali School",
    body: "Completes SEE (SLC) with a GPA of 3.95.",
    assetNote: "Drop in the SEE certificate or transcript scan.",
  },
  {
    year: "2020-2022",
    title: "+2 in Computer Science and Physics",
    body: "Class XI GPA 3.70, Class XII GPA 3.55. Serves as Computer Science Club Secretary and gets the first taste of leadership, coordination, and public speaking.",
    assetNote: "Add a club photo or certificate if available.",
  },
  {
    year: "Mar-Sep 2022",
    title: "Life Computer Institute training",
    body: "Structured IT training in MS Office, HTML/XHTML, CSS/CSS3, JavaScript, jQuery, PHP, Bootstrap, CorelDraw, FreeHand, Digital Marketing, basic hardware, and project work.",
    assetNote: "Scan the training certificate.",
  },
  {
    year: "2022-present",
    title: "Joins Nepal South Asia International Travels & Tours",
    body: "Starts building the company's digital backbone while beginning BSc CSIT at Tribhuvan University. The company at this point is just Aalok and his father.",
    assetNote: "Use a photo of the travel office or team, if you have one.",
  },
  {
    year: "2022-present",
    title: "Digitizes the travel business",
    body: "Builds the accounting workflow, cloud storage and backup, customer and B2B records, and the company website. Helps technically during the move toward IATA accreditation.",
    assetNote: "Add screenshots of the app and website here.",
  },
  {
    year: "Dec 2023",
    title: "Travelport Basic Ticketing (TMA4)",
    body: "Completes basic ticketing training aligned with the systems used in day-to-day operations.",
    assetNote: "Certificate scan placeholder.",
  },
  {
    year: "Feb-Mar 2024",
    title: "Sabre Basic GDS",
    body: "Formal training in the core travel industry system stack.",
    assetNote: "Certificate scan placeholder.",
  },
  {
    year: "Apr-May 2024",
    title: "Sabre Red360 Advanced Ticketing",
    body: "Deepens the operational tooling used in the agency's workflow.",
    assetNote: "Certificate scan placeholder.",
  },
  {
    year: "May-Jun 2024",
    title: "Travelport Advanced Ticketing",
    body: "Further training for ticketing and booking workflows used in travel operations.",
    assetNote: "Certificate scan placeholder.",
  },
  {
    year: "Jul 2024",
    title: "VAT and compliance training",
    body: "Training from NATTA and the Ministry of Finance, Government of Nepal, feeding directly into the compliant accounting system work.",
    assetNote: "Certificate scan placeholder.",
  },
  {
    year: "2023-2026",
    title: "University workshops and final-year work",
    body: "UI/UX, WordPress, and Quality Assurance workshops; Advanced Java, Data Warehousing and Data Mining, Software Project Management, Advanced Database, and final-year project work.",
    assetNote: "Add workshop certificates if you have them.",
  },
] as const;

export const curriculum: readonly SemesterNode[] = [
  {
    semester: "Sem I",
    emphasis: "Getting the fundamentals in place",
    courses: [
      { name: "Intro to IT" },
      { name: "C Programming" },
      { name: "Digital Logic" },
      { name: "Math I" },
      { name: "Physics" },
    ],
    outcome: "The basic computational and mathematical base for everything that follows.",
  },
  {
    semester: "Sem II",
    emphasis: "Thinking in systems",
    courses: [
      { name: "Discrete Structure" },
      { name: "OOP" },
      { name: "Microprocessor" },
      { name: "Math II" },
      { name: "Statistics I" },
    ],
    outcome: "Introduces structure, abstraction, and the language of software design.",
  },
  {
    semester: "Sem III",
    emphasis: "Data and algorithms",
    courses: [
      { name: "Data Structures and Algorithms" },
      { name: "Numerical Method" },
      { name: "Computer Architecture" },
      { name: "Computer Graphics" },
      { name: "Statistics II" },
    ],
    outcome: "Shapes later work around performance, data flow, and problem decomposition.",
  },
  {
    semester: "Sem IV",
    emphasis: "The point where software starts to feel real",
    courses: [
      { name: "Theory of Computation" },
      { name: "Computer Networks" },
      { name: "Operating Systems" },
      { name: "Database Management System", link: "NSA Travels accounting and customer data" },
      { name: "Artificial Intelligence", link: "AI-assisted features and future product ideas" },
    ],
    outcome: "Database and AI concepts become direct inputs to later projects.",
  },
  {
    semester: "Sem V",
    emphasis: "Building for the web",
    courses: [
      { name: "Design and Analysis of Algorithms" },
      { name: "System Analysis and Design" },
      { name: "Cryptography" },
      { name: "Simulation and Modeling" },
      { name: "Web Technology", link: "Company website build" },
    ],
    outcome:
      "Turns the company website and later web projects into a natural extension of coursework.",
  },
  {
    semester: "Sem VI",
    emphasis: "Structure and delivery",
    courses: [
      { name: "Software Engineering", link: "How later projects get planned" },
      { name: "Compiler Design" },
      { name: "E-Governance" },
      { name: ".NET Centric Computing" },
      { name: "Technical Writing" },
    ],
    outcome: "Makes planning, documentation, and disciplined delivery part of the process.",
  },
  {
    semester: "Sem VII",
    emphasis: "Applied project work",
    courses: [
      { name: "Advanced Java Programming" },
      { name: "Data Warehousing and Data Mining", link: "AI-assisted and data-informed features" },
      { name: "Principles of Management" },
      { name: "Project Work" },
      { name: "Software Project Management", link: "Army Training Center PM case study" },
    ],
    outcome: "Feeds the practical project and planning work shown later in the portfolio.",
  },
  {
    semester: "Sem VIII",
    emphasis: "Final semester work",
    courses: [{ name: "Advanced Database" }, { name: "Internship" }, { name: "Electives" }],
    outcome:
      "Brings the degree to a close while the portfolio and US MS applications move forward.",
  },
] as const;

export const trainings: readonly TrainingCard[] = [
  {
    title: "Basic Ticketing (TMA4)",
    provider: "Travelport",
    period: "Dec 2023",
    connectsTo: "Daily ticketing systems used at NSA Travels",
    whyItMatters: "It connects classroom learning to the live workflow he uses every day.",
  },
  {
    title: "Basic GDS",
    provider: "Sabre",
    period: "Feb-Mar 2024",
    connectsTo: "Core travel industry systems knowledge",
    whyItMatters: "He wanted fluency in the tools the business actually depends on.",
  },
  {
    title: "Sabre Red360 Advanced Ticketing",
    provider: "Sabre",
    period: "Apr-May 2024",
    connectsTo: "Advanced day-to-day operations tooling",
    whyItMatters: "This supports the more complex side of the agency's ticketing work.",
  },
  {
    title: "Advanced Ticketing",
    provider: "Travelport",
    period: "May-Jun 2024",
    connectsTo: "Deeper GDS and ticketing fluency",
    whyItMatters: "It expands the systems knowledge needed for the travel desk.",
  },
  {
    title: "VAT and Compliance Training",
    provider: "NATTA / Ministry of Finance, Government of Nepal",
    period: "Jul 2024",
    connectsTo: "The compliant, tax-aware accounting system",
    whyItMatters: "Accounting software in a small business has to respect the real tax workflow.",
  },
] as const;

export const skillGroups: readonly SkillGroup[] = [
  {
    title: "Languages",
    items: ["Java", "C", "C++", "JavaScript", "PHP", "SQL", "HTML", "CSS", "Python (basic)"],
  },
  {
    title: "Frameworks and libraries",
    items: ["Bootstrap", "React", "Next.js", "Node.js", "Express"],
  },
  {
    title: "Databases",
    items: ["MySQL", "PostgreSQL", "SQLite"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Figma", "Canva"],
  },
  {
    title: "Cloud and hosting",
    items: ["Supabase", "Firebase", "Vercel", "Netlify"],
  },
  {
    title: "Concepts",
    items: [
      "REST APIs",
      "Authentication",
      "MVC",
      "OOP design",
      "Database design",
      "UI/UX design",
      "Responsive design",
      "Workflow automation",
      "Applied AI integration",
      "Business process optimization",
    ],
  },
] as const;

export const philosophy: readonly Principle[] = [
  {
    quote: "I automate before I optimize.",
    explanation: "A manual bottleneck should be removed before anyone starts polishing it.",
  },
  {
    quote: "Understand the business before writing the code.",
    explanation: "The workflow matters more than the tool that eventually implements it.",
  },
  {
    quote: "The best internal tool is the one nobody has to think about using.",
    explanation: "A good system fades into the background and just makes the work happen.",
  },
  {
    quote: "Documentation and clear process are part of the engineering.",
    explanation: "The build is only as durable as the knowledge around it.",
  },
  {
    quote: "Start where you actually have access to the problem.",
    explanation:
      "The family business became the first real project because it was the place where help could be real.",
  },
  {
    quote: "AI should remove grunt work, not replace judgment.",
    explanation: "The goal is better leverage, not blind automation.",
  },
] as const;

export const contactLinks: readonly ContactLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/aalokbhandari",
    description: "Coursework, practicals, and personal projects",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alokbndry10/",
    description: "Professional profile and background",
  },
  {
    label: "Email",
    href: "mailto:aalokbhandari@example.com",
    description: "Best channel for direct contact",
  },
];

export const currentFocus = [
  "Artificial intelligence and applied ML",
  "System design",
  "Cloud computing",
  "Software architecture",
  "Product and UX thinking",
  "Deepening theoretical CS for US MS CS applications",
] as const;

export const missingAssets = [
  "Professional headshot file",
  "NSA Travels logo",
  "Company website screenshots",
  "Accounting app screenshots",
  "Travora screenshots or demo captures",
  "GitHub profile screenshot and pinned repos",
  "LinkedIn profile screenshot",
  "Certificates for Travelport, Sabre, and VAT compliance",
  "Workshop certificates for UI/UX, WordPress, and QA",
  "Resume PDF",
  "Real portfolio domain",
] as const;
