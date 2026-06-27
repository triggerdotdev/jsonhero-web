'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@motionone/utils');

const convertEasing = (easing) => utils.isCubicBezier(easing) ? cubicBezierAsString(easing) : easing;
const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;

exports.convertEasing = convertEasing;
exports.cubicBezierAsString = cubicBezierAsString;
