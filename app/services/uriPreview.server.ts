import {
  PreviewImage,
  PreviewJson,
  PreviewResult,
} from "~/components/Preview/Types/preview.types";
import safeFetch from "~/utilities/safeFetch";

const imageContentTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

async function getPeekalink(link: string): Promise<PreviewResult> {
  if (typeof PEEKALINK_API_KEY === "undefined") {
    return { error: "Preview unavailable" };
  }

  const response = await fetch("https://api.peekalink.io/", {
    method: "POST",
    headers: {
      "X-API-Key": PEEKALINK_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({ link }),
  });

  if (response.ok) {
    const result = await response.json();

    return result;
  } else {
    return { error: "No preview available for this URL" };
  }
}

export async function getUriPreview(uri: string): Promise<PreviewResult> {
  const head = await headUri(uri);

  // If the url is an image content type, return a preview image
  if (
    head &&
    imageContentTypes.some((contentType) =>
      contentType.includes(head.contentType)
    )
  ) {
    const previewImage = createPreviewImage(uri, head);

    return previewImage;
  }

  // If the url is a json content type, attempt to request the json and return a preview json
  if (head?.contentType.includes("application/json")) {
    const response = await safeFetch(uri, {
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      return { error: "No preview available for this URL" };
    }

    const jsonBody = await response.json();

    return createPreviewJson(uri, jsonBody);
  }

  const peekalinkResult = await getPeekalink(uri);

  return peekalinkResult;
}

type HeadInfo = {
  contentType: string;
  contentLength: number;
  lastModified: string;
};

async function headUri(
  uri: string,
  redirectCount = 0
): Promise<HeadInfo | undefined> {
  const response = await fetch(uri, {
    method: "HEAD",
    headers: {
      accept: "*/*",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
    },
  });

  if (!response.ok) {
    // If this is a 405 Method Not Allowed, do a GET request instead and if that is a redirect, return the head of the redirect url
    if (response.status === 405 && redirectCount < 5) {
      console.log(
        `${uri} is a 405 Method Not Allowed, trying to do a GET instead`
      );
      // Do a GET request that does not follow redirects
      const noFollowResponse = await fetch(uri, {
        method: "GET",
        redirect: "manual",
        headers: {
          accept: "*/*",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
        },
      });

      if (noFollowResponse.status === 301 || noFollowResponse.status === 302) {
        // Get the url from the response Location header
        const location = noFollowResponse.headers.get("location");

        if (location) {
          return headUri(location, redirectCount + 1);
        }
      }
    }

    console.log(
      `Could not perform head request for ${uri}: ${response.status} [${response.statusText}]`
    );

    return;
  }

  return {
    contentType: response.headers.get("content-type") || "",
    contentLength: Number(response.headers.get("content-length") || "0"),
    lastModified: response.headers.get("last-modified") || "",
  };
}

function createPreviewJson(uri: string, json: unknown): PreviewJson {
  return {
    url: uri,
    contentType: "json",
    json,
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
