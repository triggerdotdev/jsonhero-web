import { AnimationOptions } from "./types";
export declare function animate<V = number>({ from, autoplay, driver, elapsed, repeat: repeatMax, repeatType, repeatDelay, onPlay, onStop, onComplete, onRepeat, onUpdate, ...options }: AnimationOptions<V>): {
    stop: () => void;
};
