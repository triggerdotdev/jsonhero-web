const identity = (v) => v;
const createAttractor = (alterDisplacement = identity) => (constant, origin, v) => {
    const displacement = origin - v;
    const springModifiedDisplacement = -(0 - constant + 1) * (0 - alterDisplacement(Math.abs(displacement)));
    return displacement <= 0
        ? origin + springModifiedDisplacement
        : origin - springModifiedDisplacement;
};
const attract = createAttractor();
const attractExpo = createAttractor(Math.sqrt);

export { attract, attractExpo, createAttractor };
