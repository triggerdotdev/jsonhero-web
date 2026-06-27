import type { Easing, UnresolvedValueKeyframe } from "@motionone/types";
import type { ValueSequence } from "../types";
export declare function eraseKeyframes(sequence: ValueSequence, startTime: number, endTime: number): void;
export declare function addKeyframes(sequence: ValueSequence, keyframes: UnresolvedValueKeyframe[], easing: Easing | Easing[], offset: number[], startTime: number, endTime: number): void;
//# sourceMappingURL=edit.d.ts.map