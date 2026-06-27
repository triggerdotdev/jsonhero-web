import { Body } from "~/components/Primitives/Body";
import { PreviewBox } from "../PreviewBox";

export function PreviewImageUri({
  src,
  contentType,
  alt = "",
}: {
  src: string;
  contentType?: string;
  alt?: string
}) {
  return (
    <div>
      <PreviewBox link={src}>
        <Body>
          <img src={src} alt={alt} />
        </Body>
      </PreviewBox>
    </div>
  );
}
