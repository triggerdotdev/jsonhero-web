import { useHotkeys } from "react-hotkeys-hook";
import { useSelectedInfo } from "../hooks/useSelectedInfo";

export function CopySelectedNodeShortcut() {
  const selectedInfo = useSelectedInfo();

  useHotkeys(
    localStorage.getItem("shortcuts")
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("shortcuts"))
          ["CopyCurrentSelectedNodeShortcutInput"].split(" ")
          .join("+")
          .replace("Opt", "Alt")
          .replace("Arrow", "")
      : "shift+c,shift+C",
    (e) => {
      e.preventDefault();
      const selectedJSON =
        selectedInfo?.name === "string" ? selectedInfo?.value : JSON.stringify(selectedInfo?.value, null, 2);
      navigator.clipboard.writeText(selectedJSON);
    },
    [selectedInfo]
  );

  return <></>;
}
