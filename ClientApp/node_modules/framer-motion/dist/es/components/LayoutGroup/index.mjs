import { __read, __assign } from 'tslib';
import * as React from 'react';
import { useContext, useRef, useMemo } from 'react';
import { LayoutGroupContext } from '../../context/LayoutGroupContext.mjs';
import { DeprecatedLayoutGroupContext } from '../../context/DeprecatedLayoutGroupContext.mjs';
import { useForceUpdate } from '../../utils/use-force-update.mjs';
import { nodeGroup } from '../../projection/node/group.mjs';

var shouldInheritGroup = function (inherit) { return inherit === true; };
var shouldInheritId = function (inherit) {
    return shouldInheritGroup(inherit === true) || inherit === "id";
};
var LayoutGroup = function (_a) {
    var _b, _c;
    var children = _a.children, id = _a.id, inheritId = _a.inheritId, _d = _a.inherit, inherit = _d === void 0 ? true : _d;
    // Maintain backwards-compatibility with inheritId until 7.0
    if (inheritId !== undefined)
        inherit = inheritId;
    var layoutGroupContext = useContext(LayoutGroupContext);
    var deprecatedLayoutGroupContext = useContext(DeprecatedLayoutGroupContext);
    var _e = __read(useForceUpdate(), 2), forceRender = _e[0], key = _e[1];
    var context = useRef(null);
    var upstreamId = (_b = layoutGroupContext.id) !== null && _b !== void 0 ? _b : deprecatedLayoutGroupContext;
    if (context.current === null) {
        if (shouldInheritId(inherit) && upstreamId) {
            id = id ? upstreamId + "-" + id : upstreamId;
        }
        context.current = {
            id: id,
            group: shouldInheritGroup(inherit)
                ? (_c = layoutGroupContext === null || layoutGroupContext === void 0 ? void 0 : layoutGroupContext.group) !== null && _c !== void 0 ? _c : nodeGroup()
                : nodeGroup(),
        };
    }
    var memoizedContext = useMemo(function () { return (__assign(__assign({}, context.current), { forceRender: forceRender })); }, [key]);
    return (React.createElement(LayoutGroupContext.Provider, { value: memoizedContext }, children));
};

export { LayoutGroup };
