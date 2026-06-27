import sync, { cancelSync } from 'framesync';
import { useContext, useEffect } from 'react';
import { useConstant } from './use-constant.mjs';
import { MotionConfigContext } from '../context/MotionConfigContext.mjs';

var getCurrentTime = typeof performance !== "undefined"
    ? function () { return performance.now(); }
    : function () { return Date.now(); };
function useAnimationFrame(callback) {
    var initialTimestamp = useConstant(getCurrentTime);
    var isStatic = useContext(MotionConfigContext).isStatic;
    useEffect(function () {
        if (isStatic)
            return;
        var provideTimeSinceStart = function (_a) {
            var timestamp = _a.timestamp;
            callback(timestamp - initialTimestamp);
        };
        sync.update(provideTimeSinceStart, true);
        return function () { return cancelSync.update(provideTimeSinceStart); };
    }, [callback]);
}

export { useAnimationFrame };
