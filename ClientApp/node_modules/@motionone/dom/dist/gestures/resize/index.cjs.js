'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var handleElement = require('./handle-element.cjs.js');
var handleWindow = require('./handle-window.cjs.js');

function resize(a, b) {
    return typeof a === "function" ? handleWindow.resizeWindow(a) : handleElement.resizeElement(a, b);
}

exports.resize = resize;
