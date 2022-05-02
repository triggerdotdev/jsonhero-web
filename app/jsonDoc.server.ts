import { customRandom } from "nanoid";

type BaseJsonDocument = {
  id: string;
  title: string;
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
}

export async function createFromUrl(
  url: URL,
  title?: string,
  options?: CreateJsonOptions
): Promise<JSONDocument> {
  const docId = createId();
  const doc = {
    id: docId,
    type: <const>"url",
    url: url.href,
    title: title ?? url.hostname,
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
  const doc = { id: docId, type: <const>"raw", contents, title: filename };

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
  } catch {
    return false;
  }
}
