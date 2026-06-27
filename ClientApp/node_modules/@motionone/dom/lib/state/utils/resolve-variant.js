import { isVariant } from "./is-variant";
export function resolveVariant(definition, variants) {
    if (isVariant(definition)) {
        return definition;
    }
    else if (definition && variants) {
        return variants[definition];
    }
}
//# sourceMappingURL=resolve-variant.js.map