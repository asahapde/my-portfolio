import { useEffect, useRef } from "react";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

const experiences: Experience[] = [
  {
    title: "Associate Software Engineer",
    company: "Carfax",
    period: "May 2023 – Present",
    description:
      "Delivered high-impact frontend solutions serving 200k+ users with React, and engineered automated Java tools for Google Ad Manager integrations, significantly improving operational efficiency.",
    highlights: ["React", "Java", "Google Ad Manager"],
  },
  {
    title: "Software Developer Intern",
    company: "Ontario Teacher's Pension Plan",
    period: "May 2021 – Sep 2022",
    description:
      "Spearheaded automation initiatives and developed sophisticated Angular-based tools that streamlined workflows across multiple teams, resulting in measurable productivity gains.",
    highlights: ["Angular", "Automation", "Workflow Optimization"],
  },
  {
    title: "Software Developer Intern",
    company: "Western University",
    period: "May 2020 – Aug 2020",
    description:
      "Architected and developed a full-stack mission control dashboard using Angular and Node.js, enabling real-time system monitoring and management capabilities.",
    highlights: ["Angular", "Node.js", "Full-Stack"],
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

const Experience = () => {
  const sectionRef = useReveal() as React.RefObject<HTMLElement>;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="reveal py-20"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <div className="mb-10">
          <p
            className="text-xs font-mono mb-1"
            style={{ color: "var(--text-subtle)" }}
          >
            01
          </p>
          <h2 className="text-2xl font-semibold lowercase">work</h2>
          <div className="divider mt-4" />
        </div>

        {/* Experience list */}
        <div>
          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              className={index < experiences.length - 1 ? "pb-10 mb-10" : ""}
              style={
                index < experiences.length - 1
                  ? { borderBottom: "1px solid var(--border)" }
                  : {}
              }
            >
              {/* Company + period */}
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                <h3 className="text-base font-semibold">{exp.company}</h3>
                <span
                  className="text-sm font-mono shrink-0"
                  style={{ color: "var(--text-subtle)" }}
                >
                  {exp.period}
                </span>
              </div>

              {/* Role */}
              <p
                className="text-sm mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                {exp.title}
              </p>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                {exp.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {exp.highlights.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
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

export default Experience;
