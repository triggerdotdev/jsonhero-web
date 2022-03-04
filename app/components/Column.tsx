import { Title } from "./Primitives/Title";
import { colorForItemAtPath } from "~/utilities/colors";
import { IconComponent } from "~/useColumnView";
import { useJson } from "../hooks/useJson";
import { memo, useMemo } from "react";

export type ColumnProps = {
  id: string;
  title: string;
  icon?: IconComponent;
  highlightedPath: string[];
  children: React.ReactNode;
};

function ColumnElement(column: ColumnProps) {
  const { id, title, children } = column;
  const [json] = useJson();
  const iconColor = useMemo(() => colorForItemAtPath(id, json), [id, json]);

  return (
    <div
      className={
        "column flex-none border-r-[1px] border-slate-300 w-80 transition dark:border-slate-600"
      }
    >
      <div className="flex text-slate-800 bg-slate-50 mb-[3px] p-2 pb-0 transition dark:bg-slate-900 dark:text-slate-300">
        {column.icon && <column.icon className={`${iconColor} h-6 w-6 mr-1`} />}
        <Title className="">{title}</Title>
      </div>
      <div className="overflow-y-auto h-viewerHeight no-scrollbar">
        {children}
      </div>
    </div>
  );
}

export const Column = memo(ColumnElement, (oldProps, newProps) => {
  if (oldProps.id !== newProps.id) return false;
  if (oldProps.title !== newProps.title) return false;
  if (oldProps.icon !== newProps.icon) return false;
  if (oldProps.highlightedPath.length !== newProps.highlightedPath.length)
    return false;

  //re-render if the highlighted element changed and was or is now in this column
  const oldHighlightedElement =
    oldProps.highlightedPath[oldProps.highlightedPath.length - 1];
  const newHighlightedElement =
    newProps.highlightedPath[newProps.highlightedPath.length - 1];
  if (oldHighlightedElement !== newHighlightedElement) {
    const oldHighlightedColumn =
      oldProps.highlightedPath[oldProps.highlightedPath.length - 2];
    const newHighlightedColumn =
      newProps.highlightedPath[newProps.highlightedPath.length - 2];
    const wasHighlighted = oldHighlightedColumn === oldProps.id;
    const nowHighlighted = newHighlightedColumn === newProps.id;

    if (wasHighlighted || nowHighlighted) return false;
  }

  return true;
});
