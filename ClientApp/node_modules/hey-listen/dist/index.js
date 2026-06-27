'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

exports.warning = function () { };
exports.invariant = function () { };
if (process.env.NODE_ENV !== 'production') {
    exports.warning = function (check, message) {
        if (!check && typeof console !== 'undefined') {
            console.warn(message);
        }
    };
    exports.invariant = function (check, message) {
        if (!check) {
            throw new Error(message);
        }
    };
}
