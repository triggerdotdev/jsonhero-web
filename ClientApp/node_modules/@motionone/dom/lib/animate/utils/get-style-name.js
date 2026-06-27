import { asTransformCssVar, isTransform, transformAlias } from "./transforms";
export function getStyleName(key) {
    if (transformAlias[key])
        key = transformAlias[key];
    return isTransform(key) ? asTransformCssVar(key) : key;
}
//# sourceMappingURL=get-style-name.js.map