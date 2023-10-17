export function stableJson(json: unknown, keyOrder: string[] = []): unknown {
  if (
    Array.isArray(json) &&
    json.length > 0 &&
    json.every((c) => typeof c === "object" && c !== null)
  ) {
    const keyOrder = Object.keys(json[0]);
    return json.map((c) => stableJson(c, keyOrder));
  }

  if (Array.isArray(json)) {
    return json.map((c) => stableJson(c));
  }

  if (typeof json === "object" && json !== null && keyOrder.length > 0) {
    const keys = Object.keys(json);
    const sortedKeys = keys.sort((a, b) => {
      const aIndex = keyOrder.indexOf(a);
      const bIndex = keyOrder.indexOf(b);

      if (aIndex === -1 || bIndex === -1) {
        return 0;
      }

      return aIndex - bIndex;
    });
    const result = {} as Record<string, unknown>;
    for (const key of sortedKeys) {
      result[key] = stableJson((json as Record<string, unknown>)[key]);
    }
    return result;
  }

  if (typeof json === "object" && json !== null) {
    const result = {} as Record<string, unknown>;
    for (const key of Object.keys(json)) {
      result[key] = stableJson((json as Record<string, unknown>)[key]);
    }
    return result;
  }

  return json;
}
