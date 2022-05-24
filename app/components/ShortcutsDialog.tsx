import React, { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled, keyframes } from "@stitches/react";
import { violet, blackA, mauve, green } from "@radix-ui/colors";
import { Cross2Icon } from "@radix-ui/react-icons";
import LetterIcon from "./Icons/LetterIcon";
import { useHotkeys } from "react-hotkeys-hook";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: blackA.blackA9,
  outline: "none",
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  "&:active": {
    outline: "none",
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow: "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  outline: "none",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "500px",
  maxHeight: "90vh",
  padding: "40px 40px 60px 40px",
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  "&:focus": { outStyledListItemne: "none" },
  "&:active": {
    outline: "none",
  },
});

function Content({ ...properties }) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...properties}>{properties.children}</StyledContent>
    </DialogPrimitive.Portal>
  );
}

export const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 900,
  color: mauve.mauve12,
  outline: "none",
  fontSize: "35px",
  "&:active": {
    outline: "none",
  },
});

export const StyledDescription = styled(DialogPrimitive.Description, {
  margin: "5px 0 20px",
  color: "rgb(156 155 166);",
  outline: "none",
  fontSize: "14px",
  StyledListItemneHeight: 1.5,
  "&:active": {
    outline: "none",
  },
});

export const StyledSubheading = styled("h1", {
  fontWeight: "700",
  outline: "none",
  fontSize: "20px",
  margin: "20px 0px 5px 0px",
  "&:active": {
    outline: "none",
  },
});

export const StyledListItem = styled("li", {
  fontSize: "14px",
  outline: "none",
  color: "#444444",
  maxWidth: "100%",
  display: "flex",
  marginBottom: "2px",
  "&:active": {
    outline: "none",
  },
});

export const StyledIconContainer = styled("div", {
  position: "absolute",
  outline: "none",
  right: "40px",
  "&:active": {
    outline: "none",
    "& input": {
      display: "flex",
    },
  },
  "&:hover": {
    "& input": {
      display: "flex",
    },
  },
});

export const StyledShortcutChangingInput = styled("input", {
  width: "120px",
  height: "20px",
  borderRadius: "5px",
  border: "1px solid #444444",
  position: "absolute",
  right: "0px",
  top: "0px",
  padding: "5px 10px",
  outline: "none",
  display: "none",
  color: "#000000",
  "&:active": {
    outline: "none",
    display: "flex",
  },
  "&:focus": {
    display: "flex",
  },
});

export const Dialog = DialogPrimitive.Root;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;
// @ts-ignore
let altKeysObj: any = {
  "–": "-",
  "≠": `=`,
  œ: "q",
  "∑": "w",
  "´": "e",
  "®": "r",
  "†": "t",
  "¥": "y",
  "¨": "u",
  ˆ: "I",
  ø: "o",
  π: "p",
  "“": "[",
  "‘": "]",
  "«": '"',
  å: "a",
  ß: "s",
  "∂": "d",
  ƒ: "f",
  "©": "g",
  "˙": "h",
  "∆": "j",
  "˚": "k",
  "¬": "l",
  "…": ";",
  æ: "‘",
  Ω: "z",
  "≈": "x",
  ç: "c",
  "√": "v",
  "∫": "b",
  "˜": "n",
  µ: "m",
  "≤": ",",
  "≥": ".",
  "÷": "/",
};

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

