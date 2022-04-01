import { omit } from "lodash-es";
import React, {
  ReactNode,
  Reducer,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useMemoCompare } from "~/hooks/useMemoCompare";

export type IconComponent = (
  props: React.SVGProps<SVGSVGElement>
) => JSX.Element;

export interface ColumnViewNode {
  id: string;
  name: string;
  title: string;
  subtitle?: string;
  longTitle?: string;
  icon?: IconComponent;
  children: ColumnViewNode[];
}

export type ColumnViewOptions = {
  rootNode: ColumnViewNode;
  initialState?: ColumnViewState | string;
  stateReducer?: ColumnViewStateReducerHook;
};

export type ColumnDefinition = {
  id: string;
  title: string;
  icon?: IconComponent;
  items: ColumnViewNode[];
};

export type ColumnViewInstanceState = {
  columns: Array<ColumnDefinition>;
  getColumnViewProps: () => ColumnViewProps;
  selectedNodeId?: string;
  selectedNodeSource?: string;
  selectedPath: string[];
  highlightedNodeId?: string;
  highlightedPath: string[];
  selectedNodes: ColumnViewNode[];
  canGoBack: boolean;
  canGoForward: boolean;
};

export type ColumnViewAPIOptions = {
  source?: KeyboardEvent | MouseEvent;
};

export type ColumnViewAPI = {
  goBack: () => void;
  goForward: () => void;
  goToNodeId: (nodeId: string, source: string) => void;
  goToParent: (options?: ColumnViewAPIOptions) => void;
  goToChildren: () => void;
  goToNextSibling: () => void;
  goToPreviousSibling: () => void;
  resetSelection: () => void;
};

export type ColumnViewInstance = {
  state: ColumnViewInstanceState;
  api: ColumnViewAPI;
};

export type ColumnViewProps = {
  children?: ReactNode;
  className?: string;
  tabIndex?: number;
};

type ColumnDefinitionCache = Map<string, ColumnDefinition>;

export function useColumnView({
  rootNode,
  initialState,
  stateReducer,
}: ColumnViewOptions): ColumnViewInstance {
  const columnCache = React.useRef<ColumnDefinitionCache>(new Map());

  useEffect(() => {
    columnCache.current = new Map();
  }, [rootNode]);

  const nodeTable = useMemo<NodeTable>(
    () => generateNodeTable(rootNode),
    [rootNode]
  );

  const enhancedReducer: Reducer<ColumnViewState, ColumnViewAction> =
    useCallback(
      (state: ColumnViewState, action: ColumnViewAction): ColumnViewState => {
        let changes = columnViewReducer(state, action);

        // Don't allow the client modify history actions
        if (action.type === "GO") {
          return changes;
        }

        if (stateReducer) {
          changes = stateReducer(state, action, changes);
        }

        //we need to get rid of any history items further forward because the user has forked by navigating
        let updatedHistory = changes.history.slice(
          0,
          changes.historyCurrentIndex + 1
        );
        let historyIndex = changes.historyCurrentIndex;

        //add new entry
        const newHistoryEntry = omit(changes, "history", "historyCurrentIndex");
        updatedHistory.push(newHistoryEntry);
        historyIndex = updatedHistory.length - 1;

        return {
          ...changes,
          history: updatedHistory,
          historyCurrentIndex: historyIndex,
        };
      },
      [stateReducer]
    );

  const [state, dispatch] = useReducer<
    Reducer<ColumnViewState, ColumnViewAction>
  >(
    enhancedReducer,
    typeof initialState === "string"
      ? {
          selectedNodeId: initialState,
          highlightedNodeId: initialState,
          history: [],
          historyCurrentIndex: 0,
          nodeTable,
          rootNodeId: rootNode.id,
        }
      : initialState ?? {
          selectedNodeId: "$",
          highlightedNodeId: "$",
          history: [],
          historyCurrentIndex: 0,
          nodeTable,
          rootNodeId: rootNode.id,
        }
  );

  const api = useMemo<ColumnViewAPI>(() => {
    return {
      goBack: () => {
        dispatch(goBackAction());
      },
      goForward: () => {
        dispatch(goForwardAction());
      },
      goToNodeId: (nodeId: string, source: string) => {
        dispatch(goToNodeIdAction(nodeId, source));
      },
      goToParent: (options?: ColumnViewAPIOptions) => {
        dispatch(goToParentAction(options));
      },
      goToChildren: () => {
        dispatch(goToChildrenAction());
      },
      goToPreviousSibling: () => {
        dispatch(goToPreviousSibling());
      },
      goToNextSibling: () => {
        dispatch(goToNextSibling());
      },
      resetSelection: () => {
        dispatch(resetSelectionAction());
      },
    };
  }, [dispatch]);

  const {
    selectedNodeId,
    highlightedNodeId,
    selectedNodeSource,
    history,
    historyCurrentIndex,
  } = state;

  const selectedPath = getPathToNode(nodeTable, selectedNodeId);
  const highlightedPath = getPathToNode(nodeTable, highlightedNodeId);

  const columns = useMemoCompare(
    generateColumns(nodeTable, selectedPath, columnCache.current),
    (previous, next) => {
      if (!previous || !next) return false;
      if (previous.length !== next.length) return false;
      const isEqual =
        previous.map(({ id }) => id).join("") ===
        next.map(({ id }) => id).join("");

      return isEqual;
    }
  );
  const selectedNodes = selectedPath.map((id) => nodeTable[id].node);

  const getColumnViewProps = useCallback(() => {
    return {};
  }, []);

  const canGoBack = historyCurrentIndex > 0;
  const canGoForward = historyCurrentIndex < history.length - 1;

  return {
    state: {
      selectedNodeId,
      selectedNodeSource,
      selectedPath,
      selectedNodes,
      highlightedNodeId,
      highlightedPath,
      columns: columns ?? [],
      getColumnViewProps,
      canGoBack,
      canGoForward,
    },
    api,
  };
}

