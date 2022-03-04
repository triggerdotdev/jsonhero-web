import { useMemo } from "react";
import { Column } from "./Column";
import { ColumnItem } from "./ColumnItem";
import { ScrollingColumnView } from "./ScrollingColumnView";
import {
  useJsonColumnViewAPI,
  useJsonColumnViewState,
} from "../hooks/useJsonColumnView";
import { useJson } from "~/hooks/useJson";
import { JSONHeroPath } from "@jsonhero/path";
import { inferType } from "@jsonhero/json-infer-types";
import { useHotkeys } from "react-hotkeys-hook";
import { ColumnDefinition } from "~/useColumnView";

export function JsonColumnView() {
  const { getColumnViewProps, columns, highlightedPath, selectedPath } =
    useJsonColumnViewState();
  const [json] = useJson();

  const addBlankColumn = useMemo<boolean>(() => {
    if (columns.length === 0) return true;

    const deepestElementId = selectedPath[selectedPath.length - 1];
    const heroPath = new JSONHeroPath(deepestElementId);
    const value = heroPath.first(json);
    const item = inferType(value);

    let isObject = item.name === "array" || item.name === "object";
    return !isObject;
  }, [columns, selectedPath]);

  return (
    <>
      <KeyboardShortcuts />
      <div {...getColumnViewProps()}>
        <ScrollingColumnView selectedPath={highlightedPath}>
          <ColumnsWrapper columns={columns} />
          {addBlankColumn && (
            <div className="w-80 h-viewerHeight no-scrollbar flex-none"></div>
          )}
        </ScrollingColumnView>
      </div>
    </>
  );
}

function ColumnsWrapper({ columns }: { columns: ColumnDefinition[] }) {
  return useMemo(() => {
    return (
      <>
        {columns.map((column) => {
          return <ColumnWrapper key={column.id} column={column} />;
        })}
      </>
    );
  }, [columns]);
}

function ColumnWrapper({ column }: { column: ColumnDefinition }) {
  return useMemo(() => {
    return (
      <Column id={column.id} title={column.title} icon={column.icon}>
        {column.items.map((item) => (
          <ColumnItem key={item.id} item={item} />
        ))}
      </Column>
    );
  }, [column]);
}

function KeyboardShortcuts() {
  const api = useJsonColumnViewAPI();

  useHotkeys(
    "down",
    (e) => {
      e.preventDefault();
      api.goToNextSibling();
    },
    { enabled: true },
    [api]
  );

  useHotkeys(
    "up",
    (e) => {
      e.preventDefault();
      api.goToPreviousSibling();
    },
    [api]
  );

  useHotkeys(
    "right",
    (e) => {
      e.preventDefault();
      api.goToChildren();
    },
    [api]
  );

  useHotkeys(
    "left,alt+left",
    (e) => {
      e.preventDefault();
      api.goToParent({ source: e });
    },
    [api]
  );

  useHotkeys(
    "esc",
    (e) => {
      e.preventDefault();
      api.resetSelection();
    },
    [api]
  );

  return <></>;
}
