export declare const filter: {
    getAnimatableNone: (v: string) => string;
    test: (v: any) => boolean;
    parse: (v: string | number) => (number | import("..").RGBA | import("..").HSLA)[];
    createTransformer: (v: string | number) => (v: (string | number | import("..").RGBA | import("..").HSLA)[]) => string;
};
