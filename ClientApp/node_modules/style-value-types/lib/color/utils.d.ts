import { Color } from '../types';
export declare const isColorString: (type: string, testProp?: string) => (v: any) => boolean;
export declare const splitColor: (aName: string, bName: string, cName: string) => (v: string | Color) => import("../types").RGBA | import("../types").HSLA | {
    [x: string]: number;
    alpha: number;
};
