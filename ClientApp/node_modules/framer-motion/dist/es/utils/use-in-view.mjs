import { __read } from 'tslib';
import { useState, useEffect } from 'react';
import { inView } from '@motionone/dom';

function useInView(ref, _a) {
    var _b = _a === void 0 ? {} : _a, root = _b.root, margin = _b.margin, amount = _b.amount, _c = _b.once, once = _c === void 0 ? false : _c;
    var _d = __read(useState(false), 2), isInView = _d[0], setInView = _d[1];
    useEffect(function () {
        var _a;
        if (!ref.current || (once && isInView))
            return;
        var onEnter = function () {
            setInView(true);
            return once ? undefined : function () { return setInView(false); };
        };
        var options = {
            root: (_a = root === null || root === void 0 ? void 0 : root.current) !== null && _a !== void 0 ? _a : undefined,
            margin: margin,
            amount: amount === "some" ? "any" : amount,
        };
        return inView(ref.current, onEnter, options);
    }, [root, ref, margin, once]);
    return isInView;
}

export { useInView };
