import {
  highlightSpecialChars,
  drawSelection,
  highlightActiveLine,
  dropCursor,
} from "@codemirror/view";
import { Extension } from "@codemirror/state";
import { highlightActiveLineGutter } from "@codemirror/gutter";
import { bracketMatching } from "@codemirror/matchbrackets";
import { highlightSelectionMatches } from "@codemirror/search";
import { json as jsonLang } from "@codemirror/lang-json";
import { lineNumbers } from "@codemirror/gutter";

export function getPreviewSetup(): Array<Extension> {
  return [
    jsonLang(),
    highlightSpecialChars(),
    drawSelection(),
    dropCursor(),
    bracketMatching(),
    highlightSelectionMatches(),
    lineNumbers(),
  ];
}

export function getViewerSetup(): Array<Extension> {
  return [drawSelection(), dropCursor(), bracketMatching(), lineNumbers()];
}

export function getEditorSetup(): Array<Extension> {
  return [
    highlightActiveLineGutter(),
    highlightSpecialChars(),
    drawSelection(),
    dropCursor(),
    bracketMatching(),
    highlightActiveLine(),
    highlightSelectionMatches(),
    lineNumbers(),
  ];
}
