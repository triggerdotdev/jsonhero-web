import { PreviewInfo } from "./preview.types";
import { PreviewHtml } from "./PreviewHtml";
import { PreviewImage } from "./PreviewImage";

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
    default:
      return <></>;
  }
}
