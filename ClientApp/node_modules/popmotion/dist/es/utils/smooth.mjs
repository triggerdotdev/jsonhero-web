import { smoothFrame } from './smooth-frame.mjs';
import { getFrameData } from 'framesync';

const smooth = (strength = 50) => {
    let previousValue = 0;
    let lastUpdated = 0;
    return (v) => {
        const currentFramestamp = getFrameData().timestamp;
        const timeDelta = currentFramestamp !== lastUpdated ? currentFramestamp - lastUpdated : 0;
        const newValue = timeDelta
            ? smoothFrame(previousValue, v, timeDelta, strength)
            : previousValue;
        lastUpdated = currentFramestamp;
        previousValue = newValue;
        return newValue;
    };
};

export { smooth };
