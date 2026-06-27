'use strict';

var defaults = require('./defaults.cjs.js');

const calcDampingRatio = (stiffness = defaults.defaults.stiffness, damping = defaults.defaults.damping, mass = defaults.defaults.mass) => damping / (2 * Math.sqrt(stiffness * mass));

exports.calcDampingRatio = calcDampingRatio;
