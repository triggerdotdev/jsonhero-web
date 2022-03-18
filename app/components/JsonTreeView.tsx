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
      if (selectedNodeId === "$") {
        return;
      }

      if (selectedNodeSource !== "tree") {
        tree.focusNode(selectedNodeId);
        tree.scrollToNode(selectedNodeId);
      }
    }
  }, [tree.focusedNodeId, goToNodeId, selectedNodeId, selectedNodeSource]);

  // This is what syncs the tree view's focused node to the column view selected node
  const previousFocusedNodeId = useRef<string | null>(null);

  useEffect(() => {
    let updated = false;

    if (!previousFocusedNodeId.current) {
      previousFocusedNodeId.current = tree.focusedNodeId;
      updated = true;
    }

    if (
      tree.focusedNodeId &&
      (updated || previousFocusedNodeId.current !== tree.focusedNodeId)
    ) {
      previousFocusedNodeId.current = tree.focusedNodeId;
      goToNodeId(tree.focusedNodeId, "tree");
    }
  }, [previousFocusedNodeId, tree.focusedNodeId, tree.focusNode, goToNodeId]);

  const treeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (treeRef.current) {
      treeRef.current.focus({ preventScroll: true });
    }
  }, [treeRef.current]);

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
        ref={treeRef}
      >
        {tree.nodes.map((virtualNode) => (
          <TreeViewNode
            virtualNode={virtualNode}
            key={virtualNode.node.id}
            onToggle={(node, e) => tree.toggleNode(node.id, e)}
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
  onToggle?: (node: JsonTreeViewNode, e: MouseEvent) => void;
}) {
  const { node, virtualItem, depth } = virtualNode;

  const indentClassName = computeTreeNodePaddingClass(depth);

  const isSelected = selectedNodeId === node.id;

  return (
    <div
      style={{
        outline: "none",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: `${virtualNode.size}px`,
        transform: `translateY(${virtualNode.start}px)`,
      }}
      key={virtualNode.node.id}
      {...virtualNode.getItemProps()}
    >
      <div
        className={`h-full flex m-2 rounded-sm select-none ${
          isSelected
            ? "bg-indigo-700"
            : virtualItem.index % 2
            ? "dark:bg-slate-900"
            : "bg-slate-200 bg-opacity-90 dark:bg-slate-800 dark:bg-opacity-30"
        }`}
      >
        <div className={`${indentClassName} w-1/4 items-center flex`}>
          {node.children && node.children.length > 0 && (
            <span
              onClick={(e) => {
                if (onToggle) {
                  e.preventDefault();
                  onToggle(node, e.nativeEvent);
                }
              }}
            >
              {virtualNode.isCollapsed ? (
                <ChevronRightIcon
                  className={`w-4 h-4 mr-2 ${
                    isSelected
                      ? "text-slate-100"
                      : "text-slate-600 dark:text-slate-100"
                  }`}
                />
              ) : (
                <ChevronDownIcon
                  className={`w-4 h-4 mr-2 ${
                    isSelected
                      ? "text-slate-100"
                      : "text-slate-600 dark:text-slate-100"
                  }`}
                />
              )}
            </span>
          )}

          <Body
            className={`${
              isSelected
                ? "text-slate-100"
                : "text-slate-700 dark:text-slate-200"
            }`}
          >
            {node.longTitle ?? node.name}
          </Body>
        </div>

        <div className="flex w-3/4 items-center">
          <span className="mr-2">
            {node.icon && (
              <node.icon
                className={`h-5 w-5 ${
                  isSelected
                    ? "text-slate-100"
                    : "text-slate-600 dark:text-slate-500"
                }`}
              />
            )}
          </span>
          {node.subtitle && (
            <Mono
              className={`truncate pr-1 transition ${
                isSelected
                  ? "text-slate-100"
                  : "text-slate-500 dark:text-slate-200"
              }`}
            >
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
