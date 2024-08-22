import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  Outlet,
  redirect, ThrownResponse, useCatch,
  useLoaderData,
  useLocation,
  useParams,
} from "remix";
import invariant from "tiny-invariant";
import { deleteDocument, getDocument, JSONDocument } from "~/jsonDoc.server";
import { JsonDocProvider } from "~/hooks/useJsonDoc";
import { useEffect } from "react";
import { JsonProvider } from "~/hooks/useJson";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { InfoPanel } from "~/components/InfoPanel";
import Resizable from "~/components/Resizable";
import { SideBar } from "~/components/SideBar";
import { JsonColumnViewProvider } from "~/hooks/useJsonColumnView";
import { JsonSchemaProvider } from "~/hooks/useJsonSchema";
import { JsonView } from "~/components/JsonView";
import safeFetch from "~/utilities/safeFetch";
import { JsonTreeViewProvider } from "~/hooks/useJsonTree";
import { JsonSearchProvider } from "~/hooks/useJsonSearch";
import { LargeTitle } from "~/components/Primitives/LargeTitle";
import { ExtraLargeTitle } from "~/components/Primitives/ExtraLargeTitle";
import { Body } from "~/components/Primitives/Body";
import { PageNotFoundTitle } from "~/components/Primitives/PageNotFoundTitle";
import { SmallSubtitle } from "~/components/Primitives/SmallSubtitle";
import { Logo } from "~/components/Icons/Logo";
import {
  commitSession,
  getSession,
  setErrorMessage,
  setSuccessMessage,
} from "~/services/toast.server";
import { getRandomUserAgent } from '~/utilities/getRandomUserAgent'

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.id, "expected params.id");

  const doc = await getDocument(params.id);

  if (!doc) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const path = getPathFromRequest(request);
  const minimal = getMinimalFromRequest(request);

  if (doc.type == "url") {
    console.log(`Fetching ${doc.url}...`);

    const jsonResponse = await safeFetch(doc.url, {
      headers: {
        "User-Agent": getRandomUserAgent(),
      },
    });

    if (!jsonResponse.ok) {
      const jsonResponseText = await jsonResponse.text();
      const error = `Failed to fetch ${doc.url}. HTTP status: ${jsonResponse.status} (${jsonResponseText}})`;
      console.error(error);

      throw new Response(error, {
        status: jsonResponse.status,
      });
    }

    const json = await jsonResponse.json();

    return {
      doc,
      json,
      path,
      minimal,
    };
  } else {
    return {
      doc,
      json: JSON.parse(doc.contents),
      path,
      minimal,
    };
  }
};

export const action: ActionFunction = async ({ request, params }) => {
  // Return if the request is not a DELETE
  if (request.method !== "DELETE") {
    return;
  }

  invariant(params.id, "expected params.id");

  const toastCookie = await getSession(request.headers.get("cookie"));

  const document = await getDocument(params.id);

  if (!document) {
    setErrorMessage(toastCookie, "Document not found", "Error");

    return redirect(`/`);
  }

  if (document.readOnly) {
    setErrorMessage(toastCookie, "Document is read-only", "Error");

    return redirect(`/j/${params.id}`);
  }

  await deleteDocument(params.id);

  setSuccessMessage(toastCookie, "Document deleted successfully", "Success");

  return redirect("/", {
    headers: { "Set-Cookie": await commitSession(toastCookie) },
  });
};

function getPathFromRequest(request: Request): string | null {
  const url = new URL(request.url);

  const path = url.searchParams.get("path");

  if (!path) {
    return null;
  }

  if (path.startsWith("$.")) {
    return path;
  }

  return `$.${path}`;
}

function getMinimalFromRequest(request: Request): boolean | undefined {
  const url = new URL(request.url);

  const minimal = url.searchParams.get("minimal");

  if (!minimal) {
    return;
  }

  return minimal === "true";
}

type LoaderData = {
  doc: JSONDocument;
  json: unknown;
  path?: string;
  minimal?: boolean;
};

export const meta: MetaFunction = ({
  data,
}: {
  data: LoaderData | undefined;
}) => {
  let title = "JSON Hero";

  if (data?.doc?.title) {
    title += ` - ${data.doc.title}`;
  }

  return {
    title,
    "og:title": title,
    robots: "noindex,nofollow",
  };
};

export default function JsonDocumentRoute() {
  const loaderData = useLoaderData<LoaderData>();

  // Redirect back to `/j/${slug}` if the path is set, that way refreshing the page doesn't go to the path in the url.
  const location = useLocation();

  useEffect(() => {
    if (loaderData.path) {
      window.history.replaceState({}, "", location.pathname);
    }
  }, [loaderData.path]);

  return (
    <JsonDocProvider
      doc={loaderData.doc}
      path={loaderData.path}
      key={loaderData.doc.id}
      minimal={loaderData.minimal}
    >
      <JsonProvider initialJson={loaderData.json}>
        <JsonSchemaProvider>
          <JsonColumnViewProvider>
            <JsonSearchProvider>
              <JsonTreeViewProvider overscan={25}>
                <div>
                  <div className="block md:hidden fixed bg-black/80 h-screen w-screen z-50 text-white">
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <LargeTitle>JSON Hero only works on desktop</LargeTitle>
                      <LargeTitle>👇</LargeTitle>
                      <Body>(For now!)</Body>
                      <a
                        href="/"
                        className="mt-8 text-white bg-lime-500 rounded-sm px-4 py-2"
                      >
                        Back to Home
                      </a>
                    </div>
                  </div>
                  <div className="h-screen flex flex-col sm:overflow-hidden">
                    {!loaderData.minimal && <Header />}
                    <div className="bg-slate-50 flex-grow transition dark:bg-slate-900 overflow-y-auto">
                      <div className="main-container flex justify-items-stretch h-full">
                        <SideBar />
                        <JsonView>
                          <Outlet />
                        </JsonView>

                        <Resizable
                          isHorizontal={true}
                          initialSize={500}
                          minimumSize={280}
                          maximumSize={900}
                        >
                          <div className="info-panel flex-grow h-full">
                            <InfoPanel />
                          </div>
                        </Resizable>
                      </div>
                    </div>

                    <Footer></Footer>
                  </div>
                </div>
              </JsonTreeViewProvider>
            </JsonSearchProvider>
          </JsonColumnViewProvider>
        </JsonSchemaProvider>
      </JsonProvider>
    </JsonDocProvider>
  );
}

export function CatchBoundary() {
  const error = useCatch();
  const params = useParams();
  console.log("error", error)

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[rgb(56,52,139)]">
      <div className="w-2/3">
        <div className="text-center text-lime-300">
          <div className="">
            <Logo />
          </div>
          <PageNotFoundTitle className="text-center leading-tight">
            {error.status}
          </PageNotFoundTitle>
        </div>
        <div className="text-center leading-snug text-white">
          <ExtraLargeTitle className="text-slate-200 mb-8">
            <b>Sorry</b>! Something went wrong...
          </ExtraLargeTitle>
          <SmallSubtitle className="text-slate-200 mb-8">
            {error.data || (
              error.status === 404
                ? <>We couldn't find the page <b>'https://jsonhero.io/j/{params.id}'</b></>
                : "Unknown error occurred."
            )}
          </SmallSubtitle>
          <a
            href="/"
            className="mx-auto w-24 bg-lime-500 text-slate-900 text-lg font-bold px-5 py-1 rounded-sm uppercase whitespace-nowrap cursor-pointer opacity-90 hover:opacity-100 transition"
          >
            HOME
          </a>
        </div>
      </div>
    </div>
  );
}
