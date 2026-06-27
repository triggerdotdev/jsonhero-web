import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Body } from "~/components/Primitives/Body";
import { PreviewBox } from "../PreviewBox";

export function PreviewAudioUri({
  src,
  contentType,
}: {
  src: string;
  contentType: string;
}) {
  const mediaRef = useRef<HTMLMediaElement>(null);

  useHotkeys(
    "space",
    (e) => {
      e.preventDefault();

      if (mediaRef.current) {
        if (mediaRef.current.paused) {
          mediaRef.current.play();
        } else {
          mediaRef.current.pause();
        }
      }
    },
    [mediaRef]
  );

  return (
    <div>
      <PreviewBox>
        <Body>
          <audio controls src={src} ref={mediaRef}>
            Sorry, your browser doesn't support embedded audio.
          </audio>
        </Body>
      </PreviewBox>
    </div>
  );
}
