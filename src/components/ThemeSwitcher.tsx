import { useState } from "preact/hooks";
import Sun from "../../public/img/Sun";
import Moon from "../../public/img/Moon";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    document.querySelector("body")?.setAttribute("data-theme", newTheme);

    setTheme(newTheme);
  };

  return (
    <article
      class="flex items-center justify-center rounded-full w-11 h-11 cursor-pointer bg-black/10"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <Moon height={30} width={30} />
      ) : (
        <Sun height={30} width={30} />
      )}
    </article>
  );
};

export default ThemeSwitcher;
