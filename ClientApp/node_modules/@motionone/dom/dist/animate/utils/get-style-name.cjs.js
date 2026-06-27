'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var transforms = require('./transforms.cjs.js');

function getStyleName(key) {
    if (transforms.transformAlias[key])
        key = transforms.transformAlias[key];
    return transforms.isTransform(key) ? transforms.asTransformCssVar(key) : key;
}

exports.getStyleName = getStyleName;
