"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleGroup = exports.spanLeadingZeroes = exports.spanAll = exports.spanAllZeroes = void 0;
var sprintf_js_1 = require("sprintf-js");
/**
 * @returns {String} the string with all zeroes contained in a <span>
 */
function spanAllZeroes(s) {
    return s.replace(/(0+)/g, '<span class="zero">$1</span>');
}
exports.spanAllZeroes = spanAllZeroes;
/**
 * @returns {String} the string with each character contained in a <span>
 */
function spanAll(s, offset) {
    if (offset === void 0) { offset = 0; }
    var letters = s.split('');
    return letters
        .map(function (n, i) {
        return sprintf_js_1.sprintf('<span class="digit value-%s position-%d">%s</span>', n, i + offset, spanAllZeroes(n));
    } // XXX Use #base-2 .value-0 instead?
    )
        .join('');
}
exports.spanAll = spanAll;
function spanLeadingZeroesSimple(group) {
    return group.replace(/^(0+)/, '<span class="zero">$1</span>');
}
/**
 * @returns {String} the string with leading zeroes contained in a <span>
 */
function spanLeadingZeroes(address) {
    var groups = address.split(':');
    return groups.map(function (g) { return spanLeadingZeroesSimple(g); }).join(':');
}
exports.spanLeadingZeroes = spanLeadingZeroes;
/**
 * Groups an address
 * @returns {String} a grouped address
 */
function simpleGroup(addressString, offset) {
    if (offset === void 0) { offset = 0; }
    var groups = addressString.split(':');
    return groups.map(function (g, i) {
        if (/group-v4/.test(g)) {
            return g;
        }
        return sprintf_js_1.sprintf('<span class="hover-group group-%d">%s</span>', i + offset, spanLeadingZeroesSimple(g));
    });
}
exports.simpleGroup = simpleGroup;
//# sourceMappingURL=helpers.js.map