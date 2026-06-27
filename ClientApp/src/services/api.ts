import { JSONDocument } from "~/types/jsonDoc";

export async function getDocument(id: string): Promise<JSONDocument> {
  const response = await fetch(`/api/documents/${id}`);
  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return normalizeDocument(await response.json());
}

export async function createDocument(input: {
  json?: string;
  url?: string;
  title?: string;
  readOnly?: boolean;
}): Promise<JSONDocument> {
  const response = await fetch("/api/create.json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return normalizeDocument(await response.json());
}

export async function updateDocumentTitle(id: string, title: string) {
  const response = await fetch(`/api/documents/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return normalizeDocument(await response.json());
}

export async function deleteDocument(id: string) {
  const response = await fetch(`/api/documents/${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }
}

export async function getPreview<T>(url: string): Promise<T> {
  const response = await fetch(`/api/preview?url=${encodeURIComponent(url)}`);

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }

  return response.json();
}

export async function setTheme(theme: "dark" | "light") {
  const response = await fetch("/api/theme", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ theme }),
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }
}

export async function getStarCount(): Promise<number | undefined> {
  const response = await fetch("/api/github-stars");
  if (!response.ok) {
    return undefined;
  }

  const data = await response.json();
  return typeof data === "number" ? data : data.starCount;
}

export class ApiError extends Error {
  constructor(readonly status: number, message: string) {
    super(message || `Request failed with status ${status}`);
  }
}

function normalizeDocument(raw: any): JSONDocument {
  const type = String(raw.type ?? raw.Type ?? "raw").toLowerCase();

  return {
    id: raw.id ?? raw.Id,
    title: raw.title ?? raw.Title ?? "Untitled",
    type,
    url: raw.url ?? raw.Url,
    contents: raw.contents ?? raw.Contents ?? "",
    readOnly: raw.readOnly ?? raw.ReadOnly ?? false,
    ttl: raw.ttl ?? raw.Ttl,
    createdAt: raw.createdAt ?? raw.CreatedAt,
    updatedAt: raw.updatedAt ?? raw.UpdatedAt,
    jsonUrl: raw.jsonUrl ?? raw.JsonUrl,
  } as JSONDocument;
}
