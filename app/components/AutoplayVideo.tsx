import { useEffect, useRef } from "react";
import { useOnScreen } from "~/hooks/useOnScreen";

export function AutoplayVideo({ src }: { src: string }) {
  const elementRef = useRef<HTMLVideoElement>(null);
  const isOnScreen = useOnScreen(elementRef);

  useEffect(() => {
    if (isOnScreen) {
      elementRef.current?.play();
    } else {
      elementRef.current?.pause();
    }
  }, [isOnScreen]);

  return <video src={src} ref={elementRef} loop={true} muted={true} />;
}
