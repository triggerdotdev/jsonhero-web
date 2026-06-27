import { inferType } from "@jsonhero/json-infer-types";
import { JSONHeroPath } from "@jsonhero/path";
import { groupBy, sortBy } from "lodash-es";

export type RelatedValuesGroup = {
  value: string;
  paths: Array<string>;
};

export function calculateRelatedValuesGroups(
  path: string,
  json: unknown
): Array<RelatedValuesGroup> {
  const relatedPaths = getRelatedPathsAtPath(path, json);
  return groupRelatedValues(relatedPaths, json);
}

export function groupRelatedValues(
  relatedPaths: Array<string>,
  json: unknown
): Array<RelatedValuesGroup> {
  const groupedByValue = groupBy(relatedPaths, (path) => {
    const heroPath = new JSONHeroPath(path);

    const value = heroPath.first(json);

    if (typeof value === "undefined") {
      return "undefined";
    } else if (value == null) {
      return "null";
    } else if (Array.isArray(value)) {
      return `Array(${value.length})`;
    } else if (typeof value === "object") {
      return "{...}";
    } else {
      return value.toString();
    }
  });

  const unsortedResult = Object.entries(groupedByValue).map(
    ([value, paths]) => {
      return {
        value,
        paths: sortBy(paths),
      };
    }
  );

  return sortBy(unsortedResult, (group) => -group.paths.length);
}

export function getRelatedPathsAtPath(
  path: string,
  json: unknown,
  relatedPaths: Set<string> = new Set<string>()
): Array<string> {
  const initialPath = new JSONHeroPath(path);
  const pathDepth = initialPath.components.length;

  for (let index = 0; index < pathDepth; index++) {
    const pathToComponent = new JSONHeroPath(
      initialPath.components.slice(0, index + 1)
    );

    const value = pathToComponent.first(json);

    if (typeof value === "undefined") {
      continue;
    }

    //optimisation: we only want to call inferType on non-array types
    if (typeof value !== "object" || !Array.isArray(value)) continue;

    const inferredType = inferType(value);

    if (inferredType.name !== "array") continue;

    if (index + 1 === pathDepth) continue;

    for (
      let childIndex = 0;
      childIndex < inferredType.value.length;
      childIndex++
    ) {
      const relatedPath = initialPath.replaceComponent(
        index + 1,
        `${childIndex}`
      );

      if (relatedPaths.has(relatedPath.toString())) continue;

      const parentValue = relatedPath.parent?.first(json);

      if (!parentValue) continue;

      relatedPaths.add(relatedPath.toString());

      getRelatedPathsAtPath(relatedPath.toString(), json, relatedPaths);
    }
  }

  return Array.from(relatedPaths);
}
