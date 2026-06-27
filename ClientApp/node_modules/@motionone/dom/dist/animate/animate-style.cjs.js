'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var data = require('./data.cjs.js');
var cssVar = require('./utils/css-var.cjs.js');
var animation = require('@motionone/animation');
var utils = require('@motionone/utils');
var transforms = require('./utils/transforms.cjs.js');
var easing = require('./utils/easing.cjs.js');
var featureDetection = require('./utils/feature-detection.cjs.js');
var keyframes = require('./utils/keyframes.cjs.js');
var style = require('./style.cjs.js');
var getStyleName = require('./utils/get-style-name.cjs.js');
var stopAnimation = require('./utils/stop-animation.cjs.js');

function getDevToolsRecord() {
    return window.__MOTION_DEV_TOOLS_RECORD;
}
function animateStyle(element, key, keyframesDefinition, options = {}) {
    const record = getDevToolsRecord();
    const isRecording = options.record !== false && record;
    let animation$1;
    let { duration = utils.defaults.duration, delay = utils.defaults.delay, endDelay = utils.defaults.endDelay, repeat = utils.defaults.repeat, easing: easing$1 = utils.defaults.easing, direction, offset, allowWebkitAcceleration = false, } = options;
    const data$1 = data.getAnimationData(element);
    let canAnimateNatively = featureDetection.supports.waapi();
    const valueIsTransform = transforms.isTransform(key);
    /**
     * If this is an individual transform, we need to map its
     * key to a CSS variable and update the element's transform style
     */
    valueIsTransform && transforms.addTransformToElement(element, key);
    const name = getStyleName.getStyleName(key);
    const motionValue = data.getMotionValue(data$1.values, name);
    /**
     * Get definition of value, this will be used to convert numerical
     * keyframes into the default value type.
     */
    const definition = transforms.transformDefinitions.get(name);
    /**
     * Stop the current animation, if any. Because this will trigger
     * commitStyles (DOM writes) and we might later trigger DOM reads,
     * this is fired now and we return a factory function to create
     * the actual animation that can get called in batch,
     */
    stopAnimation.stopAnimation(motionValue.animation, !(utils.isEasingGenerator(easing$1) && motionValue.generator) &&
        options.record !== false);
    /**
     * Batchable factory function containing all DOM reads.
     */
    return () => {
        const readInitialValue = () => { var _a, _b; return (_b = (_a = style.style.get(element, name)) !== null && _a !== void 0 ? _a : definition === null || definition === void 0 ? void 0 : definition.initialValue) !== null && _b !== void 0 ? _b : 0; };
        /**
         * Replace null values with the previous keyframe value, or read
         * it from the DOM if it's the first keyframe.
         */
        let keyframes$1 = keyframes.hydrateKeyframes(keyframes.keyframesList(keyframesDefinition), readInitialValue);
        if (utils.isEasingGenerator(easing$1)) {
            const custom = easing$1.createAnimation(keyframes$1, readInitialValue, valueIsTransform, name, motionValue);
            easing$1 = custom.easing;
            if (custom.keyframes !== undefined)
                keyframes$1 = custom.keyframes;
            if (custom.duration !== undefined)
                duration = custom.duration;
        }
        /**
         * If this is a CSS variable we need to register it with the browser
         * before it can be animated natively. We also set it with setProperty
         * rather than directly onto the element.style object.
         */
        if (cssVar.isCssVar(name)) {
            if (featureDetection.supports.cssRegisterProperty()) {
                cssVar.registerCssVariable(name);
            }
            else {
                canAnimateNatively = false;
            }
        }
        /**
         * If we can animate this value with WAAPI, do so. Currently this only
         * feature detects CSS.registerProperty but could check WAAPI too.
         */
        if (canAnimateNatively) {
            /**
             * Convert numbers to default value types. Currently this only supports
             * transforms but it could also support other value types.
             */
            if (definition) {
                keyframes$1 = keyframes$1.map((value) => utils.isNumber(value) ? definition.toDefaultUnit(value) : value);
            }
            /**
             * If this browser doesn't support partial/implicit keyframes we need to
             * explicitly provide one.
             */
            if (keyframes$1.length === 1 &&
                (!featureDetection.supports.partialKeyframes() || isRecording)) {
                keyframes$1.unshift(readInitialValue());
            }
            const animationOptions = {
                delay: utils.time.ms(delay),
                duration: utils.time.ms(duration),
                endDelay: utils.time.ms(endDelay),
                easing: !utils.isEasingList(easing$1) ? easing.convertEasing(easing$1) : undefined,
                direction,
                iterations: repeat + 1,
                fill: "both",
            };
            animation$1 = element.animate({
                [name]: keyframes$1,
                offset,
                easing: utils.isEasingList(easing$1) ? easing$1.map(easing.convertEasing) : undefined,
            }, animationOptions);
            /**
             * Polyfill finished Promise in browsers that don't support it
             */
            if (!animation$1.finished) {
                animation$1.finished = new Promise((resolve, reject) => {
                    animation$1.onfinish = resolve;
                    animation$1.oncancel = reject;
                });
            }
            const target = keyframes$1[keyframes$1.length - 1];
            animation$1.finished
                .then(() => {
                // Apply styles to target
                style.style.set(element, name, target);
                // Ensure fill modes don't persist
                animation$1.cancel();
            })
                .catch(utils.noop);
            /**
             * This forces Webkit to run animations on the main thread by exploiting
             * this condition:
             * https://trac.webkit.org/browser/webkit/trunk/Source/WebCore/platform/graphics/ca/GraphicsLayerCA.cpp?rev=281238#L1099
             *
             * This fixes Webkit's timing bugs, like accelerated animations falling
             * out of sync with main thread animations and massive delays in starting
             * accelerated animations in WKWebView.
             */
            if (!allowWebkitAcceleration)
                animation$1.playbackRate = 1.000001;
            /**
             * If we can't animate the value natively then we can fallback to the numbers-only
             * polyfill for transforms.
             */
        }
        else if (valueIsTransform) {
            /**
             * If any keyframe is a string (because we measured it from the DOM), we need to convert
             * it into a number before passing to the Animation polyfill.
             */
            keyframes$1 = keyframes$1.map((value) => typeof value === "string" ? parseFloat(value) : value);
            /**
             * If we only have a single keyframe, we need to create an initial keyframe by reading
             * the current value from the DOM.
             */
            if (keyframes$1.length === 1) {
                keyframes$1.unshift(parseFloat(readInitialValue()));
            }
            const render = (latest) => {
                if (definition)
                    latest = definition.toDefaultUnit(latest);
                style.style.set(element, name, latest);
            };
            animation$1 = new animation.Animation(render, keyframes$1, Object.assign(Object.assign({}, options), { duration,
                easing: easing$1 }));
        }
        else {
            const target = keyframes$1[keyframes$1.length - 1];
            style.style.set(element, name, definition && utils.isNumber(target)
                ? definition.toDefaultUnit(target)
                : target);
        }
        if (isRecording) {
            record(element, key, keyframes$1, {
                duration,
                delay: delay,
                easing: easing$1,
                repeat,
                offset,
            }, "motion-one");
        }
        motionValue.setAnimation(animation$1);
        return animation$1;
    };
}

exports.animateStyle = animateStyle;
