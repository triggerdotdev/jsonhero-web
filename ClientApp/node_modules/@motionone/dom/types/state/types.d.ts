import { AnimationOptionsWithOverrides, MotionKeyframes, MotionKeyframesDefinition } from "../animate/types";
import { InViewOptions } from "../gestures/in-view";
export interface Target {
    [key: string]: string | number;
}
export interface MotionState {
    update: (options: Options) => void;
    getDepth: () => number;
    getTarget: () => MotionKeyframes;
    getOptions: () => Options;
    getContext: () => MotionStateContext;
    setActive: (type: keyof MotionStateContext, isActive: boolean) => void;
    mount: (element: Element) => () => void;
    isMounted: () => boolean;
    animateUpdates: () => Generator<void>;
}
export interface Options {
    initial?: false | VariantDefinition;
    animate?: VariantDefinition;
    inView?: VariantDefinition;
    hover?: VariantDefinition;
    press?: VariantDefinition;
    variants?: Variants;
    transition?: AnimationOptionsWithOverrides;
    inViewOptions?: InViewOptions & {
        once?: boolean;
    };
}
export interface MotionStateContext {
    initial?: string;
    animate?: string;
    inView?: string;
    hover?: string;
    press?: string;
    exit?: string;
}
export declare type Variant = MotionKeyframesDefinition & {
    transition?: AnimationOptionsWithOverrides;
};
export interface Variants {
    [key: string]: Variant;
}
export declare type VariantDefinition = Variant | string;
export declare type MotionEventNames = "motionstart" | "motioncomplete" | "hoverstart" | "hoverend" | "pressstart" | "pressend" | "viewenter" | "viewleave";
export declare type MotionEvent = CustomEvent<{
    target: Variant;
}>;
export declare type CustomPointerEvent = CustomEvent<{
    originalEvent: PointerEvent;
}>;
export declare type ViewEvent = CustomEvent<{
    originalEntry: IntersectionObserverEntry;
}>;
declare global {
    interface GlobalEventHandlersEventMap {
        motionstart: MotionEvent;
        motioncomplete: MotionEvent;
        hoverstart: CustomPointerEvent;
        hoverend: CustomPointerEvent;
        pressstart: CustomPointerEvent;
        pressend: CustomPointerEvent;
        viewenter: ViewEvent;
        viewleave: ViewEvent;
    }
}
//# sourceMappingURL=types.d.ts.map