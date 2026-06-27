'use strict';

var isEasingList = require('./is-easing-list.cjs.js');
var wrap = require('./wrap.cjs.js');

function getEasingForSegment(easing, i) {
    return isEasingList.isEasingList(easing) ? easing[wrap.wrap(0, easing.length, i)] : easing;
}

exports.getEasingForSegment = getEasingForSegment;
