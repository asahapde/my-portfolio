import { useEffect, useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "py-4 backdrop-blur-glass shadow-2xl" : "py-6 bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="group relative text-2xl font-bold text-white transition-all duration-300 hover:scale-105"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="hidden md:inline">
              <span className="text-white">Abdullah</span>
              <span className="text-gradient ml-2">Sahapdeen</span>
            </span>
            <span className="md:hidden">
              <span className="text-white">A</span>
              <span className="text-gradient">S</span>
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-gray-300 hover:text-white transition-all duration-300 cursor-pointer font-medium animate-slide-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
                <div className="absolute inset-0 -m-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white backdrop-blur-glass rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover-glow active:scale-95 animate-slide-in-up animate-delay-500"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Let's Talk
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative p-3 rounded-xl backdrop-blur-glass transition-all duration-300 hover:scale-110 hover-glow group"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-6 relative">
              <span
                className={`absolute block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                  isMenuOpen ? "rotate-45 translate-y-2.5" : "translate-y-0"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out translate-y-2.5 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                  isMenuOpen ? "-rotate-45 translate-y-2.5" : "translate-y-5"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4 pb-6 space-y-1">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={`group block px-4 py-3 text-base font-medium text-white hover:text-gradient rounded-xl transition-all duration-300 hover:translate-x-2 hover:bg-white/5 animate-slide-in-left ${
                  isMenuOpen ? "" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${index * 100 + 200}ms`,
                  animationFillMode: "forwards",
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {link.label}
                </div>
              </a>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4 px-4">
              <a
                href="#contact"
                className={`group relative inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 animate-scale-in ${
                  isMenuOpen ? "" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${navLinks.length * 100 + 400}ms`,
                  animationFillMode: "forwards",
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Let's Connect
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
