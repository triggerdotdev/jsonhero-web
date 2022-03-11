import { useJson } from "./useJson";
import { useJsonColumnViewState } from "./useJsonColumnView";
import { inferType, JSONValueType } from "@jsonhero/json-infer-types";
import { JSONHeroPath } from "@jsonhero/path";
import { IconComponent } from "~/useColumnView";
import { formatValue } from "~/utilities/formatter";
import { iconForType } from "~/utilities/jsonColumnView";
import { useCallback, useEffect, useMemo } from "react";
import { useVirtualTree, UseVirtualTreeInstance } from "./useVirtualTree";

const initialRect = { width: 800, height: 600 };

export type JsonTreeOptions = {
  parentRef: React.RefObject<HTMLElement>;
  overscan?: number;
};

export type UseJsonTreeInstance = {
  tree: UseVirtualTreeInstance<JsonTreeViewNode>;
};

export function useJsonTree(options: JsonTreeOptions): UseJsonTreeInstance {
  const [json] = useJson();
  const jsonNodes = useMemo(() => {
    return generateTreeViewNodes(json);
  }, [json]);

  const tree = useVirtualTree({
    nodes: jsonNodes,
    parentRef: options.parentRef,
    estimateSize: useCallback((index) => 32, []),
    initialRect,
    overscan: options.overscan,
  });

  return { tree };
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
      const itemInfo = inferType(value);
      const itemPath = path.child(key);
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
