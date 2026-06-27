import { useEffect, useState, useRef, RefObject } from "react";

export function useOnScreen(ref: RefObject<HTMLElement>) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting)
    );
  }, []);

  useEffect(() => {
    if (observerRef.current == null || ref.current == null) return;
    observerRef.current.observe(ref.current);

    return () => {
      if (observerRef.current == null) return;
      observerRef.current.disconnect();
    };
  }, [ref]);

  return isOnScreen;
}
