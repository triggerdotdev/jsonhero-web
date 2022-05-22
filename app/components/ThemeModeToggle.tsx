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

  useHotkeys(
    localStorage.getItem("shortcuts")
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("shortcuts"))
          ["ChangeThemeShortcutInput"].split(" ")
          .join("+")
          .replace("Opt", "Alt")
          .replace("Arrow", "")
      : "alt+t",
    () => toggleTheme(),
    [toggleTheme]
  );

  return (
    <button
      className={`flex text-xl items-center pr-2 ${theme === "light" ? "text-slate-800" : "text-white"}`}
      onClick={toggleTheme}>
      <SwitchIcon />
    </button>
  );
}
