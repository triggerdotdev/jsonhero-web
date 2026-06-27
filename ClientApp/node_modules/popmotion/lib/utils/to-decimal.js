export const toDecimal = (num, precision = 2) => {
    precision = Math.pow(10, precision);
    return Math.round(num * precision) / precision;
};
//# sourceMappingURL=to-decimal.js.map