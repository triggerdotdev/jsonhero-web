import { __rest, __assign } from 'tslib';
import { scroll } from '@motionone/dom';
import { motionValue } from './index.mjs';
import { useConstant } from '../utils/use-constant.mjs';
import { useIsomorphicLayoutEffect } from '../utils/use-isomorphic-effect.mjs';

var createScrollMotionValues = function () { return ({
    scrollX: motionValue(0),
    scrollY: motionValue(0),
    scrollXProgress: motionValue(0),
    scrollYProgress: motionValue(0),
}); };
function useScroll(_a) {
    if (_a === void 0) { _a = {}; }
    var container = _a.container, target = _a.target, options = __rest(_a, ["container", "target"]);
    var values = useConstant(createScrollMotionValues);
    useIsomorphicLayoutEffect(function () {
        return scroll(function (_a) {
            var x = _a.x, y = _a.y;
            values.scrollX.set(x.current);
            values.scrollXProgress.set(x.progress);
            values.scrollY.set(y.current);
            values.scrollYProgress.set(y.progress);
        }, __assign(__assign({}, options), { container: (container === null || container === void 0 ? void 0 : container.current) || undefined, target: (target === null || target === void 0 ? void 0 : target.current) || undefined }));
    }, []);
    return values;
}

export { useScroll };
