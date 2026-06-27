import { __rest } from "tslib";
import { invariant } from "hey-listen";
import { noop } from "@motionone/utils";
import { animateStyle } from "../animate/animate-style";
import { style } from "../animate/style";
import { getOptions } from "../animate/utils/options";
import { hasChanged } from "./utils/has-changed";
import { resolveVariant } from "./utils/resolve-variant";
import { scheduleAnimation, unscheduleAnimation } from "./utils/schedule";
import { inView } from "./gestures/in-view";
import { hover } from "./gestures/hover";
import { press } from "./gestures/press";
import { motionEvent } from "./utils/events";
const gestures = { inView, hover, press };
/**
 * A list of state types, in priority order. If a value is defined in
 * a righter-most type, it will override any definition in a lefter-most.
 */
const stateTypes = ["initial", "animate", ...Object.keys(gestures), "exit"];
/**
 * A global store of all generated motion states. This can be used to lookup
 * a motion state for a given Element.
 */
export const mountedStates = new WeakMap();
export function createMotionState(options = {}, parent) {
    /**
     * The element represented by the motion state. This is an empty reference
     * when we create the state to support SSR and allow for later mounting
     * in view libraries.
     *
     * @ts-ignore
     */
    let element;
    /**
     * Calculate a depth that we can use to order motion states by tree depth.
     */
    let depth = parent ? parent.getDepth() + 1 : 0;
    /**
     * Track which states are currently active.
     */
    const activeStates = { initial: true, animate: true };
    /**
     * A map of functions that, when called, will remove event listeners for
     * a given gesture.
     */
    const gestureSubscriptions = {};
    /**
     * Initialise a context to share through motion states. This
     * will be populated by variant names (if any).
     */
    const context = {};
    for (const name of stateTypes) {
        context[name] =
            typeof options[name] === "string"
                ? options[name]
                : parent === null || parent === void 0 ? void 0 : parent.getContext()[name];
    }
    /**
     * If initial is set to false we use the animate prop as the initial
     * animation state.
     */
    const initialVariantSource = options.initial === false ? "animate" : "initial";
    /**
     * Destructure an initial target out from the resolved initial variant.
     */
    let _a = resolveVariant(options[initialVariantSource] || context[initialVariantSource], options.variants) || {}, { transition: initialTransition } = _a, target = __rest(_a, ["transition"]);
    /**
     * The base target is a cached map of values that we'll use to animate
     * back to if a value is removed from all active state types. This
     * is usually the initial value as read from the DOM, for instance if
     * it hasn't been defined in initial.
     */
    const baseTarget = Object.assign({}, target);
    /**
     * A generator that will be processed by the global animation scheduler.
     * This yeilds when it switches from reading the DOM to writing to it
     * to prevent layout thrashing.
     */
    function* animateUpdates() {
        var _a, _b;
        const prevTarget = target;
        target = {};
        const resolvedVariants = {};
        const enteringInto = {};
        const animationOptions = {};
        for (const name of stateTypes) {
            if (!activeStates[name])
                continue;
            const variant = resolveVariant(options[name]);
            if (!variant)
                continue;
            resolvedVariants[name] = variant;
            for (const key in variant) {
                if (key === "transition")
                    continue;
                target[key] = variant[key];
                animationOptions[key] = getOptions((_b = (_a = variant.transition) !== null && _a !== void 0 ? _a : options.transition) !== null && _b !== void 0 ? _b : {}, key);
                /**
                 * Mark which state type this value is animating into.
                 */
                enteringInto[key] = name;
            }
        }
        const allTargetKeys = new Set([
            ...Object.keys(target),
            ...Object.keys(prevTarget),
        ]);
        const animationFactories = [];
        allTargetKeys.forEach((key) => {
            var _a;
            if (target[key] === undefined) {
                target[key] = baseTarget[key];
            }
            if (hasChanged(prevTarget[key], target[key])) {
                (_a = baseTarget[key]) !== null && _a !== void 0 ? _a : (baseTarget[key] = style.get(element, key));
                animationFactories.push(animateStyle(element, key, target[key], animationOptions[key]));
            }
        });
        // Wait for all animation states to read from the DOM
        yield;
        const animations = animationFactories
            .map((factory) => factory())
            .filter(Boolean);
        if (!animations.length)
            return;
        const animationTarget = target;
        element.dispatchEvent(motionEvent("motionstart", animationTarget));
        Promise.all(animations.map((animation) => animation.finished))
            .then(() => {
            element.dispatchEvent(motionEvent("motioncomplete", animationTarget));
        })
            .catch(noop);
    }
    const setGesture = (name, isActive) => () => {
        activeStates[name] = isActive;
        scheduleAnimation(state);
    };
    const updateGestureSubscriptions = () => {
        for (const name in gestures) {
            const isGestureActive = gestures[name].isActive(options);
            const remove = gestureSubscriptions[name];
            if (isGestureActive && !remove) {
                gestureSubscriptions[name] = gestures[name].subscribe(element, {
                    enable: setGesture(name, true),
                    disable: setGesture(name, false),
                }, options);
            }
            else if (!isGestureActive && remove) {
                remove();
                delete gestureSubscriptions[name];
            }
        }
    };
    const state = {
        update: (newOptions) => {
            if (!element)
                return;
            options = newOptions;
            updateGestureSubscriptions();
            scheduleAnimation(state);
        },
        setActive: (name, isActive) => {
            if (!element)
                return;
            activeStates[name] = isActive;
            scheduleAnimation(state);
        },
        animateUpdates,
        getDepth: () => depth,
        getTarget: () => target,
        getOptions: () => options,
        getContext: () => context,
        mount: (newElement) => {
            invariant(Boolean(newElement), "Animation state must be mounted with valid Element");
            element = newElement;
            mountedStates.set(element, state);
            updateGestureSubscriptions();
            return () => {
                mountedStates.delete(element);
                unscheduleAnimation(state);
                for (const key in gestureSubscriptions) {
                    gestureSubscriptions[key]();
                }
            };
        },
        isMounted: () => Boolean(element),
    };
    return state;
}
//# sourceMappingURL=index.js.map