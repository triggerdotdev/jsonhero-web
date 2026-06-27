export function compareByTime(a, b) {
    if (a.at === b.at) {
        return a.value === null ? 1 : -1;
    }
    else {
        return a.at - b.at;
    }
}
//# sourceMappingURL=sort.js.map