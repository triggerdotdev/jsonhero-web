import { SpringOptions } from "../types";
export declare const minDuration = 0.01;
export declare const maxDuration = 10;
export declare const minDamping = 0.05;
export declare const maxDamping = 1;
export declare function findSpring({ duration, bounce, velocity, mass, }: SpringOptions): {
    stiffness: number;
    damping: number;
    duration: number;
};
export declare function calcAngularFreq(undampedFreq: number, dampingRatio: number): number;
