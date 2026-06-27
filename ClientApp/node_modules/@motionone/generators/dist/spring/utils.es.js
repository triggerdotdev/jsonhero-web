import { defaults } from './defaults.es.js';

const calcDampingRatio = (stiffness = defaults.stiffness, damping = defaults.damping, mass = defaults.mass) => damping / (2 * Math.sqrt(stiffness * mass));

export { calcDampingRatio };
