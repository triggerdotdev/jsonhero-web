import { isPoint } from './is-point.mjs';

const isPoint3D = (point) => isPoint(point) && point.hasOwnProperty('z');

export { isPoint3D };
