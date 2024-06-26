import { ActionFunction, redirect } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import { sendEvent } from "~/graphJSON.server";
import { createFromRawJson } from "~/jsonDoc.server";

type CreateFromFileError = {
  filename?: boolean;
  rawJson?: boolean;
};

export const action: ActionFunction = async ({
  request,
  context,
}): Promise<Response> => {
  const documents = context.cloudflare.env.DOCUMENTS;
  const formData = await request.formData();
  const filename = formData.get("filename");
  const rawJson = formData.get("rawJson");

  const errors: CreateFromFileError = {};

  if (!filename) errors.filename = true;
  if (!rawJson) errors.rawJson = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof filename === "string", "filename must be a string");
  invariant(typeof rawJson === "string", "rawJson must be a string");

  const doc = await createFromRawJson(documents, filename, rawJson);

  const url = new URL(request.url);
  context.cloudflare.ctx.waitUntil(
    sendEvent({
      type: "create",
      from: "file",
      id: doc.id,
      source: url.searchParams.get("utm_source") ?? url.hostname,
    })
  );

  return redirect(`/j/${doc.id}`);
};
