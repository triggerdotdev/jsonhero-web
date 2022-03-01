import { ActionFunction, json } from "remix";
import invariant from "tiny-invariant";
import { sendEvent } from "~/graphJSON.server";
import { createFromRawJson } from "~/jsonDoc.server";

export const action: ActionFunction = async ({ request, context }) => {
  const url = new URL(request.url);

  const { title, content } = await request.json();

  if (!title || !content) {
    return json({ message: "Missing title or content" }, 400);
  }

  invariant(typeof title === "string", "title must be a string");
  invariant(content !== null, "content cannot be null");

  const source = url.searchParams.get("utm_source");

  const doc = await createFromRawJson(title, JSON.stringify(content));
  url.pathname = `/j/${doc.id}`;

  url.searchParams.delete("utm_source");

  context.waitUntil(
    sendEvent({
      type: "create",
      from: "url",
      hostname: url.hostname,
      id: doc.id,
      source,
    })
  );

  return json({ id: doc.id, title, location: url.toString() });
};
