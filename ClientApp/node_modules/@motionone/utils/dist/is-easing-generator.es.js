const isEasingGenerator = (easing) => typeof easing === "object" &&
    Boolean(easing.createAnimation);

export { isEasingGenerator };
