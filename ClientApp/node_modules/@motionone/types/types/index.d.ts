import { MotionValue } from "./MotionValue";
export { MotionValue } from "./MotionValue";
export interface AnimationGeneratorState {
    done: boolean;
    hasReachedTarget: boolean;
    current: number;
    target: number;
}
export type ProgressFunction = (t: number) => void;
export type AnimationGeneratorFactory<Options> = (options: Options) => AnimationGenerator;
export type AnimationGenerator = (t: number) => AnimationGeneratorState;
export type BezierDefinition = readonly [number, number, number, number];
export type PlayState = "idle" | "running" | "paused" | "finished";
export interface BasicAnimationControls {
    /**
     * Play the animation.
     *
     * ```javascript
     * animation.play()
     * ```
     */
    play: VoidFunction;
    /**
     * Pause the animation.
     *
     * ```javascript
     * animation.pause()
     * ```
     */
    pause: VoidFunction;
    commitStyles: VoidFunction;
    /**
     * Cancels the animation and reverts the element to its underlying styles.
     *
     * ```javascript
     * animation.cancel()
     * ```
     */
    cancel: VoidFunction;
    stop?: VoidFunction;
    playState: PlayState;
    finished: Promise<any>;
    /**
     * @internal
     */
    startTime: number | null;
    /**
     * Get/set the current play time of the animation in seconds. This can be used to scrub through the animation.
     *
     * ```javascript
     * const currentTime = animation.currentTime
     * animation.currentTime = 1
     * ```
     */
    currentTime: number | null;
}
/**
 * Animation controls returned from `animate` and `timeline` functions.
 *
 * ```javascript
 * const animation = animate(element, { opacity: 0 })
 * animation.pause()
 * ```
 */
export interface AnimationControls extends BasicAnimationControls {
    /**
     * Stop the animation and set the current value to the element style.
     *
     * ```javascript
     * animation.stop()
     * ```
     */
    stop: VoidFunction;
    /**
     * Immediately completes the animation and commits the final keyframe to the element's styles.
     *
     * ```javascript
     * animation.finish()
     * ```
     */
    finish: VoidFunction;
    /**
     * Reverses the playback of the animation.
     *
     * ```javascript
     * animation.reverse()
     * ```
     *
     * @remarks Currently non-functional.
     *
     * @alpha
     */
    reverse: VoidFunction;
    /**
     * A `Promise` that resolves when the animation has finished.
     *
     * ```javascript
     * await animation.finished
     * ```
     */
    finished: Promise<any>;
    /**
     * Get the current play time of the animation in seconds. This can be especially useful
     * when an animation has used the default duration, or when a timeline has dynamically
     * generated a duration from the provided sequence.
     *
     * This prop is currently **read-only**.
     */
    duration: number;
    /**
     * Get/set the current playback rate of the animation.
     *
     * - `1` is normal time.
     * - `2` doubles the playback rate.
     * - `-1` reverses playback.
     *
     * ```javascript
     * animation.playbackRate = animation.playbackRate * 2
     * ```
     */
    playbackRate: number;
    /**
     * Returns the current state of the animation. Can be `idle`, `running`, `paused` or `finished`.
     */
    playState: AnimationPlayState;
}
export type CustomAnimationSettings = {
    easing: Easing;
    keyframes?: Array<number | string>;
    duration?: number;
};
export type ValueKeyframe = string | number;
export type UnresolvedValueKeyframe = ValueKeyframe | null;
export type Easing = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "step-start" | "step-end" | `steps(${number}, ${"start" | "end"})` | BezierDefinition;
export type EasingGenerator = {
    createAnimation: (keyframes: UnresolvedValueKeyframe[], shouldGenerate?: boolean, readInitialKeyframe?: () => number | string, name?: string, value?: MotionValue) => CustomAnimationSettings;
};
export type KeyframeOptions = {
    /**
     * A duration, in seconds, that the animation will take to complete.
     *
     * @defaultValue `0.3`
     */
    duration?: number;
    /**
     * An easing to use for the whole animation, or list of easings to use between individual keyframes.
     *
     * Accepted `easing` options are:
     *
     * - **Basic easings:** `"linear"`, `"ease"`, `"ease-in"`, `"ease-out"`, `"ease-in-out"`
     * - **[Cubic bezier curve](https://cubic-bezier.com/):** e.g. `[.17,.67,.83,.67]`
     * - **Stepped easing:** e.g. `"steps(2, start)"`
     * - **Custom easing:** A JavaScript easing function, for example [this bounce easing function](https://easings.net/#easeOutBounce).
     *
     * @defaultValue `"ease"`
     */
    easing?: EasingGenerator | Easing | Easing[] | EasingFunction;
    /**
     * The offset of each keyframe, as a number between 0 and 1.
     *
     * The number of `offset` entries must match the number of `keyframes` entries.
     *
     * @defaultValue `[0, 1]`
     */
    offset?: number[];
};
export type OptionResolver<T> = (i: number, total: number) => T;
export type PlaybackOptions = {
    /**
     * A duration, in seconds, that the animation will be delayed before starting.
     *
     * @defaultValue `0`
     */
    delay?: number | OptionResolver<number>;
    /**
     * A duration, in seconds, that the animation will wait at the end before ending.
     *
     * @defaultValue `0`
     */
    endDelay?: number;
    /**
     * A duration, in seconds, that the animation will take to complete.
     *
     * @defaultValue `0.3`
     */
    repeat?: number;
    /**
     * The direction of animation playback. `"normal"`, `"reverse"`, `"alternate"`, or `"alternate-reverse"`.
     *
     * @defaultValue `"normal"`
     */
    direction?: PlaybackDirection;
    /**
     * @internal
     */
    persist?: boolean;
    /**
     * Whether the animation should start automatically.
     *
     * @defaultValue `true`
     */
    autoplay?: boolean;
};
export type DevToolsOptions = {
    record?: boolean;
};
export type AnimationOptions = KeyframeOptions & PlaybackOptions & DevToolsOptions & {
    /**
     * Because of numerous timing bugs in Webkit's accelerated animations, these are disabled by default in Webkit-powered browsers.
     *
     * However, if the your animation is being disrupted by heavy processing, you can allow acceleration with this setting.
     * It's advised you test these animations thoroughly in both Safari and iOS Chrome.
     *
     * @defaultValue `false`
     */
    allowWebkitAcceleration?: boolean;
};
export interface DevTools {
    record: (element: HTMLElement, valueName: string, keyframes: any, options: AnimationOptions) => void;
    isRecording: boolean;
}
export type EasingFunction = (t: number) => number;
//# sourceMappingURL=index.d.ts.map