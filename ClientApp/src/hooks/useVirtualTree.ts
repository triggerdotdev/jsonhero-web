import pick from "lodash-es/pick";
import React, {
  useReducer,
  Reducer,
  useCallback,
  Dispatch,
  useEffect,
  useRef,
} from "react";
import { useVirtual, VirtualItem } from "react-virtual";

type UseVirtualOptions<R> = Parameters<typeof useVirtual>[0];

export type UseVirtualTreeOptions<
  T extends { id: string; children?: T[] },
  R
> = {
  id: string;
  persistState?: boolean;
  nodes: T[];
} & Omit<UseVirtualOptions<R>, "size">;

export type VirtualNode<T> = {
  node: T;
  size: number; // This is the same as virtualItem.size
  start: number; // This is the same as virtualItem.start
  virtualItem: VirtualItem;
  depth: number;
  getItemProps: () => React.HTMLAttributes<HTMLElement>;
  isCollapsed?: boolean;
};

export type UseVirtualTreeInstance<T> = {
  nodes: VirtualNode<T>[];
  focusedNodeId: string | null;
  totalSize: number;
  toggleNode: (id: string, source?: KeyboardEvent | MouseEvent) => void;
  focusNode: (id: string) => void;
  focusFirst: () => void;
  blur: () => void;
  scrollToNode: (id: string) => void;
  getTreeProps: () => React.HTMLAttributes<HTMLElement>;
};

type TreeNodeItem<T extends { id: string; children?: T[] }> = {
  id: string;
  depth: number;
  node: T;
  pos: number;
  size: number;
  isCollapsed: boolean;
};

type TreeState<T extends { id: string; children?: T[] }> = {
  nodes: T[];
  items: TreeNodeItem<T>[];
  collapsedState: Record<string, boolean>;
  focusedNodeId: string | null;
};

type ToggleNodeAction = {
  type: "TOGGLE_NODE";
  id: string;
  source?: KeyboardEvent | MouseEvent;
};

type FocusNodeAction = {
  type: "FOCUS_NODE";
  id: string;
};

type MoveNodeAction = {
  type: "MOVE_DOWN" | "MOVE_UP" | "MOVE_TO_TOP" | "MOVE_TO_BOTTOM";
  source: KeyboardEvent | MouseEvent;
};

type MoveRightAction = {
  type: "MOVE_RIGHT";
  source: KeyboardEvent | MouseEvent;
};

type MoveLeftAction = {
  type: "MOVE_LEFT";
  source: KeyboardEvent | MouseEvent;
};

type FocusFirstAction = {
  type: "FOCUS_FIRST";
};

type RestoreStateAction = {
  type: "RESTORE_STATE";
  restoredState: { collapsedState: Record<string, boolean> };
};

type ExpandAllOnPathAction = {
  type: "EXPAND_ALL_ON_PATH";
  path: string[];
};

type BlurAction = {
  type: "BLUR";
};

type CollapseAllNodesAction = {
  type: "COLLAPSE_ALL_NODES"
};

type TreeAction =
  | ToggleNodeAction
  | MoveNodeAction
  | FocusNodeAction
  | FocusFirstAction
  | MoveRightAction
  | MoveLeftAction
  | RestoreStateAction
  | ExpandAllOnPathAction
  | BlurAction
  | CollapseAllNodesAction;

function expandNode<T extends { id: string; children?: T[] }>(
  state: TreeState<T>,
  id: string
): TreeState<T> {
  const collapsedState = {
    ...state.collapsedState,
    [id]: false,
  };

  return {
    ...state,
    collapsedState,
    items: createNodeItems(state.nodes, 0, collapsedState),
    focusedNodeId: id,
  };
}

function collapseNode<T extends { id: string; children?: T[] }>(
  state: TreeState<T>,
  id: string
): TreeState<T> {
  const collapsedState = {
    ...state.collapsedState,
    [id]: true,
  };

  return {
    ...state,
    collapsedState,
    items: createNodeItems(state.nodes, 0, collapsedState),
    focusedNodeId: id,
  };
}
function toggleAllChildren<T extends { id: string; children?: T[] }>(
  state: TreeState<T>,
  id: string
): TreeState<T> {
  const item = state.items.find(({ id: nodeId }) => nodeId === id);

  if (!item) {
    return state;
  }

  if (!item.node.children || item.node.children.length === 0) {
    return state;
  }

  const allCollapsed = item.node.children.every(
    (child) => state.collapsedState[child.id]
  );

  if (allCollapsed) {
    const collapsedState = item.node.children.reduce(
      (acc, child) => ({
        ...acc,
        [child.id]: false,
      }),
      state.collapsedState
    );

    return {
      ...state,
      collapsedState,
      items: createNodeItems(state.nodes, 0, collapsedState),
      focusedNodeId: id,
    };
  }

  const collapsedState = item.node.children.reduce(
    (acc, child) => ({
      ...acc,
      [child.id]: true,
    }),
    state.collapsedState
  );

  return {
    ...state,
    collapsedState,
    items: createNodeItems(state.nodes, 0, collapsedState),
    focusedNodeId: id,
  };
}

