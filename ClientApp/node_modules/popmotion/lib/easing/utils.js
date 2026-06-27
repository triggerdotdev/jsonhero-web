export const reverseEasing = easing => p => 1 - easing(1 - p);
export const mirrorEasing = easing => p => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
export const createExpoIn = (power) => p => Math.pow(p, power);
export const createBackIn = (power) => p => p * p * ((power + 1) * p - power);
export const createAnticipate = (power) => {
    const backEasing = createBackIn(power);
    return p => (p *= 2) < 1
        ? 0.5 * backEasing(p)
        : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
};
//# sourceMappingURL=utils.js.map