export async function sendEvent(event: Record<string, any>): Promise<void> {
  return;
}

function graphJsonReplacer(key: string, value: any): any {
  if (key === "api_key") {
    return undefined;
  }

  return value;
}
