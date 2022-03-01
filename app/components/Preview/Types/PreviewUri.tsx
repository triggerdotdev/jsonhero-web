import { JSONStringType } from "@jsonhero/json-infer-types/lib/@types";
import { useEffect } from "react";
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

  useEffect(() => {
    const encodedUri = encodeURIComponent(props.value);
    previewFetcher.load(`/actions/getPreview/${encodedUri}`);
  }, [props.value]);

  return (
    <div>
      {previewFetcher.type === "done" ? (
        <>
          {"error" in previewFetcher.data ? (
            <PreviewBox>
              <Body>{previewFetcher.data.error}</Body>
            </PreviewBox>
          ) : (
            <PreviewUriElement info={previewFetcher.data} />
          )}
        </>
      ) : (
        <PreviewBox>
          <Body>Loading…</Body>
        </PreviewBox>
      )}
    </div>
  );
}
