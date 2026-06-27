import { alpha as alphaType, number } from '../numbers';
import { clamp, sanitize } from '../utils';
import { isColorString, splitColor } from './utils';
const clampRgbUnit = clamp(0, 255);
export const rgbUnit = Object.assign(Object.assign({}, number), { transform: (v) => Math.round(clampRgbUnit(v)) });
export const rgba = {
    test: isColorString('rgb', 'red'),
    parse: splitColor('red', 'green', 'blue'),
    transform: ({ red, green, blue, alpha = 1 }) => 'rgba(' +
        rgbUnit.transform(red) +
        ', ' +
        rgbUnit.transform(green) +
        ', ' +
        rgbUnit.transform(blue) +
        ', ' +
        sanitize(alphaType.transform(alpha)) +
        ')',
};
//# sourceMappingURL=rgba.js.map