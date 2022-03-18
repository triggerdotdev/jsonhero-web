import { useReducer, Reducer, useCallback, Dispatch, useEffect } from "react";
import { useVirtual, VirtualItem } from "react-virtual";

type UseVirtualOptions<R> = Parameters<typeof useVirtual>[0];

export type UseVirtualTreeOptions<
  T extends { id: string; children?: T[] },
  R
> = {
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
  toggleNode: (id: string) => void;
  focusNode: (id: string) => void;
  focusFirst: () => void;
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
  id: string;
  isCollapsed: boolean;
};

type MoveLeftAction = {
  type: "MOVE_LEFT";
  source: KeyboardEvent | MouseEvent;
  id: string;
  isCollapsed: boolean;
  hasChildren: boolean;
};

type FocusFirstAction = {
  type: "FOCUS_FIRST";
};

type TreeAction =
  | ToggleNodeAction
  | MoveNodeAction
  | FocusNodeAction
  | FocusFirstAction
  | MoveRightAction
  | MoveLeftAction;

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

export function useVirtualTree<T extends { id: string; children?: T[] }, R>(
  options: UseVirtualTreeOptions<T, R>
): UseVirtualTreeInstance<T> {
  const reducer = useCallback<Reducer<TreeState<T>, TreeAction>>(
    (state, action) => {
      switch (action.type) {
        case "TOGGLE_NODE": {
          const isCollapsed = state.collapsedState[action.id];

          if (isCollapsed) {
            return expandNode<T>(state, action.id);
          } else {
            return collapseNode<T>(state, action.id);
          }
        }
        case "FOCUS_NODE": {
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
          if (action.isCollapsed) {
            return expandNode<T>(state, action.id);
          }

          const nodeIndex = state.items.findIndex(
            (item) => item.id === action.id
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
          if (action.hasChildren && !action.isCollapsed) {
            return collapseNode<T>(state, action.id);
          }

          if (!action.hasChildren || action.isCollapsed) {
            // Try to go to the parent node
            const parentNodeIndex = state.items.findIndex(
              (item) =>
                item.node.children &&
                item.node.children.map((child) => child.id).includes(action.id)
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
        }
        default:
          return state;
      }
    },
    []
  );

  const initializer = useCallback(({ nodes }: { nodes: T[] }) => {
    return {
      nodes,
      items: createNodeItems(nodes),
      collapsedState: {},
      focusedNodeId: nodes.length > 0 ? nodes[0].id : null,
    };
  }, []);

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
    (id: string) => {
      dispatch({ type: "TOGGLE_NODE", id });
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

  // TODO: have this work with collapsed nodes
  const scrollToNode = useCallback(
    (id: string) => {
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        rowVirtualizer.scrollToIndex(itemIndex, { align: "auto" });
      }
    },
    [state.items, rowVirtualizer.scrollToIndex]
  );

  useEffect(() => {
    if (state.focusedNodeId) {
      scrollToNode(state.focusedNodeId);
      focusNode(state.focusedNodeId);
    }
  }, [state.focusedNodeId, scrollToNode, focusNode]);

  return {
    nodes: allVirtualNodes,
    totalSize: rowVirtualizer.totalSize,
    toggleNode,
    focusNode,
    focusFirst,
    focusedNodeId: state.focusedNodeId,
    getTreeProps: useCallback(
      () => ({
        role: "tree",
      }),
      []
    ),
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
    onKeyDown: (e) => {
      if (e.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      if (node.id === state.focusedNodeId) {
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
            dispatch({
              type: "MOVE_LEFT",
              id: node.id,
              isCollapsed,
              hasChildren:
                typeof node.children !== "undefined" &&
                node.children.length > 0,
              source: e.nativeEvent,
            });
            e.preventDefault();

            break;
          }
          case "Right":
          case "ArrowRight": {
            if (node.children && node.children.length > 0) {
              dispatch({
                type: "MOVE_RIGHT",
                id: node.id,
                isCollapsed,
                source: e.nativeEvent,
              });
              e.preventDefault();
            }

            break;
          }
        }
      }
    },
  });
}
