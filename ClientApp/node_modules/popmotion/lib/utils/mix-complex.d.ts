import { RGBA, HSLA } from "style-value-types";
declare type MixComplex = (p: number) => string;
declare type BlendableArray = Array<number | RGBA | HSLA | string>;
declare type BlendableObject = {
    [key: string]: string | number | RGBA | HSLA;
};
export declare const mixArray: (from: BlendableArray, to: BlendableArray) => (v: number) => (string | number | HSLA | RGBA)[];
export declare const mixObject: (origin: BlendableObject, target: BlendableObject) => (v: number) => {
    [x: string]: string | number | HSLA | RGBA;
};
export declare const mixComplex: (origin: string | number, target: string | number) => MixComplex;
export {};
