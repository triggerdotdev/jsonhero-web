type BaseJsonDocument = {
  id: string;
  title: string;
  readOnly: boolean;
  ttl?: string | null;
  createdAt?: string;
  updatedAt?: string;
  jsonUrl?: string;
};

export type RawJsonDocument = BaseJsonDocument & {
  type: "raw";
  contents: string;
};

export type UrlJsonDocument = BaseJsonDocument & {
  type: "url";
  url: string;
  contents?: string;
};

export type JSONDocument = RawJsonDocument | UrlJsonDocument;
