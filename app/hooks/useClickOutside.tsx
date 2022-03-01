import { RefObject, useEffect, useRef } from "react";

export function useClickOutside(
  elementRef: RefObject<HTMLElement>,
  callback: (event: MouseEvent) => void
) {
  const callbackRef = useRef<(event: MouseEvent) => void>();
  callbackRef.current = callback;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!elementRef?.current || !callbackRef.current) {
        return;
      }

      if (e.target instanceof Element) {
        if (!elementRef.current.contains(e.target)) {
          callbackRef.current(e);
        }
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [callbackRef, elementRef]);
}
