import { useEffect, useRef } from "react";

const skills = [
  {
    category: "Frontend",
    items: [
      "React",
      "Angular",
      "TypeScript",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "Material UI",
      "JavaScript",
      "HTML5",
      "CSS3",
      "SCSS",
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

const certifications = [
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services" },
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

        {/* Two-column definition layout */}
        <div className="space-y-5">
          {skills.map((group) => (
            <div
              key={group.category}
              className="grid gap-x-8 items-baseline"
              style={{ gridTemplateColumns: "6rem 1fr" }}
            >
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: "var(--text-subtle)", paddingTop: "0.2rem" }}
              >
                {group.category}
              </span>
              <span
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {group.items.join(" · ")}
              </span>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-10 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
          <p
            className="text-xs font-mono uppercase tracking-wider mb-5"
            style={{ color: "var(--text-subtle)" }}
          >
            Certifications
          </p>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="grid gap-x-8 items-baseline"
                style={{ gridTemplateColumns: "6rem 1fr" }}
              >
                <span
                  className="text-xs font-mono uppercase tracking-wider"
                  style={{ color: "var(--text-subtle)", paddingTop: "0.2rem" }}
                >
                  AWS
                </span>
                <div>
                  <span className="text-sm" style={{ color: "var(--text)" }}>
                    {cert.name}
                  </span>
                  <span
                    className="text-xs ml-2"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    {cert.issuer}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
