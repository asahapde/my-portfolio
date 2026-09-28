import { links } from "../data";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

const Footer = () => (
  <footer style={{ borderTop: "1px solid var(--border)" }}>
    <div className="max-w-4xl mx-auto px-6 sm:px-8 py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
      <p className="text-xs font-mono text-subtle">
        © {new Date().getFullYear()} Abdullah Sahapdeen · built with React + Tailwind
      </p>
      <div className="flex items-center gap-4">
        <a href={`mailto:${links.email}`} className="link-accent" aria-label="Email">
          <MailIcon />
        </a>
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </a>
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </a>
        <a href="#home" className="text-xs font-mono link-accent ml-2">
          back to top ↑
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
