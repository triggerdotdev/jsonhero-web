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

type StringSlice = {
  isMatch: boolean;
  slice: string;
};

// getStringSlices should scope to the largest match
// For example, if the windowSize is 56 and the stringValue is "This is a very long string and the largest matched range is outside of the window, so we should try and get only slices of the string that focus on the largest match"
// and the matches are [[10, 15], [80, 90], [100, 105]]
// then we should return slices:
// [
//   { isMatch: false, slice: "…" }
//   { isMatch: false, slice: "the string," },
//   { isMatch: true, slice: ", we should" },
//   { isMatch: false, slice: "d only retu" },
//   { isMatch: true, slice: "urn sl" },
//   { isMatch: false, slice: "lices that are within" },
//   { isMatch: false, slice: "…" },
//
// If stringValue length is less than the windowSize, then we should return all the string slices of the string
export function getStringSlices(
  stringValue: string,
  matchingIndices: ReadonlyArray<[number, number]>,
  windowSize: number
): Array<StringSlice> {
  const slices: StringSlice[] = [];

  const addSlice = (isMatch: boolean, slice: string) => {
    slices.push({ isMatch, slice });
  };

  const addEllipsis = () => {
    addSlice(false, "…");
  };

  const calculateWindow = (): { start: number; end: number } => {
    if (stringValue.length <= windowSize) {
      return { start: 0, end: stringValue.length };
    }

    const largestMatch = matchingIndices.reduce(
      (largestMatch, match) => {
        if (match[1] - match[0] > largestMatch[1] - largestMatch[0]) {
          return match;
        }

        return largestMatch;
      },
      [0, 0]
    );

    const largestMatchLength = largestMatch[1] - largestMatch[0];

    const start =
      largestMatch[0] - Math.floor(windowSize / 2 - largestMatchLength / 2);
    const end =
      largestMatch[1] + Math.floor(windowSize / 2 - largestMatchLength / 2);

    return {
      start: Math.max(start, 0),
      end: Math.min(end, stringValue.length),
    };
  };

  const window = calculateWindow();

  let currentIndex = window.start;

  if (window.start > 0) {
    addEllipsis();
  }

  for (const [start, end] of matchingIndices) {
    if (start < window.start && end <= window.start) {
      continue;
    } else if (start >= window.end) {
      continue;
    } else if (start < window.start && end > window.start) {
      addSlice(true, stringValue.slice(window.start, end + 1));

      currentIndex = end + 1;
    } else if (start >= window.start && end <= window.end) {
      addSlice(false, stringValue.slice(currentIndex, start));
      addSlice(true, stringValue.slice(start, end + 1));
      currentIndex = end + 1;
    }
  }

  addSlice(false, stringValue.slice(currentIndex, window.end + 1).trimEnd());

  if (window.end < stringValue.length - 1) {
    addEllipsis();
  }

  return slices;
}
