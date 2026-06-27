import { resizeElement } from './handle-element.es.js';
import { resizeWindow } from './handle-window.es.js';

function resize(a, b) {
    return typeof a === "function" ? resizeWindow(a) : resizeElement(a, b);
}

export { resize };
