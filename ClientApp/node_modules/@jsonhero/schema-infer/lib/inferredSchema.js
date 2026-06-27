"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inferRange = void 0;
function inferRange(value, range = { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER }) {
    return {
        min: Math.min(range.min, value),
        max: Math.max(range.max, value),
    };
}
exports.inferRange = inferRange;
