import { RangeSetBuilder } from "@codemirror/rangeset";
import { JSONHeroPath } from "@jsonhero/path";
import {
  useCodeMirror,
  EditorView,
  Decoration,
  Facet,
  ViewPlugin,
  Compartment,
  TransactionSpec,
} from "@uiw/react-codemirror";
import jsonMap from "json-source-map";
import { useRef, useEffect, useMemo, useState } from "react";
import { getPreviewSetup } from "~/utilities/codeMirrorSetup";
import { lightTheme, darkTheme } from "~/utilities/codeMirrorTheme";
import { CopyTextButton } from "./CopyTextButton";
import { useTheme } from "./ThemeProvider";
import {usePreferences} from '~/components/PreferencesProvider';
import { useHotkeys } from "react-hotkeys-hook";

export type JsonPreviewProps = {
  json: unknown;
  highlightPath?: string;
};

export function JsonPreview({ json, highlightPath }: JsonPreviewProps) {
  const editor = useRef(null);
  const [preferences] = usePreferences();

  const jsonMapped = useMemo(() => {
    return jsonMap.stringify(json, null, preferences?.indent || 2);
  }, [json, preferences]);

  const lines: LineRange | undefined = useMemo(() => {
    if (!highlightPath) {
      return;
    }

    let path = new JSONHeroPath(highlightPath);
    let pointer = path.jsonPointer();

    let selectionInfo = jsonMapped.pointers[pointer];

    return {
      from: selectionInfo.value.line + 1,
      to: selectionInfo.valueEnd.line + 1,
    };
  }, [jsonMapped, highlightPath]);

  const extensions = getPreviewSetup();

  const highlighting = new Compartment();

  if (lines) {
    extensions.push(highlighting.of(highlightLineRange(lines)));
  }

  const [theme] = useTheme();

  const { setContainer, view, state } = useCodeMirror({
    container: editor.current,
    extensions,
    value: jsonMapped.json,
    editable: false,
    contentEditable: false,
    autoFocus: false,
    basicSetup: false,
    theme: theme === "light" ? lightTheme() : darkTheme(),
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor.current]);

  useEffect(() => {
    if (!view) {
      return;
    }

    let transactionSpec: TransactionSpec = {
      changes: { from: 0, to: view.state.doc.length, insert: jsonMapped.json },
    };

    let range = lines;
    if (range != null) {
      transactionSpec.effects = highlighting.reconfigure(
        highlightLineRange(range)
      );
    }

    view.dispatch(transactionSpec);
  }, [view, highlighting, jsonMapped, highlightPath]);

  useHotkeys(
    "ctrl+a,meta+a,command+a",
    (e) => {
      e.preventDefault();
      view?.dispatch({ selection: { anchor: 0, head: state?.doc.length } });
    },
    [view, state]
  );

  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div ref={editor} />
      <div
        className={`absolute top-1 right-0 flex justify-end w-full transition ${
          hovering ? "opacity-100" : "opacity-0"
        }`}
      >
        <CopyTextButton
          value={jsonMapped.json}
          className="bg-slate-200 hover:bg-slate-300 h-fit mr-1 px-2 py-0.5 rounded-sm transition hover:cursor-pointer dark:text-white dark:bg-slate-700 dark:hover:bg-slate-600"
        ></CopyTextButton>
      </div>
    </div>
  );
}

interface LineRange {
  from: number;
  to: number;
}

const baseTheme = EditorView.baseTheme({
  "&light .cm-highlighted": { backgroundColor: "#ffee0055" },
  "&dark .cm-highlighted": { backgroundColor: "#ffee0055" },
});

const highlightedRange = Facet.define<LineRange, LineRange>({
  combine: (values) => (values.length ? values[0] : { from: -1, to: -1 }),
});

function highlightLineRange(range: LineRange | null) {
  return [
    baseTheme,
    range == null ? [] : highlightedRange.of(range),
    highlightLineRangePlugin,
  ];
}
const lineHighlightDecoration = Decoration.line({
  attributes: { class: "cm-highlighted" },
});

function highlightLines(view: EditorView) {
  let highlightRange = view.state.facet(highlightedRange);
  let builder = new RangeSetBuilder();
  for (let { from, to } of view.visibleRanges) {
    for (let pos = from; pos <= to; ) {
      let line = view.state.doc.lineAt(pos);
      if (
        line.number >= highlightRange.from &&
        line.number <= highlightRange.to
      ) {
        builder.add(line.from, line.from, lineHighlightDecoration);
      }
      pos = line.to + 1;
    }
  }
  return builder.finish();
}

const highlightLineRangePlugin = ViewPlugin.fromClass(
  class {
    decorations: any;
    constructor(view: any) {
      this.decorations = highlightLines(view);
    }

    update(update: { docChanged: any; viewportChanged: any; view: any }) {
      if (update.docChanged || update.viewportChanged)
        this.decorations = highlightLines(update.view);
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);
