import type { AnimationGenerator, BasicAnimationControls } from "./";
/**
 * The MotionValue tracks the state of a single animatable
 * value. Currently, updatedAt and current are unused. The
 * long term idea is to use this to minimise the number
 * of DOM reads, and to abstract the DOM interactions here.
 */
export declare class MotionValue {
    animation?: BasicAnimationControls;
    generatorStartTime?: number;
    generator?: AnimationGenerator;
    setAnimation(animation?: BasicAnimationControls): void;
    clearAnimation(): void;
}
//# sourceMappingURL=MotionValue.d.ts.map