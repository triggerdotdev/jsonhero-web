import { JSONHeroPath } from "@jsonhero/path";
import { memo, useMemo } from "react";
import { useJson } from "~/hooks/useJson";
import {
  useJsonColumnViewAPI,
  useJsonColumnViewState,
} from "~/hooks/useJsonColumnView";
import { ColumnDefinition } from "~/useColumnView";
import { BlankColumn } from "./BlankColumn";
import { Column } from "./Column";
import { ColumnItem } from "./ColumnItem";

function ColumnsElement({ columns }: { columns: ColumnDefinition[] }) {
  const [json] = useJson();
  const { selectedPath, highlightedPath, highlightedNodeId } =
    useJsonColumnViewState();
  const { goToNodeId } = useJsonColumnViewAPI();
  const highlightedItemIsValue = useMemo<boolean>(() => {
    if (highlightedNodeId == null) {
      return false;
    }

    const path = new JSONHeroPath(highlightedNodeId);
    let item = path.first(json);

    return typeof item !== "object";
  }, [highlightedPath, json]);

  return (
    <div className="columns flex flex-grow overflow-x-auto focus:outline-none no-scrollbar">
      {columns.map((column) => {
        return (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            icon={column.icon}
            hasHighlightedElement={
              highlightedPath[highlightedPath.length - 2] === column.id
            }
          >
            {column.items.map((item) => (
              <ColumnItem
                key={item.id}
                item={item}
                json={json}
                isSelected={selectedPath.includes(item.id)}
                isHighlighted={
                  highlightedPath[highlightedPath.length - 1] === item.id
                }
                onClick={(id) => goToNodeId(id, "columnView")}
              />
            ))}
          </Column>
        );
      })}
      {highlightedItemIsValue ? <BlankColumn /> : null}
    </div>
  );
}
export const Columns = memo(ColumnsElement);
