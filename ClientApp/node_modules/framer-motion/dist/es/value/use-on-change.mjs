import { isMotionValue } from './utils/is-motion-value.mjs';
import { useIsomorphicLayoutEffect } from '../utils/use-isomorphic-effect.mjs';

function useOnChange(value, callback) {
    useIsomorphicLayoutEffect(function () {
        if (isMotionValue(value))
            return value.onChange(callback);
    }, [callback]);
}
function useMultiOnChange(values, handler) {
    useIsomorphicLayoutEffect(function () {
        var subscriptions = values.map(function (value) { return value.onChange(handler); });
        return function () { return subscriptions.forEach(function (unsubscribe) { return unsubscribe(); }); };
    });
}

export { useMultiOnChange, useOnChange };
