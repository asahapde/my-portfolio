const Experience = () => {
  const experiences = [
    {
      title: "Associate Software Engineer",
      company: "Carfax",
      period: "May 2023 - Present",
      description:
        "Shipped scalable frontend features in React for 200k+ users, and built a Java tool to automate item uploads to Google Ad Manager.",
    },
    {
      title: "Software Developer Intern",
      company: "Ontario Teacher's Pension Plan",
      period: "May 2021 - September 2022",
      description:
        "Automated internal workflows and developed Angular-based tools to streamline processes across teams and boost productivity.",
    },
    {
      title: "Software Developer Intern",
      company: "Western University",
      period: "May 2020 - August 2020",
      description:
        "Built a full-stack mission control dashboard using Angular and Node.js to monitor and manage systems.",
    },
  ];

  return (
    <section id="experience" className="py-16 md:py-24 bg-black/50">
      <div className="mx-auto w-full max-w-3xl md:max-w-4xl lg:max-w-5xl px-5">
        <h2
          className="mb-8 md:mb-12 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white animate-slideUp"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Experience
        </h2>
        <div className="space-y-6 md:space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-6 md:pl-8 border-l-2 border-sky-500/30"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-sky-500" />
              <div className="p-4 md:p-6 rounded-lg bg-black/30 backdrop-blur-sm border border-gray-800">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 md:mb-4">
                  <h3
                    className="text-xl md:text-2xl font-bold text-white tracking-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {exp.title}
                  </h3>
                  <span className="text-sm md:text-base text-sky-400 mt-1 md:mt-0">
                    {exp.period}
                  </span>
                </div>
                <h4
                  className="text-lg md:text-xl text-sky-500 mb-2 md:mb-3 tracking-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {exp.company}
                </h4>
                <p className="text-sm md:text-base text-gray-400">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
