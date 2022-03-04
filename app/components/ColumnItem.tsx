import { ChevronRightIcon } from "@heroicons/react/outline";
import { Mono } from "./Primitives/Mono";
import { memo, useEffect, useMemo, useRef } from "react";
import { ColumnViewNode } from "~/useColumnView";
import { colorForItemAtPath } from "~/utilities/colors";
import { Body } from "./Primitives/Body";

export type ColumnItemProps = {
  item: ColumnViewNode;
  json: unknown;
  selectedPath: string[];
  highlightedPath: string[];
  selectedItem: (id: string) => void;
};

function ColumnItemElement({
  item,
  json,
  selectedPath,
  highlightedPath,
  selectedItem,
}: ColumnItemProps) {
  const htmlElement = useRef<HTMLDivElement>(null);

  const showArrow = item.children.length > 0;

  const isHighlighted = useMemo(() => {
    if (highlightedPath.length === 0) return false;
    return highlightedPath[highlightedPath.length - 1] === item.id;
  }, [highlightedPath, item.id]);

  const isSelected = useMemo(() => {
    return selectedPath.includes(item.id);
  }, [selectedPath, item.id]);

  const stateStyle = useMemo<string>(() => {
    if (isHighlighted) {
      return "bg-slate-300 text-slate-700 hover:bg-slate-400 hover:bg-opacity-60 transition duration-75 ease-out dark:bg-white dark:bg-opacity-[15%] dark:text-slate-400";
    }

    if (isSelected) {
      return "bg-slate-200 hover:bg-slate-300 transition duration-75 ease-out dark:bg-white dark:bg-opacity-[5%] dark:hover:bg-white dark:hover:bg-opacity-[10%] dark:text-slate-400";
    }

    return "hover:bg-slate-100 transition duration-75 ease-out dark:hover:bg-white dark:hover:bg-opacity-[5%] dark:text-slate-400";
  }, [isSelected, isHighlighted]);

  const iconColor = useMemo<string>(
    () => colorForItemAtPath(item.id, json),
    [item.id, json]
  );

  useEffect(() => {
    if (isSelected || isHighlighted) {
      htmlElement.current?.scrollIntoView({ block: "nearest" });
    }
  }, [isSelected, isHighlighted]);

  return (
    <div
      className={`flex h-9 items-center justify-items-stretch mx-1 px-1 py-1 my-1 rounded-sm ${stateStyle}`}
      onClick={() => selectedItem(item.id)}
      ref={htmlElement}
    >
      <div className="w-4 flex-none flex-col justify-items-center">
        {item.icon && <item.icon className={`${iconColor} h-5 w-5`} />}
      </div>

      <div className="flex flex-grow flex-shrink items-baseline justify-between truncate">
        <Body className="flex-grow flex-shrink-0 pl-3 pr-2">{item.title}</Body>
        {item.subtitle && (
          <Mono className="truncate text-gray-400 pr-1 transition dark:text-gray-500">
            {item.subtitle}
          </Mono>
        )}
      </div>

      {showArrow && (
        <ChevronRightIcon className="flex-none w-4 h-4 text-gray-400" />
      )}
    </div>
  );
}

export const ColumnItem = memo(
  ColumnItemElement,
  (previousProps, nextProps) => {
    if (previousProps.item.id !== nextProps.item.id) return false;
    if (
      hasPathChanged(previousProps.highlightedPath, nextProps.highlightedPath)
    ) {
      const wasHighlighted = isHighlighted(
        previousProps.item.id,
        previousProps.highlightedPath
      );
      const nowHighlighted = isHighlighted(
        nextProps.item.id,
        nextProps.highlightedPath
      );
      if (wasHighlighted !== nowHighlighted) return false;
    }

    if (hasPathChanged(previousProps.selectedPath, nextProps.selectedPath)) {
      const wasSelected = isSelected(
        previousProps.item.id,
        previousProps.selectedPath
      );
      const nowSelected = isSelected(nextProps.item.id, nextProps.selectedPath);
      if (wasSelected !== nowSelected) return false;
    }

    return true;
  }
);

function hasPathChanged(oldPath: string[], newPath: string[]): boolean {
  if (oldPath.length !== newPath.length) return true;

  const oldPathString = oldPath.join("");
  const newPathString = newPath.join("");
  const hasSelectionChanged = oldPathString !== newPathString;
  return hasSelectionChanged;
}

function isHighlighted(id: string, highlightedPath: string[]): boolean {
  if (highlightedPath.length === 0) return false;
  return highlightedPath[highlightedPath.length - 1] === id;
}

function isSelected(id: string, selectedPath: string[]): boolean {
  return selectedPath.includes(id);
}
