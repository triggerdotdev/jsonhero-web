export async function sendEvent(event: Record<string, any>): Promise<void> {
  if (
    typeof GRAPH_JSON_API_KEY === "undefined" ||
    typeof GRAPH_JSON_COLLECTION === "undefined"
  ) {
    return;
  }

  const payload = {
    api_key: GRAPH_JSON_API_KEY,
    collection: GRAPH_JSON_COLLECTION,
    json: JSON.stringify(event),
    timestamp: Math.floor(new Date().getTime() / 1000),
  };

  console.log(
    `[GraphJSON] Sending event: ${JSON.stringify(payload, graphJsonReplacer)}`
  );

  await fetch("https://api.graphjson.com/api/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

function graphJsonReplacer(key: string, value: any): any {
  if (key === "api_key") {
    return undefined;
  }

  return value;
}
