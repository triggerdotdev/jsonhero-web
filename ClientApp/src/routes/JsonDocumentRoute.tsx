import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Body } from "~/components/Primitives/Body";
import { ExtraLargeTitle } from "~/components/Primitives/ExtraLargeTitle";
import { LargeTitle } from "~/components/Primitives/LargeTitle";
import { PageNotFoundTitle } from "~/components/Primitives/PageNotFoundTitle";
import { SmallSubtitle } from "~/components/Primitives/SmallSubtitle";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { Logo } from "~/components/Icons/Logo";
import { InfoPanel } from "~/components/InfoPanel";
import { JsonView } from "~/components/JsonView";
import Resizable from "~/components/Resizable";
import { SideBar } from "~/components/SideBar";
import { JsonProvider } from "~/hooks/useJson";
import { JsonColumnViewProvider } from "~/hooks/useJsonColumnView";
import { JsonDocProvider } from "~/hooks/useJsonDoc";
import { JsonSchemaProvider } from "~/hooks/useJsonSchema";
import { JsonSearchProvider } from "~/hooks/useJsonSearch";
import { JsonTreeViewProvider } from "~/hooks/useJsonTree";
import { ApiError, getDocument } from "~/services/api";
import { JSONDocument } from "~/types/jsonDoc";

type LoaderData = {
  doc: JSONDocument;
  json: unknown;
  path?: string;
  minimal?: boolean;
};

export default function JsonDocumentRoute() {
  const { id } = useParams();
  const location = useLocation();
  const [loaderData, setLoaderData] = useState<LoaderData>();
  const [error, setError] = useState<{ status: number; message: string }>();

  useEffect(() => {
    if (!id) {
      return;
    }

    let cancelled = false;
    setLoaderData(undefined);
    setError(undefined);

    getDocument(id)
      .then((doc) => {
        if (cancelled) {
          return;
        }

        setLoaderData({
          doc,
          json: JSON.parse(doc.contents ?? ""),
          path: getPathFromSearch(location.search),
          minimal: getMinimalFromSearch(location.search),
        });
      })
      .catch((reason) => {
        if (cancelled) {
          return;
        }

        setError({
          status: reason instanceof ApiError ? reason.status : 500,
          message:
            reason instanceof Error
              ? reason.message
              : "Unknown error occurred.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [id, location.search]);

  useEffect(() => {
    if (loaderData?.path) {
      window.history.replaceState({}, "", location.pathname);
    }
  }, [loaderData?.path, location.pathname]);

  if (error) {
    return <DocumentError error={error} id={id} />;
  }

  if (!loaderData) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[rgb(56,52,139)] text-white">
        <LargeTitle>Loading JSON document...</LargeTitle>
      </div>
    );
  }

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
                  <div className="fixed z-50 block h-screen w-screen bg-black/80 text-white md:hidden">
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <LargeTitle>JSON Hero only works on desktop</LargeTitle>
                      <LargeTitle>👇</LargeTitle>
                      <Body>(For now!)</Body>
                      <Link
                        to="/"
                        className="mt-8 rounded-sm bg-lime-500 px-4 py-2 text-white"
                      >
                        Back to Home
                      </Link>
                    </div>
                  </div>
                  <div className="flex h-screen flex-col sm:overflow-hidden">
                    {!loaderData.minimal && <Header />}
                    <div className="flex-grow overflow-y-auto bg-slate-50 transition dark:bg-slate-900">
                      <div className="main-container flex h-full justify-items-stretch">
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
                          <div className="info-panel h-full flex-grow">
                            <InfoPanel />
                          </div>
                        </Resizable>
                      </div>
                    </div>

                    <Footer />
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

function getPathFromSearch(search: string): string | undefined {
  const path = new URLSearchParams(search).get("path");

  if (!path) {
    return undefined;
  }

  return path.startsWith("$.") ? path : `$.${path}`;
}

function getMinimalFromSearch(search: string): boolean | undefined {
  const minimal = new URLSearchParams(search).get("minimal");
  return minimal ? minimal === "true" : undefined;
}

function DocumentError({
  error,
  id,
}: {
  error: { status: number; message: string };
  id?: string;
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[rgb(56,52,139)]">
      <div className="w-2/3">
        <div className="text-center text-lime-300">
          <Logo />
          <PageNotFoundTitle className="text-center leading-tight">
            {error.status}
          </PageNotFoundTitle>
        </div>
        <div className="text-center leading-snug text-white">
          <ExtraLargeTitle className="mb-8 text-slate-200">
            <b>Sorry</b>! Something went wrong...
          </ExtraLargeTitle>
          <SmallSubtitle className="mb-8 text-slate-200">
            {error.status === 404 ? (
              <>
                We couldn't find the page <b>https://jsonhero.io/j/{id}</b>
              </>
            ) : (
              error.message
            )}
          </SmallSubtitle>
          <Link
            to="/"
            className="mx-auto w-24 cursor-pointer whitespace-nowrap rounded-sm bg-lime-500 px-5 py-1 text-lg font-bold uppercase text-slate-900 opacity-90 transition hover:opacity-100"
          >
            HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
