const snap = (points) => {
    if (typeof points === 'number') {
        return (v) => Math.round(v / points) * points;
    }
    else {
        let i = 0;
        const numPoints = points.length;
        return (v) => {
            let lastDistance = Math.abs(points[0] - v);
            for (i = 1; i < numPoints; i++) {
                const point = points[i];
                const distance = Math.abs(point - v);
                if (distance === 0)
                    return point;
                if (distance > lastDistance)
                    return points[i - 1];
                if (i === numPoints - 1)
                    return point;
                lastDistance = distance;
            }
        };
    }
};

export { snap };
