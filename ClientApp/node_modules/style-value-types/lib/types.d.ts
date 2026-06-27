export declare type Transformer = (v: any) => any;
export declare type ValueType = {
    test: (v: any) => boolean;
    parse: (v: any) => any;
    transform?: Transformer;
    createTransformer?: (template: string) => Transformer;
    default?: any;
    getAnimatableNone?: (v: any) => any;
};
export declare type NumberMap = {
    [key: string]: number;
};
export declare type RGBA = {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
};
export declare type HSLA = {
    hue: number;
    saturation: number;
    lightness: number;
    alpha?: number;
};
export declare type Color = HSLA | RGBA;
