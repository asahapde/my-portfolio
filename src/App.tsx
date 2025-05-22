import "./App.css";

function App() {
  return (
    <main className="mx-auto w-full max-w-3xl md:max-w-4xl lg:max-w-5xl px-5">
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <h1
          className="mb-1.5 text-7xl font-bold tracking-tightest text-white sm:text-8xl md:mb-0 md:text-9xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Abdullah Sahapdeen
        </h1>
        <p
          className="mb-9 text-4xl leading-[46px] font-bold tracking-tighter text-sky-500 sm:text-5xl md:text-6xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Software Engineer
        </p>
        <p className="mb-16 text-base font-normal text-gray-400 md:text-2xl">
          I specialize in frontend and full-stack development, creating
          user-friendly and visually appealing web applications. I have a
          passion for coding and a strong desire to learn and grow in the field
          of software development. I am always eager to take on new challenges
          and expand my skill set.
        </p>
        <a
          className="inline-block text-base sm:text-lg md:text-xl rounded-full bg-sky-500 hover:bg-sky-700 px-8 py-5 leading-5 font-medium"
          href="mailto:asahapde@gmail.com"
        >
          Get in Touch
        </a>
      </section>
    </main>
  );
}

export default App;
