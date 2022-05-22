import { useJsonColumnViewAPI, useJsonColumnViewState } from "../hooks/useJsonColumnView";
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
    localStorage.getItem("shortcuts")
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("shortcuts"))
          ["NavigationDownShortcutInput"].split(" ")
          .join("+")
          .replace("Opt", "Alt")
          .replace("Arrow", "")
          .replace("Arrow", "")
      : "down",
    (e) => {
      e.preventDefault();
      api.goToNextSibling();
    },
    { enabled: true },
    [api]
  );

  useHotkeys(
    localStorage.getItem("shortcuts")
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("shortcuts"))
          ["NavigationUpShortcutInput"].split(" ")
          .join("+")
          .replace("Opt", "Alt")
          .replace("Arrow", "")
          .replace("Arrow", "")
      : "up",
    (e) => {
      e.preventDefault();
      api.goToPreviousSibling();
    },
    [api]
  );

  useHotkeys(
    localStorage.getItem("shortcuts")
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("shortcuts"))
          ["NavigationRightShortcutInput"].split(" ")
          .join("+")
          .replace("Opt", "Alt")
          .replace("Arrow", "")
          .replace("Arrow", "")
      : "right",
    (e) => {
      e.preventDefault();
      api.goToChildren();
    },
    [api]
  );

  useHotkeys(
    localStorage.getItem("shortcuts")
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("shortcuts"))
          ["NavigationLeftShortcutInput"].split(" ")
          .join("+")
          .replace("Opt", "Alt")
          .replace("Arrow", "")
          .replace("Arrow", "")
      : "left,alt+left",
    (e) => {
      e.preventDefault();
      api.goToParent({ source: e });
    },
    [api]
  );

  useHotkeys(
    localStorage.getItem("shortcuts")
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("shortcuts"))
          ["ResetPathShortcutInput"].split(" ")
          .join("+")
          .replace("Opt", "Alt")
          .replace("Arrow", "")
          .replace("Arrow", "")
      : "esc",
    (e) => {
      e.preventDefault();
      api.resetSelection();
    },
    [api]
  );

  return (
    <>
      <CopySelectedNodeShortcut />
    </>
  );
}
