import { Title } from "./Primitives/Title";
import { colorForItemAtPath } from "~/utilities/colors";
import { IconComponent } from "~/useColumnView";
import { useJson } from "../hooks/useJson";
import { memo, useMemo } from "react";
import { useJsonDoc } from "~/hooks/useJsonDoc";

export type ColumnProps = {
  id: string;
  title: string;
  icon?: IconComponent;
  hasHighlightedElement: boolean;
  children: React.ReactNode;
};

function ColumnElement(column: ColumnProps) {
  const { id, title, children } = column;
  const [json] = useJson();
  const { minimal } = useJsonDoc();
  const iconColor = useMemo(() => colorForItemAtPath(id, json), [id, json]);

  return (
    <div
      className={
        "column flex-none border-r-[1px] border-slate-300 w-80 transition dark:border-slate-600"
      }
    >
      <div className="flex items-center text-slate-800 bg-slate-50 mb-[3px] p-2 pb-0 transition dark:bg-slate-900 dark:text-slate-300">
        {column.icon && <column.icon className="h-6 w-6 mr-1" />}
        <Title className="text-ellipsis overflow-hidden">{title}</Title>
      </div>
      <div
        className={`overflow-y-auto ${
          minimal ? "h-viewerHeightMinimal" : "h-viewerHeight"
        } no-scrollbar`}
      >
        {children}
      </div>
    </div>
  );
}

export const Column = memo(ColumnElement);
