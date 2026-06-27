import { ElementOrSelector } from "../types";
export declare type ViewChangeHandler = (entry: IntersectionObserverEntry) => void;
export interface InViewOptions {
    root?: Element | Document;
    margin?: string;
    amount?: "any" | "all" | number;
}
export declare function inView(elementOrSelector: ElementOrSelector, onStart: (entry: IntersectionObserverEntry) => void | ViewChangeHandler, { root, margin: rootMargin, amount }?: InViewOptions): VoidFunction;
//# sourceMappingURL=in-view.d.ts.map