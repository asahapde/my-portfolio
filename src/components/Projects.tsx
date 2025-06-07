import { useEffect, useRef, useState } from "react";

// Technology icon mapping
const getTechIcon = (tech: string) => {
  const icons: { [key: string]: string } = {
    React: "⚛️",
    TypeScript: "🔷",
    "Next.js": "▲",
    "Node.js": "🟢",
    Python: "🐍",
    Java: "☕",
    "Spring Boot": "🍃",
    PostgreSQL: "🐘",
    MongoDB: "🍃",
    Firebase: "🔥",
    Docker: "🐳",
    AWS: "☁️",
    Angular: "🅰️",
    "Chart.js": "📊",
    Stripe: "💳",
    AssemblyAI: "🤖",
    Linux: "🐧",
    Supabase: "⚡",
  };
  return icons[tech] || "🔧";
};

// Project card component
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isOdd = index % 2 === 1;

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible
          ? isOdd
            ? "animate-slide-in-right"
            : "animate-slide-in-left"
          : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 200}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative p-8 rounded-3xl backdrop-blur-glass border border-white/10 hover:border-blue-400/30 transition-all duration-500 hover-lift hover-glow overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating Orbs */}
        <div
          className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl transition-all duration-700 ${
            isHovered ? "scale-150 opacity-100" : "scale-100 opacity-50"
          }`}
        />
        <div
          className={`absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-lg transition-all duration-700 ${
            isHovered ? "scale-125 opacity-100" : "scale-100 opacity-30"
          }`}
        />

        {/* Project Header */}
        <div className="relative z-10 mb-6">
          <div className="flex items-start justify-between mb-4">
            <h3
              className="text-2xl md:text-3xl font-bold text-white group-hover:text-gradient transition-all duration-300"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.title}
            </h3>
            <div className="flex gap-2">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl backdrop-blur-glass border border-white/20 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300 hover:scale-110 group/icon"
                  aria-label="View GitHub Repository"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover/icon:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl backdrop-blur-glass border border-white/20 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300 hover:scale-110 group/icon"
                  aria-label="View Live Demo"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover/icon:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        {/* Awards Section */}
        {project.awards && project.awards.length > 0 && (
          <div className="relative z-10 mb-6">
            {project.awards.map((award: any, awardIndex: number) => (
              <div
                key={awardIndex}
                className="p-4 mb-3 rounded-2xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 backdrop-blur-glass hover:from-amber-500/20 hover:to-yellow-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20">
                    <svg
                      className="w-5 h-5 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-200">
                      {award.title}
                    </h4>
                    <p className="text-sm text-amber-300/80">
                      {award.event} • {award.year}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Technology Stack */}
        <div className="relative z-10 mb-8">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Built With
          </h4>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech: string, techIndex: number) => (
              <span
                key={tech}
                className={`group/tech relative px-4 py-2 text-sm font-medium bg-white/5 backdrop-blur-glass rounded-xl
                  border border-white/10 hover:border-blue-400/50 hover:bg-white/10 
                  transition-all duration-300 hover:scale-105 hover-glow cursor-default
                  animate-scale-in`}
                style={{ animationDelay: `${index * 200 + techIndex * 50}ms` }}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{getTechIcon(tech)}</span>
                  <span className="text-gray-300 group-hover/tech:text-white transition-colors duration-300">
                    {tech}
                  </span>
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300" />
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="relative z-10 flex flex-wrap gap-4">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-glass rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover-glow text-white font-medium"
            >
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover/btn:rotate-12"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              View Code
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 hover:shadow-lg text-white font-medium magnetic-button"
            >
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover/btn:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Live Demo
            </a>
          )}
        </div>

        {/* Corner Accent */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-60 animate-pulse" />
      </div>
    </div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "TaleForge",
      description:
        "A sophisticated full-stack storytelling platform that empowers users to create, read, and explore interactive branching narratives. Features secure authentication, real-time collaboration, and a responsive, intuitive user interface designed for creative storytelling.",
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
        "An intelligent habit-tracking web application that helps users build positive routines through gamified progress tracking, visual insights, and data-driven recommendations. Features beautiful charts and intuitive goal-setting workflows.",
      technologies: ["React", "TypeScript", "Firebase", "Chart.js"],
      githubLink: "https://github.com/asahapde/habitflow",
      liveLink: "https://habitflow-bnai.onrender.com/",
      awards: null,
    },
    {
      title: "Core Collect",
      description:
        "A comprehensive full-stack e-commerce platform specifically designed for collectibles enthusiasts. Features secure payment processing, inventory management, and a modern shopping experience tailored for collectors.",
      technologies: ["React", "Node.js", "Firebase", "Stripe"],
      githubLink: "https://github.com/asahapde/CoreCollect",
      liveLink: "https://www.youtube.com/watch?v=wT2fAXnS-as&t=449s",
      awards: null,
    },
    {
      title: "Emotional.AI",
      description:
        "An innovative voice and webcam-based emotion recognition application that leverages machine learning to analyze and interpret human emotions in real-time, providing valuable insights for personal development and research.",
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
        "A comprehensive full-stack Angular application designed to help students efficiently manage their course schedules. Features intuitive course planning, schedule optimization, and seamless integration with university systems.",
      technologies: ["Angular", "Node.js", "MongoDB", "AWS", "Linux"],
      githubLink: "https://github.com/asahapde/Western-Timetable-Application",
      liveLink: null,
      awards: null,
    },
  ];

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/5 to-blue-400/5 rounded-full animate-float" />
        <div
          className="absolute bottom-1/4 left-20 w-32 h-32 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 rounded-full animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 animate-slide-in-up"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-slide-in-up animate-delay-200">
            A collection of carefully crafted applications showcasing{" "}
            <span className="text-gradient font-semibold">
              innovative solutions
            </span>{" "}
            and{" "}
            <span className="text-gradient font-semibold">
              modern development practices
            </span>
          </p>

          {/* Decorative Line */}
          <div className="flex justify-center mt-8 animate-slide-in-up animate-delay-400">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-12 md:space-y-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-slide-in-up animate-delay-1000">
          <p className="text-lg text-gray-400 mb-8">
            Want to see more of my work or discuss a project?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/asahapde"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white backdrop-blur-glass rounded-2xl transition-all duration-300 hover:scale-105 hover-glow active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                View All Projects
              </span>
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 magnetic-button"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Start a Conversation
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
