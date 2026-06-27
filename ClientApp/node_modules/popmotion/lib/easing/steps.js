import { clamp } from '../utils/clamp';
export const steps = (steps, direction = 'end') => (progress) => {
    progress =
        direction === 'end' ? Math.min(progress, 0.999) : Math.max(progress, 0.001);
    const expanded = progress * steps;
    const rounded = direction === 'end' ? Math.floor(expanded) : Math.ceil(expanded);
    return clamp(0, 1, rounded / steps);
};
//# sourceMappingURL=steps.js.map