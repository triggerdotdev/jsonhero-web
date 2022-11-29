import { customRandom } from "nanoid";
import safeFetch from "./utilities/safeFetch";
import createFromRawXml from "./utilities/xml/createFromRawXml";
import isXML from "./utilities/xml/isXML";

type BaseJsonDocument = {
  id: string;
  title: string;
  readOnly: boolean;
};

export type RawJsonDocument = BaseJsonDocument & {
  type: "raw";
  contents: string;
};

export type UrlJsonDocument = BaseJsonDocument & {
  type: "url";
  url: string;
};

export type CreateJsonOptions = {
  ttl?: number;
  readOnly?: boolean;
  injest?: boolean;
  metadata?: any;
};

export type JSONDocument = RawJsonDocument | UrlJsonDocument;

export async function createFromUrlOrRawJson(
  urlOrJson: string,
  title?: string
): Promise<JSONDocument | undefined> {
  if (isUrl(urlOrJson)) {
    return createFromUrl(new URL(urlOrJson), title);
  }

  if (isJSON(urlOrJson)) {
    return createFromRawJson("Untitled", urlOrJson);
  }

  // Wrapper for createFromRawJson to handle XML
  // TODO ? change from urlOrJson to urlOrJsonOrXml
  if (isXML(urlOrJson)) {
    return createFromRawXml("Untitled", urlOrJson);
  }
}

export async function createFromUrl(
  url: URL,
  title?: string,
  options?: CreateJsonOptions
): Promise<JSONDocument> {
  if (options?.injest) {
    const response = await safeFetch(url.href);

    if (!response.ok) {
      throw new Error(`Failed to injest ${url.href}`);
    }

    return createFromRawJson(title || url.href, await response.text(), options);
  }

  const docId = createId();

  const doc: JSONDocument = {
    id: docId,
    type: <const>"url",
    url: url.href,
    title: title ?? url.hostname,
    readOnly: options?.readOnly ?? false,
  };

  await DOCUMENTS.put(docId, JSON.stringify(doc), {
    expirationTtl: options?.ttl ?? undefined,
    metadata: options?.metadata ?? undefined,
  });

  return doc;
}

export async function createFromRawJson(
  filename: string,
  contents: string,
  options?: CreateJsonOptions
): Promise<JSONDocument> {
  const docId = createId();
  const doc: JSONDocument = {
    id: docId,
    type: <const>"raw",
    contents,
    title: filename,
    readOnly: options?.readOnly ?? false,
  };

  JSON.parse(contents);
  await DOCUMENTS.put(docId, JSON.stringify(doc), {
    expirationTtl: options?.ttl ?? undefined,
    metadata: options?.metadata ?? undefined,
  });

  return doc;
}

export async function getDocument(
  slug: string
): Promise<JSONDocument | undefined> {
  const doc = await DOCUMENTS.get(slug);

  if (!doc) return;

  return JSON.parse(doc);
}

export async function updateDocument(
  slug: string,
  title: string
): Promise<JSONDocument | undefined> {
  const document = await getDocument(slug);

  if (!document) return;

  const updated = { ...document, title };

  await DOCUMENTS.put(slug, JSON.stringify(updated));

  return updated;
}

export async function deleteDocument(slug: string): Promise<void> {
  await DOCUMENTS.delete(slug);
}

function createId(): string {
  const nanoid = customRandom(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    12,
    (bytes: number): Uint8Array => {
      const array = new Uint8Array(bytes);
      crypto.getRandomValues(array);
      return array;
    }
  );
  return nanoid();
}

function isUrl(possibleUrl: string): boolean {
  try {
    new URL(possibleUrl);
    return true;
  } catch {
    return false;
  }
}

function isJSON(possibleJson: string): boolean {
  try {
    JSON.parse(possibleJson);
    return true;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
