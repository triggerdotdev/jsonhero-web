import { SpringOptions, Animation } from "../types";
export declare function spring({ from, to, restSpeed, restDelta, ...options }: SpringOptions): Animation<number>;
export declare namespace spring {
    var needsInterpolation: (a: any, b: any) => boolean;
}
