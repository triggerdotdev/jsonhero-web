import { isString } from '../utils';
const createUnitType = (unit) => ({
    test: (v) => isString(v) && v.endsWith(unit) && v.split(' ').length === 1,
    parse: parseFloat,
    transform: (v) => `${v}${unit}`,
});
export const degrees = createUnitType('deg');
export const percent = createUnitType('%');
export const px = createUnitType('px');
export const vh = createUnitType('vh');
export const vw = createUnitType('vw');
export const progressPercentage = Object.assign(Object.assign({}, percent), { parse: (v) => percent.parse(v) / 100, transform: (v) => percent.transform(v * 100) });
//# sourceMappingURL=units.js.map