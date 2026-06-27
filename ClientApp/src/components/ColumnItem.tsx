import { ChevronRightIcon } from "@heroicons/react/outline";
import { Mono } from "./Primitives/Mono";
import { memo, useEffect, useMemo, useRef } from "react";
import { ColumnViewNode } from "~/useColumnView";
import { colorForItemAtPath } from "~/utilities/colors";
import { Body } from "./Primitives/Body";

export type ColumnItemProps = {
  item: ColumnViewNode;
  json: unknown;
  isSelected: boolean;
  isHighlighted: boolean;
  onClick?: (id: string) => void;
};

function ColumnItemElement({
  item,
  json,
  isSelected,
  isHighlighted,
  onClick,
}: ColumnItemProps) {
  const htmlElement = useRef<HTMLDivElement>(null);

  const showArrow = item.children.length > 0;

  const stateStyle = useMemo<string>(() => {
    if (isHighlighted) {
      return "bg-slate-300 text-slate-700 hover:bg-slate-400 hover:bg-opacity-60 transition duration-75 ease-out dark:bg-white dark:bg-opacity-[15%] dark:text-slate-100";
    }

    if (isSelected) {
      return "bg-slate-200 hover:bg-slate-300 transition duration-75 ease-out dark:bg-white dark:bg-opacity-[5%] dark:hover:bg-white dark:hover:bg-opacity-[10%] dark:text-slate-200";
    }

    return "hover:bg-slate-100 transition duration-75 ease-out dark:hover:bg-white dark:hover:bg-opacity-[5%] dark:text-slate-400";
  }, [isSelected, isHighlighted]);

  const iconColor = useMemo<string>(
    () => colorForItemAtPath(item.id, json),
    [item.id, json]
  );

  useEffect(() => {
    if (isSelected || isHighlighted) {
      htmlElement.current?.scrollIntoView({
        block: "nearest",
        inline: "center",
      });
    }
  }, [isSelected, isHighlighted]);

  return (
    <div
      className={`flex h-9 items-center justify-items-stretch mx-1 px-1 py-1 my-1 rounded-sm ${stateStyle}`}
      onClick={() => onClick && onClick(item.id)}
      ref={htmlElement}
    >
      <div className="w-4 flex-none flex-col justify-items-center">
        {item.icon && (
          <item.icon
            className={`h-5 w-5 ${
              isSelected && isHighlighted
                ? "text-slate-900 dark:text-slate-300"
                : "text-slate-500"
            }`}
          />
        )}
      </div>

      <div className="flex flex-grow flex-shrink items-baseline justify-between truncate">
        <Body className="flex-grow flex-shrink-0 pl-3 pr-2 ">{item.title}</Body>
        {item.subtitle && (
          <Mono
            className={`truncate pr-1 transition duration-75 ${
              isHighlighted
                ? "text-gray-500 dark:text-slate-100"
                : "text-gray-400 dark:text-gray-500"
            }`}
          >
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

export const ColumnItem = memo(ColumnItemElement);
