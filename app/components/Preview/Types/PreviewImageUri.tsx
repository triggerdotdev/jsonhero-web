import { Body } from "~/components/Primitives/Body";
import { PreviewBox } from "../PreviewBox";

export function PreviewImageUri({
  src,
  contentType,
}: {
  src: string;
  contentType: string;
}) {
  return (
    <div>
      <PreviewBox>
        <Body>
          <img src={src} />
        </Body>
      </PreviewBox>
    </div>
  );
}
