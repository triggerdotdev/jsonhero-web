'use strict';

var easing = require('@motionone/easing');
var utils = require('@motionone/utils');

const namedEasings = {
    ease: easing.cubicBezier(0.25, 0.1, 0.25, 1.0),
    "ease-in": easing.cubicBezier(0.42, 0.0, 1.0, 1.0),
    "ease-in-out": easing.cubicBezier(0.42, 0.0, 0.58, 1.0),
    "ease-out": easing.cubicBezier(0.0, 0.0, 0.58, 1.0),
};
const functionArgsRegex = /\((.*?)\)/;
function getEasingFunction(definition) {
    // If already an easing function, return
    if (utils.isFunction(definition))
        return definition;
    // If an easing curve definition, return bezier function
    if (utils.isCubicBezier(definition))
        return easing.cubicBezier(...definition);
    // If we have a predefined easing function, return
    const namedEasing = namedEasings[definition];
    if (namedEasing)
        return namedEasing;
    // If this is a steps function, attempt to create easing curve
    if (definition.startsWith("steps")) {
        const args = functionArgsRegex.exec(definition);
        if (args) {
            const argsArray = args[1].split(",");
            return easing.steps(parseFloat(argsArray[0]), argsArray[1].trim());
        }
    }
    return utils.noopReturn;
}

exports.getEasingFunction = getEasingFunction;
