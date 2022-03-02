import { json, LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import { PreviewImage } from "~/components/Preview/Types/preview.types";

const imageContentTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.url, "expected params.url");

  const decoded = decodeURIComponent(params.url);

  const requestUrl = new URL(request.url);

  if (requestUrl.searchParams.get("contentType") === "application/json") {
    const response = await fetch(decoded);

    if (!response.ok) {
      return json({ error: "No preview available for this URL" });
    }

    return response.json();
  }

  const head = await headUri(decoded);

  if (head && imageContentTypes.includes(head.contentType)) {
    const json = createPreviewImage(decoded, head);

    return new Response(JSON.stringify(json), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  if (!PEEKALINK_API_KEY) {
    return json({ error: "No preview available for this URL" });
  }

  const response = await fetch("https://api.peekalink.io/", {
    method: "POST",
    headers: {
      "X-API-Key": PEEKALINK_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({ link: decoded }),
  });

  if (response.status === 200) {
    const json = await response.json();
    return new Response(JSON.stringify(json), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  return json({ error: "No preview available for this URL" });
};

type HeadInfo = {
  contentType: string;
  contentLength: number;
  lastModified: string;
};

async function headUri(uri: string): Promise<HeadInfo | undefined> {
  const response = await fetch(uri, {
    method: "HEAD",
  });

  if (!response.ok) {
    return;
  }

  return {
    contentType: response.headers.get("content-type") || "",
    contentLength: Number(response.headers.get("content-length") || "0"),
    lastModified: response.headers.get("last-modified") || "",
  };
}

function createPreviewImage(uri: string, head: HeadInfo): PreviewImage {
  return {
    url: uri,
    contentType: "image",
    mimeType: head.contentType,
    size: head.contentLength,
  };
}
