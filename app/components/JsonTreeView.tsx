import { ChevronDownIcon } from "@heroicons/react/outline";
import { JSONHeroPath } from "@jsonhero/path";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useVirtual } from "react-virtual";
import { useJson } from "~/hooks/useJson";
import {
  useJsonColumnViewAPI,
  useJsonColumnViewState,
} from "~/hooks/useJsonColumnView";
import { generateTreeViewNodes, TreeViewNode } from "~/utilities/jsonTreeView";
import { Body } from "./Primitives/Body";
import { Mono } from "./Primitives/Mono";

const initialRect = { width: 800, height: 600 };

export function JsonTreeView() {
  const [json] = useJson();
  const { selectedNodeId } = useJsonColumnViewState();

  const treeNodes = useMemo(() => {
    return generateTreeViewNodes(json);
  }, [json]);

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: treeNodes.length,
    overscan: 10,
    parentRef,
    estimateSize: useCallback(() => 32, []),
    initialRect,
  });

  useEffect(() => {
    if (selectedNodeId) {
      rowVirtualizer.scrollToIndex(findNodeIndex(selectedNodeId, treeNodes));
    }
  }, [selectedNodeId, treeNodes]);

  return (
    <div
      className="text-white w-full"
      ref={parentRef}
      style={{
        height: `calc(100vh - 106px)`,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div
        className="w-full relative"
        style={{ height: `${rowVirtualizer.totalSize}px` }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
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
            <TreeViewItem
              node={treeNodes[virtualRow.index]}
              index={virtualRow.index}
              selectedNodeId={selectedNodeId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function TreeViewItem({
  node,
  index,
  selectedNodeId,
}: {
  node: TreeViewNode;
  index: number;
  selectedNodeId?: string;
}) {
  const indentClassName = computeTreeNodePaddingClass(node);

  const { goToNodeId } = useJsonColumnViewAPI();

  const isSelected = node.id === selectedNodeId;

  const handleClick = useCallback(
    () => goToNodeId(node.id),
    [goToNodeId, node.id]
  );

  return (
    <div
      className={`h-full flex select-none ${
        isSelected
          ? "dark:bg-indigo-700"
          : index % 2
          ? "dark:bg-slate-800"
          : "dark:bg-slate-700"
      }`}
      onClick={handleClick}
    >
      <div className={`${indentClassName} w-2/5 items-center flex`}>
        {node.collapsable && <ChevronDownIcon className="w-3 h-3 mr-2" />}

        <Body>{node.longTitle ?? node.name}</Body>
      </div>

      <div className="flex w-3/5 items-center">
        <span className="mr-2">
          {node.icon && <node.icon className={`h-5 w-5`} />}
        </span>
        {node.subtitle && (
          <Mono className="truncate text-gray-400 pr-1 transition dark:text-gray-500">
            {node.subtitle}
          </Mono>
        )}
      </div>
    </div>
  );
}

function computeTreeNodePaddingClass(node: TreeViewNode) {
  const path = new JSONHeroPath(node.id);

  const depth = path.components.length - 1;

  switch (depth) {
    case 0:
      return "pl-[4px]";
    case 1:
      return "pl-[24px]";
    case 2:
      return "pl-[48px]";
    case 3:
      return "pl-[72px]";
    case 4:
      return "pl-[96px]";
    case 5:
      return "pl-[120px]";
    case 6:
      return "pl-[144px]";
    case 7:
      return "pl-[168px]";
    case 8:
      return "pl-[192px]";
    case 9:
      return "pl-[216px]";
    case 10:
      return "pl-[240px]";
    default:
      return "pl-[264px]";
  }
}
function findNodeIndex(
  selectedNodeId: string,
  nodes: Array<TreeViewNode>
): number {
  return nodes.findIndex((node) => node.id === selectedNodeId);
}
