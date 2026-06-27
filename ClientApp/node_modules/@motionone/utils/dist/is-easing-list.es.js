import { isNumber } from './is-number.es.js';

const isEasingList = (easing) => Array.isArray(easing) && !isNumber(easing[0]);

export { isEasingList };
