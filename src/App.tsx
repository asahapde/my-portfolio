import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

export type Theme = "light" | "dark";

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (
      (document.documentElement.getAttribute("data-theme") as Theme) ?? "light"
    );
  });

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Analytics />
    </>
  );
}

export default App;
