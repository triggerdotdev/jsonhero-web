import { noopReturn } from "@motionone/utils";
import { updateScrollInfo } from "./info";
import { resolveOffsets } from "./offsets/index";
function measure(container, target = container, info) {
    /**
     * Find inset of target within scrollable container
     */
    info.x.targetOffset = 0;
    info.y.targetOffset = 0;
    if (target !== container) {
        let node = target;
        while (node && node != container) {
            info.x.targetOffset += node.offsetLeft;
            info.y.targetOffset += node.offsetTop;
            node = node.offsetParent;
        }
    }
    info.x.targetLength =
        target === container ? target.scrollWidth : target.clientWidth;
    info.y.targetLength =
        target === container ? target.scrollHeight : target.clientHeight;
    info.x.containerLength = container.clientWidth;
    info.y.containerLength = container.clientHeight;
}
export function createOnScrollHandler(element, onScroll, info, options = {}) {
    const axis = options.axis || "y";
    return {
        measure: () => measure(element, options.target, info),
        update: (time) => {
            updateScrollInfo(element, info, time);
            if (options.offset || options.target) {
                resolveOffsets(element, info, options);
            }
        },
        notify: typeof onScroll === "function"
            ? () => onScroll(info)
            : scrubAnimation(onScroll, info[axis]),
    };
}
function scrubAnimation(controls, axisInfo) {
    controls.pause();
    controls.forEachNative((animation, { easing }) => {
        var _a, _b;
        if (animation.updateDuration) {
            if (!easing)
                animation.easing = noopReturn;
            animation.updateDuration(1);
        }
        else {
            const timingOptions = { duration: 1000 };
            if (!easing)
                timingOptions.easing = "linear";
            (_b = (_a = animation.effect) === null || _a === void 0 ? void 0 : _a.updateTiming) === null || _b === void 0 ? void 0 : _b.call(_a, timingOptions);
        }
    });
    return () => {
        controls.currentTime = axisInfo.progress;
    };
}
//# sourceMappingURL=on-scroll-handler.js.map