import { JSONHeroPath } from "@jsonhero/path";

export function isNullable(relatedPaths: string[], json: unknown): boolean {
  return relatedPaths.some((path) => {
    const heroPath = new JSONHeroPath(path);

    const value = heroPath.first(json);

    return value == null;
  });
}