function ShortcutsDialog({ shortcutObject, iconObject }: any) {
  const forceUpdate = useForceUpdate();
  let OS = "";
  useEffect(() => {
    if (navigator.userAgent.indexOf("Win") != -1) OS = "Windows";
    if (navigator.userAgent.indexOf("Mac") != -1) OS = "Mac";
    if (navigator.userAgent.indexOf("Linux") != -1) OS = "Linux";

    console.log(OS);
  });

  localStorage.setItem("shortcuts", JSON.stringify(shortcutObject));

  let assignShortcut = (event: any) => {
    let id = event.target.id;
    let key = event.key;
    if (isFinite(event.key)) {
      window.alert("You can not use numbers in the shortcuts!");
      return;
    }
    if (altKeysObj[event.key]) {
      key = altKeysObj[event.key];
    }
    shortcutObject[id] =
      event.metaKey && !event.altKey && !event.ctrlKey && !event.shiftKey
        ? "Cmd " + key
        : event.altKey
        ? (OS == "Mac" ? "Opt " : "Alt ") + key
        : event.ctrlKey
        ? "Ctrl " + key
        : event.shiftKey
        ? "Shift " + key
        : key;
    console.log(shortcutObject);
    localStorage.setItem("shortcuts", JSON.stringify(shortcutObject));
    for (let i in shortcutObject) {
      let values = shortcutObject[i];
      //@ts-ignore
      document.getElementById(i).value = "" + values;
      getShortcutIcon(i);
      forceUpdate();
    }
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

  useHotkeys("esc", (e) => {
    e.preventDefault();
    document.getElementById("closeShortcutPanel")?.click();
  });

  return (
    <DialogContent className="dark:text-white dark:bg-slate-900">
      <DialogClose asChild>
        <StyledIconContainer id="closeShortcutPanel">
          <Cross2Icon className="dark:text-white" />
        </StyledIconContainer>
      </DialogClose>
      <DialogTitle className="dark:text-white">Shortcuts</DialogTitle>
      <div className="dark:text-white">
        <div className="dark:text-white">
          <StyledSubheading className="font-bold text-xl dark:text-white">Navigation</StyledSubheading>
          <ul className="dark:text-white" style={{ width: "fit-content" }}>
            <StyledListItem className="dark:text-white">
              Up
              <StyledIconContainer>
                <div className="flex justify-between">
                  {getShortcutIcon("NavigationUpShortcutInput").map((icon: any) => {
                    return icon;
                  })}
                </div>
                <StyledShortcutChangingInput
                  onKeyDown={(e) => {
                    e.preventDefault();
                    assignShortcut(e);
                  }}
                  id="NavigationUpShortcutInput"></StyledShortcutChangingInput>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Down
              <StyledIconContainer>
                <div className="flex justify-between">
                  {getShortcutIcon("NavigationDownShortcutInput").map((icon: any) => {
                    return icon;
                  })}
                </div>
                <StyledShortcutChangingInput
                  onKeyDown={(e) => {
                    e.preventDefault();
                    assignShortcut(e);
                  }}
                  id="NavigationDownShortcutInput"></StyledShortcutChangingInput>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Right
              <StyledIconContainer>
                <div className="flex justify-between">
                  {getShortcutIcon("NavigationRightShortcutInput").map((icon: any) => {
                    return icon;
                  })}
                </div>
                <StyledShortcutChangingInput
                  onKeyDown={(e) => {
                    e.preventDefault();
                    assignShortcut(e);
                  }}
                  id="NavigationRightShortcutInput"></StyledShortcutChangingInput>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Left
              <StyledIconContainer>
                <div className="flex justify-between">
                  {getShortcutIcon("NavigationLeftShortcutInput").map((icon: any) => {
                    return icon;
                  })}
                </div>
                <StyledShortcutChangingInput
                  onKeyDown={(e) => {
                    e.preventDefault();
                    assignShortcut(e);
                  }}
                  id="NavigationLeftShortcutInput"></StyledShortcutChangingInput>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Go Back In History
              <StyledIconContainer>
                <div className="flex justify-between">
                  {getShortcutIcon("GoBackInHistoryShortcutInput").map((icon: any) => {
                    return icon;
                  })}
                </div>
                <StyledShortcutChangingInput
                  onKeyDown={(e) => {
                    e.preventDefault();
                    assignShortcut(e);
                  }}
                  id="GoBackInHistoryShortcutInput"></StyledShortcutChangingInput>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Go Forward In History
              <StyledIconContainer>
                <div className="flex justify-between">
                  {getShortcutIcon("GoForwardInHistoryShortcutInput").map((icon: any) => {
                    return icon;
                  })}
                </div>
                <StyledShortcutChangingInput
                  onKeyDown={(e) => {
                    e.preventDefault();
                    assignShortcut(e);
                  }}
                  id="GoForwardInHistoryShortcutInput"></StyledShortcutChangingInput>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Reset Path
              <StyledIconContainer>
                <div className="flex justify-between">
                  {getShortcutIcon("ResetPathShortcutInput").map((icon: any) => {
                    return icon;
                  })}
                </div>
                <StyledShortcutChangingInput
                  onKeyDown={(e) => {
                    e.preventDefault();
                    assignShortcut(e);
                  }}
                  id="ResetPathShortcutInput"></StyledShortcutChangingInput>
              </StyledIconContainer>
            </StyledListItem>
          </ul>
        </div>
        <div>
          <StyledSubheading className="font-bold text-xl">Search</StyledSubheading>
          <ul className="dark:text-white" style={{ width: "fit-content" }}>
            <StyledListItem className="dark:text-white">
              Open Search
              <StyledIconContainer>
                <div className="flex justify-between">
                  {getShortcutIcon("OpenSearchShortcutInput").map((icon: any) => {
                    return icon;
                  })}
                </div>
                <StyledShortcutChangingInput
                  onKeyDown={(e) => {
                    e.preventDefault();
                    assignShortcut(e);
                  }}
                  id="OpenSearchShortcutInput"></StyledShortcutChangingInput>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Up
              <StyledIconContainer>
                <div className="flex justify-between">
                  {getShortcutIcon("SearchUpShortcutInput").map((icon: any) => {
                    return icon;
                  })}
                </div>
                <StyledShortcutChangingInput
                  onKeyDown={(e) => {
                    e.preventDefault();
                    assignShortcut(e);
                  }}
                  id="SearchUpShortcutInput"></StyledShortcutChangingInput>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Down
              <StyledIconContainer>
                <div className="flex justify-between">
                  {getShortcutIcon("SearchDownShortcutInput").map((icon: any) => {
                    return icon;
                  })}
                </div>
                <StyledShortcutChangingInput
                  onKeyDown={(e) => {
                    e.preventDefault();
                    assignShortcut(e);
                  }}
                  id="SearchDownShortcutInput"></StyledShortcutChangingInput>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Select
              <StyledIconContainer>
                <div className="flex justify-between">
                  {getShortcutIcon("SearchSelectShortcutInput").map((icon: any) => {
                    return icon;
                  })}
                </div>
                <StyledShortcutChangingInput
                  onKeyDown={(e) => {
                    e.preventDefault();
                    assignShortcut(e);
                  }}
                  id="SearchSelectShortcutInput"></StyledShortcutChangingInput>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Close
              <StyledIconContainer>
                <div className="flex justify-between">
                  {getShortcutIcon("SearchCloseShortcutInput").map((icon: any) => {
                    return icon;
                  })}
                </div>
                <StyledShortcutChangingInput
                  onKeyDown={(e) => {
                    e.preventDefault();
                    assignShortcut(e);
                  }}
                  id="SearchCloseShortcutInput"></StyledShortcutChangingInput>
              </StyledIconContainer>
            </StyledListItem>
          </ul>
        </div>
        <div>
          <StyledSubheading className="font-bold text-xl">Other</StyledSubheading>
          <ul className="dark:text-white" style={{ width: "fit-content" }}>
            <StyledListItem className="dark:text-white">
              Copy Current Selected Node
              <StyledIconContainer>
                <div className="flex justify-between">
                  {getShortcutIcon("CopyCurrentSelectedNodeShortcutInput").map((icon: any) => {
                    return icon;
                  })}
                </div>
                <StyledShortcutChangingInput
                  onKeyDown={(e) => {
                    e.preventDefault();
                    assignShortcut(e);
                  }}
                  id="CopyCurrentSelectedNodeShortcutInput"></StyledShortcutChangingInput>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Change Theme
              <StyledIconContainer>
                <div className="flex justify-between">
                  {getShortcutIcon("ChangeThemeShortcutInput").map((icon: any) => {
                    return icon;
                  })}
                </div>
                <StyledShortcutChangingInput
                  onKeyDown={(e) => {
                    e.preventDefault();
                    assignShortcut(e);
                  }}
                  id="ChangeThemeShortcutInput"></StyledShortcutChangingInput>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Toggle Shortcuts Panel
              <StyledIconContainer>
                <div className="flex justify-between">
                  {getShortcutIcon("ToggleShortcutsPanelShortcutInput").map((icon: any) => {
                    return icon;
                  })}
                </div>
                <StyledShortcutChangingInput
                  onKeyDown={(e) => {
                    e.preventDefault();
                    assignShortcut(e);
                  }}
                  id="ToggleShortcutsPanelShortcutInput"></StyledShortcutChangingInput>
              </StyledIconContainer>
            </StyledListItem>
          </ul>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShortcutsDialog;
