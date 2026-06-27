'use strict';

var utils = require('@motionone/utils');

const sampleT = 5; // ms
function calcGeneratorVelocity(resolveValue, t, current) {
    const prevT = Math.max(t - sampleT, 0);
    return utils.velocityPerSecond(current - resolveValue(prevT), t - prevT);
}

exports.calcGeneratorVelocity = calcGeneratorVelocity;
