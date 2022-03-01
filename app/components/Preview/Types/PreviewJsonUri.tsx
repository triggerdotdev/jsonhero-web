import { useEffect } from "react";
import { useFetcher } from "remix";
import { CodeViewer } from "~/components/CodeViewer";
import { Body } from "~/components/Primitives/Body";
import { PreviewBox } from "../PreviewBox";

export function PreviewJsonUri({ url }: { url: string }) {
  const previewFetcher = useFetcher<unknown>();

  useEffect(() => {
    const encodedUri = encodeURIComponent(url);
    previewFetcher.load(
      `/actions/getPreview/${encodedUri}?contentType=application%2Fjson`
    );
  }, [url]);

  return (
    <div className="mt-4">
      {previewFetcher.type === "done" ? (
        <>
          <PreviewBox>
            <CodeViewer code={JSON.stringify(previewFetcher.data, null, 2)} />
          </PreviewBox>
        </>
      ) : (
        <PreviewBox>
          <Body>Loading…</Body>
        </PreviewBox>
      )}
    </div>
  );
}
