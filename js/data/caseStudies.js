export const caseStudies = {
  "ia-studio": {
    meta: {
      role: "Software Engineer",
      year: "2026",
      stack: ["Next.js 15", "React 19", "Supabase", "TypeScript"]
    },
    overview: "A secure platform that gives organizations a private space to share high-value digital assets with clients. It replaces fragmented email chains and public links with a professional, easily managed viewing experience.",
    featuredDiagram: {
      src: "/assets/images/ia-studio-architecture.svg",
      alt: "System architecture diagram for IA Studio."
    },
    sections: [
      {
        title: "The Problem & The Solution",
        content: "<p><strong>The Problem:</strong> Sharing secure digital files usually forces clients to create accounts and remember passwords. This adds friction to the user experience.</p><p><strong>The Solution:</strong> A custom Next.js application that separates secure server operations from the user interface. Instead of full account logins for clients, it uses secure hashed access codes to grant access to specific viewing rooms.</p>"
      },
      {
        image: {
          src: "/assets/images/ia-desktop.jpg",
          alt: "User Interface of the IA Studio authenticated dashboard."
        },
        title: "Data Verification Pipeline",
        content: "<p>To ensure data integrity, I built a pipeline that verifies information twice. Using Next.js Server Actions and Zod, the application checks form data on the front end as the user types, and then secures it again on the back end before any data reaches the PostgreSQL database. This prevents bad data from causing system errors.</p>"
      }
    ]
  },

  "nomin-eat": {
    meta: {
      role: "Front-End Lead",
      year: "2026",
      stack: ["Vue 3", "Java Spring Boot", "PostgreSQL", "Yelp API"]
    },
    overview: "An interactive web application designed to eliminate the friction of group decision-making. By providing a shared, real-time voting room, it turns the often stressful process of picking a restaurant into a quick and fair consensus.",
    featuredDiagram: {
      src: "/assets/images/Nomineat.svg",
      alt: "System architecture diagram for NominEat."
    },
    sections: [
      {
        title: "The Problem & The Solution",
        content: "<p><strong>The Problem:</strong> Group decisions are slow and require too much back and forth. Existing tools often require everyone to download an app or make an account just to cast a vote.</p><p><strong>The Solution:</strong> A voting system where only the organizer needs an account. Attendees join via a simple web link. The application handles the real-time voting and tallies the results.</p>"
      },
      {
        title: "Local Data Caching",
        content: "<p>When an organizer enters a ZIP code, the Java Spring Boot backend requests data from the Yelp API. Instead of making constant calls to Yelp, it saves this data to a local PostgreSQL database. This allows the voting session to run quickly and reliably from local storage.</p>"
      }
    ]
  },

  "accex": {
    meta: {
      role: "Front-End Engineer",
      year: "2026",
      stack: ["Vue 3", "Vite", "Pinia", "Vanilla CSS"]
    },
    overview: "A digital inclusion tool that helps teams build websites everyone can easily read and navigate. It removes the guesswork from visual design by instantly testing color choices against global accessibility standards.",
    featuredDiagram: {
      src: "/assets/images/accex-architecture.svg",
      alt: "Data Flow architecture for ACCEX."
    },
    sections: [
      {
        title: "The Problem & The Solution",
        content: "<p><strong>The Problem:</strong> Checking color contrast usually requires designers and developers to leave their work environment and use an external website or sandbox.</p><p><strong>The Solution:</strong> A Vue 3 application that calculates WCAG compliance instantly as users type. It uses a clean data flow to run accessibility math without slowing down the browser.</p>"
      },
      {
        image: {
          src: "/assets/images/accex.avif",
          alt: "User Interface of ACCEX showing the live CSS injection."
        },
        title: "Live CSS Updates",
        content: "<p>Instead of showing a small preview window, the application applies the selected colors to the entire website interface in real time. It does this by updating CSS custom properties directly on the document root, turning the tool itself into a live accessibility demonstration.</p>"
      }
    ]
  },

  "vending-machine": {
    meta: {
      role: "Backend Engineer",
      year: "2026",
      stack: ["Python", "Java", "CLI", "File I/O"]
    },
    overview: "A reliable backend engine built to handle precise financial transactions and track inventory over time. It demonstrates how to safely process money, prevent calculation errors, and keep strictly accurate audit records.",
    featuredDiagram: {
      src: "/assets/images/vending-machine-architecture.svg",
      alt: "System architecture diagram for the Vending Machine."
    },
    sections: [
      {
        title: "The Problem & The Solution",
        content: "<p><strong>The Problem:</strong> Older monolithic applications often mix the user menu with the core math logic. This makes the code difficult to test and update over time.</p><p><strong>The Solution:</strong> I refactored a legacy Java application into a modern Python structure. I separated the command-line interface from the transaction math and inventory management so the core logic can be tested in isolation.</p>"
      },
      {
        image: {
          src: "/assets/images/vending-machine.avif",
          alt: "CLI output of the Vending Machine audit log."
        },
        title: "Precision Math & Auditing",
        content: "<p>Handling financial transactions in code requires careful math to prevent rounding errors. The application converts all currency to integers (cents) during calculations. Additionally, every machine state change writes to an external text file to meet standard auditing requirements.</p>"
      }
    ]
  },

  "inline-access": {
    meta: {
      role: "Front-End Engineer",
      year: "2026",
      stack: ["Vanilla JS", "CSS3", "HTML5"]
    },
    overview: "A custom-built website engineered from the ground up to prioritize speed and energy efficiency. By stripping away heavy third-party code, it delivers information instantly while adapting perfectly to the user's device preferences.",
    featuredDiagram: {
      src: "/assets/images/portfolio-architecture.svg",
      alt: "System architecture diagram for the Portfolio Site."
    },
    sections: [
      {
        title: "The Problem & The Solution",
        content: "<p><strong>The Problem:</strong> Modern web frameworks like React are powerful, but they can be heavy and slow down simple websites.</p><p><strong>The Solution:</strong> A custom Vanilla JavaScript engine that loads content dynamically. It manages page routing and themes without relying on a backend server or complex build tools.</p>"
      },
      {
        title: "Performance & Themes",
        content: "<p>The site uses CSS variables and local browser storage to manage light and dark modes. The JavaScript prioritizes rendering the user's preferred theme before the screen even paints. This prevents the website from flashing bright white before loading the dark theme.</p>"
      }
    ]
  },
  /* New schema: id, title, subtitle, roles, context, sections (heading, body, media[]). See js/types/caseStudy.d.ts */
  "deroche-projects": {
    id: "deroche-projects",
    title: "DeRoche Projects",
    subtitle: "Translating an architectural 'drawing board' concept into a dense, high-performance digital portfolio.",
    roles: ["Information Architect", "UI/UX Designer", "Creative Technologist"],
    context: "Contracted via Digital Counsel",
    sections: [
      {
        heading: "The Problem & The Solution",
        body: "<p><strong>The Problem:</strong> The client needed to display a massive, dense archive of architectural work without the interface feeling cluttered or overwhelming to the user.</p><p><strong>The Solution:</strong> I engineered a deterministic, three-tier responsive grid system in Figma. By strictly pinning every component and spacing value to an 8pt grid, the design handles a high density of visual data with perfect alignment across all viewports.</p>",
        media: [
          {
            type: "image",
            src: "/assets/images/deroche-grid-system.avif",
            caption: "Managing complex column logic with a 12/4 mobile-to-desktop transition, allowing users to switch between [SM], [MD], and [LG] scales."
          }
        ]
      },
      {
        heading: "State Logic & Interactive Filtering",
        body: "<p>The goal was to make the portfolio function like an interactive architectural workspace rather than a static webpage. I mapped out the logic for how the UI responds to user intent, collaborating closely with the development team to translate complex archival needs into a robust data-sorting system. The interface allows users to filter the archive by Location, Type, and Completion, or sort the view by Random, Scale, and Chronological order, while a global project index provides instant access to isolate specific collections.</p>",
        media: [
          {
            type: "image",
            src: "/assets/images/deroche-interaction.avif",
            caption: "Multi-level hover and selection states provide immediate feedback, ensuring a 1:1 translation from the modular Figma library to production code."
          }
        ]
      },
      {
        heading: "Contextual Lightbox Viewing",
        body: "<p>To balance the dense, data-heavy index with focused viewing, I designed a high-opacity lightbox experience. This isolates specific project details and media while keeping the broader 'drawing board' context visible in the background, bridging the gap between macro and micro navigation.</p>",
        media: [
          {
            type: "image",
            src: "/assets/images/deroche-lightroom.avif",
            caption: "Active visual translation—ensuring the front-end layout perfectly mirrors the backend data structure of the archive."
          }
        ]
      }
    ]
  },
};