export type ColumnViewState = {
  selectedNodeId?: string;
  highlightedNodeId?: string;
  selectedNodeSource?: string;
  history: Array<Omit<ColumnViewState, "history" | "historyCurrentIndex">>;
  historyCurrentIndex: number;
  nodeTable: NodeTable;
  rootNodeId: string;
};

export type SetSelectedNodeIdAction = {
  type: "SET_SELECTED_NODE_ID";
  id: string;
  source: string;
};

export type MoveSelectedNodeAction = {
  type: "MOVE_UP" | "MOVE_DOWN" | "MOVE_TO_PARENT" | "MOVE_TO_CHILDREN";
  source?: KeyboardEvent | MouseEvent;
};

export type ResetSelectionNodeAction = {
  type: "RESET_SELECTION";
};

export type GoAction = {
  type: "GO";
  direction: -1 | 1;
};

export type ColumnViewAction =
  | SetSelectedNodeIdAction
  | MoveSelectedNodeAction
  | ResetSelectionNodeAction
  | GoAction;

function goBackAction(): GoAction {
  return {
    type: "GO",
    direction: -1,
  };
}

function goForwardAction(): GoAction {
  return {
    type: "GO",
    direction: 1,
  };
}

function resetSelectionAction(): ResetSelectionNodeAction {
  return {
    type: "RESET_SELECTION",
  };
}

function goToNodeIdAction(
  nodeId: string,
  source: string
): SetSelectedNodeIdAction {
  return {
    type: "SET_SELECTED_NODE_ID",
    id: nodeId,
    source,
  };
}

function goToParentAction(
  options?: ColumnViewAPIOptions
): MoveSelectedNodeAction {
  return {
    type: "MOVE_TO_PARENT",
    source: options?.source,
  };
}

function goToChildrenAction(): MoveSelectedNodeAction {
  return {
    type: "MOVE_TO_CHILDREN",
  };
}

function goToPreviousSibling(): MoveSelectedNodeAction {
  return {
    type: "MOVE_UP",
  };
}

function goToNextSibling(): MoveSelectedNodeAction {
  return {
    type: "MOVE_DOWN",
  };
}

export type ColumnViewStateReducerHook = (
  state: ColumnViewState,
  action: ColumnViewAction,
  changes: ColumnViewState
) => ColumnViewState;

/*
  Needs to support the following selection actions:
    1. Select a node by id
    2. Highlight a node by id
    3. Move to a specific child of of the current node
    4. Move to the next sibling of the current node
    5. Move to the previous sibling of the current node
    5. Move to the parent of the current node
    6. Move to the root of the current node
    7. Move to the first child of the current node
    8. Move back to the previous state
    9. Move forward to the next state
*/
function columnViewReducer(
  state: ColumnViewState,
  action: ColumnViewAction
): ColumnViewState {
  switch (action.type) {
    case "SET_SELECTED_NODE_ID":
      return {
        ...state,
        selectedNodeId: action.id,
        highlightedNodeId: action.id,
        selectedNodeSource: action.source,
      };
    case "MOVE_DOWN": {
      if (state.highlightedNodeId === state.rootNodeId) {
        return moveToChildren(state);
      }

      const id = getHighlightedSibling(state, state.nodeTable, 1);

      if (!id) {
        return state;
      }

      return {
        ...state,
        selectedNodeId: id,
        highlightedNodeId: id,
      };
    }
    case "MOVE_UP": {
      const id = getHighlightedSibling(state, state.nodeTable, -1);

      if (!id) {
        return state;
      }

      return {
        ...state,
        selectedNodeId: id,
        highlightedNodeId: id,
      };
    }
    case "MOVE_TO_CHILDREN": {
      return moveToChildren(state);
    }
    case "MOVE_TO_PARENT": {
      const { highlightedNodeId } = state;

      if (!highlightedNodeId) {
        return state;
      }

      const highlightedNode = state.nodeTable[highlightedNodeId];

      if (!highlightedNode || !highlightedNode.parentId) {
        return state;
      }

      const id = highlightedNode.parentId;

      return {
        ...state,
        selectedNodeId: id,
        highlightedNodeId: id,
      };
    }
    case "RESET_SELECTION": {
      if (state.selectedNodeId !== state.highlightedNodeId) {
        return {
          ...state,
          selectedNodeId: state.highlightedNodeId,
        };
      }

      break;
    }
    case "GO": {
      const { history, historyCurrentIndex } = state;

      if (action.direction === -1 && historyCurrentIndex > 0) {
        const newHistoryCurrentIndex = historyCurrentIndex - 1;
        const nextState = history[newHistoryCurrentIndex];

        return {
          ...nextState,
          historyCurrentIndex: newHistoryCurrentIndex,
          history,
        };
      }

      if (action.direction === 1 && historyCurrentIndex < history.length - 1) {
        const newHistoryCurrentIndex = historyCurrentIndex + 1;
        const nextState = history[newHistoryCurrentIndex];

        return {
          ...nextState,
          historyCurrentIndex: newHistoryCurrentIndex,
          history,
        };
      }

      break;
    }
    default:
      return state;
  }

  return state;
}

