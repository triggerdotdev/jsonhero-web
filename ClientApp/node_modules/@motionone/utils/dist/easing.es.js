import { isEasingList } from './is-easing-list.es.js';
import { wrap } from './wrap.es.js';

function getEasingForSegment(easing, i) {
    return isEasingList(easing) ? easing[wrap(0, easing.length, i)] : easing;
}

export { getEasingForSegment };
