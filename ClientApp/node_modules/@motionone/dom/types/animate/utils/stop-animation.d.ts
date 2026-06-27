import type { BasicAnimationControls } from "@motionone/types";
export interface WithCommitStyles {
    commitStyles: VoidFunction;
    cancel: VoidFunction;
}
export declare function stopAnimation(animation?: BasicAnimationControls, needsCommit?: boolean): void;
//# sourceMappingURL=stop-animation.d.ts.map