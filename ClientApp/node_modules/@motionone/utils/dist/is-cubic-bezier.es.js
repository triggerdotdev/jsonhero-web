import { isNumber } from './is-number.es.js';

const isCubicBezier = (easing) => Array.isArray(easing) && isNumber(easing[0]);

export { isCubicBezier };