function moveToChildren(state: ColumnViewState): ColumnViewState {
  const { highlightedNodeId } = state;

  if (!highlightedNodeId) {
    return state;
  }

  const highlightedNode = state.nodeTable[highlightedNodeId];

  if (!highlightedNode || highlightedNode.children.length === 0) {
    return state;
  }

  const id = highlightedNode.children[0];

  return {
    ...state,
    selectedNodeId: id,
    highlightedNodeId: id,
  };
}

// TODO: CACHE THIS
function generateColumns(
  nodeTable: NodeTable,
  path: string[],
  columnCache: ColumnDefinitionCache
): Array<ColumnDefinition> {
  const columns: Array<ColumnDefinition> = [];

  function addColumn(nodeRecord: NodeRecord) {
    const cachedColumn = columnCache.get(nodeRecord.id);

    if (cachedColumn) {
      columns.push(cachedColumn);
      return;
    }

    const column: ColumnDefinition = {
      id: nodeRecord.id,
      title: nodeRecord.node.longTitle ?? nodeRecord.node.title,
      icon: nodeRecord.node.icon,
      items: nodeRecord.node.children || [],
    };

    columns.push(column);

    columnCache.set(nodeRecord.id, column);
  }

  path.forEach((nodeId) => {
    const nodeRecord = nodeTable[nodeId];

    if (nodeRecord && nodeRecord.node.children.length > 0) {
      addColumn(nodeRecord);
    }
  });

  return columns;
}

function getPathToNode(nodeTable: NodeTable, nodeId?: string): string[] {
  return getNodeAncestorPath(nodeTable, nodeId).reverse();
}

function getNodeAncestorPath(
  nodeTable: NodeTable,
  nodeId?: string,
  path: string[] = []
): string[] {
  if (!nodeId) {
    return path;
  }

  const nodeRecord = nodeTable[nodeId];

  if (!nodeRecord) {
    return path;
  }

  return getNodeAncestorPath(
    nodeTable,
    nodeRecord.parentId,
    path.concat(nodeId)
  );
}

type NodeRecord = {
  id: string;
  node: ColumnViewNode;
  parentId?: string;
  children: string[];
};

type NodeTable = {
  [id: string]: NodeRecord;
};

function generateNodeTable(rootNode: ColumnViewNode): NodeTable {
  const nodesById: { [id: string]: NodeRecord } = {};

  function addNode(node: ColumnViewNode, parentId?: string) {
    const nodeRecord: NodeRecord = {
      id: node.id,
      node,
      parentId,
      children: [],
    };

    nodesById[node.id] = nodeRecord;

    if (node.children) {
      node.children.forEach((child) => {
        addNode(child, node.id);
      });

      nodeRecord.children = node.children.map((child) => child.id);
    }
  }

  addNode(rootNode);

  return nodesById;
}

function getHighlightedSibling(
  state: ColumnViewState,
  nodeTable: NodeTable,
  direction: -1 | 1
): string | undefined {
  const { highlightedNodeId } = state;

  if (!highlightedNodeId) {
    return;
  }

  const highlightedNode = nodeTable[highlightedNodeId];

  if (!highlightedNode || !highlightedNode.parentId) {
    return;
  }

  const parentNode = nodeTable[highlightedNode.parentId];

  if (!parentNode) {
    return;
  }

  const highlightedIndex = parentNode.children.indexOf(highlightedNodeId);
  const nextIndex = highlightedIndex + direction;

  if (parentNode.children.length <= nextIndex || nextIndex < 0) {
    return;
  }

  const nextNodeId = parentNode.children[nextIndex];

  return nextNodeId;
}
