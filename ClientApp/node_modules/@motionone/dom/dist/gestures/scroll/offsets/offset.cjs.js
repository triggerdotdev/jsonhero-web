'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@motionone/utils');
var edge = require('./edge.cjs.js');

const defaultOffset = [0, 0];
function resolveOffset(offset, containerLength, targetLength, targetInset) {
    let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset;
    let targetPoint = 0;
    let containerPoint = 0;
    if (utils.isNumber(offset)) {
        /**
         * If we're provided offset: [0, 0.5, 1] then each number x should become
         * [x, x], so we default to the behaviour of mapping 0 => 0 of both target
         * and container etc.
         */
        offsetDefinition = [offset, offset];
    }
    else if (utils.isString(offset)) {
        offset = offset.trim();
        if (offset.includes(" ")) {
            offsetDefinition = offset.split(" ");
        }
        else {
            /**
             * If we're provided a definition like "100px" then we want to apply
             * that only to the top of the target point, leaving the container at 0.
             * Whereas a named offset like "end" should be applied to both.
             */
            offsetDefinition = [offset, edge.namedEdges[offset] ? offset : `0`];
        }
    }
    targetPoint = edge.resolveEdge(offsetDefinition[0], targetLength, targetInset);
    containerPoint = edge.resolveEdge(offsetDefinition[1], containerLength);
    return targetPoint - containerPoint;
}

exports.resolveOffset = resolveOffset;
