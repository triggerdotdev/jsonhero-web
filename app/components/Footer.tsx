import { ThemeModeToggler } from "./ThemeModeToggle";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import ShortcutsDialog from "./ShortcutsDialog";
import { styled } from "@stitches/react";
import { useHotkeys } from "react-hotkeys-hook";
import { useEffect, useState } from "react";
import LetterIcon from "./Icons/LetterIcon";
import EnterIcon from "./Icons/EnterIcon";
import MinusIcon from "./Icons/MinusIcon";
import AltIcon from "./Icons/AltIcon";
import CmdIcon from "./Icons/CmdIcon";
import CommaIcon from "./Icons/CommaIcon";
import CtrlIcon from "./Icons/CtrlIcon";
import DownArrowIcon from "./Icons/DownArrowIcon";
import EscapeIcon from "./Icons/EscapeIcon";
import ForwardSlashIcon from "./Icons/ForwardSlashIcon";
import LeftArrowIcon from "./Icons/LeftArrowIcon";
import LeftBracketIcon from "./Icons/LeftBracketIcon";
import OptIcon from "./Icons/OptIcon";
import PeriodIcon from "./Icons/PeriodIcon";
import RightArrowIcon from "./Icons/RightArrowIcon";
import RightBracketIcon from "./Icons/RightBracketIcon";
import ShiftIcon from "./Icons/ShiftIcon";
import UpArrowIcon from "./Icons/UpArrowIcon";

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

  "&:hover": {
    color: "#4237C9",
  },
});

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

export function Footer() {
  const forceUpdate = useForceUpdate();
  //@ts-ignore
  useHotkeys(
    localStorage.getItem("shortcuts")
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("shortcuts"))
          ["ToggleShortcutsPanelShortcutInput"].split(" ")
          .join("+")
          .replace("Opt", "Alt")
          .replace("Arrow", "")
          .replace("Arrow", "")
      : "opt+s, alt+s",
    (e) => {
      e.preventDefault();
      forceUpdate();
      document.getElementById("ShortcutPanelTrigger")?.click();
    }
  );

  let OS = "";
  useEffect(() => {
    if (navigator.userAgent.indexOf("Win") != -1) OS = "Windows";
    if (navigator.userAgent.indexOf("Mac") != -1) OS = "Mac";
    if (navigator.userAgent.indexOf("Linux") != -1) OS = "Linux";
    console.log(OS);
  });

  let shortcutObject: any = localStorage?.getItem("shortcuts")
    ? // @ts-ignore
      JSON.parse(localStorage?.getItem("shortcuts"))
    : {
        ChangeThemeShortcutInput: OS == "Mac" ? "Alt t" : "Opt t",
        CopyCurrentSelectedNodeShortcutInput: "Shift C",
        GoBackInHistoryShortcutInput: "[",
        GoForwardInHistoryShortcutInput: "]",
        NavigationDownShortcutInput: "ArrowDown",
        NavigationLeftShortcutInput: "ArrowLeft",
        NavigationRightShortcutInput: "ArrowRight",
        NavigationUpShortcutInput: "ArrowUp",
        OpenSearchShortcutInput: "Cmd k",
        ResetPathShortcutInput: "Escape",
        SearchCloseShortcutInput: "Escape",
        SearchDownShortcutInput: "ArrowDown",
        SearchSelectShortcutInput: "Enter",
        SearchUpShortcutInput: "ArrowUp",
        ToggleShortcutsPanelShortcutInput: OS == "Mac" ? "Alt s" : "Opt s",
      };

  localStorage.setItem("shortcuts", JSON.stringify(shortcutObject));

  let iconObject: any = {
    Alt: <AltIcon></AltIcon>,
    Opt: <OptIcon></OptIcon>,
    Cmd: <CmdIcon></CmdIcon>,
    Shift: <ShiftIcon></ShiftIcon>,
    Ctrl: <CtrlIcon></CtrlIcon>,
    Enter: <EnterIcon></EnterIcon>,
    ",": <CommaIcon></CommaIcon>,
    ".": <PeriodIcon></PeriodIcon>,
    "/": <ForwardSlashIcon></ForwardSlashIcon>,
    "[": <LeftBracketIcon></LeftBracketIcon>,
    "]": <RightBracketIcon></RightBracketIcon>,
    "-": <MinusIcon></MinusIcon>,
    ArrowUp: <UpArrowIcon></UpArrowIcon>,
    ArrowDown: <DownArrowIcon></DownArrowIcon>,
    ArrowLeft: <LeftArrowIcon></LeftArrowIcon>,
    ArrowRight: <RightArrowIcon></RightArrowIcon>,
    Escape: <EscapeIcon></EscapeIcon>,
  };

  function isLetter(str: string) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  let getShortcutIcon = (shortcut: string) => {
    let iconsArr: any = [];
    let IconTag;
    let shortcutKeysArr = shortcutObject[shortcut].split(" ");
    for (let i in shortcutKeysArr) {
      let key = shortcutKeysArr[i];
      if (isLetter(key)) {
        IconTag = <LetterIcon style={{ marginLeft: "3px" }} letter={key}></LetterIcon>;
      } else {
        IconTag = iconObject[key];
      }
      //@ts-ignore
      iconsArr.push(IconTag);
    }
    return iconsArr;
  };

  return (
    <footer className="flex items-center justify-between w-screen h-[30px] bg-slate-200 dark:bg-slate-800 border-t-[1px] border-slate-400 transition dark:border-slate-600">
      <ol className="flex pl-3">
        <li className="flex items-center">
          <StyledDialog>
            <DialogTrigger asChild>
              <div style={{ padding: "0px 5px" }} id="ShortcutPanelTrigger">
                <button className="flex dark:text-white">
                  Shortcuts
                  <div className="mt-0.5 ml-1">
                    <div className="flex justify-between dark:text-black">
                      {getShortcutIcon("ToggleShortcutsPanelShortcutInput").map((icon: any) => {
                        return icon;
                      })}
                    </div>
                  </div>
                </button>
              </div>
            </DialogTrigger>
            <ShortcutsDialog shortcutObject={shortcutObject} iconObject={iconObject}></ShortcutsDialog>
          </StyledDialog>
        </li>
      </ol>
      <ThemeModeToggler />
    </footer>
  );
}
