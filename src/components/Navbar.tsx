import { useEffect, useState } from "react";
import type { Theme } from "../App";
import { links } from "../data";
import { useActiveSection } from "../hooks";
import { MoonIcon, SunIcon } from "./Icons";

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
}

const navLinks = [
  { id: "experience", label: "work" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "stack" },
];

const sectionIds = navLinks.map((l) => l.id);

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 20);
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const themeLabel = `Switch to ${theme === "light" ? "dark" : "light"} mode`;

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        background: "var(--nav-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid ${scrolled || menuOpen ? "var(--border)" : "transparent"}`,
        transition: "border-color 0.2s ease",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8 flex items-center justify-between h-14">
        <a
          href="#home"
          className="text-sm font-semibold tracking-tight"
          aria-label="Abdullah Sahapdeen, back to top"
        >
          abdullah sahapdeen<span className="text-accent">.</span>
        </a>

        <nav className="hidden sm:flex items-center gap-1" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? "true" : undefined}
                className="text-sm px-3 py-1.5 rounded-md transition-colors duration-150"
                style={{
                  color: isActive ? "var(--text)" : "var(--text-muted)",
                  background: isActive ? "var(--bg-subtle)" : "transparent",
                }}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3 py-1.5 link-accent"
          >
            resume
          </a>
          <button
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="ml-2 flex items-center justify-center w-8 h-8 rounded-md link-accent cursor-pointer"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
        </nav>

        <div className="sm:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={themeLabel}
            className="flex items-center justify-center w-9 h-9 link-accent cursor-pointer"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex flex-col items-center justify-center gap-[5px] w-9 h-9 cursor-pointer"
          >
            <span
              className="block w-5 h-px bg-current transition-transform duration-200"
              style={{ transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }}
            />
            <span
              className="block w-5 h-px bg-current transition-opacity duration-200"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-px bg-current transition-transform duration-200"
              style={{ transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="sm:hidden overflow-hidden transition-[max-height] duration-300"
        style={{ maxHeight: menuOpen ? "320px" : "0" }}
        inert={!menuOpen}
      >
        <nav className="px-6 pb-5 pt-1 flex flex-col" aria-label="Mobile">
          {[...navLinks.map((l) => ({ href: `#${l.id}`, label: l.label, id: l.id })),
            { href: links.resume, label: "resume", id: "resume" }].map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={closeMenu}
              {...(link.id === "resume" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-base py-2.5 flex items-center justify-between"
              style={{
                color: active === link.id ? "var(--accent)" : "var(--text-muted)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div
        aria-hidden="true"
        className="absolute left-0 bottom-[-1px] h-px origin-left"
        style={{
          width: "100%",
          transform: `scaleX(${progress})`,
          background: "var(--accent)",
        }}
      />
    </header>
  );
};

export default Navbar;
