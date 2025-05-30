import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50">
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#home"
            className="text-xl font-bold text-white hover:text-sky-500 transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            AS
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              className="text-gray-400 hover:text-white transition-all duration-200 cursor-pointer relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-200" />
            </a>
            <a
              href="#skills"
              className="text-gray-400 hover:text-white transition-all duration-200 cursor-pointer relative group"
            >
              Skills
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-200" />
            </a>
            <a
              href="#experience"
              className="text-gray-400 hover:text-white transition-all duration-200 cursor-pointer relative group"
            >
              Experience
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-200" />
            </a>
            <a
              href="#projects"
              className="text-gray-400 hover:text-white transition-all duration-200 cursor-pointer relative group"
            >
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-200" />
            </a>
            <a
              href="#contact"
              className="text-gray-400 hover:text-white transition-all duration-200 cursor-pointer relative group"
            >
              Get in Touch
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-200" />
            </a>
          </div>
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/80 backdrop-blur-md py-4 px-6">
            <div className="flex flex-col gap-4">
              <a
                href="#home"
                className="text-white hover:text-sky-500 transition-all duration-200 cursor-pointer hover:translate-x-1"
                onClick={toggleMenu}
              >
                Home
              </a>
              <a
                href="#skills"
                className="text-white hover:text-sky-500 transition-all duration-200 cursor-pointer hover:translate-x-1"
                onClick={toggleMenu}
              >
                Skills
              </a>
              <a
                href="#experience"
                className="text-white hover:text-sky-500 transition-all duration-200 cursor-pointer hover:translate-x-1"
                onClick={toggleMenu}
              >
                Experience
              </a>
              <a
                href="#projects"
                className="text-white hover:text-sky-500 transition-all duration-200 cursor-pointer hover:translate-x-1"
                onClick={toggleMenu}
              >
                Projects
              </a>
              <a
                href="#contact"
                className="text-white hover:text-sky-500 transition-all duration-200 cursor-pointer hover:translate-x-1"
                onClick={toggleMenu}
              >
                Get in Touch
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
