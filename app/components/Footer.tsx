import { ThemeModeToggler } from "./ThemeModeToggle";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import ShortcutsDialog from "./ShortcutsDialog";
import { styled } from "@stitches/react";
import ToggleShortcutsPanelIcon from "./Icons/ToggleShortcutsPanelIcon";
import { useHotkeys } from "react-hotkeys-hook";

export const StyledDialog = styled(DialogPrimitive.Root, {
  outline: "none",

  "&:active": {
    outline: "none",
  },
});

export const DialogTrigger = styled(DialogPrimitive.Trigger, {
  outline: "none",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-between",
  width: "235px",
  color: "#000000",

  "&:hover": {
    backgroundColor: "#4237C9",
    color: "#ffffff",
  },
});

export function Footer() {
  useHotkeys("alt+s", (e) => {
    e.preventDefault();
    document.getElementById("ShortcutPanelTrigger")?.click();
  });

  return (
    <footer className="flex items-center justify-between w-screen h-[30px] bg-slate-200 dark:bg-slate-800 border-t-[1px] border-slate-400 transition dark:border-slate-600">
      <ol className="flex pl-3">
        <li className="flex items-center">
          <StyledDialog>
            <DialogTrigger asChild>
              <div style={{ padding: "0px 5px" }} id="ShortcutPanelTrigger">
                <button style={{ color: "inherit" }} className="pl-2 pr-4 transition">
                  Open Shortcuts Panel
                </button>
                <div className="mt-0.5">
                  <ToggleShortcutsPanelIcon></ToggleShortcutsPanelIcon>
                </div>
              </div>
            </DialogTrigger>
            <ShortcutsDialog></ShortcutsDialog>
          </StyledDialog>
        </li>
      </ol>
      <ThemeModeToggler />
    </footer>
  );
}
