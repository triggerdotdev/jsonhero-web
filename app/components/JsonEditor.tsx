import { CodeEditor } from "./CodeEditor";
import { useJson } from "~/hooks/useJson";
import { useCallback, useMemo, useRef } from "react";
import {
  useJsonColumnViewAPI,
  useJsonColumnViewState,
} from "~/hooks/useJsonColumnView";
import { ViewUpdate } from "@uiw/react-codemirror";
import jsonMap from "json-source-map";
import { JSONHeroPath } from "@jsonhero/path";
import {usePreferences} from '~/components/PreferencesProvider'

export function JsonEditor() {
  const [json] = useJson();
  const { selectedNodeId } = useJsonColumnViewState();
  const { goToNodeId } = useJsonColumnViewAPI();
  const [preferences] = usePreferences();

  const jsonMapped = useMemo(() => {
    return jsonMap.stringify(json, null, preferences?.indent || 2);
  }, [json, preferences]);

  const selection = useMemo<{ start: number; end: number } | undefined>(() => {
    if (!selectedNodeId) {
      return;
    }

    const path = new JSONHeroPath(selectedNodeId);
    const pointer = path.jsonPointer();

    const location = jsonMapped.pointers[pointer];

    if (location) {
      if (location.key) {
        return { start: location.key.pos, end: location.valueEnd.pos };
      }

      return { start: location.value.pos, end: location.valueEnd.pos };
    }
  }, [selectedNodeId, jsonMapped]);

  const currentSelectedLine = useRef<number | undefined>(undefined);

  const onUpdate = useCallback(
    (update: ViewUpdate) => {
      if (!update.selectionSet) {
        return;
      }

      const range = update.state.selection.ranges[0];
      const line = update.state.doc.lineAt(range.anchor);

      if (
        currentSelectedLine.current &&
        currentSelectedLine.current === line.number
      ) {
        return;
      }

      currentSelectedLine.current = line.number;

      // Find the key if the selected line using jsonMapped.pointers
      const pointerEntry = Object.entries(jsonMapped.pointers).find(
        ([pointer, info]) => {
          return info.value.line === line.number - 1;
        }
      );

      if (!pointerEntry) {
        return;
      }

      const [pointer] = pointerEntry;

      const path = JSONHeroPath.fromPointer(pointer);

      goToNodeId(path.toString(), "editor");
    },
    [goToNodeId]
  );

  return (
    <CodeEditor
      language="json"
      content={jsonMapped.json}
      readOnly={true}
      onUpdate={onUpdate}
      selection={selection}
    />
  );
}
