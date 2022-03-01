export async function sendEvent(event: Record<string, any>): Promise<void> {
  const payload = {
    api_key: GRAPH_JSON_API_KEY,
    collection: GRAPH_JSON_COLLECTION,
    json: JSON.stringify(event),
    timestamp: Math.floor(new Date().getTime() / 1000),
  };

  await fetch("https://api.graphjson.com/api/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
