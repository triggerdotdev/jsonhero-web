import { velocityPerSecond } from '@motionone/utils';

const sampleT = 5; // ms
function calcGeneratorVelocity(resolveValue, t, current) {
    const prevT = Math.max(t - sampleT, 0);
    return velocityPerSecond(current - resolveValue(prevT), t - prevT);
}

export { calcGeneratorVelocity };
