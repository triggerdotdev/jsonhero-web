import { redirect } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import { createFromUrl, createFromUrlOrRawJson } from "~/jsonDoc.server";
import { sendEvent } from "~/graphJSON.server";

type CreateFromUrlError = {
  jsonUrl?: boolean;
};

export let action: ActionFunction = async ({ request, context }) => {
  const formData = await request.formData();

  const jsonUrl = formData.get("jsonUrl");
  const title = formData.get("title") as string;

  const errors: CreateFromUrlError = {};
  if (!jsonUrl) errors.jsonUrl = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof jsonUrl === "string", "jsonUrl must be a string");

  const doc = await createFromUrlOrRawJson(jsonUrl, title);

  if (!doc) {
    return redirect("/");
  }

  const requestUrl = new URL(request.url);

  context.waitUntil(
    sendEvent({
      type: "create",
      from: "urlOrJson",
      id: doc.id,
      source: requestUrl.searchParams.get("utm_source") ?? requestUrl.hostname,
    })
  );

  return redirect(`/j/${doc.id}`);
};

export let loader: LoaderFunction = async ({ request, context }) => {
  const url = new URL(request.url);
  const jsonUrl = url.searchParams.get("jsonUrl");

  if (!jsonUrl) {
    return redirect("/");
  }

  const jsonURL = new URL(jsonUrl);

  invariant(jsonURL, "jsonUrl must be a valid URL");

  const doc = await createFromUrl(jsonURL, jsonURL.href);

  context.waitUntil(
    sendEvent({
      type: "create",
      from: "url",
      hostname: jsonURL.hostname,
      id: doc.id,
      source: url.searchParams.get("utm_source") ?? url.hostname,
    })
  );

  return redirect(`/j/${doc.id}`);
};
