import {
  archiveProjects,
  featuredProjects,
  links,
  spotlightProjects,
  type Project,
  type SpotlightProject,
} from "../data";
import { handleSpotlight, useReveal } from "../hooks";
import { ArrowUpRight, GitHubIcon, TrophyIcon } from "./Icons";
import SectionHeader from "./SectionHeader";

const SpotlightCard = ({ project }: { project: SpotlightProject }) => (
  <article className="card spotlight-card" onPointerMove={handleSpotlight}>
    <a
      href={project.live ?? project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="spotlight-media block px-4 pt-4 sm:px-8 sm:pt-7"
      tabIndex={-1}
    >
      <div className="browser-frame">
        <div className="browser-bar" aria-hidden="true">
          <span className="browser-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="browser-url">{project.frameUrl}</span>
        </div>
        <div className="browser-shot">
          <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
        </div>
      </div>
    </a>

    <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-x-10 gap-y-6 p-6 sm:p-8">
      <div className="flex flex-col">
        <p className="text-[11px] font-mono uppercase tracking-wider text-subtle mb-2">
          {project.kind} · {project.year}
        </p>

        <h3 className="text-2xl font-semibold tracking-tight mb-3">{project.title}</h3>
        <p className="text-sm text-muted leading-relaxed mb-5">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-auto">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !py-1.5 !px-3 !text-xs"
              aria-label={`${project.title} live site`}
            >
              Visit live site
              <ArrowUpRight size={11} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !py-1.5 !px-3 !text-xs"
              aria-label={`${project.title} source code`}
            >
              <GitHubIcon size={13} />
              Source
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <ul className="bullet-list space-y-2">
          {project.features.map((f) => (
            <li key={f} className="text-[13px] text-muted leading-relaxed">
              {f}
            </li>
          ))}
        </ul>

        <dl className="grid grid-cols-2 gap-3 mt-auto">
          {project.metrics.map((m) => (
            <div key={m.label} className="metric">
              <dt className="sr-only">{m.label}</dt>
              <dd className="text-lg font-semibold tracking-tight tabular-nums">{m.value}</dd>
              <dd className="text-[11px] font-mono text-subtle" aria-hidden="true">
                {m.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </article>
);

const ProjectCard = ({ project }: { project: Project }) => (
  <article className="card p-6 flex flex-col" onPointerMove={handleSpotlight}>
    <div className="flex items-start justify-between gap-4 mb-1">
      <p className="text-[11px] font-mono uppercase tracking-wider text-subtle">{project.kind}</p>
      <div className="flex items-center gap-3 shrink-0 -mt-0.5">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent"
            aria-label={`${project.title} source code`}
          >
            <GitHubIcon size={16} />
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent flex items-center gap-1 text-xs font-mono"
            aria-label={`${project.title} ${project.liveLabel ?? "live site"}`}
          >
            {project.liveLabel ?? "live"}
            <ArrowUpRight size={12} />
          </a>
        )}
      </div>
    </div>

    <h3 className="text-xl font-semibold tracking-tight mb-3">{project.title}</h3>
    <p className="text-sm text-muted leading-relaxed mb-4">{project.description}</p>

    <ul className="bullet-list space-y-1 mb-5">
      {project.features.map((f) => (
        <li key={f} className="text-[13px] text-muted">
          {f}
        </li>
      ))}
    </ul>

    {project.awards && (
      <div className="flex flex-wrap gap-2 mb-5">
        {project.awards.map((a) => (
          <span
            key={a.title}
            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md"
            style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
          >
            <TrophyIcon />
            {a.title}
          </span>
        ))}
      </div>
    )}

    <div className="flex flex-wrap gap-2 mt-auto">
      {project.tech.map((t) => (
        <span key={t} className="tag">
          {t}
        </span>
      ))}
    </div>
  </article>
);

const Projects = () => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="projects" ref={sectionRef} className="reveal py-14 sm:py-16">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <SectionHeader
          index="02"
          title="projects"
          subtitle="Things I've built outside of work, from computer vision and civic maps to AI tooling and a hackathon winner."
        />

        <div className="space-y-5 mb-5">
          {spotlightProjects.map((p) => (
            <SpotlightCard key={p.title} project={p} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>

        <div className="mt-14">
          <h3 className="text-sm font-mono text-subtle mb-3">// more builds</h3>
          <ul style={{ borderTop: "1px solid var(--border)" }}>
            {archiveProjects.map((p) => (
              <li key={p.title} style={{ borderBottom: "1px solid var(--border)" }}>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="archive-row grid grid-cols-[1fr_auto] sm:grid-cols-[12rem_1fr_auto] items-center gap-x-6 gap-y-1 px-2 sm:px-3 py-3.5 -mx-2 sm:-mx-3 rounded-md"
                >
                  <span className="text-sm font-medium">{p.title}</span>
                  <span className="text-sm text-muted hidden sm:block truncate">
                    {p.kind}
                    <span className="text-subtle font-mono text-xs"> · {p.tech.join(" · ")}</span>
                  </span>
                  <span className="archive-arrow text-subtle row-span-2 sm:row-span-1">
                    <ArrowUpRight size={14} />
                  </span>
                  <span className="text-xs text-muted sm:hidden">
                    {p.kind} · <span className="font-mono text-subtle">{p.tech.join(" · ")}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm link-accent mt-6"
          >
            everything else on GitHub
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
