import { transformDefinitions } from "./transforms";
export const isCssVar = (name) => name.startsWith("--");
export const registeredProperties = new Set();
export function registerCssVariable(name) {
    if (registeredProperties.has(name))
        return;
    registeredProperties.add(name);
    try {
        const { syntax, initialValue } = transformDefinitions.has(name)
            ? transformDefinitions.get(name)
            : {};
        CSS.registerProperty({
            name,
            inherits: false,
            syntax,
            initialValue,
        });
    }
    catch (e) { }
}
//# sourceMappingURL=css-var.js.map