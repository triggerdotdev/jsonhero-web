import { useMemo, useRef } from "react";
import { getRelatedPathsAtPath } from "~/utilities/relatedValues";
import { useJson } from "./useJson";
import { useJsonColumnViewState } from "./useJsonColumnView";

export function useRelatedPaths(): string[] {
  const cache = useRef<RelatedPathCache>({});
  const { selectedNodeId } = useJsonColumnViewState();
  const [json] = useJson();

  return useMemo(() => {
    if (!selectedNodeId) return [];

    //check cache
    const cachedPaths = cache.current[selectedNodeId];
    if (cachedPaths) {
      return cachedPaths;
    }

    //fetch result
    let paths = getRelatedPathsAtPath(selectedNodeId, json);

    //cache
    for (let index = 0; index < paths.length; index++) {
      const path = paths[index];
      cache.current[path] = paths;
    }

    return paths;
  }, [selectedNodeId, json]);
}

type RelatedPathCache = {
  [index: string]: Array<string>;
};
