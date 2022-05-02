import { Title } from "./Primitives/Title";
import { colorForItemAtPath } from "~/utilities/colors";
import { ColumnViewNode, IconComponent } from "~/useColumnView";
import { useJson } from "../hooks/useJson";
import { memo, useCallback, useMemo, useRef } from "react";
import { ColumnItem } from "./ColumnItem";
import { useJsonColumnViewAPI } from "~/hooks/useJsonColumnView";
import { useVirtual } from "react-virtual";

export type ColumnProps = {
  id: string;
  title: string;
  icon?: IconComponent;
  hasHighlightedElement: boolean;
  items: ColumnViewNode[];
  selectedPath: string[];
  highlightedPath: string[];
};

function ColumnElement(column: ColumnProps) {
  const { id, title, items, selectedPath, highlightedPath } = column;
  const [json] = useJson();
  const iconColor = useMemo(() => colorForItemAtPath(id, json), [id, json]);
  const { goToNodeId } = useJsonColumnViewAPI();

  const containerRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef: containerRef,
    estimateSize: useCallback(() => 36, []),
    overscan: 5,
  });

  return (
    <div
      className={
        "column flex-none border-r-[1px] border-slate-300 w-80 transition dark:border-slate-600"
      }
    >
      <div className="flex items-center text-slate-800 bg-slate-50 mb-[3px] p-2 pb-0 transition dark:bg-slate-900 dark:text-slate-300">
        {column.icon && <column.icon className="h-6 w-6 mr-1" />}
        <Title className="">{title}</Title>
      </div>
      <div
        className="overflow-y-auto h-viewerHeight no-scrollbar"
        ref={containerRef}
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const item = items[virtualRow.index];
            return (
              <div
                key={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <ColumnItem
                  item={item}
                  json={json}
                  isSelected={selectedPath.includes(item.id)}
                  isHighlighted={
                    highlightedPath[highlightedPath.length - 1] === item.id
                  }
                  onClick={(id) => goToNodeId(id, "columnView")}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const Column = memo(ColumnElement);
