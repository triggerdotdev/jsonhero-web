import { JSONStringType } from "@jsonhero/json-infer-types/lib/@types";
import { useEffect, useState } from "react";
import { useFetcher } from "remix";
import { Body } from "~/components/Primitives/Body";
import { PreviewBox } from "../PreviewBox";
import { PreviewResult } from "./preview.types";
import { PreviewUriElement } from "./PreviewUriElement";

export type PreviewUriProps = {
  value: string;
  type: JSONStringType;
};

export function PreviewUri(props: PreviewUriProps) {
  const previewFetcher = useFetcher<PreviewResult>();
  const [isOffline, setIsOffline] = useState(false);
  const listenForOnline = () => { setIsOffline(false); }
  useEffect(() => {
    const encodedUri = encodeURIComponent(props.value);
    if (window.navigator.onLine) {
      previewFetcher.load(`/actions/getPreview/${encodedUri}`);
    }else{
      setIsOffline(true)
      window.addEventListener("online", listenForOnline);
    }
    return () => {
      window.removeEventListener("online", listenForOnline);
    };
  }, [props.value]);

  if(isOffline){
    return (
      <PreviewBox>
        <Body>
          unable to load preview
        </Body>
      </PreviewBox>
    )
  }
  return (
    <div>
      {previewFetcher.type === "done" ? (
        <>
          {typeof previewFetcher.data == "string" ? (
            <PreviewBox>
              <Body>
                <span
                  dangerouslySetInnerHTML={{ __html: previewFetcher.data }}
                ></span>
              </Body>
            </PreviewBox>
          ) : "error" in previewFetcher.data ? (
            <PreviewBox>
              <Body>{previewFetcher.data.error}</Body>
            </PreviewBox>
          ) : (
            <PreviewUriElement info={previewFetcher.data} />
          )}
        </>
      ) : (
        <PreviewBox>
          <Body className="h-96 animate-pulse bg-slate-300 dark:text-slate-300 dark:bg-slate-500 flex justify-center items-center">
            Loading…
          </Body>
        </PreviewBox>
      )}
    </div>
  );
}
