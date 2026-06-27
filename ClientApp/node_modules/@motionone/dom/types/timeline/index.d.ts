import type { AnimationOptions, PlaybackOptions } from "@motionone/types";
import type { AnimationOptionsWithOverrides, ValueKeyframesDefinition } from "../animate/types";
import type { TimelineDefinition } from "./types";
declare type AnimateStyleDefinition = [
    Element,
    string,
    ValueKeyframesDefinition,
    AnimationOptions
];
export declare type TimelineOptions = PlaybackOptions & {
    duration?: number;
    defaultOptions?: AnimationOptionsWithOverrides;
};
export declare function timeline(definition: TimelineDefinition, options?: TimelineOptions): import("@motionone/types").AnimationControls;
export declare function createAnimationsFromTimeline(definition: TimelineDefinition, { defaultOptions, ...timelineOptions }?: TimelineOptions): AnimateStyleDefinition[];
export {};
//# sourceMappingURL=index.d.ts.map