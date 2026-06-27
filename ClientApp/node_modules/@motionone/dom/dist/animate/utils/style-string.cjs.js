'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styleObject = require('./style-object.cjs.js');

const camelLetterToPipeLetter = (letter) => `-${letter.toLowerCase()}`;
const camelToPipeCase = (str) => str.replace(/[A-Z]/g, camelLetterToPipeLetter);
function createStyleString(target = {}) {
    const styles = styleObject.createStyles(target);
    let style = "";
    for (const key in styles) {
        style += key.startsWith("--") ? key : camelToPipeCase(key);
        style += `: ${styles[key]}; `;
    }
    return style;
}

exports.createStyleString = createStyleString;
