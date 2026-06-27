import { MotionKeyframesDefinition } from "../../animate/types";
import { MotionEventNames } from "../types";
export declare const motionEvent: (name: MotionEventNames, target: MotionKeyframesDefinition) => CustomEvent<{
    target: MotionKeyframesDefinition;
}>;
export declare function dispatchPointerEvent(element: Element, name: MotionEventNames, event: PointerEvent): void;
export declare function dispatchViewEvent(element: Element, name: MotionEventNames, entry?: IntersectionObserverEntry): void;
//# sourceMappingURL=events.d.ts.map