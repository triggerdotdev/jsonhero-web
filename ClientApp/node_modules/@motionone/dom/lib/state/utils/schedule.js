import { addUniqueItem, removeItem } from "@motionone/utils";
let scheduled = undefined;
function processScheduledAnimations() {
    if (!scheduled)
        return;
    const generators = scheduled.sort(compareByDepth).map(fireAnimateUpdates);
    generators.forEach(fireNext);
    generators.forEach(fireNext);
    scheduled = undefined;
}
export function scheduleAnimation(state) {
    if (!scheduled) {
        scheduled = [state];
        requestAnimationFrame(processScheduledAnimations);
    }
    else {
        addUniqueItem(scheduled, state);
    }
}
export function unscheduleAnimation(state) {
    scheduled && removeItem(scheduled, state);
}
const compareByDepth = (a, b) => a.getDepth() - b.getDepth();
const fireAnimateUpdates = (state) => state.animateUpdates();
const fireNext = (iterator) => iterator.next();
//# sourceMappingURL=schedule.js.map