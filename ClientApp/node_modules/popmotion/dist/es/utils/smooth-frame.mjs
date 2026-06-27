import { toDecimal } from './to-decimal.mjs';

const smoothFrame = (prevValue, nextValue, duration, smoothing = 0) => toDecimal(prevValue +
    (duration * (nextValue - prevValue)) / Math.max(smoothing, duration));

export { smoothFrame };
