import { PreviewImageUri } from "./PreviewImageUri";

export function PreviewIPFSImage({ src }: { src: URL }) {
  const newSrc = createPreviewIPFSImageURL(src);

  return <PreviewImageUri src={newSrc} />;
}

const createPreviewIPFSImageURL = (src: URL): string => {
  const url = new URL(src.href);

  url.protocol = "https:";
  url.pathname = `/ipfs/${src.pathname.substring(1)}`;
  url.hostname = "ipfs.io";
  // Remove the leading slash

  return url.href;
};
