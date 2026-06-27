import { __read } from 'tslib';
import sync from 'framesync';
import { useState, useCallback } from 'react';
import { useIsMounted } from './use-is-mounted.mjs';

function useForceUpdate() {
    var isMounted = useIsMounted();
    var _a = __read(useState(0), 2), forcedRenderCount = _a[0], setForcedRenderCount = _a[1];
    var forceRender = useCallback(function () {
        isMounted.current && setForcedRenderCount(forcedRenderCount + 1);
    }, [forcedRenderCount]);
    /**
     * Defer this to the end of the next animation frame in case there are multiple
     * synchronous calls.
     */
    var deferredForceRender = useCallback(function () { return sync.postRender(forceRender); }, [forceRender]);
    return [deferredForceRender, forcedRenderCount];
}

export { useForceUpdate };
