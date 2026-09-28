import { useEffect, useRef, useState } from "react";
import { focusAreas, links, stats, type Stat } from "../data";
import { handleSpotlight, useCountUp, useInView } from "../hooks";
import { ArrowUpRight, FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

const RotatingWord = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % focusAreas.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block" aria-live="off">
      <span key={index} className="word-in text-accent font-medium">
        {focusAreas[index]}
      </span>
    </span>
  );
};

const StatItem = ({ stat, start }: { stat: Stat; start: boolean }) => {
  const value = useCountUp(stat.value, start);
  return (
    <div className="px-4 py-4 sm:px-5 sm:py-5" style={{ background: "var(--bg-card)" }}>
      <div className="text-2xl sm:text-3xl font-semibold tracking-tight tabular-nums">
        {stat.prefix}
        {value}
        <span className="text-accent">{stat.suffix}</span>
      </div>
      <div className="text-xs sm:text-sm mt-1" style={{ color: "var(--text)" }}>
        {stat.label}
      </div>
      <div className="text-[11px] sm:text-xs font-mono text-subtle mt-0.5">{stat.context}</div>
    </div>
  );
};

const Hero = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [statsRef, statsInView] = useInView<HTMLDivElement>();

  useEffect(() => {
    const t = setTimeout(() => contentRef.current?.classList.add("visible"), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="hero relative min-h-[100svh] flex flex-col justify-center pt-14 overflow-hidden"
      onPointerMove={handleSpotlight}
    >
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-spot" aria-hidden="true" />

      <div ref={contentRef} className="reveal relative max-w-4xl w-full mx-auto px-6 sm:px-8 py-16 sm:py-20">
        <div className="status-pill mb-8">
          <span className="status-dot" aria-hidden="true" />
          <span>
            Software Engineer II at <span style={{ color: "var(--text)" }}>TD</span> · Toronto
          </span>
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter lowercase mb-6"
          style={{ lineHeight: 1.02 }}
        >
          abdullah
          <br />
          sahapdeen<span className="text-accent">.</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted max-w-xl mb-3" style={{ lineHeight: 1.6 }}>
          Full-stack engineer who ships across the stack, from React interfaces used by
          hundreds of thousands to AWS services and AI agent tooling.
        </p>
        <p className="text-base sm:text-lg text-muted mb-10">
          Currently building <RotatingWord />
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

        <div
          ref={statsRef}
          className="mt-14 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl overflow-hidden"
          style={{ background: "var(--border)", border: "1px solid var(--border)" }}
        >
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} start={statsInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
