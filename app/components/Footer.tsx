import { ThemeModeToggler } from "./ThemeModeToggle";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import ShortcutsDialog from "./ShortcutsDialog";
import { styled } from "@stitches/react";
import ToggleShortcutsPanelIconMac from "./Icons/ToggleShortcutsPanelIconMac";
import ToggleShortcutsPanelIconWin from "./Icons/ToggleShortcutsPanelIconWin";
import { useHotkeys } from "react-hotkeys-hook";
import { useEffect } from "react";

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
  width: "135px",
  color: "#000000",

  "&:hover": {
    backgroundColor: "#4237C9",
    color: "#ffffff",
  },
});

export function Footer() {
  useHotkeys("opt+s, alt+s", (e) => {
    e.preventDefault();
    document.getElementById("ShortcutPanelTrigger")?.click();
  });

  let OS = "";
  useEffect(() => {
    if (navigator.userAgent.indexOf("Win") != -1) OS = "Windows";
    if (navigator.userAgent.indexOf("Mac") != -1) OS = "Mac";
    if (navigator.userAgent.indexOf("Linux") != -1) OS = "Linux";
    console.log(OS);
  });

  return (
    <footer className="flex items-center justify-between w-screen h-[30px] bg-slate-200 dark:bg-slate-800 border-t-[1px] border-slate-400 transition dark:border-slate-600">
      <ol className="flex pl-3">
        <li className="flex items-center">
          <StyledDialog>
            <DialogTrigger asChild>
              <div style={{ padding: "0px 5px" }} id="ShortcutPanelTrigger">
                <button style={{ color: "inherit" }} className="transition">
                  Shortcuts
                </button>
                <div className="mt-0.5">
                  {OS == "Mac" ? (
                    <ToggleShortcutsPanelIconWin className="dark:text-white"></ToggleShortcutsPanelIconWin>
                  ) : (
                    <ToggleShortcutsPanelIconMac className="dark:text-white"></ToggleShortcutsPanelIconMac>
                  )}
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
