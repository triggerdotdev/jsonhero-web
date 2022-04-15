import {
  LoaderFunction,
  MetaFunction,
  Outlet,
  useLoaderData,
  useLocation,
} from "remix";
import invariant from "tiny-invariant";
import { getDocument, JSONDocument } from "~/jsonDoc.server";
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
import { Title } from "~/components/Primitives/Title";
import { Body } from "~/components/Primitives/Body";

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.id, "expected params.id");

  const doc = await getDocument(params.id);

  if (!doc) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const path = getPathFromRequest(request);

  if (doc.type == "url") {
    console.log(`Fetching ${doc.url}...`);

    const jsonResponse = await safeFetch(doc.url);

    if (!jsonResponse.ok) {
      throw new Response(jsonResponse.statusText, {
        status: jsonResponse.status,
      });
    }

    const json = await jsonResponse.json();

    return {
      doc,
      json,
      path,
    };
  } else {
    return {
      doc,
      json: JSON.parse(doc.contents),
      path,
    };
  }
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

type LoaderData = { doc: JSONDocument; json: unknown; path?: string };

export const meta: MetaFunction = ({
  data,
}: {
  data: LoaderData | undefined;
}) => {
  if (!data) {
    return { title: "JSON Hero" };
  }
  return {
    title: `JSON Hero - ${data.doc.title}`,
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
    >
      <JsonProvider initialJson={loaderData.json}>
        <JsonSchemaProvider>
          <JsonColumnViewProvider>
            <JsonSearchProvider>
              <JsonTreeViewProvider overscan={25}>
                <div>
                  <div className="block sm:hidden fixed bg-black/80 h-screen w-screen z-50 text-white">
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <Title>JSON Hero only works on desktop.</Title>
                      <Title>👇</Title>
                      <Body>(For now!)</Body>
                      <a
                        href="/"
                        className="mt-8 text-white bg-lime-500 rounded-sm px-4 py-2"
                      >
                        Back to Home
                      </a>
                    </div>
                  </div>
                  <div className="h-screen flex flex-col">
                    <Header />
                    <div className="bg-slate-50 flex-grow transition dark:bg-slate-900">
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
