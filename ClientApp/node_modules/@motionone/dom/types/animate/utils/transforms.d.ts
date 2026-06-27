import type { CssPropertyDefinition } from "../types";
/**
 * A list of all transformable axes. We'll use this list to generated a version
 * of each axes for each transform.
 */
export declare const axes: string[];
export declare const transformAlias: {
    x: string;
    y: string;
    z: string;
};
export declare const transformDefinitions: Map<string, CssPropertyDefinition>;
export declare const asTransformCssVar: (name: string) => string;
/**
 * A function to use with Array.sort to sort transform keys by their default order.
 */
export declare const compareTransformOrder: (a: string, b: string) => number;
export declare const isTransform: (name: string) => boolean;
export declare const addTransformToElement: (element: HTMLElement, name: string) => void;
export declare const buildTransformTemplate: (transforms: string[]) => string;
//# sourceMappingURL=transforms.d.ts.map