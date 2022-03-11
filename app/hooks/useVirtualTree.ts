import { useReducer, Reducer, useCallback, Dispatch } from "react";
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
  totalSize: number;
  toggleNode: (id: string) => void;
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

type TreeAction = ToggleNodeAction;

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

  const toggleNode = useCallback((id: string) => {
    dispatch({ type: "TOGGLE_NODE", id });
  }, []);

  // TODO: have this work with collapsed nodes
  const scrollToNode = useCallback(
    (id: string) => {
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        rowVirtualizer.scrollToIndex(itemIndex, { align: "auto" });
      }
    },
    [state.items, rowVirtualizer]
  );

  return {
    nodes: allVirtualNodes,
    totalSize: rowVirtualizer.totalSize,
    toggleNode,
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
    tabIndex: node.id === state.focusedNodeId ? 0 : -1,
  });
}
