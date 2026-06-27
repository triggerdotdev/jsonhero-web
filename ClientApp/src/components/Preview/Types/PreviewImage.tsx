import { formatBytes } from "~/utilities/formatter";
import { PreviewBox } from "../PreviewBox";
import { PreviewProperties, PreviewProperty } from "../PreviewProperties";
import { PreviewImage } from "./preview.types";

export type PreviewImageProps = {
  info: PreviewImage;
};

export function PreviewImage({ info }: PreviewImageProps) {
  let properties: Array<PreviewProperty> = [];

  if (info.mimeType) {
    properties.push({ key: "mimeType", title: info.mimeType });
  }

  if (info.size) {
    properties.push({ key: "fileSize", title: `${formatBytes(info.size)}` });
  }

  const src = info.image ? info.image.url : info.url;

  return (
    <PreviewBox link={info.url}>
      <img className="block max-h-96 w-full object-contain" src={src} />
      <PreviewProperties properties={properties} />
    </PreviewBox>
  );
}
