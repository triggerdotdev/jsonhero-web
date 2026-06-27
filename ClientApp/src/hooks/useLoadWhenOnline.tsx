import { useEffect, useRef } from "react";

export function useLoadWhenOnline(callback: () => void, deps: unknown[] = []) {
    const callbackRef = useRef <() => void>(callback);

    useEffect(() => {
        callbackRef.current = callback;
    });

    useEffect(() => {
        const cb = () => callbackRef.current();

        if (window.navigator.onLine) {
            cb();
            return;
        }

        window.addEventListener("online", cb);

        return () => {
            window.removeEventListener("online", cb);
        };
    }, [...deps]);
}
