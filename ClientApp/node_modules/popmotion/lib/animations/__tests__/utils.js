export const syncDriver = (interval = 10) => (update) => {
    let isRunning = true;
    return {
        start: () => {
            setTimeout(() => {
                update(0);
                while (isRunning)
                    update(interval);
            }, 0);
        },
        stop: () => (isRunning = false),
    };
};
//# sourceMappingURL=utils.js.map