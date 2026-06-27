import { isEasingList } from "./is-easing-list";
import { wrap } from "./wrap";
export function getEasingForSegment(easing, i) {
    return isEasingList(easing) ? easing[wrap(0, easing.length, i)] : easing;
}
//# sourceMappingURL=easing.js.map