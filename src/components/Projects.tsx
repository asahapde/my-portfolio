import { useEffect, useRef } from "react";

interface Award {
  title: string;
  event: string;
  year: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubLink?: string | null;
  liveLink?: string | null;
  awards?: Award[] | null;
}

const projects: Project[] = [
  {
    title: "TaleForge",
    description:
      "A full-stack storytelling platform that empowers users to create, read, and explore interactive branching narratives. Features secure authentication, real-time collaboration, and a responsive user interface.",
    technologies: [
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "React",
      "TypeScript",
      "Next.js",
      "Docker",
      "Supabase",
    ],
    githubLink: "https://github.com/asahapde/TaleForge",
    liveLink: "https://tale-forge.vercel.app/",
    awards: null,
  },
  {
    title: "HabitFlow",
    description:
      "An intelligent habit-tracking web application that helps users build positive routines through gamified progress tracking, visual insights, and data-driven recommendations.",
    technologies: ["React", "TypeScript", "Firebase", "Chart.js"],
    githubLink: "https://github.com/asahapde/habitflow",
    liveLink: "https://habitflow-bnai.onrender.com/",
    awards: null,
  },
  {
    title: "Core Collect",
    description:
      "A full-stack e-commerce platform designed for collectibles enthusiasts. Features secure payment processing, inventory management, and a modern shopping experience.",
    technologies: ["React", "Node.js", "Firebase", "Stripe"],
    githubLink: "https://github.com/asahapde/CoreCollect",
    liveLink: "https://www.youtube.com/watch?v=wT2fAXnS-as&t=449s",
    awards: null,
  },
  {
    title: "Emotional.AI",
    description:
      "A voice and webcam-based emotion recognition application that leverages machine learning to analyze and interpret human emotions in real-time.",
    technologies: ["React", "Python", "AWS", "AssemblyAI"],
    githubLink: null,
    liveLink: "https://devpost.com/software/emotional-ai",
    awards: [
      {
        title: "Loblaw Amplify Tech Challenge Winner",
        event: "Hack the Valley V",
        year: "2021",
      },
      {
        title: "Best Use of Distributed Compute API",
        event: "Hack the Valley V",
        year: "2021",
      },
    ],
  },
  {
    title: "Western Timetable Application",
    description:
      "A full-stack Angular application designed to help students efficiently manage their course schedules. Features intuitive course planning, schedule optimization, and integration with university systems.",
    technologies: ["Angular", "Node.js", "MongoDB", "AWS", "Linux"],
    githubLink:
      "https://github.com/asahapde/Western-Timetable-Application",
    liveLink: null,
    awards: null,
  },
];

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const ExternalLinkIcon = ({ size = 11 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const Projects = () => {
  const sectionRef = useReveal() as React.RefObject<HTMLElement>;

  return (
    <section id="projects" ref={sectionRef} className="reveal py-20">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <div className="mb-10">
          <p
            className="text-xs font-mono mb-1"
            style={{ color: "var(--text-subtle)" }}
          >
            02
          </p>
          <h2 className="text-2xl font-semibold lowercase">projects</h2>
          <div className="divider mt-4" />
        </div>

        {/* Project list */}
        <div>
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={index < projects.length - 1 ? "pb-10 mb-10" : ""}
              style={
                index < projects.length - 1
                  ? { borderBottom: "1px solid var(--border)" }
                  : {}
              }
            >
              {/* Title + links */}
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 mb-3">
                <h3 className="text-base font-semibold">{project.title}</h3>
                <div className="flex items-center gap-4 shrink-0">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs link-accent"
                    >
                      source
                      <ExternalLinkIcon />
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs link-accent"
                    >
                      live
                      <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                {project.description}
              </p>

              {/* Awards */}
              {project.awards && project.awards.length > 0 && (
                <div className="mb-4 space-y-1">
                  {project.awards.map((award) => (
                    <p
                      key={award.title}
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <span style={{ color: "var(--accent)" }}>↗</span>{" "}
                      {award.title} · {award.event}, {award.year}
                    </p>
                  ))}
                </div>
              )}

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub profile link */}
        <div className="mt-10 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
          <a
            href="https://github.com/asahapde"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm link-accent"
          >
            view all on GitHub
            <ExternalLinkIcon size={12} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
