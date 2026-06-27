import { clamp } from '../utils';
export const number = {
    test: (v) => typeof v === 'number',
    parse: parseFloat,
    transform: (v) => v,
};
export const alpha = Object.assign(Object.assign({}, number), { transform: clamp(0, 1) });
export const scale = Object.assign(Object.assign({}, number), { default: 1 });
//# sourceMappingURL=index.js.map