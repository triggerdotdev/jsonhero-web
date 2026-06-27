'use strict';

var utils = require('@motionone/utils');

const steps = (steps, direction = "end") => (progress) => {
    progress =
        direction === "end"
            ? Math.min(progress, 0.999)
            : Math.max(progress, 0.001);
    const expanded = progress * steps;
    const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
    return utils.clamp(0, 1, rounded / steps);
};

exports.steps = steps;
