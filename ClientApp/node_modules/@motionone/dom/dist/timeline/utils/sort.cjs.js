'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function compareByTime(a, b) {
    if (a.at === b.at) {
        return a.value === null ? 1 : -1;
    }
    else {
        return a.at - b.at;
    }
}

exports.compareByTime = compareByTime;
