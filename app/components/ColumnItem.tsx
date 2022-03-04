import { ChevronRightIcon } from "@heroicons/react/outline";
import { Mono } from "./Primitives/Mono";
import { RefObject, useEffect, useMemo, useRef } from "react";
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

  const isHighlighted = useMemo(() => {
    if (highlightedPath.length === 0) return false;
    return highlightedPath[highlightedPath.length - 1] === id;
  }, [highlightedPath, id]);

  const isSelected = useMemo(() => {
    return selectedPath.includes(id);
  }, [selectedPath, id]);

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
    () => colorForItemAtPath(id, json),
    [id, json]
  );

  useEffect(() => {
    if (isSelected || isHighlighted) {
      htmlElement.current?.scrollIntoView({ block: "nearest" });
    }
  }, [isSelected, isHighlighted]);

  const memoComponent = useMemo(() => {
    return (
      <ColumnItemInner
        stateStyle={stateStyle}
        onClick={() => goToNodeId(id)}
        item={item}
        iconColor={iconColor}
        showArrow={showArrow}
        divRef={htmlElement}
      />
    );
  }, [goToNodeId, item, isSelected, isHighlighted]);

  return memoComponent;
}

type ColumnItemInnerProps = {
  stateStyle: string;
  onClick: () => void;
  item: ColumnViewNode;
  iconColor: string;
  showArrow: boolean;
  divRef: RefObject<HTMLDivElement>;
};

function ColumnItemInner({
  stateStyle,
  onClick,
  item,
  iconColor,
  showArrow,
  divRef,
}: ColumnItemInnerProps) {
  return (
    <div
      className={`flex h-9 items-center justify-items-stretch mx-1 px-1 py-1 my-1 rounded-sm ${stateStyle}`}
      onClick={() => onClick()}
      ref={divRef}
    >
      <div className="w-4 flex-none flex-col justify-items-center">
        {/* {item.icon && <item.icon className={`${iconColor} h-5 w-5`} />} */}
      </div>

      <div className="flex flex-grow flex-shrink items-baseline justify-between truncate">
        <Body className="flex-grow flex-shrink-0 pl-3 pr-2">{item.title}</Body>
        {item.subtitle && (
          <Mono className="truncate text-gray-400 pr-1 transition dark:text-gray-500">
            {item.subtitle}
          </Mono>
        )}
      </div>

      {/* {showArrow && (
        <ChevronRightIcon className="flex-none w-4 h-4 text-gray-400" />
      )} */}
    </div>
  );
}