export function useVirtualTree<T extends { id: string; children?: T[] }, R>(
  options: UseVirtualTreeOptions<T, R>
): UseVirtualTreeInstance<T> {
  const reducer = useCallback<Reducer<TreeState<T>, TreeAction>>(
    (state, action) => {
      switch (action.type) {
        case "BLUR": {
          return {
            ...state,
            focusedNodeId: null,
          };
        }
        case "TOGGLE_NODE": {
          const isCollapsed = state.collapsedState[action.id];

          if (isCollapsed) {
            return expandNode<T>(state, action.id);
          } else {
            if (
              action.source &&
              (action.source.shiftKey || action.source.altKey)
            ) {
              return toggleAllChildren<T>(state, action.id);
            } else {
              return collapseNode<T>(state, action.id);
            }
          }
        }
        case "COLLAPSE_ALL_NODES": {
          // Reduce from the right, so that the
          // focusedNodeId is set to the top-level node.
          return state.items.reduceRight(
            (nextState, item) => collapseNode<T>(nextState, item.id),
            state
          );
        }
        case "FOCUS_NODE": {
          const itemIndex = state.items.findIndex(({ id }) => id === action.id);

          if (itemIndex === -1) {
            const node = findNodeInTreeById(state.nodes, action.id);

            if (!node) {
              return state;
            }

            const path = calculatePathToNode(state.nodes, node) ?? [];

            const collapsedState = path.reduce(
              (acc, id) => ({
                ...acc,
                [id]: false,
              }),
              state.collapsedState
            );

            return {
              ...state,
              collapsedState,
              items: createNodeItems(state.nodes, 0, collapsedState),
              focusedNodeId: action.id,
            };
          }

          return {
            ...state,
            focusedNodeId: action.id,
          };
        }
        case "FOCUS_FIRST":
        case "MOVE_TO_TOP": {
          const nextItem = state.items[0];

          if (!nextItem) {
            return state;
          }

          return {
            ...state,
            focusedNodeId: nextItem.id,
          };
        }
        case "MOVE_TO_BOTTOM": {
          const nextItem = state.items[state.items.length - 1];

          if (!nextItem) {
            return state;
          }

          return {
            ...state,
            focusedNodeId: nextItem.id,
          };
        }
        case "MOVE_DOWN": {
          if (!state.focusedNodeId) {
            const nextItem = state.items[0];

            if (!nextItem) {
              return state;
            }

            return {
              ...state,
              focusedNodeId: nextItem.id,
            };
          }

          const focusedNodeIdIndex = state.items.findIndex(
            (item) => item.id === state.focusedNodeId
          );

          if (focusedNodeIdIndex === -1) {
            return state;
          }

          if (state.items.length <= focusedNodeIdIndex + 1) {
            return state;
          }

          const nextItem = state.items[focusedNodeIdIndex + 1];

          return {
            ...state,
            focusedNodeId: nextItem.id,
          };
        }
        case "MOVE_UP": {
          const focusedNodeIdIndex = state.items.findIndex(
            (item) => item.id === state.focusedNodeId
          );

          if (focusedNodeIdIndex === -1) {
            return state;
          }

          if (focusedNodeIdIndex === 0) {
            return state;
          }

          const nextItem = state.items[focusedNodeIdIndex - 1];

          return {
            ...state,
            focusedNodeId: nextItem.id,
          };
        }
        case "MOVE_RIGHT": {
          if (!state.focusedNodeId) {
            return state;
          }

          const isCollapsed = state.collapsedState[state.focusedNodeId];

          if (isCollapsed) {
            return expandNode<T>(state, state.focusedNodeId);
          }

          if (
            action.source &&
            (action.source.shiftKey || action.source.altKey)
          ) {
            return toggleAllChildren<T>(state, state.focusedNodeId);
          }

          const nodeIndex = state.items.findIndex(
            (item) => item.id === state.focusedNodeId
          );

          if (nodeIndex === -1) {
            return state;
          }

          if (state.items.length <= nodeIndex + 1) {
            return state;
          }

          const nextItem = state.items[nodeIndex + 1];

          return {
            ...state,
            focusedNodeId: nextItem.id,
          };
        }
        case "MOVE_LEFT": {
          if (!state.focusedNodeId) {
            return state;
          }

          const item = state.items.find(
            (item) => item.id === state.focusedNodeId
          );

          if (!item) {
            return state;
          }

          const hasChildren =
            item.node.children && item.node.children.length > 0;
          const isCollapsed = state.collapsedState[state.focusedNodeId];

          if (hasChildren && !isCollapsed) {
            if (
              action.source &&
              (action.source.shiftKey || action.source.altKey)
            ) {
              return toggleAllChildren<T>(state, state.focusedNodeId);
            } else {
              return collapseNode<T>(state, state.focusedNodeId);
            }
          }

          if (!hasChildren || isCollapsed) {
            // Try to go to the parent node
            const parentNodeIndex = state.items.findIndex(
              (item) =>
                item.node.children &&
                item.node.children
                  .map((child) => child.id)
                  .includes(state.focusedNodeId!)
            );

            if (parentNodeIndex === -1) {
              return state;
            }

            const nextItem = state.items[parentNodeIndex];

            return {
              ...state,
              focusedNodeId: nextItem.id,
            };
          }

          return state;
        }
        case "RESTORE_STATE": {
          const nextState = {
            ...state,
            ...action.restoredState,
          };

          return {
            ...nextState,
            items: createNodeItems(
              nextState.nodes,
              0,
              nextState.collapsedState
            ),
          };
        }
        default:
          return state;
      }
    },
    []
  );

  const initializer = useCallback(
    ({ nodes }: { nodes: T[] }) => {
      return {
        nodes,
        items: createNodeItems(nodes),
        collapsedState: {},
        focusedNodeId: null,
      };
    },
    [options.persistState, options.id]
  );

  const [state, dispatch] = useReducer<
    Reducer<TreeState<T>, TreeAction>,
    { nodes: T[] }
  >(
    reducer,
    {
      nodes: options.nodes,
    },
    initializer
  );

  const isStateRestored = useRef<boolean>(false);

  // This is setting the state
  useEffect(() => {
    if (!isStateRestored.current) {
      return;
    }

    if (options.persistState) {
      localStorage.setItem(
        `${options.id}-virtual-tree-state`,
        JSON.stringify(pick(state, "collapsedState"))
      );
    }
  }, [
    state.collapsedState,
    options.id,
    options.persistState,
    isStateRestored.current,
  ]);

  // This is restoring the state
  useEffect(() => {
    if (!options.persistState) {
      return;
    }

    if (isStateRestored.current) {
      return;
    }

    isStateRestored.current = true;

    const savedState = localStorage.getItem(`${options.id}-virtual-tree-state`);

    if (savedState) {
      const restoredState = JSON.parse(savedState) as {
        collapsedState: Record<string, boolean>;
      };

      dispatch({
        type: "RESTORE_STATE",
        restoredState,
      });
    }
  }, [options.persistState, options.id, dispatch, isStateRestored.current]);

  const rowVirtualizer = useVirtual({
    size: state.items.length,
    parentRef: options.parentRef,
    estimateSize: options.estimateSize,
    overscan: options.overscan,
    initialRect: options.initialRect,
    useObserver: options.useObserver,
  });

  const allVirtualNodes = rowVirtualizer.virtualItems.map((virtualItem) => {
    const treeItem = state.items[virtualItem.index];

    return {
      node: treeItem.node,
      depth: treeItem.depth,
      size: virtualItem.size,
      start: virtualItem.start,
      virtualItem,
      getItemProps: createItemProps(treeItem, virtualItem, state, dispatch),
      isCollapsed: treeItem.isCollapsed,
    };
  });

  const toggleNode = useCallback(
    (id: string, source?: KeyboardEvent | MouseEvent) => {
      dispatch({ type: "TOGGLE_NODE", id, source });
    },
    [dispatch]
  );

  const focusNode = useCallback(
    (id: string) => {
      dispatch({ type: "FOCUS_NODE", id });
    },
    [dispatch]
  );

  const focusFirst = useCallback(
    () => dispatch({ type: "FOCUS_FIRST" }),
    [dispatch]
  );

  const blur = useCallback(() => dispatch({ type: "BLUR" }), [dispatch]);

  // TODO: have this work with collapsed nodes
  const scrollToNode = useCallback(
    (id: string) => {
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        rowVirtualizer.scrollToIndex(itemIndex, { align: "auto" });
      }
    },
    [state.items, rowVirtualizer.scrollToIndex, dispatch]
  );

  useEffect(() => {
    if (state.focusedNodeId) {
      scrollToNode(state.focusedNodeId);
    }
  }, [state.focusedNodeId, scrollToNode]);

  return {
    nodes: allVirtualNodes,
    totalSize: rowVirtualizer.totalSize,
    toggleNode,
    focusNode,
    focusFirst,
    blur,
    focusedNodeId: state.focusedNodeId,
    getTreeProps: useCallback(createTreeProps(dispatch), [dispatch]),
    scrollToNode,
  };
}

