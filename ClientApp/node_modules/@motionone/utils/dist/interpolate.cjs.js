'use strict';

var mix = require('./mix.cjs.js');
var noop = require('./noop.cjs.js');
var offset = require('./offset.cjs.js');
var progress = require('./progress.cjs.js');
var easing = require('./easing.cjs.js');
var clamp = require('./clamp.cjs.js');

function interpolate(output, input = offset.defaultOffset(output.length), easing$1 = noop.noopReturn) {
    const length = output.length;
    /**
     * If the input length is lower than the output we
     * fill the input to match. This currently assumes the input
     * is an animation progress value so is a good candidate for
     * moving outside the function.
     */
    const remainder = length - input.length;
    remainder > 0 && offset.fillOffset(input, remainder);
    return (t) => {
        let i = 0;
        for (; i < length - 2; i++) {
            if (t < input[i + 1])
                break;
        }
        let progressInRange = clamp.clamp(0, 1, progress.progress(input[i], input[i + 1], t));
        const segmentEasing = easing.getEasingForSegment(easing$1, i);
        progressInRange = segmentEasing(progressInRange);
        return mix.mix(output[i], output[i + 1], progressInRange);
    };
}

exports.interpolate = interpolate;
