import { useHotkeys } from "react-hotkeys-hook";
import { MoonIcon } from "./Icons/MoonIcon";
import { SunIcon } from "./Icons/SunIcon";
import { useTheme } from "./ThemeProvider";

export function ThemeModeToggler() {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const SwitchIcon = theme === "light" ? MoonIcon : SunIcon;

  useHotkeys("alt+t", () => toggleTheme(), [toggleTheme]);

  return (
    <button
      className={`flex text-xl items-center px-2 py-1.5 transition ${
        theme === "light"
          ? "text-slate-800 hover:bg-slate-300"
          : "text-white hover:bg-slate-700"
      }`}
      onClick={toggleTheme}
    >
      <SwitchIcon />
    </button>
  );
}
