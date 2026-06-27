function hasChanged(a, b) {
    if (typeof a !== typeof b)
        return true;
    if (Array.isArray(a) && Array.isArray(b))
        return !shallowCompare(a, b);
    return a !== b;
}
function shallowCompare(next, prev) {
    const prevLength = prev.length;
    if (prevLength !== next.length)
        return false;
    for (let i = 0; i < prevLength; i++) {
        if (prev[i] !== next[i])
            return false;
    }
    return true;
}

export { hasChanged, shallowCompare };
