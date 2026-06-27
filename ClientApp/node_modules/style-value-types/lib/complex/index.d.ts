import { Color } from '../types';
declare function test(v: any): boolean;
declare function parse(v: string | number): (number | import("../types").RGBA | import("../types").HSLA)[];
declare function createTransformer(v: string | number): (v: Array<Color | number | string>) => string;
declare function getAnimatableNone(v: string | number): string;
export declare const complex: {
    test: typeof test;
    parse: typeof parse;
    createTransformer: typeof createTransformer;
    getAnimatableNone: typeof getAnimatableNone;
};
export {};
