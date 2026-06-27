import type { AnimationControls, AnimationOptions } from "@motionone/types";
import type { AnimationFactory, AnimationWithCommitStyles } from "../types";
interface MotionState {
    animations: AnimationWithCommitStyles[];
    duration: number;
    finished?: Promise<any>;
    options: AnimationOptions;
}
export declare const withControls: (animationFactory: AnimationFactory[], options: AnimationOptions, duration?: number) => AnimationControls;
export declare const controls: {
    get: (target: MotionState, key: string) => number | Promise<any> | AnimationPlayState | ((callback: (animation: AnimationWithCommitStyles, state: MotionState) => void) => void) | undefined;
    set: (target: MotionState, key: string, value: number) => boolean;
};
export {};
//# sourceMappingURL=controls.d.ts.map