import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectTaskapp from "@/assets/project-taskapp.jpg";
import projectWeather from "@/assets/project-weather.jpg";

// ============================================
// 📝 EDIT ALL YOUR PORTFOLIO DATA HERE
// ============================================

// --- Personal Info ---
export const personal = {
  name: "Vadym Kolomiiets",
  firstName: "Vadym",
  lastName: "Kolomiiets",
  initials: "VK",
  role: "Frontend Developer",
  location: "Pardubice, Czech Republic",
  locationShort: "Pardubice, CZ",
  email: "kolomiietsvad@gmail.com",
  phone: "+420 776 151 379",
  github: "https://github.com/vadymkolomiiets",
  githubLabel: "github.com/vadymkolomiiets",
  linkedin: "https://linkedin.com/in/vadymkolomiiets",
  linkedinLabel: "linkedin.com/in/vadymkolomiiets",
  telegram: "https://t.me/vadymkolomiiets",
  resumeUrl: "/Vadym_Kolomiiets_Resume_FE.pdf",
  resumeFilename: "Vadym_Kolomiiets_Resume_FE.pdf",
};

// --- Bio / Summary ---
export const bio = {
  summary:
    "Frontend Developer with solid experience in professional and freelance projects. Skilled in JavaScript, TypeScript, React, Node.js, database management, and API integration. Proactive and detail-oriented, delivering clean, maintainable code.",
  aboutParagraphs: [
    `My name is Vadym, Frontend Developer with solid experience in professional and freelance projects. Skilled in JavaScript, TypeScript, React, Node.js, database management, and API integration.`,
    `I've worked at Gamirare Inc. building frontends with React & Next.js, at Mate Academy as a Fullstack Developer & Mentor, and as a Freelance developer delivering optimized web applications.`,
    `I hold a Master's Degree in Computer Sciences from Kyiv National Economic University. Currently based in Pardubice, Czech Republic — open to remote work and relocation.`,
  ],
};

// --- Skills ---
export const skills = [
  {
    category: "FRONTEND",
    items: [
      "TypeScript / JavaScript",
      "React / Redux / RTK-query",
      "Next.js / Vue.js",
      "HTML5 / CSS3 / Sass / BEM",
      "Tailwind / Material UI / Bootstrap",
    ],
  },
  {
    category: "BACKEND",
    items: [
      "Node.js / Express / Nest.js",
      "PostgreSQL / MySQL / Prisma",
      "REST API / GraphQL",
      "WebSockets / Axios",
      "Docker",
    ],
  },
  {
    category: "TOOLS",
    items: [
      "Git / GitHub",
      "Webpack / Vite / NPM",
      "Figma",
      "VS Code / WebStorm",
      "Chrome DevTools / React DevTools",
    ],
  },
  {
    category: "TESTING & OTHER",
    items: [
      "Cypress / Jest",
      "CI/CD Pipelines",
      "Agile / Jira / Trello",
      "OOP",
      "English B2 / Czech B2",
    ],
  },
];

// --- Work Experience ---
export const experience = [
  {
    role: "Frontend / Full-Stack Developer",
    company: "Freelance",
    period: "2024 — 2026",
    desc: "Developed web applications using JavaScript, React, and Node.js. Optimized app functionality, reducing load times by 20–30%. Implemented automated testing, reducing bugs by 40%.",
  },
  {
    role: "Fullstack Developer / Mentor",
    company: "Mate Academy",
    period: "2023 — 2024",
    desc: "Developed web apps with React & Node.js, implemented CRUD and API integrations. Mentored junior developers. Optimized load times by 20–30%.",
  },
  {
    role: "Fullstack Developer",
    company: "Gamirare Inc.",
    period: "2022 — 2023",
    desc: "Built frontend with React & Next.js, backend with Node.js. Worked with MySQL & PostgreSQL. Integrated REST/GraphQL APIs. Optimized DB performance, reducing page loads by 30%. Implemented OAuth2 authentication.",
  },
];

// --- Education ---
export const education = [
  {
    degree: "Master's Degree",
    field: "Computer Sciences",
    school: "Kyiv National Economic University",
    period: "2020 — 2022",
    note: "Nostrified in Czech Republic",
  },
  {
    degree: "Bachelor's Degree",
    field: "Computer Sciences",
    school: "Kyiv National Economic University",
    period: "2016 — 2020",
    note: "Nostrified in Czech Republic",
  },
];

// --- Services (Home page) ---
export const services = [
  {
    titleCyber: "FRONTEND_DEV",
    titlePony: "Frontend Magic ✨",
    desc: "React, Redux, Next.js, TypeScript — building responsive, accessible interfaces with modern CSS and component architectures.",
  },
  {
    titleCyber: "FULLSTACK_DEV",
    titlePony: "Full-Stack Power 🔧",
    desc: "Node.js, Express, Nest.js, PostgreSQL, Prisma — implementing CRUD, REST/GraphQL APIs and database optimization.",
  },
  {
    titleCyber: "PERF_OPT",
    titlePony: "Speed Boost 🚀",
    desc: "Optimizing load times by 20–30%, implementing automated testing with Cypress & Jest, reducing bugs by 40%.",
  },
];

// --- Projects ---
export const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-featured online store with cart, checkout, and admin panel. Built with Next.js and Stripe API for seamless payment processing.",
    tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    github: "#",
    live: "#",
    image: projectEcommerce,
    underNDA: false,
  },
  {
    title: "Task Management App",
    description:
      "Kanban board for task management with drag & drop, real-time updates, and team collaboration features.",
    tech: ["React", "Socket.io", "Node.js", "MongoDB"],
    github: "#",
    live: "#",
    image: projectTaskapp,
    underNDA: true,
  },
  {
    title: "Weather Dashboard",
    description:
      "Interactive weather dashboard with data visualization, geolocation, and 7-day forecast with beautiful charts.",
    tech: ["React", "D3.js", "OpenWeather API", "Tailwind"],
    github: "#",
    live: "#",
    image: projectWeather,
    underNDA: false,
  },
];

// --- Terminal lines (for hero typing animation) ---
export const terminalLines = [
  "const dev = {",
  `  name: '${personal.name}',`,
  `  role: '${personal.role}',`,
  `  stack: ['React', 'TS', 'Node'],`,
  `  location: '${personal.locationShort}',`,
];
