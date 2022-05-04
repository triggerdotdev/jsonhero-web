import { json, LoaderFunction, redirect } from "remix";
import invariant from "tiny-invariant";
import { sendEvent } from "~/graphJSON.server";
import {
  createFromRawJson,
  createFromUrl,
  CreateJsonOptions,
} from "~/jsonDoc.server";

export let loader: LoaderFunction = async ({ request, context }) => {
  const url = new URL(request.url);
  const jsonUrl = url.searchParams.get("url");
  const base64EncodedJson = url.searchParams.get("j");
  const ttl = url.searchParams.get("ttl");
  const readOnly = url.searchParams.get("readonly");
  const title = url.searchParams.get("title");
  const injest = url.searchParams.get("injest");

  if (!jsonUrl && !base64EncodedJson) {
    return redirect("/");
  }

  const options: CreateJsonOptions = {};

  if (typeof ttl === "string") {
    invariant(ttl.match(/^\d+$/), "ttl must be a number");

    options.ttl = parseInt(ttl, 10);

    invariant(options.ttl >= 60, "ttl must be at least 60 seconds");
  }

  if (typeof readOnly === "string") {
    options.readOnly = readOnly === "true";
  }

  if (typeof injest === "string") {
    options.injest = injest === "true";
  }

  if (jsonUrl) {
    const jsonURL = new URL(jsonUrl);

    invariant(jsonURL, "url must be a valid URL");

    const doc = await createFromUrl(jsonURL, title ?? jsonURL.href, options);

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
    const doc = await createFromRawJson(
      title ?? "Untitled",
      atob(base64EncodedJson),
      options
    );

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
