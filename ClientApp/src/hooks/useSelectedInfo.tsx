import { inferType, JSONValueType } from "@jsonhero/json-infer-types";
import { JSONHeroPath } from "@jsonhero/path";
import { useMemo } from "react";
import { useJson } from "./useJson";
import { useJsonColumnViewState } from "./useJsonColumnView";

export function useSelectedInfo(): JSONValueType | undefined {
  const { selectedNodeId } = useJsonColumnViewState();

  if (!selectedNodeId) {
    return;
  }

  const [json] = useJson();

  return useMemo(() => {
    const heroPath = new JSONHeroPath(selectedNodeId);
    const selectedJson = heroPath.first(json);
    return inferType(selectedJson);
  }, [json, selectedNodeId]);
}
