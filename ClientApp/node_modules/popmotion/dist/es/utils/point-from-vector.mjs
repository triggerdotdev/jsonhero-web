import { degreesToRadians } from './degrees-to-radians.mjs';

const pointFromVector = (origin, angle, distance) => {
    angle = degreesToRadians(angle);
    return {
        x: distance * Math.cos(angle) + origin.x,
        y: distance * Math.sin(angle) + origin.y
    };
};

export { pointFromVector };
