import { isCubicBezier } from "@motionone/utils";
export const convertEasing = (easing) => isCubicBezier(easing) ? cubicBezierAsString(easing) : easing;
export const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
//# sourceMappingURL=easing.js.map