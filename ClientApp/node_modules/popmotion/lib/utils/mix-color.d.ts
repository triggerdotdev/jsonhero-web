import { Color } from "style-value-types";
export declare const mixLinearColor: (from: number, to: number, v: number) => number;
export declare const mixColor: (from: Color | string, to: Color | string) => (v: number) => any;
