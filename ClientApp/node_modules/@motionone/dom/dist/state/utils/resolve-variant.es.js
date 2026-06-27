import { isVariant } from './is-variant.es.js';

function resolveVariant(definition, variants) {
    if (isVariant(definition)) {
        return definition;
    }
    else if (definition && variants) {
        return variants[definition];
    }
}

export { resolveVariant };
