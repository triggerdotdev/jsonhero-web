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
import OpenSearchIcon from "./Icons/OpenSearchIcon";
import SelectIcon from "./Icons/SelectIcon";
import ThemeChangeIcon from "./Icons/ThemeChangeIcon";
import ToggleShortcutsPanelIcon from "./Icons/ToggleShortcutsPanelIcon";
import { Cross2Icon } from "@radix-ui/react-icons";

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
  return (
    <DialogContent className="dark:text-white dark:bg-slate-900">
        <StyledIconContainer>
          <Cross2Icon className="dark:text-white" />
        </StyledIconContainer>
      <DialogTitle className="dark:text-white">Shortcuts</DialogTitle>
      <div className="dark:text-white">
        <div className="dark:text-white">
          <StyledSubheading className="font-bold text-xl">Navigation</StyledSubheading>
          <ul className="dark:text-white" style={{ width: "fit-content" }}>
            <StyledListItem>
              Up
              <StyledIconContainer>
                <UpArrowIcon></UpArrowIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem>
              Down
              <StyledIconContainer>
                <DownArrowIcon></DownArrowIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem>
              Right
              <StyledIconContainer>
                <RightArrowIcon></RightArrowIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem>
              Left
              <StyledIconContainer>
                <LeftArrowIcon></LeftArrowIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem>
              Go Back In History
              <StyledIconContainer>
                <LeftBracketIcon></LeftBracketIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem>
              Go Forward In History
              <StyledIconContainer>
                <RightBracketIcon></RightBracketIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem>
              Reset Path
              <StyledIconContainer>
                <EscapeIcon></EscapeIcon>
              </StyledIconContainer>
            </StyledListItem>
          </ul>
        </div>
        <div>
          <StyledSubheading className="font-bold text-xl">Search</StyledSubheading>
          <ul className="dark:text-white" style={{ width: "fit-content" }}>
            <StyledListItem>
              Open Search
              <StyledIconContainer>
                <OpenSearchIcon></OpenSearchIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem>
              Up
              <StyledIconContainer>
                <UpArrowIcon></UpArrowIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem>
              Down
              <StyledIconContainer>
                <DownArrowIcon></DownArrowIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem>
              Select
              <StyledIconContainer>
                <SelectIcon></SelectIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem>
              Close
              <StyledIconContainer>
                <EscapeIcon></EscapeIcon>
              </StyledIconContainer>
            </StyledListItem>
          </ul>
        </div>
        <div>
          <StyledSubheading className="font-bold text-xl">Other</StyledSubheading>
          <ul className="dark:text-white" style={{ width: "fit-content" }}>
            <StyledListItem>
              Copy Current Selected Node
              <StyledIconContainer>
                <CopyCurrentSelectedNodeIcon></CopyCurrentSelectedNodeIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem>
              Change Theme
              <StyledIconContainer>
                <ThemeChangeIcon></ThemeChangeIcon>
              </StyledIconContainer>
            </StyledListItem>
            <StyledListItem>
              Toggle Shortcuts Panel
              <StyledIconContainer>
                <ToggleShortcutsPanelIcon></ToggleShortcutsPanelIcon>
              </StyledIconContainer>
            </StyledListItem>
          </ul>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShortcutsDialog;
