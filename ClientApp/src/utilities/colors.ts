import { inferType } from "@jsonhero/json-infer-types";
import { JSONHeroPath } from "@jsonhero/path";

export function colorForTypeName(typeName: string): string {
  switch (typeName) {
    case "object": {
      return "text-emerald-500";
    }
    case "array": {
      return "text-cyan-500";
    }
    case "null": {
      return "text-stone-400";
    }
    case "bool": {
      return "text-rose-500";
    }
    case "int":
    case "float": {
      return "text-amber-500";
    }
    case "string": {
      return "text-indigo-500";
    }
    default: {
      return "";
    }
  }
}

export function colorForItemAtPath(path: string, json: unknown): string {
  const heroPath = new JSONHeroPath(path);
  const value = heroPath.first(json);
  const item = inferType(value);

  return colorForTypeName(item.name);
}
