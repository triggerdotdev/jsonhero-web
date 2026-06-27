import { degreesToRadians } from './degrees-to-radians';
export const pointFromVector = (origin, angle, distance) => {
    angle = degreesToRadians(angle);
    return {
        x: distance * Math.cos(angle) + origin.x,
        y: distance * Math.sin(angle) + origin.y
    };
};
//# sourceMappingURL=point-from-vector.js.map