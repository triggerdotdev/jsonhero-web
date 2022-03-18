import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useEffect, useRef } from "react";
import {
  useJsonColumnViewAPI,
  useJsonColumnViewState,
} from "~/hooks/useJsonColumnView";
import { JsonTreeViewNode, useJsonTreeViewContext } from "~/hooks/useJsonTree";
import { VirtualNode } from "~/hooks/useVirtualTree";
import { Body } from "./Primitives/Body";
import { Mono } from "./Primitives/Mono";

export function JsonTreeView() {
  const { selectedNodeId, selectedNodeSource } = useJsonColumnViewState();
  const { goToNodeId } = useJsonColumnViewAPI();

  const { tree, parentRef } = useJsonTreeViewContext();

  // Scroll to the selected node when this component is first rendered.
  const scrolledToNodeRef = useRef(false);

  useEffect(() => {
    if (!scrolledToNodeRef.current && selectedNodeId) {
      tree.scrollToNode(selectedNodeId);
      scrolledToNodeRef.current = true;
    }
  }, [selectedNodeId, scrolledToNodeRef]);

  // This focuses and scrolls to the selected node when the selectedNodeId
  // is set from a source other than this tree (e.g. the search bar, path bar, related values).
  useEffect(() => {
    if (
      tree.focusedNodeId &&
      selectedNodeId &&
      tree.focusedNodeId !== selectedNodeId
    ) {
      if (selectedNodeSource !== "tree") {
        if (selectedNodeId === "$") {
          tree.focusFirst();
        } else {
          tree.focusNode(selectedNodeId);
          tree.scrollToNode(selectedNodeId);
        }
      }
    }
  }, [tree.focusedNodeId, goToNodeId, selectedNodeId, selectedNodeSource]);

  // This is what syncs the tree view's focused node to the column view selected node
  const previousFocusedNodeId = useRef<string | null>(null);

  useEffect(() => {
    if (!previousFocusedNodeId.current) {
      previousFocusedNodeId.current = tree.focusedNodeId;
      return;
    }

    if (
      tree.focusedNodeId &&
      previousFocusedNodeId.current !== tree.focusedNodeId
    ) {
      previousFocusedNodeId.current = tree.focusedNodeId;
      goToNodeId(tree.focusedNodeId, "tree");
    }
  }, [previousFocusedNodeId, tree.focusedNodeId, tree.focusNode, goToNodeId]);

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
        style={{ height: `${tree.totalSize}px` }}
        {...tree.getTreeProps()}
      >
        {tree.nodes.map((virtualNode) => (
          <TreeViewNode
            virtualNode={virtualNode}
            key={virtualNode.node.id}
            onToggle={() => tree.toggleNode(virtualNode.node.id)}
            selectedNodeId={selectedNodeId}
          />
        ))}
      </div>
    </div>
  );
}

function TreeViewNode({
  virtualNode,
  onToggle,
  selectedNodeId,
}: {
  virtualNode: VirtualNode<JsonTreeViewNode>;
  selectedNodeId?: string;
  onToggle?: (node: JsonTreeViewNode) => void;
}) {
  const { tree } = useJsonTreeViewContext();

  const { node, virtualItem, depth } = virtualNode;

  const indentClassName = computeTreeNodePaddingClass(depth);

  const isSelected = selectedNodeId === node.id;
  const isFocused = tree.focusedNodeId === node.id;

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current && isFocused) {
      elementRef.current.focus();
    }
  }, [elementRef, isFocused]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: `${virtualNode.size}px`,
        transform: `translateY(${virtualNode.start}px)`,
      }}
      key={virtualNode.node.id}
      {...virtualNode.getItemProps()}
      ref={elementRef}
    >
      <div
        className={`h-full flex select-none ${
          isSelected
            ? "dark:bg-indigo-700"
            : virtualItem.index % 2
            ? "dark:bg-slate-800"
            : "dark:bg-slate-700"
        }`}
      >
        <div className={`${indentClassName} w-2/5 items-center flex`}>
          {node.children && node.children.length > 0 && (
            <span
              onClick={(e) => {
                if (onToggle) {
                  e.preventDefault();
                  onToggle(node);
                }
              }}
            >
              {virtualNode.isCollapsed ? (
                <ChevronRightIcon className="w-3 h-3 mr-2" />
              ) : (
                <ChevronDownIcon className="w-3 h-3 mr-2" />
              )}
            </span>
          )}

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
    </div>
  );
}

function computeTreeNodePaddingClass(depth: number) {
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
