import { inferType, JSONValueType } from "@jsonhero/json-infer-types";
import { JSONHeroPath } from "@jsonhero/path";
import { IconComponent } from "~/useColumnView";
import { formatValue } from "./formatter";
import { iconForType } from "./jsonColumnView";

export type TreeViewNode = {
  id: string;
  name: string;
  title: string;
  subtitle?: string;
  longTitle?: string;
  icon?: IconComponent;
  collapsable: boolean;
};

export function generateTreeViewNodes(json: unknown): Array<TreeViewNode> {
  const info = inferType(json);
  const path = new JSONHeroPath("$");

  const rootNode = {
    name: "root",
    title: "root",
    id: "$",
    icon: iconForType(info),
    collapsable: info.name === "object" || info.name === "array",
  };

  return [rootNode, ...generateChildren(info, path)];
}

function generateChildren(
  info: JSONValueType,
  path: JSONHeroPath
): Array<TreeViewNode> {
  if (info.name === "array") {
    return info.value.flatMap((item, index) => {
      const itemInfo = inferType(item);
      const itemPath = path.child(index.toString());
      const itemNode = {
        id: itemPath.toString(),
        name: index.toString(),
        title: index.toString(),
        longTitle: `Index ${index.toString()}`,
        subtitle: formatValue(itemInfo),
        icon: iconForType(itemInfo),
        collapsable: itemInfo.name === "object" || itemInfo.name === "array",
      };

      return [itemNode, ...generateChildren(itemInfo, itemPath)];
    });
  }

  if (info.name === "object") {
    return Object.entries(info.value).flatMap(([key, value]) => {
      const itemInfo = inferType(value);
      const itemPath = path.child(key);
      const itemNode = {
        id: itemPath.toString(),
        name: key,
        title: key,
        subtitle: formatValue(itemInfo),
        icon: iconForType(itemInfo),
        collapsable: itemInfo.name === "object" || itemInfo.name === "array",
      };

      return [itemNode, ...generateChildren(itemInfo, itemPath)];
    });
  }

  return [];
}
