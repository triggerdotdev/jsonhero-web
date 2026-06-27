import { InertiaOptions } from "./types";
export declare function inertia({ from, velocity, min, max, power, timeConstant, bounceStiffness, bounceDamping, restDelta, modifyTarget, driver, onUpdate, onComplete, onStop, }: InertiaOptions): {
    stop: () => void;
};
