import {
  createFromRawJson,
  CreateJsonOptions,
  JSONDocument,
} from "~/jsonDoc.server";
import convertFromRawXml from "./convertFromRawXml";

export default async function createFromRawXml(
  documents: KVNamespace,
  filename: string,
  contents: string,
  options?: CreateJsonOptions
): Promise<JSONDocument> {
  const jsonString: string = convertFromRawXml(contents);
  return createFromRawJson(documents, filename, jsonString, options);
}
