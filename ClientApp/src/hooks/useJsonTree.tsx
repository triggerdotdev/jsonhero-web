import { useJson } from "./useJson";
import { inferType, JSONValueType } from "@jsonhero/json-infer-types";
import { JSONHeroPath } from "@jsonhero/path";
import { IconComponent } from "~/useColumnView";
import { formatValue } from "~/utilities/formatter";
import { iconForType } from "~/utilities/icons";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react";
import { useVirtualTree, UseVirtualTreeInstance } from "./useVirtualTree";
import invariant from "tiny-invariant";
import { useJsonDoc } from "./useJsonDoc";

const initialRect = { width: 800, height: 600 };

export type JsonTreeOptions = {
  overscan?: number;
};

export type UseJsonTreeInstance = {
  tree: UseVirtualTreeInstance<JsonTreeViewNode>;
  parentRef: React.RefObject<HTMLDivElement>;
};

export type JsonTreeViewType = UseJsonTreeInstance;

const JsonTreeViewContext = createContext<JsonTreeViewType>(
  {} as JsonTreeViewType
);

export function JsonTreeViewProvider({
  children,
  ...options
}: { children: ReactNode } & JsonTreeOptions) {
  const instance = useJsonTree(options);

  return (
    <JsonTreeViewContext.Provider value={instance}>
      {children}
    </JsonTreeViewContext.Provider>
  );
}

export function useJsonTree(options: JsonTreeOptions): UseJsonTreeInstance {
  const parentRef = useRef<HTMLDivElement>(null);

  const { doc } = useJsonDoc();
  const [json] = useJson();
  const jsonNodes = useMemo(() => {
    return generateTreeViewNodes(json);
  }, [json]);

  const tree = useVirtualTree({
    id: doc.id,
    nodes: jsonNodes,
    parentRef,
    estimateSize: useCallback((index) => 32, []),
    initialRect,
    overscan: options.overscan,
    persistState: true,
  });

  return { tree, parentRef };
}

export function useJsonTreeViewContext(): JsonTreeViewType {
  const context = useContext(JsonTreeViewContext);

  invariant(
    context,
    "useJsonTreeViewContext must be used within a JsonTreeViewContext.Provider"
  );

  return context;
}

export type JsonTreeViewNode = {
  id: string;
  name: string;
  title: string;
  subtitle?: string;
  longTitle?: string;
  icon?: IconComponent;
  children?: Array<JsonTreeViewNode>;
};

export function generateTreeViewNodes(json: unknown): Array<JsonTreeViewNode> {
  const info = inferType(json);
  const path = new JSONHeroPath("$");

  return generateChildren(info, path) ?? [];
}

function generateChildren(
  info: JSONValueType,
  path: JSONHeroPath
): Array<JsonTreeViewNode> | undefined {
  if (info.name === "array") {
    return info.value.map((item, index) => {
      const itemInfo = inferType(item);
      const itemPath = path.child(index.toString());

      return {
        id: itemPath.toString(),
        name: index.toString(),
        title: index.toString(),
        longTitle: `Index ${index.toString()}`,
        subtitle: formatValue(itemInfo),
        icon: iconForType(itemInfo),
        children: generateChildren(itemInfo, itemPath),
      };
    });
  }

  if (info.name === "object") {
    return Object.entries(info.value).map(([key, value]) => {
      const cleanKey = key.replace(/\./g, "\\.");
      const itemInfo = inferType(value);
      const itemPath = path.child(cleanKey);
      return {
        id: itemPath.toString(),
        name: key,
        title: key,
        subtitle: formatValue(itemInfo),
        icon: iconForType(itemInfo),
        children: generateChildren(itemInfo, itemPath),
      };
    });
  }
}
