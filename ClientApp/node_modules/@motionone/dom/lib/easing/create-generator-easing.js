import { pregenerateKeyframes, calcGeneratorVelocity, } from "@motionone/generators";
export function createGeneratorEasing(createGenerator) {
    const keyframesCache = new WeakMap();
    return (options = {}) => {
        const generatorCache = new Map();
        const getGenerator = (from = 0, to = 100, velocity = 0, isScale = false) => {
            const key = `${from}-${to}-${velocity}-${isScale}`;
            if (!generatorCache.has(key)) {
                generatorCache.set(key, createGenerator(Object.assign({ from,
                    to,
                    velocity, restSpeed: isScale ? 0.05 : 2, restDistance: isScale ? 0.01 : 0.5 }, options)));
            }
            return generatorCache.get(key);
        };
        const getKeyframes = (generator) => {
            if (!keyframesCache.has(generator)) {
                keyframesCache.set(generator, pregenerateKeyframes(generator));
            }
            return keyframesCache.get(generator);
        };
        return {
            createAnimation: (keyframes, getOrigin, canUseGenerator, name, motionValue) => {
                var _a, _b;
                let settings;
                const numKeyframes = keyframes.length;
                let shouldUseGenerator = canUseGenerator &&
                    numKeyframes <= 2 &&
                    keyframes.every(isNumberOrNull);
                if (shouldUseGenerator) {
                    const target = keyframes[numKeyframes - 1];
                    const unresolvedOrigin = numKeyframes === 1 ? null : keyframes[0];
                    let velocity = 0;
                    let origin = 0;
                    const prevGenerator = motionValue === null || motionValue === void 0 ? void 0 : motionValue.generator;
                    if (prevGenerator) {
                        /**
                         * If we have a generator for this value we can use it to resolve
                         * the animations's current value and velocity.
                         */
                        const { animation, generatorStartTime } = motionValue;
                        const startTime = (animation === null || animation === void 0 ? void 0 : animation.startTime) || generatorStartTime || 0;
                        const currentTime = (animation === null || animation === void 0 ? void 0 : animation.currentTime) || performance.now() - startTime;
                        const prevGeneratorCurrent = prevGenerator(currentTime).current;
                        origin = (_a = unresolvedOrigin) !== null && _a !== void 0 ? _a : prevGeneratorCurrent;
                        if (numKeyframes === 1 ||
                            (numKeyframes === 2 && keyframes[0] === null)) {
                            velocity = calcGeneratorVelocity((t) => prevGenerator(t).current, currentTime, prevGeneratorCurrent);
                        }
                    }
                    else {
                        origin = (_b = unresolvedOrigin) !== null && _b !== void 0 ? _b : parseFloat(getOrigin());
                    }
                    const generator = getGenerator(origin, target, velocity, name === null || name === void 0 ? void 0 : name.includes("scale"));
                    const keyframesMetadata = getKeyframes(generator);
                    settings = Object.assign(Object.assign({}, keyframesMetadata), { easing: "linear" });
                    // TODO Add test for this
                    if (motionValue) {
                        motionValue.generator = generator;
                        motionValue.generatorStartTime = performance.now();
                    }
                }
                else {
                    const keyframesMetadata = getKeyframes(getGenerator(0, 100));
                    settings = {
                        easing: "ease",
                        duration: keyframesMetadata.overshootDuration,
                    };
                }
                return settings;
            },
        };
    };
}
const isNumberOrNull = (value) => typeof value !== "string";
//# sourceMappingURL=create-generator-easing.js.map