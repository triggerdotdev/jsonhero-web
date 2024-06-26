import { json, LoaderFunction } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import { getDocument } from "~/jsonDoc.server";

export const loader: LoaderFunction = async ({ context, params, request }) => {
  invariant(params.id, "expected params.id");
  const documents = context.cloudflare.env.DOCUMENTS;

  const doc = await getDocument(documents, params.id);

  if (!doc) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  if (doc.type == "url") {
    const jsonResponse = await fetch(doc.url);
    return jsonResponse.json();
  } else {
    return json(JSON.parse(doc.contents));
  }
};
