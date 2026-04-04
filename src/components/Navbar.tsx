import { useEffect, useState } from "react";
import type { Theme } from "../App";

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
}

const navLinks = [
  { href: "#experience", label: "work" },
  { href: "#projects", label: "projects" },
  { href: "#skills", label: "stack" },
  { href: "#contact", label: "contact" },
];

const MoonIcon = () => (
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
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SunIcon = () => (
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
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "var(--nav-bg)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
        transition: "border-color 0.2s ease",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8 flex items-center justify-between h-14">
        {/* Logo */}
        <a
          href="#home"
          className="text-sm font-semibold tracking-tight"
          style={{ color: "var(--text)" }}
        >
          Abdullah Sahapdeen
        </a>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm link-accent"
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="flex items-center justify-center w-7 h-7 rounded-md link-accent transition-colors duration-150"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="sm:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="flex items-center justify-center w-7 h-7 link-accent"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex flex-col items-center justify-center gap-[5px] w-7 h-7"
            style={{ color: "var(--text)" }}
          >
            <span
              className="block w-5 h-px bg-current transition-transform duration-200 origin-center"
              style={{
                transform: menuOpen
                  ? "rotate(45deg) translateY(6px)"
                  : "none",
              }}
            />
            <span
              className="block w-5 h-px bg-current transition-opacity duration-200"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-px bg-current transition-transform duration-200 origin-center"
              style={{
                transform: menuOpen
                  ? "rotate(-45deg) translateY(-6px)"
                  : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="sm:hidden overflow-hidden transition-all duration-200"
        style={{
          maxHeight: menuOpen ? "200px" : "0",
          borderTop: menuOpen ? "1px solid var(--border)" : "none",
        }}
      >
        <nav
          className="max-w-3xl mx-auto px-6 py-4 flex flex-col gap-1"
          style={{ background: "var(--bg)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm py-2 link-accent"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
