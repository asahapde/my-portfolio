import { useEffect, useState } from "react";

// Enhanced rotating title component with smooth transitions
const RotatingTitle = () => {
  const titles = [
    "Software Engineer",
    "Full Stack Developer",
    "Problem Solver",
    "Bug Hunter",
    "Code Artist",
    "Stack Overflow Expert",
    "Debug Master",
    "Leetcode Warrior",
    "Code Poet",
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseTime = 2000;

    if (!isDeleting && currentIndex < currentTitle.length) {
      // Typing
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + currentTitle[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentIndex === currentTitle.length) {
      // Pause at full text
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentIndex > 0) {
      // Deleting
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
        setCurrentIndex((prev) => prev - 1);
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentIndex === 0) {
      // Move to next title
      setIsDeleting(false);
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }
  }, [currentIndex, isDeleting, currentTitleIndex, titles]);

  return (
    <span className="text-gradient">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Animated background shapes
const BackgroundShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Floating geometric shapes */}
    <div
      className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full animate-float"
      style={{ animationDelay: "0s" }}
    />
    <div
      className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full animate-float"
      style={{ animationDelay: "2s" }}
    />
    <div
      className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 rounded-full animate-float"
      style={{ animationDelay: "4s" }}
    />

    {/* Animated lines */}
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path
        d="M0,100 Q250,50 500,100 T1000,100"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
      />
      <path
        d="M0,200 Q300,150 600,200 T1200,200"
        stroke="url(#lineGradient)"
        strokeWidth="1"
        fill="none"
        className="animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </svg>
  </div>
);

// Social links component
const SocialLinks = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/abdullah-sahapdeen/",
      icon: (
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/asahapde",
      icon: (
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      ),
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((link, index) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center justify-center w-14 h-14 rounded-2xl backdrop-blur-glass
            hover:scale-110 hover-glow transition-all duration-300 animate-scale-in`}
          style={{ animationDelay: `${(index + 4) * 200}ms` }}
          aria-label={`${link.name} Profile`}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <svg
              className="w-7 h-7 text-gray-300 group-hover:text-white transition-colors duration-300 relative z-10"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {link.icon}
            </svg>
          </div>
        </a>
      ))}
    </div>
  );
};

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
    >
      {/* Animated Background */}
      <BackgroundShapes />

      {/* Interactive cursor effect */}
      <div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 transition-all duration-1000 ease-out opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Main Heading */}
        <h1 className="mb-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight animate-slide-in-up">
          <span
            className="block text-white font-display leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Abdullah
          </span>
          <span
            className="block text-gradient font-display leading-none animate-slide-in-up animate-delay-200"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Sahapdeen
          </span>
        </h1>

        {/* Rotating Subtitle */}
        <div
          className="mb-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem] animate-slide-in-up animate-delay-400"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <RotatingTitle />
        </div>

        {/* Description */}
        <p className="mb-12 text-lg md:text-xl lg:text-2xl font-normal text-gray-300 max-w-4xl mx-auto leading-relaxed animate-slide-in-up animate-delay-600">
          I specialize in creating{" "}
          <span className="text-gradient font-semibold">
            exceptional digital experiences
          </span>{" "}
          through innovative full-stack development. Passionate about
          transforming ideas into{" "}
          <span className="text-gradient font-semibold">
            elegant, scalable solutions
          </span>{" "}
          that make a difference.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 animate-slide-in-up animate-delay-800">
          <a
            href="https://drive.google.com/file/d/1Ye9dWiFidZm4tq9CNCYttci9BxU3AE7W/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 magnetic-button"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              View Resume
            </span>
          </a>

          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white backdrop-blur-glass rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover-glow active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
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

        {/* Social Links */}
        <div className="flex justify-center">
          <SocialLinks />
        </div>
      </div>
    </section>
  );
};

export default Hero;
