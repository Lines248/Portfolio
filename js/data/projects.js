export const projects = [
  {
    id: "nomin-eat",
    title: "NominEat - Group Voting Web App",
    type: "Full-Stack Development | API Integration",
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
    featured: true,
    category: "development",
  },
  {
    id: "accex",
    title: "ACCEX",
    type: "Full-Stack Logic Meets Digital Inclusion",
    image: "/assets/images/accex.avif",
    alt: "Screenshot of the ACCEX website",
    description:
        "ACCEX is an accessibility tool that checks color contrast for WCAG compliance. Fast, accessible front-end build created with Vite. Designed with clean structure, smooth interaction, and a minimal UI that scales easily as new sections and projects are added.",
    stack: ["HTML", "CSS", "JavaScript", "Vue", "Vite", "CSS Modules", "Vercel"],
    links: {
      live: "https://accex.vercel.app/",
      repo: "https://github.com/Lines248/Accex",
    },
    featured: true,
    category: "development",
  },
  {
    id: "claim-your-signal",
    title: "Claim Your Signal",
    type: "Front-End Engineering | Interaction Design",
    image: "/assets/own-your-data.avif",
    alt: "Screenshot of the Claim Your Signal prototype",
    description:
        "Interactive Next.js prototype exploring authorship and ownership through accessible motion, sound, and one-way claim semantics.",
    stack: ["Next.js", "Tailwind v4", "Framer Motion", "Typescript", "Vercel"],
    links: {
      live: "https://own-your-data.vercel.app/",
      repo: "https://github.com/Lines248/own-your-data",
    },
    featured: false,
    category: "development",
  },
  {
    id: "inline-access",
    title: "Inline Access Studio Portfolio",
    type: "Front-End Development | UX/UI",
    image: "/assets/images/portfolio-site.avif",
    alt: "Screenshot of the Inline Access Studio portfolio website",
    description:
        "Personal portfolio site designed and built to showcase accessible, modern front-end work. Created with a clean visual system, calm interactions, and a structure that highlights both design thinking and engineering skill. The site acts as a living workspace that scales as new case studies and client projects are added.",
    stack: ["HTML", "CSS", "JavaScript", "Accessibility", "Responsive UI"],
    links: {
      live: "https://inlineaccess.studio/",
      repo: "https://github.com/Lines248/portfolio-site",
    },
    featured: true,
    category: "development",
  },
  {
    id: "deroche-projects",
    title: "DeRoche Projects",
    type: "UX/UI Design | CMS Implementation (Sanity)",
    image: "/assets/images/deroche.avif",
    alt: "Screenshot of the DeRoche architecture portfolio",
    description:
        "Designed the full UX/UI for an architecture studio website and uploaded the content system using Sanity CMS. Created custom schemas, modular content blocks, and a scalable design system used across case studies and imagery-heavy layouts. Contracted to work with Digital Counsel Agency who handeled the build and marketing.",
    stack: ["Figma", "Sanity CMS", "Responsive UI"],
    links: {
      live: "https://derocheprojects.com/",
    },
    featured: false,
    category: "design",
  },
];
