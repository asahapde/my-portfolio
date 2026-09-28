import { certification, education, skillGroups } from "../data";
import { handleSpotlight, useReveal } from "../hooks";
import SectionHeader from "./SectionHeader";

const Skills = () => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="skills" ref={sectionRef} className="reveal py-14 sm:py-16">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <SectionHeader index="03" title="stack" subtitle="The tools I reach for day to day." />

        <div className="space-y-6">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-x-8 gap-y-2.5 items-start"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-subtle sm:pt-2">
                {group.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-14">
          <div className="card p-5" onPointerMove={handleSpotlight}>
            <p className="text-[11px] font-mono uppercase tracking-wider text-subtle mb-3">
              education
            </p>
            <p className="font-semibold">{education.school}</p>
            <p className="text-sm text-muted">{education.degree}</p>
            <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
              <span className="text-sm text-accent">{education.detail}</span>
              <span className="text-xs font-mono text-subtle">{education.period}</span>
            </div>
          </div>
          <div className="card p-5" onPointerMove={handleSpotlight}>
            <p className="text-[11px] font-mono uppercase tracking-wider text-subtle mb-3">
              certification
            </p>
            <p className="font-semibold">{certification.name}</p>
            <p className="text-sm text-muted">{certification.issuer}</p>
            <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
              <span className="text-sm text-accent">Active</span>
              <span className="text-xs font-mono text-subtle">{certification.period}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
