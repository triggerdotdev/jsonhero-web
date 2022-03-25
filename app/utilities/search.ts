import { JSONValueType, inferType } from "@jsonhero/json-infer-types";
import { JSONHeroPath } from "@jsonhero/path";
import Fuse from "fuse.js";
import { formatValue } from "./formatter";

export interface JsonSearchEntry {
  path: string;
  rawValue?: string;
  formattedValue?: string;
}

export function createSearchIndex(
  json: unknown
): [Fuse.FuseIndex<JsonSearchEntry>, Array<JsonSearchEntry>] {
  const entries = createSearchEntries(json);

  const index = Fuse.createIndex<JsonSearchEntry>(
    ["path", "rawValue", "formattedValue"],
    entries
  );

  return [index, entries];
}

export function createSearchEntries(json: unknown): Array<JsonSearchEntry> {
  return createSearchEntryChildren(inferType(json), new JSONHeroPath("$"));
}

function createSearchEntryChildren(
  info: JSONValueType,
  path: JSONHeroPath
): Array<JsonSearchEntry> {
  if (info.name === "array" && info.value) {
    return info.value.flatMap((value, index) => {
      const childPath = path.child(index.toString());
      const childInfo = inferType(value);

      const children = createSearchEntryChildren(childInfo, childPath);

      return [
        {
          path: childPath.toString(),
          rawValue: getRawValue(childInfo),
          formattedValue: formatValue(childInfo, { leafNodesOnly: true }),
        },
        ...children,
      ];
    });
  }

  if (info.name === "object" && info.value) {
    return Object.entries(info.value).flatMap(([key, value]) => {
      const childPath = path.child(key);
      const childInfo = inferType(value);

      const children = createSearchEntryChildren(childInfo, childPath);

      return [
        {
          path: childPath.toString(),
          rawValue: getRawValue(childInfo),
          formattedValue: formatValue(childInfo, { leafNodesOnly: true }),
        },
        ...children,
      ];
    });
  }

  return [];
}

export function getRawValue(type: JSONValueType): string | undefined {
  switch (type.name) {
    case "string":
      return type.value;
    case "int":
      return type.value.toString();
    case "float":
      return type.value.toString();
    case "bool":
      return type.value ? "true" : "false";
    case "null":
      return "null";
  }
}
