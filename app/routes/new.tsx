import { LoaderFunction, redirect } from "remix";
import invariant from "tiny-invariant";
import { sendEvent } from "~/graphJSON.server";
import { createFromUrl } from "~/jsonDoc.server";

export let loader: LoaderFunction = async ({ request, context }) => {
  const url = new URL(request.url);
  const jsonUrl = url.searchParams.get("url");

  if (!jsonUrl) {
    return redirect("/");
  }

  const jsonURL = new URL(jsonUrl);

  invariant(jsonURL, "url must be a valid URL");

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
