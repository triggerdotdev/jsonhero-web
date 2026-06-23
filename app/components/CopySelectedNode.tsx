import { useHotkeys } from "react-hotkeys-hook";
import { useSelectedInfo } from "../hooks/useSelectedInfo";
import { useJsonColumnViewState } from "../hooks/useJsonColumnView";
import { formatPath } from "../utilities/pathFormatter";

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

export function CopySelectedNodePathShortcut() {
  const { selectedNodeId } = useJsonColumnViewState();

  useHotkeys(
    'shift+p,shift+P',
    (e) => {
      if (!selectedNodeId) {
        return;
      }
      e.preventDefault();
      navigator.clipboard.writeText(formatPath(selectedNodeId, "jsonpath"));
    },
    [selectedNodeId]
  );

  return <></>;
}
