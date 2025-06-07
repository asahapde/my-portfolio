import { useEffect, useRef, useState } from "react";

// Journey Card Component with curved path design
const JourneyCard = ({ exp, index }: { exp: any; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Alternating positioning for visual variety
  const isEven = index % 2 === 0;
  const cardOffset = isEven ? "md:translate-x-12" : "md:-translate-x-12";
  const textAlign = isEven ? "md:text-left" : "md:text-right";

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-1000 ${
        isVisible ? "animate-float opacity-100" : "opacity-0 translate-y-20"
      } ${cardOffset}`}
      style={{ animationDelay: `${index * 300}ms` }}
    >
      {/* Curved Path Connector */}
      {index < 2 && (
        <div className="absolute left-1/2 top-full hidden md:block pointer-events-none">
          <svg
            width="200"
            height="120"
            viewBox="0 0 200 120"
            className="transform -translate-x-1/2"
            style={{ animationDelay: `${index * 300 + 600}ms` }}
          >
            <path
              d={
                isEven ? "M 100 0 Q 150 60 100 120" : "M 100 0 Q 50 60 100 120"
              }
              stroke="url(#pathGradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              className={`${isVisible ? "animate-draw-path" : "opacity-0"}`}
            />
            <defs>
              <linearGradient
                id="pathGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>

          {/* Animated Dot Moving Along Path */}
          <div
            className={`absolute w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full ${
              isVisible ? "animate-move-along-path" : "opacity-0"
            }`}
            style={{
              animationDelay: `${index * 300 + 1000}ms`,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      )}

      {/* Main Experience Card */}
      <div className={`group relative max-w-md mx-auto text-left ${textAlign}`}>
        {/* Company Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 mb-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-glass rounded-full border border-blue-500/20 ${
            isEven ? "md:ml-0" : "md:mr-0 md:ml-auto"
          }`}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-blue-400">
            {exp.company}
          </span>
        </div>

        {/* Card Container */}
        <div className="relative p-6 md:p-8 bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-glass rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover-lift group-hover:shadow-2xl overflow-hidden">
          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-xl animate-pulse-slow" />
            <div
              className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse-slow"
              style={{ animationDelay: "1s" }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-left">
            {/* Job Title */}
            <h3
              className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300 text-left"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {exp.title}
            </h3>

            {/* Period with Icon */}
            <div className="flex items-center gap-2 mb-4 text-gray-400 justify-start">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium">{exp.period}</span>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300 text-left">
              {exp.description}
            </p>

            {/* Skills Orbs */}
            <div className="flex flex-wrap gap-3 justify-start">
              {exp.highlights?.map((skill: string, idx: number) => (
                <div
                  key={idx}
                  className="group/skill relative"
                  style={{
                    animationDelay: `${index * 300 + idx * 100 + 800}ms`,
                  }}
                >
                  <div className="relative px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-glass rounded-2xl border border-blue-500/30 text-sm font-medium text-blue-300 hover:text-white hover:scale-105 transition-all duration-300 cursor-default animate-scale-in">
                    <span className="relative z-10">{skill}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-sm animate-pulse" />
          <div
            className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-sm animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        {/* Experience Number Badge */}
        <div
          className={`absolute -bottom-4 -right-4 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 z-20 ${
            isEven
              ? "md:top-8 md:-left-16 md:bottom-auto md:right-auto md:w-12 md:h-12 md:rounded-2xl"
              : "md:top-8 md:-right-16 md:left-auto md:bottom-auto md:right-auto md:w-12 md:h-12 md:rounded-2xl"
          }`}
        >
          <span className="text-sm md:text-lg">{index + 1}</span>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: "Associate Software Engineer",
      company: "Carfax",
      period: "May 2023 - Present",
      description:
        "Delivered high-impact frontend solutions serving 200k+ users with React, and engineered automated Java tools for Google Ad Manager integrations, significantly improving operational efficiency.",
      highlights: ["React", "Java", "Google Ad Manager", "200k+ Users"],
    },
    {
      title: "Software Developer Intern",
      company: "Ontario Teacher's Pension Plan",
      period: "May 2021 - September 2022",
      description:
        "Spearheaded automation initiatives and developed sophisticated Angular-based tools that streamlined workflows across multiple teams, resulting in measurable productivity gains.",
      highlights: [
        "Angular",
        "Automation",
        "Workflow Optimization",
        "Team Collaboration",
      ],
    },
    {
      title: "Software Developer Intern",
      company: "Western University",
      period: "May 2020 - August 2020",
      description:
        "Architected and developed a comprehensive full-stack mission control dashboard using Angular and Node.js, enabling real-time system monitoring and management capabilities.",
      highlights: [
        "Angular",
        "Node.js",
        "Full-Stack",
        "Dashboard",
        "Real-time",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Artistic Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Meshes */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-cyan-500/3 to-purple-500/3 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "6s" }}
        />

        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-float opacity-60" />
        <div
          className="absolute bottom-40 left-16 w-3 h-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-float opacity-40"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-float opacity-50"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-32">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-glass rounded-full border border-blue-500/20 mb-8 animate-slide-in-up">
            <svg
              className="w-5 h-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <span className="text-blue-400 font-semibold">
              Professional Journey
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 animate-slide-in-up animate-delay-200"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Career <span className="text-gradient">Highlights</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-slide-in-up animate-delay-400">
            Crafting innovative solutions and driving{" "}
            <span className="text-gradient font-semibold">
              technological excellence
            </span>{" "}
            across diverse industries
          </p>
        </div>

        {/* Journey Path */}
        <div className="relative">
          {/* Central Journey Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent transform -translate-x-1/2" />

          {/* Experience Cards */}
          <div className="space-y-24 md:space-y-32">
            {experiences.map((exp, index) => (
              <JourneyCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>

        {/* Achievement Showcase */}
        <div className="mt-32 relative">
          <div className="text-center mb-16">
            <h3
              className="text-3xl md:text-4xl font-bold text-white mb-4 animate-slide-in-up"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Impact <span className="text-gradient">Metrics</span>
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto animate-slide-in-up animate-delay-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                label: "Years of Innovation",
                value: "3+",
                icon: "🚀",
                color: "from-blue-500 to-cyan-500",
              },
              {
                label: "Users Served",
                value: "200k+",
                icon: "👥",
                color: "from-cyan-500 to-purple-500",
              },
              {
                label: "Projects Delivered",
                value: "10+",
                icon: "⚡",
                color: "from-purple-500 to-blue-500",
              },
            ].map((metric, index) => (
              <div
                key={index}
                className="group relative p-8 bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-glass rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover-lift hover-glow text-center animate-scale-in overflow-hidden"
                style={{ animationDelay: `${index * 200 + 600}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {metric.icon}
                  </div>
                  <div
                    className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {metric.value}
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-medium">
                    {metric.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-24 animate-slide-in-up animate-delay-1000">
          <p className="text-lg text-gray-400 mb-8">
            Let's create something extraordinary together
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center justify-center px-12 py-6 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 magnetic-button relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center gap-3">
              <span>Start a Conversation</span>
              <svg
                className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
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
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
