import { resizeElement } from "./handle-element";
import { resizeWindow } from "./handle-window";
export function resize(a, b) {
    return typeof a === "function" ? resizeWindow(a) : resizeElement(a, b);
}
//# sourceMappingURL=index.js.map