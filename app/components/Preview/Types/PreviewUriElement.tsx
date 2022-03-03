import { PreviewInfo } from "./preview.types";
import { PreviewHtml } from "./PreviewHtml";
import { PreviewImage } from "./PreviewImage";
import { PreviewJson } from "./PreviewJson";

export type PreviewUriElementProps = {
  info: PreviewInfo;
};

export function PreviewUriElement({ info }: PreviewUriElementProps) {
  switch (info.contentType) {
    case "html":
      return <PreviewHtml info={info} />;
    case "image":
    case "gif":
      return <PreviewImage info={info} />;
    case "json":
      return <PreviewJson preview={info} />;
    default:
      return <></>;
  }
}
