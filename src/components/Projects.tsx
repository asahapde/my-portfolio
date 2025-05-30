const Projects = () => {
  const projects = [
    {
      title: "HabitFlow",
      description:
        "A habit-tracking web app that helps users build positive routines through gamified progress tracking and visual insights.",
      technologies: ["React", "TypeScript", "Firebase", "Chart.js"],
      githubLink: "https://github.com/asahapde/habitflow",
      liveLink: "https://habitflow-bnai.onrender.com/",
      awards: null,
    },
    {
      title: "Core Collect",
      description: "A fullstack e-commerce platform for collectibles.",
      technologies: ["React", "Node.js", "Firebase", "Stripe"],
      githubLink: "https://github.com/asahapde/CoreCollect",
      liveLink: "https://www.youtube.com/watch?v=wT2fAXnS-as&t=449s",
      awards: null,
    },
    {
      title: "Emotional.AI",
      description: "A voice and webcam-based emotion recognition app.",
      technologies: ["React", "Python", "AWS", "AssemblyAI"],
      githubLink: null,
      liveLink: "https://devpost.com/software/emotional-ai",
      awards: [
        {
          title: "Loblaw Amplify Tech Challenge",
          event: "Hack the Valley V",
          year: "2021",
        },
        {
          title: "Best Use of Distrubed Compute API Challenge",
          event: "Hack the Valley V",
          year: "2021",
        },
      ],
    },
    {
      title: "Western Timetable Application",
      description: "A fullstack Angular timetable application",
      technologies: ["Angular", "Node.js", "MongoDB", "AWS", "Linux"],
      githubLink: "https://github.com/asahapde/Western-Timetable-Application",
      liveLink: null,
      awards: null,
    },
  ];

  return (
    <section id="projects" className="py-16 md:py-24 bg-black">
      <div className="mx-auto w-full max-w-3xl md:max-w-4xl lg:max-w-5xl px-5">
        <h2
          className="mb-8 md:mb-12 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white animate-slideUp"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="p-6 md:p-8 rounded-lg bg-black/30 backdrop-blur-sm border border-gray-800 animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3
                className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {project.title}
              </h3>
              <p className="text-gray-400 mb-4 md:mb-6">
                {project.description}
              </p>
              {project.awards && project.awards.length > 0 && (
                <div className="mb-4 md:mb-6 space-y-2">
                  {project.awards.map((award, awardIndex) => (
                    <div
                      key={awardIndex}
                      className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg"
                    >
                      <div className="flex items-center gap-2 text-amber-400">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
                        </svg>
                        <span className="font-medium">{award.title}</span>
                      </div>
                      <p className="text-amber-400/80 text-sm mt-1">
                        {award.event} • {award.year}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 md:px-3 py-1 text-xs md:text-sm bg-sky-500/10 text-sky-400 rounded-full hover:bg-sky-500/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    GitHub
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
