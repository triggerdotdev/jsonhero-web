import { Animation, KeyframeOptions } from "../types";
import { Easing } from "../../easing/types";
export declare function defaultEasing(values: any[], easing?: Easing): Easing[];
export declare function defaultOffset(values: any[]): number[];
export declare function convertOffsetToTimes(offset: number[], duration: number): number[];
export declare function keyframes<V>({ from, to, ease, offset, duration, }: KeyframeOptions): Animation<number | string>;
