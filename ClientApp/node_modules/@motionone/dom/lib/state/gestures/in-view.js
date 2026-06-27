import { __rest } from "tslib";
import { dispatchViewEvent } from "../utils/events";
import { inView as inViewDom } from "../../gestures/in-view";
export const inView = {
    isActive: (options) => Boolean(options.inView),
    subscribe: (element, { enable, disable }, { inViewOptions = {} }) => {
        const { once } = inViewOptions, viewOptions = __rest(inViewOptions, ["once"]);
        return inViewDom(element, (enterEntry) => {
            enable();
            dispatchViewEvent(element, "viewenter", enterEntry);
            if (!once) {
                return (leaveEntry) => {
                    disable();
                    dispatchViewEvent(element, "viewleave", leaveEntry);
                };
            }
        }, viewOptions);
    },
};
//# sourceMappingURL=in-view.js.map