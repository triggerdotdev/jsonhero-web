export function hydrateKeyframes(keyframes, readInitialValue) {
    for (let i = 0; i < keyframes.length; i++) {
        if (keyframes[i] === null) {
            keyframes[i] = i ? keyframes[i - 1] : readInitialValue();
        }
    }
    return keyframes;
}
export const keyframesList = (keyframes) => Array.isArray(keyframes) ? keyframes : [keyframes];
//# sourceMappingURL=keyframes.js.map