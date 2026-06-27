import { radiansToDegrees } from './radians-to-degrees';
import { zeroPoint } from './inc';
export const angle = (a, b = zeroPoint) => radiansToDegrees(Math.atan2(b.y - a.y, b.x - a.x));
//# sourceMappingURL=angle.js.map