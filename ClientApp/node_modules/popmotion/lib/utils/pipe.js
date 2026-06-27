const combineFunctions = (a, b) => (v) => b(a(v));
export const pipe = (...transformers) => transformers.reduce(combineFunctions);
//# sourceMappingURL=pipe.js.map