import { useEffect, useState } from "react";

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
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 1000;

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

  return <span>{currentText}</span>;
};

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-[95vh] flex items-center py-16 md:py-32 bg-black"
    >
      <div className="w-full animate-fadeIn">
        <h1
          className="mb-1.5 text-6xl font-bold tracking-tightest text-white sm:text-7xl md:mb-0 md:text-8xl lg:text-9xl animate-slideUp"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Abdullah Sahapdeen
        </h1>
        <p
          className="mb-9 text-3xl leading-[46px] font-bold tracking-tighter text-sky-500 sm:text-4xl md:text-5xl lg:text-6xl animate-slideUp animation-delay-200"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <RotatingTitle />
        </p>
        <p className="mb-12 md:mb-16 text-base font-normal text-gray-400 md:text-xl lg:text-2xl max-w-3xl animate-slideUp animation-delay-400">
          I specialize in frontend and full-stack development, creating
          user-friendly and visually appealing web applications. I have a
          passion for coding and a strong desire to learn and grow in the field
          of software development. I am always eager to take on new challenges
          and expand my skill set.
        </p>
        <div className="flex flex-row items-center gap-6 animate-slideUp animation-delay-600">
          <a
            href="https://drive.google.com/file/d/your-resume-id/view"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-sm sm:text-base md:text-lg rounded-full bg-white hover:bg-gray-100 text-black px-8 py-4 md:px-10 md:py-5 leading-5 font-medium transition-all hover:scale-105 cursor-pointer hover:shadow-lg hover:shadow-white/20 active:scale-95"
          >
            View Resume
          </a>
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-gray-700 hover:border-sky-500/50 hover:bg-sky-500/10 transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="LinkedIn Profile"
            >
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-sky-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-gray-700 hover:border-sky-500/50 hover:bg-sky-500/10 transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="GitHub Profile"
            >
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-sky-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
