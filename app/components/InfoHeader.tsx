import { inferType } from "@jsonhero/json-infer-types";
import { JSONHeroPath } from "@jsonhero/path";
import { useMemo } from "react";
import { useJson } from "~/hooks/useJson";
import { useJsonColumnViewState } from "~/hooks/useJsonColumnView";
import { concatenated, getHierarchicalTypes } from "~/utilities/dataType";
import { formatRawValue } from "~/utilities/formatter";
import { isNullable } from "~/utilities/nullable";
import { Body } from "./Primitives/Body";
import { LargeMono } from "./Primitives/LargeMono";
import { Title } from "./Primitives/Title";
import { ValueIcon, ValueIconSize } from "./ValueIcon";
import { CopyText } from "./CopyText";

export type InfoHeaderProps = {
  relatedPaths: string[];
};

export function InfoHeader({ relatedPaths }: InfoHeaderProps) {
  const { selectedNodeId, highlightedNodeId, selectedNodes } =
    useJsonColumnViewState();

  if (!selectedNodeId || !highlightedNodeId) {
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

  return (
    <div className="mb-4 pb-4">
      <div className="flex items-center">
        <Title className="flex-1 mr-2 text-slate-700 transition dark:text-slate-400">
          {selectedName ?? "nothing"}
        </Title>
        <div>
          <ValueIcon type={selectedInfo} size={ValueIconSize.Medium} />
        </div>
      </div>
      <div>
        {isSelectedLeafNode && (
          <CopyText
            className="after:w-5 after:h-5 after:top-0.5 after:right-0.5 rounded-sm hover:cursor-pointer transition ease-out after:transition hover:bg-slate-100 hover:dark:bg-slate-700 active:bg-slate-200 after:active:bg-slate-200 dark:active:bg-opacity-70 dark:after:active:bg-opacity-70 after:absolute after:opacity-0 hover:after:opacity-100 after:content-[''] after:bg-[url('/svgs/CopyIcon.svg')] active:after:bg-[url('/svgs/TickIcon.svg')] after:bg-slate-100 after:dark:bg-slate-700 after:bg-no-repeat"
            value={formatRawValue(selectedInfo)}
          >
            <LargeMono className="text-slate-800 mb-1 overflow-ellipsis break-words dark:text-slate-300">
              {formatRawValue(selectedInfo)}
            </LargeMono>
          </CopyText>
        )}
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
          <Title className="text-indigo-600 overflow-ellipsis break-words">
            null
          </Title>
        </div>
      </div>
    </div>
  );
}
