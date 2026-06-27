'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@motionone/utils');
var transforms = require('./transforms.cjs.js');

function createStyles(keyframes) {
    const initialKeyframes = {};
    const transformKeys = [];
    for (let key in keyframes) {
        const value = keyframes[key];
        if (transforms.isTransform(key)) {
            if (transforms.transformAlias[key])
                key = transforms.transformAlias[key];
            transformKeys.push(key);
            key = transforms.asTransformCssVar(key);
        }
        let initialKeyframe = Array.isArray(value) ? value[0] : value;
        /**
         * If this is a number and we have a default value type, convert the number
         * to this type.
         */
        const definition = transforms.transformDefinitions.get(key);
        if (definition) {
            initialKeyframe = utils.isNumber(value)
                ? definition.toDefaultUnit(value)
                : value;
        }
        initialKeyframes[key] = initialKeyframe;
    }
    if (transformKeys.length) {
        initialKeyframes.transform = transforms.buildTransformTemplate(transformKeys);
    }
    return initialKeyframes;
}

exports.createStyles = createStyles;
