import { inferType } from "@jsonhero/json-infer-types";
import { JSONHeroPath } from "@jsonhero/path";
import { useMemo, useState } from "react";
import { useJson } from "~/hooks/useJson";
import { useJsonColumnViewState } from "~/hooks/useJsonColumnView";
import { concatenated, getHierarchicalTypes } from "~/utilities/dataType";
import { formatRawValue } from "~/utilities/formatter";
import { isNullable } from "~/utilities/nullable";
import { CopyTextButton } from "./CopyTextButton";
import { Body } from "./Primitives/Body";
import { LargeMono } from "./Primitives/LargeMono";
import { Title } from "./Primitives/Title";
import { ValueIcon, ValueIconSize } from "./ValueIcon";

export type InfoHeaderProps = {
  relatedPaths: string[];
};

export function InfoHeader({ relatedPaths }: InfoHeaderProps) {
  const { selectedNodeId, highlightedNodeId, selectedNodes } =
    useJsonColumnViewState();

  if (!selectedNodeId || !highlightedNodeId || selectedNodes.length === 0) {
    return <EmptyState />;
  }

  const selectedNode = selectedNodes[selectedNodes.length - 1];

  const [json] = useJson();

  const selectedHeroPath = new JSONHeroPath(selectedNodeId);
  const selectedJson = selectedHeroPath.first(json);
  const selectedInfo = inferType(selectedJson);
  const selectedName = selectedNode.longTitle ?? selectedNode.title;

  const isSelectedLeafNode =
    selectedInfo.name !== "object" && selectedInfo.name !== "array";

  const canBeNull = useMemo(() => {
    return isNullable(relatedPaths, json);
  }, [relatedPaths, json]);

  const [hovering, setHovering] = useState(false);
  console.warn(selectedInfo);

  return (
    <div className="mb-4 pb-4">
      <div className="flex items-center">
        <Title className="flex-1 mr-2 overflow-hidden overflow-ellipsis break-words text-slate-700 transition dark:text-slate-200">
          { selectedName ?? "nothing" }
        </Title>
        <div>
          <ValueIcon
            monochrome
            type={selectedInfo}
            size={ValueIconSize.Medium}
          />
        </div>
      </div>
      <div
        className="relative w-full h-full"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {isSelectedLeafNode && (
          <LargeMono
            className={`z-10 py-1 mb-1 text-slate-800 overflow-ellipsis break-words transition rounded-sm dark:text-slate-300 ${
              hovering ? "bg-slate-100 dark:bg-slate-700" : "bg-transparent"
            }`}
          >
            {formatRawValue(selectedInfo)}
          </LargeMono>
        )}
        <div
          className={`absolute top-1 right-0 flex justify-end h-full w-full transition ${
            hovering ? "opacity-100" : "opacity-0"
          }`}
        >
          <CopyTextButton
            className="bg-slate-200 hover:bg-slate-300 h-fit mr-1 px-2 py-0.5 rounded-sm transition hover:cursor-pointer dark:text-white dark:bg-slate-600 dark:hover:bg-slate-500"
            value={formatRawValue(selectedInfo)}
          ></CopyTextButton>
        </div>
      </div>
      <div className="flex text-gray-400">
        <Body className="flex-1">
          {concatenated(getHierarchicalTypes(selectedInfo))}
        </Body>
        {canBeNull && <Body>Can be null</Body>}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mb-4 pb-4 border-b border-slate-300">
      <div className="flex items-center">
        <Title className="flex-1 mr-2 text-slate-800 transition dark:text-slate-300">
          Nothing selected
        </Title>
      </div>
      <div>
        <div>
          <Title className="text-slate-800 mb-1 overflow-ellipsis break-words dark:text-slate-300">
            null
          </Title>
        </div>
      </div>
    </div>
  );
}
