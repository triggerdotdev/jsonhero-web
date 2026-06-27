import { __rest } from 'tslib';
import { dispatchViewEvent } from '../utils/events.es.js';
import { inView as inView$1 } from '../../gestures/in-view.es.js';

const inView = {
    isActive: (options) => Boolean(options.inView),
    subscribe: (element, { enable, disable }, { inViewOptions = {} }) => {
        const { once } = inViewOptions, viewOptions = __rest(inViewOptions, ["once"]);
        return inView$1(element, (enterEntry) => {
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

export { inView };
