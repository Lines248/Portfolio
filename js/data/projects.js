export const projects = [
  {
    id: "inline-access",
    title: "This Portfolio",
    type: "Front-End Engineering | Vanilla JS & Design System",
    image: "/assets/images/portfolio-site-mobile.avif",
    alt: "Mobile view of the InLine Access Studio portfolio site showcasing the 3-theme design system.",
    description:
        "This site is the project. Instead of reaching for a template, I built a custom 3-theme design system from scratch using Vanilla JavaScript. Front-end only, no backend or database.",
    stack: ["VANILLA JS", "SYSTEM DESIGN", "WCAG 2.2", "UI ARCHITECTURE"],
    metrics: [{ label: "100 Lighthouse", anchor: "proof-section" }, { label: "Clarity Validated", anchor: "proof-section" }],
    links: {
      live: "https://inlineaccess.studio/",
      repo: "https://github.com/Lines248/portfolio-site",
    },
    featured: true,
    category: "design",
  },
  {
    id: "ia-studio",
    title: "Authenticated Digital Asset Platform",
    type: "Front-End Engineering | Next.js 15 / React 19 / TypeScript",
    image: "assets/images/ia-desktop.jpg",
    alt: "Screenshot of the Authenticated Digital Asset Platform interface",
    description:
        "A secure, multi-tenant SaaS platform built with Next.js 15, React 19, and strict TypeScript. Features role-based access controls and a fully type-safe data mutation pipeline.",
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Supabase", "Stripe"],
    metrics: [
      { label: "6ms Auth Response", anchor: "performance-proof" },
      { label: "WebP Optimized", anchor: "performance-proof" }
    ],
    links: {
      live: "",
      repo: "",
    },
    featured: true,
    category: "design",
  },
  {
    id: "accex",
    title: "ACCEX",
    type: "Front-End Engineering | Accessibility Tool",
    image: "/assets/images/accex.avif",
    alt: "Screenshot of the ACCEX website",
    description:
        "ACCEX is an accessibility tool that checks color contrast for WCAG compliance. Fast, accessible front-end build created with Vite. Designed with clean structure, smooth interaction, and a minimal UI that scales easily as new sections and projects are added. Front-end only, no backend or database.",
    stack: ["HTML", "CSS", "JavaScript", "Vue", "Vite", "CSS Modules", "Vercel"],
    metrics: [
      { label: "100 Accessibility", anchor: "a11y-proof" },
      { label: "WCAG 2.2 AA", anchor: "a11y-proof" }
    ],
    links: {
      live: "https://accex.vercel.app/",
      repo: "https://github.com/Lines248/Accex",
    },
    featured: true,
    category: "design",
  },
  {
    id: "deroche-projects",
    title: "DeRoche Projects",
    type: "Digital Identity & UI/UX",
    image: "/assets/images/deroche.avif",
    alt: "DeRoche Projects architectural portfolio interface",
    description: "Translating an architectural 'drawing board' concept into a dense, high-performance digital portfolio.",
    stack: ["Figma", "Information Architecture", "UI/UX", "Design Systems"],
    links: {
      live: "https://derocheprojects.com/",
    },
    featured: true,
    category: "ui-ux",
    hidden: false
  },
  {
    id: "claim-your-signal",
    title: "Claim Your Signal",
    type: "Front-End Engineering | Interaction Design",
    image: "/assets/own-your-data.avif",
    alt: "Screenshot of the Claim Your Signal prototype",
    description:
        "Interactive Next.js prototype exploring authorship and ownership through accessible motion, sound, and one-way claim semantics. Front-end only, no backend or database.",
    stack: ["Next.js", "Tailwind v4", "Framer Motion", "Typescript", "Vercel"],
    links: {
      live: "https://own-your-data.vercel.app/",
      repo: "https://github.com/Lines248/own-your-data",
    },
    featured: false,
    category: "design",
    hidden: true,
  },
  {
    id: "nomin-eat",
    title: "NominEat - Full-Stack Group Voting Web App",
    type: "Java Spring Boot / PostgreSQL / Vue.js / Yelp Fusion API",
    image: "/assets/images/nomineat-cover.avif",
    alt: "Screenshot of the NominEat group voting web application.",
    description:
        "Designed and developed a full-stack web app that helps groups vote on where to eat. Users can create rooms, submit restaurant options, and vote in real time. Built with a Java backend, Vue front-end, PostgreSQL database, and the Yelp API for live restaurant data. Developed as my final capstone project at Tech Elevator, demonstrating end-to-end architecture, API integration, and a collaborative Agile workflow.",
    stack: ["Java", "JavaScript", "Vue", "PostgreSQL", "REST APIs", "YELP API"],
    links: {
      live: "",
      repo: "https://github.com/Lines248/TE-Capstone_",
    },
    featured: true,
    category: "development",
  },
  {
    id: "vending-machine",
    title: "Vending Machine Web App",
    type: "Full-Stack Development",
    image: "/assets/images/vending-machine.avif",
    alt: "Screenshot of the Vending Machine app.",
    description:
        "Built as part of a backend engineering module at Tech Elevator. The original Java version was developed using Agile workflows and pair programming, after which I independently translated the full application into Python, re-implementing the architecture, logic, and transaction flow on my own. This CLI-based simulation highlights clean backend design, multi-language fluency, and the ability to refactor systems across stacks.",
    stack: ["Python", "Java", "CLI", "REST APIs"],
    links: {
      live: "",
      repo: "https://github.com/Lines248/vending_machine_webapp",
    },
    featured: false,
    category: "development",
  },
];
