import { LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import { getUriPreview } from "~/services/uriPreview.server";

export const loader: LoaderFunction = async ({ params }) => {
  try {
    invariant(params.url, "expected params.url");

    const decoded = decodeURIComponent(params.url);

    const earlyReturn = earlyRespondIfHomepagePreviewUri(decoded);

    if (earlyReturn) {
      return new Response(JSON.stringify(earlyReturn), {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    const result = await getUriPreview(decoded);

    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Unable to preview this URL" }),
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  }
};

// Hard-coded preview fixtures for homepage demo — uses local assets to avoid blocked CDNs in China
function earlyRespondIfHomepagePreviewUri(uri: string) {
  if (uri === "https://www.theonion.com/") {
    return {
      url: "https://www.theonion.com/",
      domain: "theonion.com",
      lastUpdated: "2022-08-09T08:04:27.002858Z",
      nextUpdate: "2022-08-10T08:04:24.888459Z",
      contentType: "html",
      mimeType: "text/html",
      size: 67994,
      redirected: false,
      title: "The Onion | America's Finest News Source.",
      description:
        "The Onion brings you all of the latest news, stories, photos, videos and more from America's finest news source. ",
      name: "THEONION.COM",
      trackersDetected: false,
      icon: {
        url: "/preview-fixtures/theonion-icon.jpg",
        width: 200,
        height: 200,
      },
      image: {
        url: "/preview-fixtures/theonion-preview.jpg",
        width: 200,
        height: 200,
      },
    };
  }

  if (uri === "https://www.youtube.com/watch?v=dQw4w9WgXcQ") {
    return {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      domain: "youtube.com",
      lastUpdated: "2022-08-09T08:04:28.028029Z",
      nextUpdate: "2022-08-10T08:04:27.764732Z",
      contentType: "html",
      mimeType: "text/html",
      size: 499047,
      redirected: true,
      redirectionUrl: "https://www.youtube.com/watch?ucbcb=1&v=dQw4w9WgXcQ",
      redirectionCount: 2,
      redirectionTrail: [
        "https://consent.youtube.com/m?continue=https://www.youtube.com/watch?v=dQw4w9WgXcQ&gl=NL&hl=nl&m=0&pc=yt&src=1&uxe=23983172",
        "https://www.youtube.com/watch?ucbcb=1&v=dQw4w9WgXcQ",
      ],
      title: "Rick Astley - Never Gonna Give You Up (Video)",
      description:
        "Rick Astley's official music video for “Never Gonna Give You Up” \nListen to..",
      name: "RickAstleyVEVO",
      trackersDetected: true,
      icon: {
        url: "/preview-fixtures/youtube-icon.jpg",
        width: 48,
        height: 48,
      },
      image: {
        url: "/preview-fixtures/youtube-preview.jpg",
        width: 480,
        height: 360,
      },
      details: {
        type: "youtube",
        videoId: "dQw4w9WgXcQ",
        duration: "213.0",
        viewCount: 915578000,
        likeCount: 9182302,
        dislikeCount: 272157,
        commentCount: 1519506,
        publishedAt: "2009-10-25T06:57:33Z",
      },
    };
  }
}
