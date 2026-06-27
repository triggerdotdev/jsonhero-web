import { toDecimal } from './to-decimal';
export const smoothFrame = (prevValue, nextValue, duration, smoothing = 0) => toDecimal(prevValue +
    (duration * (nextValue - prevValue)) / Math.max(smoothing, duration));
//# sourceMappingURL=smooth-frame.js.map