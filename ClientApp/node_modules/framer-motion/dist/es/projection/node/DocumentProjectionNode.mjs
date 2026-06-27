import { createProjectionNode } from './create-projection-node.mjs';
import { addDomEvent } from '../../events/use-dom-event.mjs';

var DocumentProjectionNode = createProjectionNode({
    attachResizeListener: function (ref, notify) { return addDomEvent(ref, "resize", notify); },
    measureScroll: function () { return ({
        x: document.documentElement.scrollLeft || document.body.scrollLeft,
        y: document.documentElement.scrollTop || document.body.scrollTop,
    }); },
    checkIsScrollRoot: function () { return true; },
});

export { DocumentProjectionNode };
