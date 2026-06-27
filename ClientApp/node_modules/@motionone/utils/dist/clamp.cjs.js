'use strict';

const clamp = (min, max, v) => Math.min(Math.max(v, min), max);

exports.clamp = clamp;
