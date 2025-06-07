import { useEffect, useRef, useState } from "react";

// Skill category icons
const getCategoryIcon = (category: string) => {
  const icons = {
    Frontend: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    Backend: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
        />
      </svg>
    ),
    Tools: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    Testing: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };
  return icons[category as keyof typeof icons] || icons.Tools;
};

// Individual skill item component
const SkillItem = ({ skill, index }: { skill: string; index: number }) => (
  <span
    className={`group relative px-4 py-2 text-sm font-medium bg-white/5 backdrop-blur-glass rounded-xl
      border border-white/10 hover:border-blue-400/50 hover:bg-white/10 
      transition-all duration-300 hover:scale-105 hover-glow cursor-default
      animate-scale-in`}
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors duration-300">
      {skill}
    </span>
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </span>
);

// Skill category card component
const SkillCard = ({
  skillGroup,
  index,
}: {
  skillGroup: any;
  index: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <div
      ref={cardRef}
      className={`group relative p-8 rounded-2xl backdrop-blur-glass border border-white/10
        hover:border-blue-400/30 transition-all duration-500 hover-lift hover-glow
        ${isVisible ? "animate-slide-in-up" : "opacity-0"}`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card Header */}
      <div className="relative z-10 flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-glass text-blue-400 group-hover:scale-110 transition-transform duration-300">
          {getCategoryIcon(skillGroup.category)}
        </div>
        <h3
          className="text-2xl md:text-3xl font-bold text-gradient tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {skillGroup.category}
        </h3>
      </div>

      {/* Skills Grid */}
      <div className="relative z-10 flex flex-wrap gap-3">
        {skillGroup.items.map((skill: string, skillIndex: number) => (
          <SkillItem key={skill} skill={skill} index={skillIndex} />
        ))}
      </div>

      {/* Skill Count Badge */}
      <div className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 backdrop-blur-glass rounded-full border border-blue-500/20">
        {skillGroup.items.length} skills
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20 animate-pulse" />
      <div
        className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-30 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </div>
  );
};

const Skills = () => {
  const skills = [
    {
      category: "Frontend",
      items: [
        "React",
        "Angular",
        "TypeScript",
        "Tailwind CSS",
        "Next.js",
        "Redux",
        "Material UI",
        "HTML5",
        "CSS3",
        "JavaScript",
        "SCSS",
        "Framer Motion",
      ],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Express",
        "Python",
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "MongoDB",
        "REST APIs",
        "GraphQL",
        "Redis",
        "Prisma",
      ],
    },
    {
      category: "Tools",
      items: [
        "Git",
        "Docker",
        "AWS",
        "CI/CD",
        "Kubernetes",
        "Webpack",
        "Vite",
        "Figma",
        "VS Code",
      ],
    },
    {
      category: "Testing",
      items: ["Jest", "Cypress", "Postman", "React Testing Library", "Vitest"],
    },
  ];

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 rounded-full animate-float" />
        <div
          className="absolute bottom-1/3 right-20 w-40 h-40 bg-gradient-to-br from-purple-400/5 to-blue-400/5 rounded-full animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 animate-slide-in-up"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-in-up animate-delay-200">
            A comprehensive toolkit for building{" "}
            <span className="text-gradient font-semibold">modern</span> and{" "}
            <span className="text-gradient font-semibold">scalable</span>{" "}
            applications
          </p>

          {/* Decorative Line */}
          <div className="flex justify-center mt-8 animate-slide-in-up animate-delay-400">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {skills.map((skillGroup, index) => (
            <SkillCard
              key={skillGroup.category}
              skillGroup={skillGroup}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-slide-in-up animate-delay-800">
          <p className="text-lg text-gray-400 mb-6">
            Interested in working together?
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white backdrop-blur-glass rounded-2xl transition-all duration-300 hover:scale-105 hover-glow active:scale-95 magnetic-button"
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
              Let's Create Something Amazing
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Skills;
