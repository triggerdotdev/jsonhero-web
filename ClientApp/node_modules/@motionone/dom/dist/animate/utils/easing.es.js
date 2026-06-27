import { isCubicBezier } from '@motionone/utils';

const convertEasing = (easing) => isCubicBezier(easing) ? cubicBezierAsString(easing) : easing;
const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;

export { convertEasing, cubicBezierAsString };
