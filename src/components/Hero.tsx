import { useEffect, useRef } from "react";
import { jobs, links } from "../data";
import DotField from "./DotField";
import { ArrowUpRight, FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

const timeline = [...jobs].reverse().map((job) => ({
  id: job.id,
  year: job.period.match(/\d{4}/)?.[0] ?? "",
  company: job.short,
  role: job.role,
  current: job.period.includes("Present"),
}));

const Timeline = () => (
  <ol className="timeline mt-16 sm:mt-20 grid grid-cols-4" aria-label="Career timeline">
    {timeline.map((stop, i) => (
      <li
        key={stop.id}
        className={`timeline-stop ${stop.current ? "is-current" : ""}`}
        style={{ "--d": `${600 + i * 160}ms` } as React.CSSProperties}
      >
        <a href="#experience" className="block pr-3">
          <span className="block text-[11px] font-mono text-subtle mb-3">
            {stop.current ? `${stop.year} – now` : stop.year}
          </span>
          <span className="timeline-track" aria-hidden="true">
            <span className="timeline-dot" />
          </span>
          <span className="timeline-company block text-sm font-medium mt-4">{stop.company}</span>
          <span className="hidden sm:block text-xs text-muted mt-0.5 leading-snug">
            {stop.role}
          </span>
        </a>
      </li>
    ))}
  </ol>
);

const Hero = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => contentRef.current?.classList.add("visible"), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="hero relative min-h-[100svh] flex flex-col justify-center pt-14 overflow-hidden"
    >
      <div className="hero-glow" aria-hidden="true" />
      <DotField />

      <div ref={contentRef} className="reveal relative max-w-4xl w-full mx-auto px-6 sm:px-8 py-16 sm:py-20">
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter lowercase mb-7"
          style={{ lineHeight: 1.02 }}
        >
          <span className="line-mask">
            <span className="line-in">abdullah</span>
          </span>{" "}
          <span className="line-mask">
            <span className="line-in" style={{ animationDelay: "90ms" }}>
              sahapdeen<span className="text-accent">.</span>
            </span>
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-muted max-w-xl mb-10" style={{ lineHeight: 1.6 }}>
          Full-stack engineer who ships across the stack, from React interfaces used by
          hundreds of thousands to AWS services and AI agent tooling.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a href={`mailto:${links.email}`} className="btn-primary">
            <MailIcon size={14} />
            Email me
          </a>
          <a href={links.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <FileIcon size={14} />
            Resume
            <ArrowUpRight size={11} />
          </a>
          <div className="flex items-center gap-2 sm:ml-2">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label="GitHub profile"
            >
              <GitHubIcon />
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <Timeline />
      </div>
    </section>
  );
};

export default Hero;
