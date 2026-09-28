export const links = {
  email: "asahapde@gmail.com",
  github: "https://github.com/asahapde",
  linkedin: "https://www.linkedin.com/in/abdullah-sahapdeen/",
  resume: "/Abdullah_Sahapdeen_Resume.pdf",
};

export const focusAreas = [
  "AI agents",
  "full-stack products",
  "test automation",
  "cloud services",
  "accessible UIs",
];

export interface Stat {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  context: string;
}

export const stats: Stat[] = [
  {
    value: 86,
    suffix: "%",
    label: "agent fix success rate",
    context: "up from 27% at TD",
  },
  {
    value: 200,
    suffix: "%+",
    label: "more lead submissions",
    context: "homepage banner at CARFAX",
  },
  {
    value: 35,
    prefix: "~",
    suffix: "%",
    label: "faster initial load",
    context: "React refactor at CARFAX",
  },
  {
    value: 400,
    suffix: "+",
    label: "tests migrated",
    context: "Tosca to Playwright at TD",
  },
];

export interface Job {
  id: string;
  company: string;
  short: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  tags: string[];
}

export const jobs: Job[] = [
  {
    id: "td",
    company: "TD",
    short: "TD",
    role: "Software Engineer II",
    period: "Aug 2026 – Present",
    location: "Toronto, ON",
    summary:
      "Building AI agents that migrate a large enterprise test suite from legacy Tosca to code-based Playwright.",
    bullets: [
      "Built stage-specific AI agents and skills on a shared TypeScript + Playwright framework for blind conversion, intent verification, and consolidation of repeated logic into shared helpers.",
      "Re-engineered the prompting of an orchestrator agent (validation, retry, and locator-fix flows), raising fix success rate from 27% to 86% on a validation set.",
      "Built a PR review agent that checks generated Playwright changes against framework standards for assertions, locators, and maintainability.",
      "Migrated 400+ of ~1,400 tests on a large enterprise application, partnering with the app team on broken tests and documenting recurring blockers.",
    ],
    tags: ["TypeScript", "Playwright", "AI Agents", "Prompt Engineering"],
  },
  {
    id: "carfax",
    company: "CARFAX",
    short: "CARFAX",
    role: "Associate Software Engineer",
    period: "May 2023 – Aug 2026",
    location: "London, ON",
    summary:
      "Full-stack engineer on a dealer platform serving ~200,000 monthly active users across North America.",
    bullets: [
      "Built responsive customer-facing features across desktop, tablet, and mobile, including a Notification Center and a homepage lead-gen banner that increased submissions by over 200%.",
      "Refactored 15+ React components from class components and MobX to hooks and Context, adding lazy loading to cut initial page load by ~35%.",
      "Grew Jest + React Testing Library coverage from ~60% to 90%+, contributing to ~40% fewer frontend production defects.",
      "Built a useFeatureFlag hook on Contentful for dealer-by-dealer rollouts and improved accessibility toward WCAG 2.1 AA.",
      "Worked on the Cognito to Auth0 migration (token auth, RBAC) and built automated Auth0 token rotation with Lambda, Secrets Manager, SNS, and PagerDuty.",
      "Developed a Java ad-configuration service with Micronaut, Lambda, and Google Ad Manager, with an async SQS pipeline and bulk upload of ~4,000 items.",
    ],
    tags: ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Java"],
  },
  {
    id: "otpp",
    company: "Ontario Teachers' Pension Plan",
    short: "OTPP",
    role: "Software Developer Intern",
    period: "May 2021 – Sep 2022",
    location: "Toronto, ON",
    summary:
      "16-month internship building internal tools across Angular and .NET, and owning weekly releases.",
    bullets: [
      "Built internal reporting dashboards with Angular and TypeScript and migrated 10+ AngularJS pages to Angular 11.",
      "Developed backend logic and data-model changes in C#, .NET, and ASP.NET Core, with unit tests.",
      "Coordinated weekly releases with Jenkins, CloudBees, SonarQube, and UrbanCode Deploy, and automated deployment packaging with PowerShell and Git.",
    ],
    tags: ["Angular", "C#", "ASP.NET Core", "Jenkins"],
  },
  {
    id: "western",
    company: "Western University",
    short: "Western",
    role: "Software Developer Intern",
    period: "May 2020 – Aug 2020",
    location: "London, ON",
    summary:
      "Worked on mission control software for a university CubeSat program.",
    bullets: [
      "Upgraded a CubeSat Mission Control web app from Angular 7 to 9, refactoring TypeScript and removing 10+ deprecated dependencies.",
      "Migrated authentication from AWS Cognito to Firebase.",
      "Prototyped close-range image stitching with Python and OpenCV.",
    ],
    tags: ["Angular", "TypeScript", "Firebase", "OpenCV"],
  },
];

export interface Award {
  title: string;
  event: string;
}

export interface Project {
  title: string;
  kind: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
  live?: string;
  liveLabel?: string;
  awards?: Award[];
}

