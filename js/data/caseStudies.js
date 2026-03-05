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
  "deroche": {
    meta: {
      role: "UI/UX Designer",
      year: "2025", 
      stack: ["UI/UX Design", "Responsive Layouts", "Image Processing", "CMS Setup"] 
    },
    overview: "A dynamic architecture portfolio featuring a responsive, randomized image grid that creates a unique discovery experience on every visit.",
    featuredDiagram: {
      src: "/assets/images/deroche-grid-annotated.png", 
      alt: "Annotated UI of the DeRoche homepage grid showing randomization and responsive behavior."
    },
    sections: [
      {
        title: "The Problem & The Solution",
        content: "<p><strong>The Problem:</strong> Traditional architecture portfolios often rely on stiff, predictable layouts. A standard static grid can feel sterile and fails to invite organic exploration from the user.</p><p><strong>The Solution:</strong> I designed a playful, dynamic index page. Every time a user enters the site, the layout generates a completely unique assortment of images, turning a simple directory into an engaging discovery experience.</p>"
      },
      {
        image: {
          src: "/assets/images/deroche.avif",
          alt: "Clean view of the DeRoche image grid."
        },
        title: "Image Processing & Responsive Portals",
        content: "<p>To make this randomized layout work, I carefully processed the studio's imagery so it would fit seamlessly into a scalable grid that responds fluidly to any screen size. Instead of just acting as a static gallery, each image serves as a functional portal, routing the user directly into deeper, detailed project pages.</p>"
      }
    ]
  },
};