import type { AnimationListOptions, MotionKeyframesDefinition } from "../animate/types";
import type { Easing } from "@motionone/types";
import { ElementOrSelector } from "../types";
export interface AnnotatedLabel {
    name: string;
    at: NextTime;
}
export declare type TimelineSegment = [ElementOrSelector, MotionKeyframesDefinition] | [ElementOrSelector, MotionKeyframesDefinition, AnimationListOptions] | string | AnnotatedLabel;
export declare type TimelineDefinition = TimelineSegment[];
export declare type NextTime = number | "<" | `+${number}` | `-${number}` | `${string}`;
export interface ElementSequence {
    [key: string]: ValueSequence;
}
export declare type AbsoluteKeyframe = {
    value: string | number | null;
    at: number;
    easing?: Easing;
};
export declare type ValueSequence = AbsoluteKeyframe[];
//# sourceMappingURL=types.d.ts.map