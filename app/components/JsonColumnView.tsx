import {
  useJsonColumnViewAPI,
  useJsonColumnViewState,
} from "../hooks/useJsonColumnView";
import { useHotkeys } from "react-hotkeys-hook";
import { Columns } from "./Columns";
import { useSelectedInfo } from "../hooks/useSelectedInfo";

export function JsonColumnView() {
  const { getColumnViewProps, columns } = useJsonColumnViewState();

  return (
    <>
      <KeyboardShortcuts />
      <div {...getColumnViewProps()}>
        <Columns columns={columns} />
      </div>
    </>
  );
}

function KeyboardShortcuts() {
  const api = useJsonColumnViewAPI();
  const selectedInfo = useSelectedInfo();

  useHotkeys(
    "down",
    (e) => {
      e.preventDefault();
      api.goToNextSibling();
    },
    { enabled: true },
    [api]
  );

  useHotkeys(
    "up",
    (e) => {
      e.preventDefault();
      api.goToPreviousSibling();
    },
    [api]
  );

  useHotkeys(
    "right",
    (e) => {
      e.preventDefault();
      api.goToChildren();
    },
    [api]
  );

  useHotkeys(
    "left,alt+left",
    (e) => {
      e.preventDefault();
      api.goToParent({ source: e });
    },
    [api]
  );

  useHotkeys(
    "esc",
    (e) => {
      e.preventDefault();
      api.resetSelection();
    },
    [api]
  );

  useHotkeys(
    "ctrl+c,cmd+c",
    (e) => {
      e.preventDefault();
      const selectedJSON = JSON.stringify(selectedInfo?.value, null, 2);
      navigator.clipboard.writeText(selectedJSON);
    },
    [selectedInfo]
  );

  return <></>;
}
