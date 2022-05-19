import React, { useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled, keyframes } from "@stitches/react";
import { violet, blackA, mauve, green } from "@radix-ui/colors";
import CopyCurrentSelectedNodeIcon from "./Icons/CopyCurrentSelectedNodeIcon";
import DownArrowIcon from "./Icons/DownArrowIcon";
import UpArrowIcon from "./Icons/UpArrowIcon";
import RightArrowIcon from "./Icons/RightArrowIcon";
import LeftArrowIcon from "./Icons/LeftArrowIcon";
import EscapeIcon from "./Icons/EscapeIcon";
import LeftBracketIcon from "./Icons/LeftBracketIcon";
import RightBracketIcon from "./Icons/RightBracketIcon";
import SelectIcon from "./Icons/SelectIcon";
import ThemeChangeIconMac from "./Icons/ThemeChangeIconMac";
import { Cross2Icon } from "@radix-ui/react-icons";
import OpenSearchIconMac from "./Icons/OpenSearchIconMac";
import OpenSearchIconWin from "./Icons/OpenSearchIconWin";
import ThemeChangeIconWin from "./Icons/ThemeChangeIconWin";
import ToggleShortcutsPanelIconMac from "./Icons/ToggleShortcutsPanelIconMac";
import ToggleShortcutsPanelIconWin from "./Icons/ToggleShortcutsPanelIconWin";

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
  },
  "&:hover": {
    "& input": {
      display: "flex",
    },
  },
});

export const Dialog = DialogPrimitive.Root;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;

function ShortcutsDialog() {
  let OS = "";
  useEffect(() => {
    if (navigator.userAgent.indexOf("Win") != -1) OS = "Windows";
    if (navigator.userAgent.indexOf("Mac") != -1) OS = "Mac";
    if (navigator.userAgent.indexOf("Linux") != -1) OS = "Linux";

    console.log(OS);
  });

  return (
    <DialogContent className="dark:text-white dark:bg-slate-900">
      <DialogClose asChild>
        <StyledIconContainer>
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
                <UpArrowIcon className="dark:text-white"></UpArrowIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Down
              <StyledIconContainer>
                <DownArrowIcon className="dark:text-white"></DownArrowIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Right
              <StyledIconContainer>
                <RightArrowIcon className="dark:text-white"></RightArrowIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Left
              <StyledIconContainer>
                <LeftArrowIcon className="dark:text-white"></LeftArrowIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Go Back In History
              <StyledIconContainer>
                <LeftBracketIcon className="dark:text-white"></LeftBracketIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Go Forward In History
              <StyledIconContainer>
                <RightBracketIcon className="dark:text-white"></RightBracketIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Reset Path
              <StyledIconContainer>
                <EscapeIcon className="dark:text-white"></EscapeIcon>
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
                {OS == "Mac" ? (
                  <OpenSearchIconWin className="dark:text-white"></OpenSearchIconWin>
                ) : (
                  <OpenSearchIconMac className="dark:text-white"></OpenSearchIconMac>
                )}
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Up
              <StyledIconContainer>
                <UpArrowIcon className="dark:text-white"></UpArrowIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Down
              <StyledIconContainer>
                <DownArrowIcon className="dark:text-white"></DownArrowIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Select
              <StyledIconContainer>
                <SelectIcon className="dark:text-white"></SelectIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Close
              <StyledIconContainer>
                <EscapeIcon className="dark:text-white"></EscapeIcon>
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
                <CopyCurrentSelectedNodeIcon className="dark:text-white"></CopyCurrentSelectedNodeIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Change Theme
              <StyledIconContainer>
                {OS == "Mac" ? (
                  <ThemeChangeIconWin className="dark:text-white"></ThemeChangeIconWin>
                ) : (
                  <ThemeChangeIconMac className="dark:text-white"></ThemeChangeIconMac>
                )}
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem className="dark:text-white">
              Toggle Shortcuts Panel
              <StyledIconContainer>
                {OS == "Mac" ? (
                  <ToggleShortcutsPanelIconWin className="dark:text-white"></ToggleShortcutsPanelIconWin>
                ) : (
                  <ToggleShortcutsPanelIconMac className="dark:text-white"></ToggleShortcutsPanelIconMac>
                )}
              </StyledIconContainer>
            </StyledListItem>
          </ul>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShortcutsDialog;
