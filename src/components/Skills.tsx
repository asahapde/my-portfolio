import { useEffect, useRef } from "react";

interface SkillGroup {
  category: string;
  items: string[];
}

const skills: SkillGroup[] = [
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
    items: [
      "Jest",
      "Cypress",
      "Postman",
      "React Testing Library",
      "Vitest",
    ],
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

const Skills = () => {
  const sectionRef = useReveal() as React.RefObject<HTMLElement>;

  return (
    <section id="skills" ref={sectionRef} className="reveal py-20">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <div className="mb-10">
          <p
            className="text-xs font-mono mb-1"
            style={{ color: "var(--text-subtle)" }}
          >
            03
          </p>
          <h2 className="text-2xl font-semibold lowercase">stack</h2>
          <div className="divider mt-4" />
        </div>

        {/* Skill groups */}
        <div className="space-y-8">
          {skills.map((group) => (
            <div key={group.category}>
              <p
                className="text-xs font-mono uppercase tracking-wider mb-3"
                style={{ color: "var(--text-subtle)" }}
              >
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
