'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var transforms = require('./transforms.cjs.js');

const isCssVar = (name) => name.startsWith("--");
const registeredProperties = new Set();
function registerCssVariable(name) {
    if (registeredProperties.has(name))
        return;
    registeredProperties.add(name);
    try {
        const { syntax, initialValue } = transforms.transformDefinitions.has(name)
            ? transforms.transformDefinitions.get(name)
            : {};
        CSS.registerProperty({
            name,
            inherits: false,
            syntax,
            initialValue,
        });
    }
    catch (e) { }
}

exports.isCssVar = isCssVar;
exports.registerCssVariable = registerCssVariable;
exports.registeredProperties = registeredProperties;
