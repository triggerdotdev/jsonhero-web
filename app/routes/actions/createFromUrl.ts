import { redirect } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import { createFromUrl } from "~/jsonDoc.server";
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

  const url = new URL(jsonUrl);

  invariant(url, "jsonUrl must be a valid URL");

  const doc = await createFromUrl(url, title ?? url.hostname);

  const requestUrl = new URL(request.url);

  context.waitUntil(
    sendEvent({
      type: "create",
      from: "url",
      hostname: url.hostname,
      id: doc.id,
      source: requestUrl.searchParams.get("utm_source") ?? requestUrl.hostname,
    })
  );

  return redirect(`/j/${doc.id}`);
};

export let loader: LoaderFunction = () => {
  return redirect("/");
};
