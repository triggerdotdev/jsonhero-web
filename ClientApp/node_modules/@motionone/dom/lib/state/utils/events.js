export const motionEvent = (name, target) => new CustomEvent(name, { detail: { target } });
export function dispatchPointerEvent(element, name, event) {
    element.dispatchEvent(new CustomEvent(name, { detail: { originalEvent: event } }));
}
export function dispatchViewEvent(element, name, entry) {
    element.dispatchEvent(new CustomEvent(name, { detail: { originalEntry: entry } }));
}
//# sourceMappingURL=events.js.map