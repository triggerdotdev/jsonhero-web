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

export function InfoHeader() {
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
    return isNullable(selectedNodeId, json);
  }, [selectedNodeId, json]);

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
            className="after:w-5 after:h-5 after:top-0.5 after:right-0.5"
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
