import {
  useJsonColumnViewAPI,
  useJsonColumnViewState,
} from "../hooks/useJsonColumnView";
import { useHotkeys } from "react-hotkeys-hook";
import { Columns } from "./Columns";
import { CopySelectedNodeShortcut } from "./CopySelectedNode";

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

  return <>
    <CopySelectedNodeShortcut />
  </>;
}
