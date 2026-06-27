export function hasReachedTarget(origin, target, current) {
    return ((origin < target && current >= target) ||
        (origin > target && current <= target));
}
//# sourceMappingURL=has-reached-target.js.map