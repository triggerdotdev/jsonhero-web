import { JSONStringType } from "@jsonhero/json-infer-types/lib/@types";
import { useEffect } from "react";
import { useFetcher } from "remix";
import { Body } from "~/components/Primitives/Body";
import { useNetworkState } from "~/hooks/useNetworkState";
import { PreviewBox } from "../PreviewBox";
import { PreviewResult } from "./preview.types";
import { PreviewUriElement } from "./PreviewUriElement";

export type PreviewUriProps = {
  value: string;
  type: JSONStringType;
};

export function PreviewUri(props: PreviewUriProps) {
  const { isOnline, onceOnline } = useNetworkState();
  const previewFetcher = useFetcher < PreviewResult > ();

  useEffect(() => {
    const encodedUri = encodeURIComponent(props.value);
    const load = () => previewFetcher.load(`/actions/getPreview/${encodedUri}`);

    isOnline ? load() : onceOnline(load);
  }, [props.value]);

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
            {isOnline ? "Loading…" : "No preview available (offline)"}
          </Body>
        </PreviewBox>
      )}
    </div>
  );
}
