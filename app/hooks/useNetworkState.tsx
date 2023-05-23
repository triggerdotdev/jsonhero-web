import { useEffect, useRef, useState } from "react";

export function useNetworkState() {
    const [isOnline, setIsOnline] = useState(window.navigator.onLine);
    const callbackRef = useRef < () => void> ();

    const on = () => {
        setIsOnline(true);
        callbackRef.current && callbackRef.current();
    };
    const off = () => setIsOnline(false);

    useEffect(() => {
        window.addEventListener("online", on);
        window.addEventListener("offline", off);

        return () => {
            window.removeEventListener("online", on);
            window.removeEventListener("offline", off);
        };
    }, []);

    const onceOnline = (cb: () => void) => {
        callbackRef.current = cb;
    };

    return { isOnline, onceOnline };
}
