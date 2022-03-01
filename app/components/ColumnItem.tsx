import { ChevronRightIcon } from "@heroicons/react/outline";
import { Mono } from "./Primitives/Mono";
import { useEffect, useMemo, useRef } from "react";
import { ColumnViewNode } from "~/useColumnView";
import {
  useJsonColumnViewAPI,
  useJsonColumnViewState,
} from "../hooks/useJsonColumnView";
import { useJson } from "../hooks/useJson";
import { colorForItemAtPath } from "~/utilities/colors";
import { Body } from "./Primitives/Body";

export function ColumnItem({ item }: { item: ColumnViewNode }) {
  const { title, subtitle, children, id } = item;
  const [json] = useJson();
  const { selectedPath, highlightedPath } = useJsonColumnViewState();
  const { goToNodeId } = useJsonColumnViewAPI();
  const htmlElement = useRef<HTMLDivElement>(null);

  const showArrow = children.length > 0;

  const isHighlighted = (path: string[], id: string) => {
    return path[path.length - 1] === id;
  };

  const isSelected = (path: string[], id: string) => {
    return path.includes(id);
  };

  const stateStyle = useMemo<string>(() => {
    if (highlightedPath.length === 0) {
      return "";
    }

    if (isHighlighted(highlightedPath, id)) {
      return "bg-slate-300 text-slate-700 hover:bg-slate-400 hover:bg-opacity-60 transition duration-75 ease-out dark:bg-white dark:bg-opacity-[15%] dark:text-slate-400";
    }

    if (isSelected(selectedPath, id)) {
      return "bg-slate-200 hover:bg-slate-300 transition duration-75 ease-out dark:bg-white dark:bg-opacity-[5%] dark:hover:bg-white dark:hover:bg-opacity-[10%] dark:text-slate-400";
    }

    return "hover:bg-slate-100 transition duration-75 ease-out dark:hover:bg-white dark:hover:bg-opacity-[5%] dark:text-slate-400";
  }, [highlightedPath, selectedPath, id]);

  const iconColor = colorForItemAtPath(id, json);

  useEffect(() => {
    if (isSelected(selectedPath, id) || isHighlighted(highlightedPath, id)) {
      htmlElement.current?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedPath, selectedPath, id]);

  return (
    <div
      className={`flex h-9 items-center justify-items-stretch mx-1 px-1 py-1 my-1 rounded-sm ${stateStyle}`}
      onClick={() => goToNodeId(id)}
      ref={htmlElement}
    >
      <div className="w-4 flex-none flex-col justify-items-center">
        {item.icon && <item.icon className={`${iconColor} h-5 w-5`} />}
      </div>

      <div className="flex flex-grow flex-shrink items-baseline justify-between truncate">
        <Body className="flex-grow flex-shrink-0 pl-3 pr-2">{title}</Body>
        {subtitle && (
          <Mono className="truncate text-gray-400 pr-1 transition dark:text-gray-500">
            {subtitle}
          </Mono>
        )}
      </div>

      {showArrow && (
        <ChevronRightIcon className="flex-none w-4 h-4 text-gray-400" />
      )}
    </div>
  );
}
