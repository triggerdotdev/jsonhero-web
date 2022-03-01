import { ActionFunction, json } from "remix";
import invariant from "tiny-invariant";
import { sendEvent } from "~/graphJSON.server";
import { updateDocument } from "~/jsonDoc.server";

export const action: ActionFunction = async ({ params, request, context }) => {
  invariant(params.id, "expected params.id");

  const title = (await request.formData()).get("title");

  invariant(typeof title === "string", "expected title");

  try {
    const document = await updateDocument(params.id, title);

    if (!document) return json({ error: "No document with that slug" });

    context.waitUntil(
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
