'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isVariant = require('./is-variant.cjs.js');

function resolveVariant(definition, variants) {
    if (isVariant.isVariant(definition)) {
        return definition;
    }
    else if (definition && variants) {
        return variants[definition];
    }
}

exports.resolveVariant = resolveVariant;
