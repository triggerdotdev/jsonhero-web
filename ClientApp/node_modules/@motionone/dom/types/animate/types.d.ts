import type { AnimationOptions, BasicAnimationControls, UnresolvedValueKeyframe, OptionResolver } from "@motionone/types";
import type { NextTime } from "../timeline/types";
import { ValueKeyframe } from "@motionone/types";
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export interface CSSStyleDeclarationWithTransform extends Omit<CSSStyleDeclaration, "direction" | "transition"> {
    x: number;
    y: number;
    z: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    scaleX: number;
    scaleY: number;
    scaleZ: number;
    skewX: number;
    skewY: number;
}
export declare type StyleAnimationOptions = {
    [K in keyof CSSStyleDeclarationWithTransform]?: AnimationOptions;
};
export declare type VariableAnimationOptions = {
    [key: `--${string}`]: AnimationOptions;
};
export declare type AnimationOptionsWithOverrides = StyleAnimationOptions & VariableAnimationOptions & AnimationOptions;
export declare type ValueKeyframesDefinition = ValueKeyframe | ValueKeyframe[] | UnresolvedValueKeyframe[];
export declare type StyleKeyframes = {
    [K in keyof CSSStyleDeclarationWithTransform]?: ValueKeyframe | ValueKeyframe[];
};
export declare type VariableKeyframes = {
    [key: `--${string}`]: ValueKeyframe | ValueKeyframe[];
};
export declare type MotionKeyframes = StyleKeyframes & VariableKeyframes;
export declare type StyleKeyframesDefinition = {
    [K in keyof CSSStyleDeclarationWithTransform]?: ValueKeyframesDefinition;
};
export declare type VariableKeyframesDefinition = {
    [key: `--${string}`]: ValueKeyframesDefinition;
};
export declare type MotionKeyframesDefinition = StyleKeyframesDefinition & VariableKeyframesDefinition;
export interface AnimationWithCommitStyles extends Animation {
    commitStyles: VoidFunction;
}
export declare type AnimationListOptions = Omit<AnimationOptionsWithOverrides, "delay" | "direction" | "repeat"> & {
    delay?: number | OptionResolver<number>;
    at?: NextTime;
};
export interface CssPropertyDefinition {
    syntax: `<${string}>`;
    initialValue: string | number;
    toDefaultUnit: (v: number) => string | number;
}
export declare type CssPropertyDefinitionMap = {
    [key: string]: CssPropertyDefinition;
};
export declare type AnimationFactory = () => BasicAnimationControls | undefined;
//# sourceMappingURL=types.d.ts.map