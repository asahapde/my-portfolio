import { useEffect, useRef } from "react";

const MailIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const ExternalIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      headingRef.current?.classList.add("visible");
    }, 100);
    const timer2 = setTimeout(() => {
      bodyRef.current?.classList.add("visible");
    }, 300);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-14"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-20">
        {/* Name */}
        <h1
          ref={headingRef}
          className="reveal text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight lowercase mb-6"
          style={{ lineHeight: 1.1 }}
        >
          abdullah sahapdeen
        </h1>

        {/* Content block */}
        <div ref={bodyRef} className="reveal" style={{ animationDelay: "0.1s" }}>
          {/* Bio */}
          <p
            className="text-lg sm:text-xl mb-10 max-w-xl"
            style={{ color: "var(--text-muted)", lineHeight: 1.6 }}
          >
            I build full-stack web applications, scalable systems, and clean
            user interfaces.
          </p>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="mailto:asahapde@gmail.com"
              className="flex items-center gap-1.5 text-sm link-accent"
              aria-label="Send me an email"
            >
              <MailIcon />
              mail
            </a>
            <a
              href="https://github.com/asahapde"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm link-accent"
              aria-label="GitHub profile"
            >
              <GitHubIcon />
              github
            </a>
            <a
              href="https://www.linkedin.com/in/abdullah-sahapdeen/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm link-accent"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon />
              linkedin
            </a>
            <a
              href="https://drive.google.com/file/d/1Ye9dWiFidZm4tq9CNCYttci9BxU3AE7W/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm link-accent"
              aria-label="View resume"
            >
              resume
              <ExternalIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
