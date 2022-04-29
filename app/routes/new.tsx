import { LoaderFunction, redirect } from "remix";
import invariant from "tiny-invariant";
import { sendEvent } from "~/graphJSON.server";
import { createFromRawJson, createFromUrl } from "~/jsonDoc.server";

export let loader: LoaderFunction = async ({ request, context }) => {
  const url = new URL(request.url);
  const jsonUrl = url.searchParams.get("url");
  const base64EncodedJson = url.searchParams.get("j");

  if (!jsonUrl && !base64EncodedJson) {
    return redirect("/");
  }

  if (jsonUrl) {
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
  }

  if (base64EncodedJson) {
    const doc = await createFromRawJson("Untitled", atob(base64EncodedJson));

    context.waitUntil(
      sendEvent({
        type: "create",
        from: "base64",
        id: doc.id,
        source: url.searchParams.get("utm_source"),
      })
    );

    return redirect(`/j/${doc.id}`);
  }
};
