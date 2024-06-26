import { ActionFunction, json } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import { sendEvent } from "../graphJSON.server";
import { updateDocument } from "../jsonDoc.server";

export const action: ActionFunction = async ({ params, request, context }) => {
  invariant(params.id, "expected params.id");
  const documents = context.cloudflare.env.DOCUMENTS;

  const title = (await request.formData()).get("title");

  invariant(typeof title === "string", "expected title");

  try {
    const document = await updateDocument(documents, params.id, title);

    if (!document) return json({ error: "No document with that slug" });

    context.cloudflare.ctx.waitUntil(
      sendEvent({
        type: "update-doc",
        id: document.id,
        title,
      })
    );

    return json(document);
  } catch (error) {
    if (error instanceof Error) {
      return json({ error: error.message });
    } else {
      return json({ error: "Unknown error" });
    }
  }
};
