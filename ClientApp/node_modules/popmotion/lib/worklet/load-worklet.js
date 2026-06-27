import { __awaiter } from "tslib";
let isReady = false;
const awaitingReady = [];
export function whenWorkletReady() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isReady) {
            return new Promise((resolve) => {
                awaitingReady.push(resolve);
            });
        }
    });
}
function flushAwaiting() {
    awaitingReady.forEach((resolve) => resolve());
}
export function workletReady() {
    isReady = true;
    flushAwaiting();
}
//# sourceMappingURL=load-worklet.js.map