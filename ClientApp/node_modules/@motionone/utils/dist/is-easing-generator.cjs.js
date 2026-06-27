'use strict';

const isEasingGenerator = (easing) => typeof easing === "object" &&
    Boolean(easing.createAnimation);

exports.isEasingGenerator = isEasingGenerator;
