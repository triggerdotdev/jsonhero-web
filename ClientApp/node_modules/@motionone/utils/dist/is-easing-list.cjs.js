'use strict';

var isNumber = require('./is-number.cjs.js');

const isEasingList = (easing) => Array.isArray(easing) && !isNumber.isNumber(easing[0]);

exports.isEasingList = isEasingList;
