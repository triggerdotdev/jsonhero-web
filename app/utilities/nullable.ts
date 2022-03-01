import { JSONHeroPath } from "@jsonhero/path";
import { getRelatedPathsAtPath } from "./relatedValues";

export function isNullable(path: string, json: unknown): boolean {
  const relatedPaths = getRelatedPathsAtPath(path, json);

  return relatedPaths.some((path) => {
    const heroPath = new JSONHeroPath(path);

    const value = heroPath.first(json);

    return value == null;
  });
}
