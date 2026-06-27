'use strict';

var array = require('./array.cjs.js');
var clamp = require('./clamp.cjs.js');
var defaults = require('./defaults.cjs.js');
var easing = require('./easing.cjs.js');
var interpolate = require('./interpolate.cjs.js');
var isCubicBezier = require('./is-cubic-bezier.cjs.js');
var isEasingGenerator = require('./is-easing-generator.cjs.js');
var isEasingList = require('./is-easing-list.cjs.js');
var isFunction = require('./is-function.cjs.js');
var isNumber = require('./is-number.cjs.js');
var isString = require('./is-string.cjs.js');
var mix = require('./mix.cjs.js');
var noop = require('./noop.cjs.js');
var offset = require('./offset.cjs.js');
var progress = require('./progress.cjs.js');
var time = require('./time.cjs.js');
var velocity = require('./velocity.cjs.js');
var wrap = require('./wrap.cjs.js');



exports.addUniqueItem = array.addUniqueItem;
exports.removeItem = array.removeItem;
exports.clamp = clamp.clamp;
exports.defaults = defaults.defaults;
exports.getEasingForSegment = easing.getEasingForSegment;
exports.interpolate = interpolate.interpolate;
exports.isCubicBezier = isCubicBezier.isCubicBezier;
exports.isEasingGenerator = isEasingGenerator.isEasingGenerator;
exports.isEasingList = isEasingList.isEasingList;
exports.isFunction = isFunction.isFunction;
exports.isNumber = isNumber.isNumber;
exports.isString = isString.isString;
exports.mix = mix.mix;
exports.noop = noop.noop;
exports.noopReturn = noop.noopReturn;
exports.defaultOffset = offset.defaultOffset;
exports.fillOffset = offset.fillOffset;
exports.progress = progress.progress;
exports.time = time.time;
exports.velocityPerSecond = velocity.velocityPerSecond;
exports.wrap = wrap.wrap;
