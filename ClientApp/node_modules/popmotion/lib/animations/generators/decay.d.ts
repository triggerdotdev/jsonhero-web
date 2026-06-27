import { Animation, DecayOptions } from "../types";
export declare function decay({ velocity, from, power, timeConstant, restDelta, modifyTarget, }: DecayOptions): Animation<number>;
