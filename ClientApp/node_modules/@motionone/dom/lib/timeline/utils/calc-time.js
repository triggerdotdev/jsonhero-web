import { isNumber } from "@motionone/utils";
export function calcNextTime(current, next, prev, labels) {
    var _a;
    if (isNumber(next)) {
        return next;
    }
    else if (next.startsWith("-") || next.startsWith("+")) {
        return Math.max(0, current + parseFloat(next));
    }
    else if (next === "<") {
        return prev;
    }
    else {
        return (_a = labels.get(next)) !== null && _a !== void 0 ? _a : current;
    }
}
//# sourceMappingURL=calc-time.js.map