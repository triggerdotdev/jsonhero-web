const identity = (v) => v;
export const createAttractor = (alterDisplacement = identity) => (constant, origin, v) => {
    const displacement = origin - v;
    const springModifiedDisplacement = -(0 - constant + 1) * (0 - alterDisplacement(Math.abs(displacement)));
    return displacement <= 0
        ? origin + springModifiedDisplacement
        : origin - springModifiedDisplacement;
};
export const attract = createAttractor();
export const attractExpo = createAttractor(Math.sqrt);
//# sourceMappingURL=attract.js.map