export const featuredProjects: Project[] = [
  {
    title: "TaleForge",
    kind: "Branching storytelling platform",
    description:
      "Authors write story nodes; readers vote on plot paths, submit their own branches, and comment. The community decides where the story goes.",
    features: [
      "JWT auth with role-based permissions",
      "Branch submission + approval workflows",
      "Deployed on Vercel and Fly.io",
    ],
    tech: ["Next.js", "Spring Boot", "PostgreSQL", "Docker"],
    github: "https://github.com/asahapde/TaleForge",
    live: "https://tale-forge.vercel.app/",
  },
  {
    title: "ScreenAI",
    kind: "AI recruiting platform",
    description:
      "An LLM-powered tool that orchestrates agent workflows to parse resumes and cross-check candidates against their GitHub and LinkedIn evidence.",
    features: [
      "Skill assessments backed by evidence",
      "Red-flag detection",
      "Fit scoring for recruiters",
    ],
    tech: ["Next.js", "TypeScript", "Groq Llama", "AI Agents"],
    github: "https://github.com/asahapde/ScreenAI",
  },
  {
    title: "HabitFlow",
    kind: "Habit-tracking PWA",
    description:
      "Track habits and tasks, keep streaks alive, and watch progress charts fill in, synced in real time across devices.",
    features: [
      "Streaks + achievement badges",
      "Progress charts",
      "Google sign-in, real-time sync",
    ],
    tech: ["React", "TypeScript", "Firebase", "Chart.js"],
    github: "https://github.com/asahapde/HabitFlow",
    live: "https://habitflow-bnai.onrender.com/",
  },
  {
    title: "Emotional.AI",
    kind: "Hackathon winner",
    description:
      "A web app that analyzes voice and webcam input to predict emotions, built in a weekend at Hack the Valley V.",
    features: [
      "Voice transcription + sentiment",
      "Webcam-based emotion signals",
      "Audio stored on AWS S3",
    ],
    tech: ["React", "Python", "Flask", "AssemblyAI"],
    live: "https://devpost.com/software/emotional-ai",
    liveLabel: "devpost",
    awards: [
      { title: "Loblaw Amplify Tech Challenge", event: "Hack the Valley V" },
      { title: "Best Use of Distributed Compute", event: "Hack the Valley V" },
    ],
  },
];

export interface ArchiveProject {
  title: string;
  kind: string;
  tech: string[];
  link?: string;
}

export const archiveProjects: ArchiveProject[] = [
  {
    title: "Western Timetable",
    kind: "Course scheduling planner",
    tech: ["Angular", "Node.js", "MongoDB", "AWS EC2"],
    link: "https://github.com/asahapde/WesternTimeTable",
  },
  {
    title: "Core Collect",
    kind: "Collectibles e-commerce",
    tech: ["React", "Node.js", "Firebase", "Stripe"],
    link: "https://github.com/asahapde/CoreCollect",
  },
  {
    title: "MatchEZ",
    kind: "TA-to-course matching",
    tech: ["Angular", "Node.js", "MongoDB"],
    link: "https://github.com/asahapde/MatchEZ",
  },
  {
    title: "The Aberrations",
    kind: "Unity 3D first-person shooter",
    tech: ["C#", "Unity"],
    link: "https://github.com/asahapde/The-Aberrations",
  },
  {
    title: "Bezier Pen Tool",
    kind: "Interactive spline editor",
    tech: ["C++", "OpenGL"],
    link: "https://github.com/asahapde/BezierPenTool",
  },
  {
    title: "Chess Teaching Game",
    kind: "Lessons + puzzles",
    tech: ["Java", "MVC"],
    link: "https://github.com/asahapde/Chess-Teaching-Game",
  },
];

export const skillGroups = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Java", "Python", "C#", "SQL", "HTML", "CSS/SCSS"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Angular", "Tailwind CSS", "Accessibility (WCAG)"],
  },
  {
    category: "Backend",
    items: ["Node.js", "GraphQL", "REST APIs", "Spring Boot", "Micronaut", "ASP.NET Core"],
  },
  {
    category: "Cloud & Data",
    items: ["AWS Lambda", "SQS", "SNS", "DynamoDB", "CloudWatch", "PostgreSQL", "MongoDB"],
  },
  {
    category: "Auth",
    items: ["Auth0", "JWT", "RBAC"],
  },
  {
    category: "Testing & DevOps",
    items: ["Playwright", "Jest", "React Testing Library", "Docker", "GitLab CI/CD", "Jenkins"],
  },
  {
    category: "AI",
    items: ["AI Agents", "Agent Orchestration", "Prompt Engineering", "LLM APIs"],
  },
];

export const education = {
  school: "Western University",
  degree: "B.E.Sc. Software Engineering",
  period: "2018 – 2023",
  detail: "GPA 3.9 / 4.0 · Dean's List",
};

export const certification = {
  name: "AWS Certified Cloud Practitioner",
  issuer: "Amazon Web Services",
  period: "Oct 2025 – Oct 2028",
};
