import { MotionState, Options } from "./types";
/**
 * A global store of all generated motion states. This can be used to lookup
 * a motion state for a given Element.
 */
export declare const mountedStates: WeakMap<Element, MotionState>;
export declare function createMotionState(options?: Options, parent?: MotionState): MotionState;
//# sourceMappingURL=index.d.ts.map