export const clamp = (min, max) => (v) => Math.max(Math.min(v, max), min);
export const sanitize = (v) => (v % 1 ? Number(v.toFixed(5)) : v);
export const floatRegex = /(-)?([\d]*\.?[\d])+/g;
export const colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi;
export const singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;
export function isString(v) {
    return typeof v === 'string';
}
//# sourceMappingURL=utils.js.map