function createNodeItems<T extends { id: string; children?: T[] }>(
  nodes: T[],
  depth = 0,
  collapsedState: Record<string, boolean> = {}
): TreeNodeItem<T>[] {
  return nodes.flatMap((node, index) => {
    const children = node.children
      ? collapsedState[node.id]
        ? []
        : createNodeItems(node.children, depth + 1, collapsedState)
      : [];
    return [
      {
        id: node.id,
        depth,
        node,
        pos: index + 1,
        size: nodes.length,
        isCollapsed: !!collapsedState[node.id],
      },
      ...children,
    ];
  });
}

function createTreeProps<T extends { id: string; children?: T[] }>(
  dispatch: Dispatch<TreeAction>
): () => React.HTMLAttributes<HTMLElement> {
  return () => ({
    role: "tree",
    tabIndex: -1,
    onKeyDown: (e) => {
      if (e.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      switch (e.key) {
        case "Home": {
          dispatch({ type: "MOVE_TO_TOP", source: e.nativeEvent });
          e.preventDefault();
          break;
        }
        case "End": {
          dispatch({ type: "MOVE_TO_BOTTOM", source: e.nativeEvent });
          e.preventDefault();
          break;
        }
        case "Down":
        case "ArrowDown": {
          dispatch({ type: "MOVE_DOWN", source: e.nativeEvent });
          e.preventDefault();
          break;
        }
        case "Up":
        case "ArrowUp": {
          dispatch({ type: "MOVE_UP", source: e.nativeEvent });
          e.preventDefault();
          break;
        }
        case "Left":
        case "ArrowLeft": {
          if (e.altKey) {
            dispatch({ type: "COLLAPSE_ALL_NODES" });
          } else {
            dispatch({
              type: "MOVE_LEFT",
              source: e.nativeEvent,
            });
          }
          e.preventDefault();

          break;
        }
        case "Right":
        case "ArrowRight": {
          dispatch({
            type: "MOVE_RIGHT",
            source: e.nativeEvent,
          });
          e.preventDefault();

          break;
        }
      }
    },
  });
}

function createItemProps<T extends { id: string; children?: T[] }>(
  item: TreeNodeItem<T>,
  virtualItem: VirtualItem,
  state: TreeState<T>,
  dispatch: Dispatch<TreeAction>
): () => React.HTMLAttributes<HTMLElement> {
  const { depth, pos, size, node, isCollapsed } = item;

  return () => ({
    "aria-expanded": node.children && node.children.length > 0 && !isCollapsed,
    "aria-level": depth + 1,
    "aria-posinset": pos,
    "aria-setsize": size,
    role: "treeitem",
    tabIndex: node.id === state.focusedNodeId ? -1 : undefined,
    onClick: (e) => {
      if (e.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      if (node.id !== state.focusedNodeId) {
        dispatch({ type: "FOCUS_NODE", id: node.id });
      }
    },
  });
}

// Finds the node in the list of nodes or recursively in the children
function findNodeInTreeById<T extends { id: string; children?: T[] }>(
  nodes: T[],
  id: string
): T | undefined {
  const node = nodes.find((node) => node.id === id);

  if (node) {
    return node;
  }

  for (const node of nodes) {
    const foundNode = findNodeInTreeById(node.children || [], id);

    if (foundNode) {
      return foundNode;
    }
  }

  return;
}

function calculatePathToNode<T extends { id: string; children?: T[] }>(
  nodes: T[],
  searchNode: T,
  path: string[] = []
): string[] | undefined {
  const nodeIndex = nodes.findIndex((node) => node.id === searchNode.id);

  if (nodeIndex !== -1) {
    return [...path, searchNode.id];
  }

  for (const node of nodes) {
    if (!node.children) {
      continue;
    }

    const foundPath = calculatePathToNode(node.children || [], searchNode, [
      ...path,
      node.id,
    ]);

    if (foundPath && foundPath.length > path.length) {
      return foundPath;
    }
  }

  return;
}
