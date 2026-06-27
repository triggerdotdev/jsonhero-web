import { isCssVar } from "./utils/css-var";
import { getStyleName } from "./utils/get-style-name";
import { transformDefinitions } from "./utils/transforms";
export const style = {
    get: (element, name) => {
        name = getStyleName(name);
        let value = isCssVar(name)
            ? element.style.getPropertyValue(name)
            : getComputedStyle(element)[name];
        if (!value && value !== 0) {
            const definition = transformDefinitions.get(name);
            if (definition)
                value = definition.initialValue;
        }
        return value;
    },
    set: (element, name, value) => {
        name = getStyleName(name);
        if (isCssVar(name)) {
            ;
            element.style.setProperty(name, value);
        }
        else {
            ;
            element.style[name] = value;
        }
    },
};
//# sourceMappingURL=style.js.map