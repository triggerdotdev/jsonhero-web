import { isNumber } from "./is-number";
export const isEasingList = (easing) => Array.isArray(easing) && !isNumber(easing[0]);
//# sourceMappingURL=is-easing-list.js.map