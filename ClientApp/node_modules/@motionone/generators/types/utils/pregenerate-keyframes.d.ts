import { AnimationGenerator } from "@motionone/types";
export interface KeyframesMetadata {
    keyframes: Array<string | number>;
    duration: number;
    overshootDuration: number;
}
export declare function pregenerateKeyframes(generator: AnimationGenerator, toUnit?: (value: number) => number | string): KeyframesMetadata;
//# sourceMappingURL=pregenerate-keyframes.d.ts.map