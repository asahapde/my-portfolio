const Skills = () => {
  const skills = [
    {
      category: "Frontend",
      items: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Next.js",
        "Redux",
        "Material UI",
      ],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Express",
        "Python",
        "PostgreSQL",
        "MongoDB",
        "REST APIs",
      ],
    },
    {
      category: "Tools",
      items: ["Git", "Docker", "AWS", "Figma", "VS Code", "Postman"],
    },
  ];

  return (
    <section id="skills" className="py-16 md:py-24 bg-black">
      <div className="mx-auto w-full max-w-3xl md:max-w-4xl lg:max-w-5xl px-5">
        <h2
          className="mb-8 md:mb-12 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white animate-slideUp"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
          {skills.map((skillGroup, index) => (
            <div
              key={skillGroup.category}
              className="p-4 md:p-6 rounded-lg bg-black/30 backdrop-blur-sm border border-gray-800 animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3
                className="text-xl md:text-2xl font-bold text-sky-500 mb-3 md:mb-4 tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 md:px-3 py-1 text-xs md:text-sm bg-sky-500/10 text-sky-400 rounded-full hover:bg-sky-500/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
