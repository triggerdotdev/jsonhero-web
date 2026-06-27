const progress = (min, max, value) => max - min === 0 ? 1 : (value - min) / (max - min);

export { progress };
