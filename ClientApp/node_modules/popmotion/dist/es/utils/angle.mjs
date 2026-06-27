import { radiansToDegrees } from './radians-to-degrees.mjs';
import { zeroPoint } from './inc.mjs';

const angle = (a, b = zeroPoint) => radiansToDegrees(Math.atan2(b.y - a.y, b.x - a.x));

export { angle };
