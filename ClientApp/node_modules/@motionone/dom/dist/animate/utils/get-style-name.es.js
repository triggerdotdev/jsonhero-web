import { isTransform, asTransformCssVar, transformAlias } from './transforms.es.js';

function getStyleName(key) {
    if (transformAlias[key])
        key = transformAlias[key];
    return isTransform(key) ? asTransformCssVar(key) : key;
}

export { getStyleName };
