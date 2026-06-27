export declare const syncDriver: (interval?: number) => (update: (v: number) => void) => {
    start: () => void;
    stop: () => boolean;
};
