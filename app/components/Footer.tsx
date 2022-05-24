import { ThemeModeToggler } from "./ThemeModeToggle";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import ShortcutsDialog from "./ShortcutsDialog";
import { styled } from "@stitches/react";
import ToggleShortcutsPanelIcon from "./Icons/ToggleShortcutsPanelIcon";
import { useHotkeys } from "react-hotkeys-hook";
import {useState} from "react";

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
    color: "#4237C9",
  },
});

export function Footer({ isOpen, setIsOpen }: any) {
  useHotkeys("alt+s", (e) => {
    e.preventDefault();
    setIsOpen(true)
  });

  return (
    <footer className="flex items-center justify-between w-screen h-[30px] bg-slate-200 dark:bg-slate-800 border-t-[1px] border-slate-400 transition dark:border-slate-600">
      <ol className="flex pl-3">
        <li className="flex items-center">
          <StyledDialog open={isOpen}
            onOpenChange={() => {
              !isOpen;
            }}>
            <DialogTrigger
              onClick={() => {
                setIsOpen(true);
              }} asChild>
              <div style={{ padding: "0px 5px" }} className="flex dark:text-white" id="ShortcutPanelTrigger">
                <button style={{ color: "inherit" }} className="flex dark:text-white">
                  Open Shortcuts Panel
                  <div className="mt-0.5 ml-1">
                    <ToggleShortcutsPanelIcon></ToggleShortcutsPanelIcon>
                  </div>
                </button>
              </div>
            </DialogTrigger>
            <ShortcutsDialog openState={isOpen}
              setOpenState={setIsOpen}></ShortcutsDialog>
          </StyledDialog>
        </li>
      </ol>
      <ThemeModeToggler />
    </footer>
  );
}
