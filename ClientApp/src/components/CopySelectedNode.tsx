import { useHotkeys } from "react-hotkeys-hook";
import { useSelectedInfo } from "../hooks/useSelectedInfo";

export function CopySelectedNodeShortcut() {
  const selectedInfo = useSelectedInfo();

  useHotkeys(
    'shift+c,shift+C',
    (e) => {
      e.preventDefault();
      const selectedJSON = selectedInfo?.name === "string"
        ? selectedInfo?.value
        : JSON.stringify(selectedInfo?.value, null, 2);
      navigator.clipboard.writeText(selectedJSON);
    },
    [selectedInfo]
  );

  return <></>;
}
