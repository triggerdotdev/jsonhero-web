import { LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import { getUriPreview } from "~/services/uriPreview.server";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.url, "expected params.url");

  const decoded = decodeURIComponent(params.url);

  const result = await getUriPreview(decoded);

  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
