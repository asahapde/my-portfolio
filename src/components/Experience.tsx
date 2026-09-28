import { useRef, useState } from "react";
import { jobs } from "../data";
import { useReveal } from "../hooks";
import SectionHeader from "./SectionHeader";

const Experience = () => {
  const sectionRef = useReveal<HTMLElement>();
  const [activeId, setActiveId] = useState(jobs[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const job = jobs.find((j) => j.id === activeId) ?? jobs[0];

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = (index + dir + jobs.length) % jobs.length;
    setActiveId(jobs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="experience" ref={sectionRef} className="reveal py-14 sm:py-16">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <SectionHeader
          index="01"
          title="work"
          subtitle="Six years across banking, automotive, pensions, and research, from internships to shipping at scale."
        />

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
          <div
            role="tablist"
            aria-label="Companies"
            aria-orientation="vertical"
            className="flex sm:flex-col overflow-x-auto no-scrollbar shrink-0 sm:w-44 -mx-6 px-6 sm:mx-0 sm:px-0 border-b sm:border-b-0"
            style={{ borderColor: "var(--border)" }}
          >
            <div
              className="flex sm:flex-col w-full sm:border-l"
              style={{ borderColor: "var(--border)" }}
            >
              {jobs.map((j, i) => (
                <button
                  key={j.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${j.id}`}
                  aria-selected={j.id === activeId}
                  aria-controls={`panel-${j.id}`}
                  tabIndex={j.id === activeId ? 0 : -1}
                  onClick={() => setActiveId(j.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className="job-tab px-4 py-2.5 font-mono"
                >
                  {j.short}
                </button>
              ))}
            </div>
          </div>

          <div
            key={job.id}
            role="tabpanel"
            id={`panel-${job.id}`}
            aria-labelledby={`tab-${job.id}`}
            className="panel-in flex-1 min-w-0 min-h-[22rem]"
          >
            <h3 className="text-lg font-semibold tracking-tight">
              {job.role} <span className="text-accent">@ {job.company}</span>
            </h3>
            <p className="text-xs font-mono text-subtle mt-1 mb-4">
              {job.period} · {job.location}
            </p>
            <p className="text-sm mb-5" style={{ color: "var(--text)" }}>
              {job.summary}
            </p>
            <ul className="bullet-list space-y-2.5 mb-6">
              {job.bullets.map((b) => (
                <li key={b} className="text-sm text-muted leading-relaxed">
                  {b}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
