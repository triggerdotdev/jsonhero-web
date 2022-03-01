import { json, LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import { getDocument } from "~/jsonDoc.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.id, "expected params.id");

  const doc = await getDocument(params.id);

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
