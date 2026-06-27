'use strict';

const mix = (min, max, progress) => -progress * min + progress * max + min;

exports.mix = mix;
