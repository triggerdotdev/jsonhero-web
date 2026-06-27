/// <reference types="react" />
import * as React$1 from 'react';
import { RefObject, CSSProperties, SVGAttributes, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, ReactHTML, DetailedHTMLFactory, HTMLAttributes, useEffect } from 'react';
import { Easing as Easing$1, SpringOptions } from 'popmotion';
import { ScrollOptions, InViewOptions } from '@motionone/dom';

/**
 * @public
 */
declare type Subscriber<T> = (v: T) => void;
/**
 * @public
 */
declare type PassiveEffect<T> = (v: T, safeSetter: (v: T) => void) => void;
/**
 * `MotionValue` is used to track the state and velocity of motion values.
 *
 * @public
 */
declare class MotionValue<V = any> {
    /**
     * This will be replaced by the build step with the latest version number.
     * When MotionValues are provided to motion components, warn if versions are mixed.
     */
    version: string;
    /**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     *
     * When calling `onChange` inside a React component, it should be wrapped with the
     * `useEffect` hook. As it returns an unsubscribe function, this should be returned
     * from the `useEffect` function to ensure you don't add duplicate subscribers..
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.onChange(updateOpacity)
     *     const unsubscribeY = y.onChange(updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <motion.div style={{ x }} />
     * }
     * ```
     *
     * @privateRemarks
     *
     * We could look into a `useOnChange` hook if the above lifecycle management proves confusing.
     *
     * ```jsx
     * useOnChange(x, () => {})
     * ```
     *
     * @param subscriber - A function that receives the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @public
     */
    onChange(subscription: Subscriber<V>): () => void;
    clearListeners(): void;
    /**
     * Sets the state of the `MotionValue`.
     *
     * @remarks
     *
     * ```jsx
     * const x = useMotionValue(0)
     * x.set(10)
     * ```
     *
     * @param latest - Latest value to set.
     * @param render - Whether to notify render subscribers. Defaults to `true`
     *
     * @public
     */
    set(v: V, render?: boolean): void;
    updateAndNotify: (v: V, render?: boolean) => void;
    /**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     *
     * @public
     */
    get(): V;
    /**
     * @public
     */
    getPrevious(): V;
    /**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     *
     * @public
     */
    getVelocity(): number;
    hasAnimated: boolean;
    /**
     * Stop the currently active animation.
     *
     * @public
     */
    stop(): void;
    /**
     * Returns `true` if this value is currently animating.
     *
     * @public
     */
    isAnimating(): boolean;
    private clearAnimation;
    /**
     * Destroy and clean up subscribers to this `MotionValue`.
     *
     * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
     * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
     * created a `MotionValue` via the `motionValue` function.
     *
     * @public
     */
    destroy(): void;
}
declare function motionValue<V>(init: V): MotionValue<V>;

/**
 * @public
 */
declare type ControlsAnimationDefinition = string | string[] | TargetAndTransition | TargetResolver;
/**
 * @public
 */
interface AnimationControls {
    /**
     * Starts an animation on all linked components.
     *
     * @remarks
     *
     * ```jsx
     * controls.start("variantLabel")
     * controls.start({
     *   x: 0,
     *   transition: { duration: 1 }
     * })
     * ```
     *
     * @param definition - Properties or variant label to animate to
     * @param transition - Optional `transtion` to apply to a variant
     * @returns - A `Promise` that resolves when all animations have completed.
     *
     * @public
     */
    start(definition: ControlsAnimationDefinition, transitionOverride?: Transition): Promise<any>;
    /**
     * Instantly set to a set of properties or a variant.
     *
     * ```jsx
     * // With properties
     * controls.set({ opacity: 0 })
     *
     * // With variants
     * controls.set("hidden")
     * ```
     *
     * @privateRemarks
     * We could perform a similar trick to `.start` where this can be called before mount
     * and we maintain a list of of pending actions that get applied on mount. But the
     * expectation of `set` is that it happens synchronously and this would be difficult
     * to do before any children have even attached themselves. It's also poor practise
     * and we should discourage render-synchronous `.start` calls rather than lean into this.
     *
     * @public
     */
    set(definition: ControlsAnimationDefinition): void;
    /**
     * Stops animations on all linked components.
     *
     * ```jsx
     * controls.stop()
     * ```
     *
     * @public
     */
    stop(): void;
    mount(): () => void;
}

interface Point {
    x: number;
    y: number;
}
interface Axis {
    min: number;
    max: number;
}
interface Box {
    x: Axis;
    y: Axis;
}
interface BoundingBox {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
interface AxisDelta {
    translate: number;
    scale: number;
    origin: number;
    originPoint: number;
}
interface Delta {
    x: AxisDelta;
    y: AxisDelta;
}
declare type TransformPoint = (point: Point) => Point;

/**
 * Passed in to pan event handlers like `onPan` the `PanInfo` object contains
 * information about the current state of the tap gesture such as its
 * `point`, `delta`, `offset` and `velocity`.
 *
 * ```jsx
 * <motion.div onPan={(event, info) => {
 *   console.log(info.point.x, info.point.y)
 * }} />
 * ```
 *
 * @public
 */
interface PanInfo {
    /**
     * Contains `x` and `y` values for the current pan position relative
     * to the device or page.
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <motion.div onPan={onPan} />
     * ```
     *
     * @public
     */
    point: Point;
    /**
     * Contains `x` and `y` values for the distance moved since
     * the last event.
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.delta.x, info.delta.y)
     * }
     *
     * <motion.div onPan={onPan} />
     * ```
     *
     * @public
     */
    delta: Point;
    /**
     * Contains `x` and `y` values for the distance moved from
     * the first pan event.
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.offset.x, info.offset.y)
     * }
     *
     * <motion.div onPan={onPan} />
     * ```
     *
     * @public
     */
    offset: Point;
    /**
     * Contains `x` and `y` values for the current velocity of the pointer, in px/ms.
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.velocity.x, info.velocity.y)
     * }
     *
     * <motion.div onPan={onPan} />
     * ```
     *
     * @public
     */
    velocity: Point;
}

interface DragControlOptions {
    snapToCursor?: boolean;
    cursorProgress?: Point;
}

/**
 * Can manually trigger a drag gesture on one or more `drag`-enabled `motion` components.
 *
 * ```jsx
 * const dragControls = useDragControls()
 *
 * function startDrag(event) {
 *   dragControls.start(event, { snapToCursor: true })
 * }
 *
 * return (
 *   <>
 *     <div onPointerDown={startDrag} />
 *     <motion.div drag="x" dragControls={dragControls} />
 *   </>
 * )
 * ```
 *
 * @public
 */
declare class DragControls {
    private componentControls;
    /**
     * Start a drag gesture on every `motion` component that has this set of drag controls
     * passed into it via the `dragControls` prop.
     *
     * ```jsx
     * dragControls.start(e, {
     *   snapToCursor: true
     * })
     * ```
     *
     * @param event - PointerEvent
     * @param options - Options
     *
     * @public
     */
    start(event: React$1.MouseEvent | React$1.TouchEvent | React$1.PointerEvent | MouseEvent | TouchEvent | PointerEvent, options?: DragControlOptions): void;
}
/**
 * Usually, dragging is initiated by pressing down on a `motion` component with a `drag` prop
 * and moving it. For some use-cases, for instance clicking at an arbitrary point on a video scrubber, we
 * might want to initiate that dragging from a different component than the draggable one.
 *
 * By creating a `dragControls` using the `useDragControls` hook, we can pass this into
 * the draggable component's `dragControls` prop. It exposes a `start` method
 * that can start dragging from pointer events on other components.
 *
 * ```jsx
 * const dragControls = useDragControls()
 *
 * function startDrag(event) {
 *   dragControls.start(event, { snapToCursor: true })
 * }
 *
 * return (
 *   <>
 *     <div onPointerDown={startDrag} />
 *     <motion.div drag="x" dragControls={dragControls} />
 *   </>
 * )
 * ```
 *
 * @public
 */
declare function useDragControls(): DragControls;

declare type DragElastic = boolean | number | Partial<BoundingBox>;
/**
 * @public
 */
interface DragHandlers {
    /**
     * Callback function that fires when dragging starts.
     *
     * ```jsx
     * <motion.div
     *   drag
     *   onDragStart={
     *     (event, info) => console.log(info.point.x, info.point.y)
     *   }
     * />
     * ```
     *
     * @public
     */
    onDragStart?(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
    /**
     * Callback function that fires when dragging ends.
     *
     * ```jsx
     * <motion.div
     *   drag
     *   onDragEnd={
     *     (event, info) => console.log(info.point.x, info.point.y)
     *   }
     * />
     * ```
     *
     * @public
     */
    onDragEnd?(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
    /**
     * Callback function that fires when the component is dragged.
     *
     * ```jsx
     * <motion.div
     *   drag
     *   onDrag={
     *     (event, info) => console.log(info.point.x, info.point.y)
     *   }
     * />
     * ```
     *
     * @public
     */
    onDrag?(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
    /**
     * Callback function that fires a drag direction is determined.
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragDirectionLock
     *   onDirectionLock={axis => console.log(axis)}
     * />
     * ```
     *
     * @public
     */
    onDirectionLock?(axis: "x" | "y"): void;
    /**
     * Callback function that fires when drag momentum/bounce transition finishes.
     *
     * ```jsx
     * <motion.div
     *   drag
     *   onDragTransitionEnd={() => console.log('Drag transition complete')}
     * />
     * ```
     *
     * @public
     */
    onDragTransitionEnd?(): void;
}
/**
 * @public
 */
declare type InertiaOptions = Partial<Omit<Inertia, "velocity" | "type">>;
/**
 * @public
 */
interface DraggableProps extends DragHandlers {
    /**
     * Enable dragging for this element. Set to `false` by default.
     * Set `true` to drag in both directions.
     * Set `"x"` or `"y"` to only drag in a specific direction.
     *
     * ```jsx
     * <motion.div drag="x" />
     * ```
     */
    drag?: boolean | "x" | "y";
    /**
     * Properties or variant label to animate to while the drag gesture is recognised.
     *
     * ```jsx
     * <motion.div whileDrag={{ scale: 1.2 }} />
     * ```
     */
    whileDrag?: VariantLabels | TargetAndTransition;
    /**
     * If `true`, this will lock dragging to the initially-detected direction. Defaults to `false`.
     *
     * ```jsx
     * <motion.div drag dragDirectionLock />
     * ```
     */
    dragDirectionLock?: boolean;
    /**
     * Allows drag gesture propagation to child components. Set to `false` by
     * default.
     *
     * ```jsx
     * <motion.div drag="x" dragPropagation />
     * ```
     */
    dragPropagation?: boolean;
    /**
     * Applies constraints on the permitted draggable area.
     *
     * It can accept an object of optional `top`, `left`, `right`, and `bottom` values, measured in pixels.
     * This will define a distance the named edge of the draggable component.
     *
     * Alternatively, it can accept a `ref` to another component created with React's `useRef` hook.
     * This `ref` should be passed both to the draggable component's `dragConstraints` prop, and the `ref`
     * of the component you want to use as constraints.
     *
     * ```jsx
     * // In pixels
     * <motion.div
     *   drag="x"
     *   dragConstraints={{ left: 0, right: 300 }}
     * />
     *
     * // As a ref to another component
     * const MyComponent = () => {
     *   const constraintsRef = useRef(null)
     *
     *   return (
     *      <motion.div ref={constraintsRef}>
     *          <motion.div drag dragConstraints={constraintsRef} />
     *      </motion.div>
     *   )
     * }
     * ```
     */
    dragConstraints?: false | Partial<BoundingBox> | RefObject<Element>;
    /**
     * The degree of movement allowed outside constraints. 0 = no movement, 1 =
     * full movement.
     *
     * Set to `0.5` by default. Can also be set as `false` to disable movement.
     *
     * By passing an object of `top`/`right`/`bottom`/`left`, individual values can be set
     * per constraint. Any missing values will be set to `0`.
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragConstraints={{ left: 0, right: 300 }}
     *   dragElastic={0.2}
     * />
     * ```
     */
    dragElastic?: DragElastic;
    /**
     * Apply momentum from the pan gesture to the component when dragging
     * finishes. Set to `true` by default.
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragConstraints={{ left: 0, right: 300 }}
     *   dragMomentum={false}
     * />
     * ```
     */
    dragMomentum?: boolean;
    /**
     * Allows you to change dragging inertia parameters.
     * When releasing a draggable Frame, an animation with type `inertia` starts. The animation is based on your dragging velocity. This property allows you to customize it.
     * See {@link https://framer.com/api/animation/#inertia | Inertia} for all properties you can use.
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
     * />
     * ```
     */
    dragTransition?: InertiaOptions;
    /**
     * Usually, dragging is initiated by pressing down on a component and moving it. For some
     * use-cases, for instance clicking at an arbitrary point on a video scrubber, we
     * might want to initiate dragging from a different component than the draggable one.
     *
     * By creating a `dragControls` using the `useDragControls` hook, we can pass this into
     * the draggable component's `dragControls` prop. It exposes a `start` method
     * that can start dragging from pointer events on other components.
     *
     * ```jsx
     * const dragControls = useDragControls()
     *
     * function startDrag(event) {
     *   dragControls.start(event, { snapToCursor: true })
     * }
     *
     * return (
     *   <>
     *     <div onPointerDown={startDrag} />
     *     <motion.div drag="x" dragControls={dragControls} />
     *   </>
     * )
     * ```
     */
    dragControls?: DragControls;
    /**
     * If true, element will snap back to its origin when dragging ends.
     *
     * Enabling this is the equivalent of setting all `dragConstraints` axes to `0`
     * with `dragElastic={1}`, but when used together `dragConstraints` can define
     * a wider draggable area and `dragSnapToOrigin` will ensure the element
     * animates back to its origin on release.
     */
    dragSnapToOrigin?: boolean;
    /**
     * By default, if `drag` is defined on a component then an event listener will be attached
     * to automatically initiate dragging when a user presses down on it.
     *
     * By setting `dragListener` to `false`, this event listener will not be created.
     *
     * ```jsx
     * const dragControls = useDragControls()
     *
     * function startDrag(event) {
     *   dragControls.start(event, { snapToCursor: true })
     * }
     *
     * return (
     *   <>
     *     <div onPointerDown={startDrag} />
     *     <motion.div
     *       drag="x"
     *       dragControls={dragControls}
     *       dragListener={false}
     *     />
     *   </>
     * )
     * ```
     */
    dragListener?: boolean;
    /**
     * If `dragConstraints` is set to a React ref, this callback will call with the measured drag constraints.
     *
     * @public
     */
    onMeasureDragConstraints?: (constraints: BoundingBox) => BoundingBox | void;
    /**
     * Usually, dragging uses the layout project engine, and applies transforms to the underlying VisualElement.
     * Passing MotionValues as _dragX and _dragY instead applies drag updates to these motion values.
     * This allows you to manually control how updates from a drag gesture on an element is applied.
     *
     * @public
     */
    _dragX?: MotionValue<number>;
    /**
     * Usually, dragging uses the layout project engine, and applies transforms to the underlying VisualElement.
     * Passing MotionValues as _dragX and _dragY instead applies drag updates to these motion values.
     * This allows you to manually control how updates from a drag gesture on an element is applied.
     *
     * @public
     */
    _dragY?: MotionValue<number>;
}

/**
 * @public
 */
interface LayoutProps {
    /**
     * If `true`, this component will automatically animate to its new position when
     * its layout changes.
     *
     * ```jsx
     * <motion.div layout />
     * ```
     *
     * This will perform a layout animation using performant transforms. Part of this technique
     * involved animating an element's scale. This can introduce visual distortions on children,
     * `boxShadow` and `borderRadius`.
     *
     * To correct distortion on immediate children, add `layout` to those too.
     *
     * `boxShadow` and `borderRadius` will automatically be corrected if they are already being
     * animated on this component. Otherwise, set them directly via the `initial` prop.
     *
     * If `layout` is set to `"position"`, the size of the component will change instantly and
     * only its position will animate. If `layout` is set to `"size"`, the position of the
     * component will change instantly but its size will animate.
     *
     * If `layout` is set to `"size"`, the position of the component will change instantly and
     * only its size will animate.
     *
     * @public
     */
    layout?: boolean | "position" | "size";
    /**
     * Enable shared layout transitions between different components with the same `layoutId`.
     *
     * When a component with a layoutId is removed from the React tree, and then
     * added elsewhere, it will visually animate from the previous component's bounding box
     * and its latest animated values.
     *
     * ```jsx
     *   {items.map(item => (
     *      <motion.li layout>
     *         {item.name}
     *         {item.isSelected && <motion.div layoutId="underline" />}
     *      </motion.li>
     *   ))}
     * ```
     *
     * If the previous component remains in the tree it will crossfade with the new component.
     *
     * @public
     */
    layoutId?: string;
    /**
     * A callback that will fire when a layout animation on this component starts.
     *
     * @public
     */
    onLayoutAnimationStart?(): void;
    /**
     * A callback that will fire when a layout animation on this component completes.
     *
     * @public
     */
    onLayoutAnimationComplete?(): void;
    /**
     * @public
     */
    layoutDependency?: any;
    /**
     * Wether a projection node should measure its scroll when it or its descendants update their layout.
     *
     * @public
     */
    layoutScroll?: boolean;
}

declare enum AnimationType {
    Animate = "animate",
    Hover = "whileHover",
    Tap = "whileTap",
    Drag = "whileDrag",
    Focus = "whileFocus",
    InView = "whileInView",
    Exit = "exit"
}

declare type AnimationDefinition = VariantLabels | TargetAndTransition | TargetResolver;
declare type AnimationOptions$1 = {
    delay?: number;
    transitionOverride?: Transition;
    custom?: any;
    type?: AnimationType;
};
declare function animateVisualElement(visualElement: VisualElement, definition: AnimationDefinition, options?: AnimationOptions$1): Promise<void>;

declare type LayoutMeasureListener = (layout: Box, prevLayout?: Box) => void;
declare type BeforeLayoutMeasureListener = () => void;
declare type LayoutUpdateListener = (layout: Axis, prevLayout: Axis) => void;
declare type UpdateListener = (latest: ResolvedValues) => void;
declare type AnimationStartListener = (definition: AnimationDefinition) => void;
declare type AnimationCompleteListener = (definition: AnimationDefinition) => void;
declare type LayoutAnimationStartListener = () => void;
declare type LayoutAnimationCompleteListener = () => void;
declare type SetAxisTargetListener = () => void;
declare type RenderListener = () => void;
interface LayoutLifecycles {
    onBeforeLayoutMeasure?(box: Box): void;
    onLayoutMeasure?(box: Box, prevBox: Box): void;
}
interface AnimationLifecycles {
    /**
     * Callback with latest motion values, fired max once per frame.
     *
     * ```jsx
     * function onUpdate(latest) {
     *   console.log(latest.x, latest.opacity)
     * }
     *
     * <motion.div animate={{ x: 100, opacity: 0 }} onUpdate={onUpdate} />
     * ```
     */
    onUpdate?(latest: ResolvedValues): void;
    /**
     * Callback when animation defined in `animate` begins.
     *
     * The provided callback will be called with the triggering animation definition.
     * If this is a variant, it'll be the variant name, and if a target object
     * then it'll be the target object.
     *
     * This way, it's possible to figure out which animation has started.
     *
     * ```jsx
     * function onStart() {
     *   console.log("Animation started")
     * }
     *
     * <motion.div animate={{ x: 100 }} onAnimationStart={onStart} />
     * ```
     */
    onAnimationStart?(definition: AnimationDefinition): void;
    /**
     * Callback when animation defined in `animate` is complete.
     *
     * The provided callback will be called with the triggering animation definition.
     * If this is a variant, it'll be the variant name, and if a target object
     * then it'll be the target object.
     *
     * This way, it's possible to figure out which animation has completed.
     *
     * ```jsx
     * function onComplete() {
     *   console.log("Animation completed")
     * }
     *
     * <motion.div
     *   animate={{ x: 100 }}
     *   onAnimationComplete={definition => {
     *     console.log('Completed animating', definition)
     *   }}
     * />
     * ```
     */
    onAnimationComplete?(definition: AnimationDefinition): void;
}
declare type VisualElementLifecycles = LayoutLifecycles & AnimationLifecycles;
interface LifecycleManager {
    onLayoutMeasure: (callback: LayoutMeasureListener) => () => void;
    notifyLayoutMeasure: LayoutMeasureListener;
    onBeforeLayoutMeasure: (callback: BeforeLayoutMeasureListener) => () => void;
    notifyBeforeLayoutMeasure: BeforeLayoutMeasureListener;
    onLayoutUpdate: (callback: LayoutUpdateListener) => () => void;
    notifyLayoutUpdate: LayoutUpdateListener;
    onUpdate: (callback: UpdateListener) => () => void;
    notifyUpdate: UpdateListener;
    onAnimationStart: (callback: AnimationStartListener) => () => void;
    notifyAnimationStart: AnimationStartListener;
    onAnimationComplete: (callback: AnimationCompleteListener) => () => void;
    notifyAnimationComplete: AnimationCompleteListener;
    onLayoutAnimationStart: (callback: LayoutAnimationStartListener) => () => void;
    notifyLayoutAnimationStart: LayoutAnimationStartListener;
    onLayoutAnimationComplete: (callback: LayoutAnimationCompleteListener) => () => void;
    notifyLayoutAnimationComplete: LayoutAnimationCompleteListener;
    onSetAxisTarget: (callback: SetAxisTargetListener) => () => void;
    notifySetAxisTarget: SetAxisTargetListener;
    onRender: (callback: RenderListener) => () => void;
    notifyRender: RenderListener;
    onUnmount: (callback: () => void) => () => void;
    notifyUnmount: () => void;
    clearAllListeners: () => void;
    updatePropListeners: (props: MotionProps) => void;
}

/** @public */
interface EventInfo {
    point: Point;
}

/**
 * @public
 */
interface FocusHandlers {
    /**
     * Properties or variant label to animate to while the focus gesture is recognised.
     *
     * ```jsx
     * <motion.input whileFocus={{ scale: 1.2 }} />
     * ```
     */
    whileFocus?: VariantLabels | TargetAndTransition;
}
/**
 * Passed in to tap event handlers like `onTap` the `TapInfo` object contains
 * information about the tap gesture such as it‘s location.
 *
 * ```jsx
 * function onTap(event, info) {
 *   console.log(info.point.x, info.point.y)
 * }
 *
 * <motion.div onTap={onTap} />
 * ```
 *
 * @public
 */
interface TapInfo {
    /**
     * Contains `x` and `y` values for the tap gesture relative to the
     * device or page.
     *
     * ```jsx
     * function onTapStart(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <motion.div onTapStart={onTapStart} />
     * ```
     *
     * @public
     */
    point: Point;
}
/**
 * @public
 */
interface TapHandlers {
    /**
     * Callback when the tap gesture successfully ends on this element.
     *
     * ```jsx
     * function onTap(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <motion.div onTap={onTap} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - An {@link TapInfo} object containing `x` and `y` values for the `point` relative to the device or page.
     */
    onTap?(event: MouseEvent | TouchEvent | PointerEvent, info: TapInfo): void;
    /**
     * Callback when the tap gesture starts on this element.
     *
     * ```jsx
     * function onTapStart(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <motion.div onTapStart={onTapStart} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - An {@link TapInfo} object containing `x` and `y` values for the `point` relative to the device or page.
     */
    onTapStart?(event: MouseEvent | TouchEvent | PointerEvent, info: TapInfo): void;
    /**
     * Callback when the tap gesture ends outside this element.
     *
     * ```jsx
     * function onTapCancel(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <motion.div onTapCancel={onTapCancel} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - An {@link TapInfo} object containing `x` and `y` values for the `point` relative to the device or page.
     */
    onTapCancel?(event: MouseEvent | TouchEvent | PointerEvent, info: TapInfo): void;
    /**
     * Properties or variant label to animate to while the component is pressed.
     *
     * ```jsx
     * <motion.div whileTap={{ scale: 0.8 }} />
     * ```
     */
    whileTap?: VariantLabels | TargetAndTransition;
}
/**
 * @public
 */
interface PanHandlers {
    /**
     * Callback function that fires when the pan gesture is recognised on this element.
     *
     * **Note:** For pan gestures to work correctly with touch input, the element needs
     * touch scrolling to be disabled on either x/y or both axis with the
     * [touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action) CSS rule.
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <motion.div onPan={onPan} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - A {@link PanInfo} object containing `x` and `y` values for:
     *
     *   - `point`: Relative to the device or page.
     *   - `delta`: Distance moved since the last event.
     *   - `offset`: Offset from the original pan event.
     *   - `velocity`: Current velocity of the pointer.
     */
    onPan?(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
    /**
     * Callback function that fires when the pan gesture begins on this element.
     *
     * ```jsx
     * function onPanStart(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <motion.div onPanStart={onPanStart} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - A {@link PanInfo} object containing `x`/`y` values for:
     *
     *   - `point`: Relative to the device or page.
     *   - `delta`: Distance moved since the last event.
     *   - `offset`: Offset from the original pan event.
     *   - `velocity`: Current velocity of the pointer.
     */
    onPanStart?(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
    /**
     * Callback function that fires when we begin detecting a pan gesture. This
     * is analogous to `onMouseStart` or `onTouchStart`.
     *
     * ```jsx
     * function onPanSessionStart(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <motion.div onPanSessionStart={onPanSessionStart} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - An {@link EventInfo} object containing `x`/`y` values for:
     *
     *   - `point`: Relative to the device or page.
     */
    onPanSessionStart?(event: MouseEvent | TouchEvent | PointerEvent, info: EventInfo): void;
    /**
     * Callback function that fires when the pan gesture ends on this element.
     *
     * ```jsx
     * function onPanEnd(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <motion.div onPanEnd={onPanEnd} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - A {@link PanInfo} object containing `x`/`y` values for:
     *
     *   - `point`: Relative to the device or page.
     *   - `delta`: Distance moved since the last event.
     *   - `offset`: Offset from the original pan event.
     *   - `velocity`: Current velocity of the pointer.
     */
    onPanEnd?(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
}
/**
 * @public
 */
interface HoverHandlers {
    /**
     * Properties or variant label to animate to while the hover gesture is recognised.
     *
     * ```jsx
     * <motion.div whileHover={{ scale: 1.2 }} />
     * ```
     */
    whileHover?: VariantLabels | TargetAndTransition;
    /**
     * Callback function that fires when pointer starts hovering over the component.
     *
     * ```jsx
     * <motion.div onHoverStart={() => console.log('Hover starts')} />
     * ```
     */
    onHoverStart?(event: MouseEvent, info: EventInfo): void;
    /**
     * Callback function that fires when pointer stops hovering over the component.
     *
     * ```jsx
     * <motion.div onHoverEnd={() => console.log("Hover ends")} />
     * ```
     */
    onHoverEnd?(event: MouseEvent, info: EventInfo): void;
}

declare type ViewportEventHandler = (entry: IntersectionObserverEntry | null) => void;
interface ViewportOptions {
    root?: RefObject<Element>;
    once?: boolean;
    margin?: string;
    amount?: "some" | "all" | number;
    fallback?: boolean;
}
interface ViewportProps {
    whileInView?: VariantLabels | TargetAndTransition;
    onViewportEnter?: ViewportEventHandler;
    onViewportLeave?: ViewportEventHandler;
    viewport?: ViewportOptions;
}

/**
 * Either a string, or array of strings, that reference variants defined via the `variants` prop.
 * @public
 */
declare type VariantLabels = string | string[];
interface TransformProperties {
    x?: string | number;
    y?: string | number;
    z?: string | number;
    translateX?: string | number;
    translateY?: string | number;
    translateZ?: string | number;
    rotate?: string | number;
    rotateX?: string | number;
    rotateY?: string | number;
    rotateZ?: string | number;
    scale?: string | number;
    scaleX?: string | number;
    scaleY?: string | number;
    scaleZ?: string | number;
    skew?: string | number;
    skewX?: string | number;
    skewY?: string | number;
    originX?: string | number;
    originY?: string | number;
    originZ?: string | number;
    perspective?: string | number;
    transformPerspective?: string | number;
}
/**
 * @public
 */
interface SVGPathProperties {
    pathLength?: number;
    pathOffset?: number;
    pathSpacing?: number;
}
interface CustomStyles {
    /**
     * Framer Library custom prop types. These are not actually supported in Motion - preferably
     * we'd have a way of external consumers injecting supported styles into this library.
     */
    size?: string | number;
    radius?: string | number;
    shadow?: string;
    image?: string;
}
declare type MakeMotion<T> = MakeCustomValueType<{
    [K in keyof T]: T[K] | MotionValue<number> | MotionValue<string> | MotionValue<any>;
}>;
declare type MotionCSS = MakeMotion<Omit$1<CSSProperties, "rotate" | "scale" | "perspective">>;
/**
 * @public
 */
declare type MotionTransform = MakeMotion<TransformProperties>;
/**
 * @public
 */
declare type MotionStyle = MotionCSS & MotionTransform & MakeMotion<SVGPathProperties> & MakeCustomValueType<CustomStyles>;
/**
 * @public
 */
interface RelayoutInfo {
    delta: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
/**
 * @public
 */
declare type ResolveLayoutTransition = (info: RelayoutInfo) => Transition | boolean;
/**
 * @public
 */
interface AnimationProps {
    /**
     * Properties, variant label or array of variant labels to start in.
     *
     * Set to `false` to initialise with the values in `animate` (disabling the mount animation)
     *
     * ```jsx
     * // As values
     * <motion.div initial={{ opacity: 1 }} />
     *
     * // As variant
     * <motion.div initial="visible" variants={variants} />
     *
     * // Multiple variants
     * <motion.div initial={["visible", "active"]} variants={variants} />
     *
     * // As false (disable mount animation)
     * <motion.div initial={false} animate={{ opacity: 0 }} />
     * ```
     */
    initial?: boolean | Target | VariantLabels;
    /**
     * Values to animate to, variant label(s), or `AnimationControls`.
     *
     * ```jsx
     * // As values
     * <motion.div animate={{ opacity: 1 }} />
     *
     * // As variant
     * <motion.div animate="visible" variants={variants} />
     *
     * // Multiple variants
     * <motion.div animate={["visible", "active"]} variants={variants} />
     *
     * // AnimationControls
     * <motion.div animate={animation} />
     * ```
     */
    animate?: AnimationControls | TargetAndTransition | VariantLabels | boolean;
    /**
     * A target to animate to when this component is removed from the tree.
     *
     * This component **must** be the first animatable child of an `AnimatePresence` to enable this exit animation.
     *
     * This limitation exists because React doesn't allow components to defer unmounting until after
     * an animation is complete. Once this limitation is fixed, the `AnimatePresence` component will be unnecessary.
     *
     * ```jsx
     * import { AnimatePresence, motion } from 'framer-motion'
     *
     * export const MyComponent = ({ isVisible }) => {
     *   return (
     *     <AnimatePresence>
     *        {isVisible && (
     *          <motion.div
     *            initial={{ opacity: 0 }}
     *            animate={{ opacity: 1 }}
     *            exit={{ opacity: 0 }}
     *          />
     *        )}
     *     </AnimatePresence>
     *   )
     * }
     * ```
     */
    exit?: TargetAndTransition | VariantLabels;
    /**
     * Variants allow you to define animation states and organise them by name. They allow
     * you to control animations throughout a component tree by switching a single `animate` prop.
     *
     * Using `transition` options like `delayChildren` and `staggerChildren`, you can orchestrate
     * when children animations play relative to their parent.

     *
     * After passing variants to one or more `motion` component's `variants` prop, these variants
     * can be used in place of values on the `animate`, `initial`, `whileFocus`, `whileTap` and `whileHover` props.
     *
     * ```jsx
     * const variants = {
     *   active: {
     *       backgroundColor: "#f00"
     *   },
     *   inactive: {
     *     backgroundColor: "#fff",
     *     transition: { duration: 2 }
     *   }
     * }
     *
     * <motion.div variants={variants} animate="active" />
     * ```
     */
    variants?: Variants;
    /**
     * Default transition. If no `transition` is defined in `animate`, it will use the transition defined here.
     * ```jsx
     * const spring = {
     *   type: "spring",
     *   damping: 10,
     *   stiffness: 100
     * }
     *
     * <motion.div transition={spring} animate={{ scale: 1.2 }} />
     * ```
     */
    transition?: Transition;
}
/**
 * @public
 */
interface MotionAdvancedProps {
    /**
     * Custom data to use to resolve dynamic variants differently for each animating component.
     *
     * ```jsx
     * const variants = {
     *   visible: (custom) => ({
     *     opacity: 1,
     *     transition: { delay: custom * 0.2 }
     *   })
     * }
     *
     * <motion.div custom={0} animate="visible" variants={variants} />
     * <motion.div custom={1} animate="visible" variants={variants} />
     * <motion.div custom={2} animate="visible" variants={variants} />
     * ```
     *
     * @public
     */
    custom?: any;
    /**
     * @public
     * Set to `false` to prevent inheriting variant changes from its parent.
     */
    inherit?: boolean;
}
/**
 * Props for `motion` components.
 *
 * @public
 */
interface MotionProps extends AnimationProps, VisualElementLifecycles, PanHandlers, TapHandlers, HoverHandlers, FocusHandlers, ViewportProps, DraggableProps, LayoutProps, MotionAdvancedProps {
    /**
     *
     * The React DOM `style` prop, enhanced with support for `MotionValue`s and separate `transform` values.
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *
     *   return <motion.div style={{ x, opacity: 1, scale: 0.5 }} />
     * }
     * ```
     */
    style?: MotionStyle;
    /**
     * By default, Framer Motion generates a `transform` property with a sensible transform order. `transformTemplate`
     * can be used to create a different order, or to append/preprend the automatically generated `transform` property.
     *
     * ```jsx
     * <motion.div
     *   style={{ x: 0, rotate: 180 }}
     *   transformTemplate={
     *     ({ x, rotate }) => `rotate(${rotate}deg) translateX(${x}px)`
     *   }
     * />
     * ```
     *
     * @param transform - The latest animated transform props.
     * @param generatedTransform - The transform string as automatically generated by Framer Motion
     *
     * @public
     */
    transformTemplate?(transform: TransformProperties, generatedTransform: string): string;
    /**
     * Internal.
     *
     * This allows values to be transformed before being animated or set as styles.
     *
     * For instance, this allows custom values in Framer Library like `size` to be converted into `width` and `height`.
     * It also allows us a chance to take a value like `Color` and convert it to an animatable color string.
     *
     * A few structural typing changes need making before this can be a public property:
     * - Allow `Target` values to be appended by user-defined types (delete `CustomStyles` - does `size` throw a type error?)
     * - Extract `CustomValueType` as a separate user-defined type (delete `CustomValueType` and animate a `Color` - does this throw a type error?).
     *
     * @param values -
     */
    transformValues?<V extends ResolvedValues>(values: V): V;
}

/**
 * @public
 */
declare type ResolvedKeyframesTarget = [null, ...number[]] | number[] | [null, ...string[]] | string[];
/**
 * @public
 */
declare type KeyframesTarget = ResolvedKeyframesTarget | [null, ...CustomValueType[]] | CustomValueType[];
/**
 * @public
 */
declare type ResolvedSingleTarget = string | number;
/**
 * @public
 */
declare type SingleTarget = ResolvedSingleTarget | CustomValueType;
/**
 * @public
 */
declare type ResolvedValueTarget = ResolvedSingleTarget | ResolvedKeyframesTarget;
/**
 * @public
 */
declare type ValueTarget = SingleTarget | KeyframesTarget;
/**
 * A function that accepts a progress value between `0` and `1` and returns a
 * new one.
 *
 * ```jsx
 * <motion.div
 *   animate={{ opacity: 0 }}
 *   transition={{
 *     duration: 1,
 *     ease: progress => progress * progress
 *   }}
 * />
 * ```
 *
 * @public
 */
declare type EasingFunction = (v: number) => number;
/**
 * The easing function to use. Set as one of:
 *
 * - The name of an in-built easing function.
 * - An array of four numbers to define a cubic bezier curve.
 * - An easing function, that accepts and returns a progress value between `0` and `1`.
 *
 * @public
 */
declare type Easing = [number, number, number, number] | "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate" | EasingFunction;
/**
 * Options for orchestrating the timing of animations.
 *
 * @public
 */
interface Orchestration {
    /**
     * Delay the animation by this duration (in seconds). Defaults to `0`.
     *
     * @remarks
     * ```javascript
     * const transition = {
     *   delay: 0.2
     * }
     * ```
     *
     * @public
     */
    delay?: number;
    /**
     * Describes the relationship between the transition and its children. Set
     * to `false` by default.
     *
     * @remarks
     * When using variants, the transition can be scheduled in relation to its
     * children with either `"beforeChildren"` to finish this transition before
     * starting children transitions, `"afterChildren"` to finish children
     * transitions before starting this transition.
     *
     * ```jsx
     * const list = {
     *   hidden: {
     *     opacity: 0,
     *     transition: { when: "afterChildren" }
     *   }
     * }
     *
     * const item = {
     *   hidden: {
     *     opacity: 0,
     *     transition: { duration: 2 }
     *   }
     * }
     *
     * return (
     *   <motion.ul variants={list} animate="hidden">
     *     <motion.li variants={item} />
     *     <motion.li variants={item} />
     *   </motion.ul>
     * )
     * ```
     *
     * @public
     */
    when?: false | "beforeChildren" | "afterChildren" | string;
    /**
     * When using variants, children animations will start after this duration
     * (in seconds). You can add the `transition` property to both the `Frame` and the `variant` directly. Adding it to the `variant` generally offers more flexibility, as it allows you to customize the delay per visual state.
     *
     * ```jsx
     * const container = {
     *   hidden: { opacity: 0 },
     *   show: {
     *     opacity: 1,
     *     transition: {
     *       delayChildren: 0.5
     *     }
     *   }
     * }
     *
     * const item = {
     *   hidden: { opacity: 0 },
     *   show: { opacity: 1 }
     * }
     *
     * return (
     *   <motion.ul
     *     variants={container}
     *     initial="hidden"
     *     animate="show"
     *   >
     *     <motion.li variants={item} />
     *     <motion.li variants={item} />
     *   </motion.ul>
     * )
     * ```
     *
     * @public
     */
    delayChildren?: number;
    /**
     * When using variants, animations of child components can be staggered by this
     * duration (in seconds).
     *
     * For instance, if `staggerChildren` is `0.01`, the first child will be
     * delayed by `0` seconds, the second by `0.01`, the third by `0.02` and so
     * on.
     *
     * The calculated stagger delay will be added to `delayChildren`.
     *
     * ```jsx
     * const container = {
     *   hidden: { opacity: 0 },
     *   show: {
     *     opacity: 1,
     *     transition: {
     *       staggerChildren: 0.5
     *     }
     *   }
     * }
     *
     * const item = {
     *   hidden: { opacity: 0 },
     *   show: { opacity: 1 }
     * }
     *
     * return (
     *   <motion.ol
     *     variants={container}
     *     initial="hidden"
     *     animate="show"
     *   >
     *     <motion.li variants={item} />
     *     <motion.li variants={item} />
     *   </motion.ol>
     * )
     * ```
     *
     * @public
     */
    staggerChildren?: number;
    /**
     * The direction in which to stagger children.
     *
     * A value of `1` staggers from the first to the last while `-1`
     * staggers from the last to the first.
     *
     * ```jsx
     * const container = {
     *   hidden: { opacity: 0 },
     *   show: {
     *     opacity: 1,
     *     transition: {
     *       delayChildren: 0.5,
     *       staggerDirection: -1
     *     }
     *   }
     * }
     *
     * const item = {
     *   hidden: { opacity: 0 },
     *   show: { opacity: 1 }
     * }
     *
     * return (
     *   <motion.ul
     *     variants={container}
     *     initial="hidden"
     *     animate="show"
     *   >
     *     <motion.li variants={item} size={50} />
     *     <motion.li variants={item} size={50} />
     *   </motion.ul>
     * )
     * ```
     *
     * @public
     */
    staggerDirection?: number;
}
interface Repeat {
    /**
     * The number of times to repeat the transition. Set to `Infinity` for perpetual repeating.
     *
     * Without setting `repeatType`, this will loop the animation.
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ repeat: Infinity, duration: 2 }}
     * />
     * ```
     *
     * @public
     */
    repeat?: number;
    /**
     * How to repeat the animation. This can be either:
     *
     * "loop": Repeats the animation from the start
     *
     * "reverse": Alternates between forward and backwards playback
     *
     * "mirror": Switches `from` and `to` alternately
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{
     *     repeat: 1,
     *     repeatType: "reverse",
     *     duration: 2
     *   }}
     * />
     * ```
     *
     * @public
     */
    repeatType?: "loop" | "reverse" | "mirror";
    /**
     * When repeating an animation, `repeatDelay` will set the
     * duration of the time to wait, in seconds, between each repetition.
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ repeat: Infinity, repeatDelay: 1 }}
     * />
     * ```
     *
     * @public
     */
    repeatDelay?: number;
}
/**
 * An animation that animates between two or more values over a specific duration of time.
 * This is the default animation for non-physical values like `color` and `opacity`.
 *
 * @public
 */
interface Tween extends Repeat {
    /**
     * Set `type` to `"tween"` to use a duration-based tween animation.
     * If any non-orchestration `transition` values are set without a `type` property,
     * this is used as the default animation.
     *
     * ```jsx
     * <motion.path
     *   animate={{ pathLength: 1 }}
     *   transition={{ duration: 2, type: "tween" }}
     * />
     * ```
     *
     * @public
     */
    type?: "tween";
    /**
     * The duration of the tween animation. Set to `0.3` by default, 0r `0.8` if animating a series of keyframes.
     *
     * ```jsx
     * const variants = {
     *   visible: {
     *     opacity: 1,
     *     transition: { duration: 2 }
     *   }
     * }
     * ```
     *
     * @public
     */
    duration?: number;
    /**
     * The easing function to use. Set as one of the below.
     *
     * - The name of an existing easing function.
     *
     * - An array of four numbers to define a cubic bezier curve.
     *
     * - An easing function, that accepts and returns a value `0-1`.
     *
     * If the animating value is set as an array of multiple values for a keyframes
     * animation, `ease` can be set as an array of easing functions to set different easings between
     * each of those values.
     *
     *
     * ```jsx
     * <motion.div
     *   animate={{ opacity: 0 }}
     *   transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
     * />
     * ```
     *
     * @public
     */
    ease?: Easing | Easing[];
    /**
     * When animating keyframes, `times` can be used to determine where in the animation each keyframe is reached.
     * Each value in `times` is a value between `0` and `1`, representing `duration`.
     *
     * There must be the same number of `times` as there are keyframes.
     * Defaults to an array of evenly-spread durations.
     *
     * ```jsx
     * <motion.div
     *   animate={{ scale: [0, 1, 0.5, 1] }}
     *   transition={{ times: [0, 0.1, 0.9, 1] }}
     * />
     * ```
     *
     * @public
     */
    times?: number[];
    /**
     * When animating keyframes, `easings` can be used to define easing functions between each keyframe. This array should be one item fewer than the number of keyframes, as these easings apply to the transitions between the keyframes.
     *
     * ```jsx
     * <motion.div
     *   animate={{ backgroundColor: ["#0f0", "#00f", "#f00"] }}
     *   transition={{ easings: ["easeIn", "easeOut"] }}
     * />
     * ```
     *
     * @public
     */
    easings?: Easing[];
    /**
     * The value to animate from.
     * By default, this is the current state of the animating value.
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ from: 90, duration: 2 }}
     * />
     * ```
     *
     * @public
     */
    from?: number | string;
}
/**
 * An animation that simulates spring physics for realistic motion.
 * This is the default animation for physical values like `x`, `y`, `scale` and `rotate`.
 *
 * @public
 */
interface Spring extends Repeat {
    /**
     * Set `type` to `"spring"` to animate using spring physics for natural
     * movement. Type is set to `"spring"` by default.
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring' }}
     * />
     * ```
     *
     * @public
     */
    type: "spring";
    /**
     * Stiffness of the spring. Higher values will create more sudden movement.
     * Set to `100` by default.
     *
     * ```jsx
     * <motion.section
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring', stiffness: 50 }}
     * />
     * ```
     *
     * @public
     */
    stiffness?: number;
    /**
     * Strength of opposing force. If set to 0, spring will oscillate
     * indefinitely. Set to `10` by default.
     *
     * ```jsx
     * <motion.a
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring', damping: 300 }}
     * />
     * ```
     *
     * @public
     */
    damping?: number;
    /**
     * Mass of the moving object. Higher values will result in more lethargic
     * movement. Set to `1` by default.
     *
     * ```jsx
     * <motion.feTurbulence
     *   animate={{ baseFrequency: 0.5 } as any}
     *   transition={{ type: "spring", mass: 0.5 }}
     * />
     * ```
     *
     * @public
     */
    mass?: number;
    /**
     * The duration of the animation, defined in seconds. Spring animations can be a maximum of 10 seconds.
     *
     * If `bounce` is set, this defaults to `0.8`.
     *
     * Note: `duration` and `bounce` will be overridden if `stiffness`, `damping` or `mass` are set.
     *
     * ```jsx
     * <motion.div
     *   animate={{ x: 100 }}
     *   transition={{ type: "spring", duration: 0.8 }}
     * />
     * ```
     *
     * @public
     */
    duration?: number;
    /**
     * `bounce` determines the "bounciness" of a spring animation.
     *
     * `0` is no bounce, and `1` is extremely bouncy.
     *
     * If `duration` is set, this defaults to `0.25`.
     *
     * Note: `bounce` and `duration` will be overridden if `stiffness`, `damping` or `mass` are set.
     *
     * ```jsx
     * <motion.div
     *   animate={{ x: 100 }}
     *   transition={{ type: "spring", bounce: 0.25 }}
     * />
     * ```
     *
     * @public
     */
    bounce?: number;
    /**
     * End animation if absolute speed (in units per second) drops below this
     * value and delta is smaller than `restDelta`. Set to `0.01` by default.
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring', restSpeed: 0.5 }}
     * />
     * ```
     *
     * @public
     */
    restSpeed?: number;
    /**
     * End animation if distance is below this value and speed is below
     * `restSpeed`. When animation ends, spring gets “snapped” to. Set to
     * `0.01` by default.
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring', restDelta: 0.5 }}
     * />
     * ```
     *
     * @public
     */
    restDelta?: number;
    /**
     * The value to animate from.
     * By default, this is the initial state of the animating value.
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring', from: 90 }}
     * />
     * ```
     *
     * @public
     */
    from?: number | string;
    /**
     * The initial velocity of the spring. By default this is the current velocity of the component.
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring', velocity: 2 }}
     * />
     * ```
     *
     * @public
     */
    velocity?: number;
}
/**
 * An animation that decelerates a value based on its initial velocity,
 * usually used to implement inertial scrolling.
 *
 * Optionally, `min` and `max` boundaries can be defined, and inertia
 * will snap to these with a spring animation.
 *
 * This animation will automatically precalculate a target value,
 * which can be modified with the `modifyTarget` property.
 *
 * This allows you to add snap-to-grid or similar functionality.
 *
 * Inertia is also the animation used for `dragTransition`, and can be configured via that prop.
 *
 * @public
 */
interface Inertia {
    /**
     * Set `type` to animate using the inertia animation. Set to `"tween"` by
     * default. This can be used for natural deceleration, like momentum scrolling.
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ type: "inertia", velocity: 50 }}
     * />
     * ```
     *
     * @public
     */
    type: "inertia";
    /**
     * A function that receives the automatically-calculated target and returns a new one. Useful for snapping the target to a grid.
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragTransition={{
     *     power: 0,
     *     // Snap calculated target to nearest 50 pixels
     *     modifyTarget: target => Math.round(target / 50) * 50
     *   }}
     * />
     * ```
     *
     * @public
     */
    modifyTarget?(v: number): number;
    /**
     * If `min` or `max` is set, this affects the stiffness of the bounce
     * spring. Higher values will create more sudden movement. Set to `500` by
     * default.
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragTransition={{
     *     min: 0,
     *     max: 100,
     *     bounceStiffness: 100
     *   }}
     * />
     * ```
     *
     * @public
     */
    bounceStiffness?: number;
    /**
     * If `min` or `max` is set, this affects the damping of the bounce spring.
     * If set to `0`, spring will oscillate indefinitely. Set to `10` by
     * default.
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragTransition={{
     *     min: 0,
     *     max: 100,
     *     bounceDamping: 8
     *   }}
     * />
     * ```
     *
     * @public
     */
    bounceDamping?: number;
    /**
     * A higher power value equals a further target. Set to `0.8` by default.
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragTransition={{ power: 0.2 }}
     * />
     * ```
     *
     * @public
     */
    power?: number;
    /**
     * Adjusting the time constant will change the duration of the
     * deceleration, thereby affecting its feel. Set to `700` by default.
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragTransition={{ timeConstant: 200 }}
     * />
     * ```
     *
     * @public
     */
    timeConstant?: number;
    /**
     * End the animation if the distance to the animation target is below this value, and the absolute speed is below `restSpeed`.
     * When the animation ends, the value gets snapped to the animation target. Set to `0.01` by default.
     * Generally the default values provide smooth animation endings, only in rare cases should you need to customize these.
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragTransition={{ restDelta: 10 }}
     * />
     * ```
     *
     * @public
     */
    restDelta?: number;
    /**
     * Minimum constraint. If set, the value will "bump" against this value (or immediately spring to it if the animation starts as less than this value).
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragTransition={{ min: 0, max: 100 }}
     * />
     * ```
     *
     * @public
     */
    min?: number;
    /**
     * Maximum constraint. If set, the value will "bump" against this value (or immediately snap to it, if the initial animation value exceeds this value).
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragTransition={{ min: 0, max: 100 }}
     * />
     * ```
     *
     * @public
     */
    max?: number;
    /**
     * The value to animate from. By default, this is the current state of the animating value.
     *
     * ```jsx
     * <Frame
     *   drag
     *   dragTransition={{ from: 50 }}
     * />
     * ```
     *
     * @public
     */
    from?: number | string;
    /**
     * The initial velocity of the animation.
     * By default this is the current velocity of the component.
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'inertia', velocity: 200 }}
     * />
     * ```
     *
     * @public
     */
    velocity?: number;
}
/**
 * Keyframes tweens between multiple `values`.
 *
 * These tweens can be arranged using the `duration`, `easings`, and `times` properties.
 */
interface Keyframes {
    /**
     * Set `type` to `"keyframes"` to animate using the keyframes animation.
     * Set to `"tween"` by default. This can be used to animate between a series of values.
     *
     * @public
     */
    type: "keyframes";
    /**
     * An array of numbers between 0 and 1, where `1` represents the `total` duration.
     *
     * Each value represents at which point during the animation each item in the animation target should be hit, so the array should be the same length as `values`.
     *
     * Defaults to an array of evenly-spread durations.
     *
     * @public
     */
    times?: number[];
    /**
     * An array of easing functions for each generated tween, or a single easing function applied to all tweens.
     *
     * This array should be one item less than `values`, as these easings apply to the transitions *between* the `values`.
     *
     * ```jsx
     * const transition = {
     *   backgroundColor: {
     *     type: 'keyframes',
     *     easings: ['circIn', 'circOut']
     *   }
     * }
     * ```
     *
     * @public
     */
    ease?: Easing | Easing[];
    /**
     * The total duration of the animation. Set to `0.3` by default.
     *
     * ```jsx
     * const transition = {
     *   type: "keyframes",
     *   duration: 2
     * }
     *
     * <Frame
     *   animate={{ opacity: 0 }}
     *   transition={transition}
     * />
     * ```
     *
     * @public
     */
    duration?: number;
    /**
     * @public
     */
    repeatDelay?: number;
}
/**
 * @public
 */
interface Just {
    /**
     * @public
     */
    type: "just";
}
/**
 * @public
 */
interface None {
    /**
     * Set `type` to `false` for an instant transition.
     *
     * @public
     */
    type: false;
}
/**
 * @public
 */
declare type PermissiveTransitionDefinition = {
    [key: string]: any;
};
/**
 * @public
 */
declare type TransitionDefinition = Tween | Spring | Keyframes | Inertia | Just | None | PermissiveTransitionDefinition;
declare type TransitionMap = Orchestration & {
    [key: string]: TransitionDefinition;
};
/**
 * Transition props
 *
 * @public
 */
declare type Transition = (Orchestration & Repeat & TransitionDefinition) | (Orchestration & Repeat & TransitionMap);
declare type Omit$1<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
declare type CSSPropertiesWithoutTransitionOrSingleTransforms = Omit$1<CSSProperties, "transition" | "rotate" | "scale" | "perspective">;
declare type TargetProperties = CSSPropertiesWithoutTransitionOrSingleTransforms & SVGAttributes<SVGElement> & TransformProperties & CustomStyles & SVGPathProperties;
/**
 * @public
 */
declare type MakeCustomValueType<T> = {
    [K in keyof T]: T[K] | CustomValueType;
};
/**
 * @public
 */
declare type Target = MakeCustomValueType<TargetProperties>;
/**
 * @public
 */
declare type MakeKeyframes<T> = {
    [K in keyof T]: T[K] | T[K][] | [null, ...T[K][]];
};
/**
 * @public
 */
declare type TargetWithKeyframes = MakeKeyframes<Target>;
/**
 * An object that specifies values to animate to. Each value may be set either as
 * a single value, or an array of values.
 *
 * It may also option contain these properties:
 *
 * - `transition`: Specifies transitions for all or individual values.
 * - `transitionEnd`: Specifies values to set when the animation finishes.
 *
 * ```jsx
 * const target = {
 *   x: "0%",
 *   opacity: 0,
 *   transition: { duration: 1 },
 *   transitionEnd: { display: "none" }
 * }
 * ```
 *
 * @public
 */
declare type TargetAndTransition = TargetWithKeyframes & {
    transition?: Transition;
    transitionEnd?: Target;
};
declare type TargetResolver = (custom: any, current: Target, velocity: Target) => TargetAndTransition | string;
/**
 * @public
 */
declare type Variant = TargetAndTransition | TargetResolver;
/**
 * @public
 */
declare type Variants = {
    [key: string]: Variant;
};
/**
 * @public
 */
interface CustomValueType {
    mix: (from: any, to: any) => (p: number) => number | string;
    toValue: () => number | string;
}

/**
 * Start animation on a MotionValue. This function is an interface between
 * Framer Motion and Popmotion
 */
declare function startAnimation(key: string, value: MotionValue, target: ResolvedValueTarget, transition?: Transition): Promise<void>;

interface VisualState<Instance, RenderState> {
    renderState: RenderState;
    latestValues: ResolvedValues;
    mount?: (instance: Instance) => void;
}
declare type UseVisualState<Instance, RenderState> = (props: MotionProps, isStatic: boolean) => VisualState<Instance, RenderState>;
interface UseVisualStateConfig<Instance, RenderState> {
    scrapeMotionValuesFromProps: ScrapeMotionValuesFromProps;
    createRenderState: () => RenderState;
    onMount?: (props: MotionProps, instance: Instance, visualState: VisualState<Instance, RenderState>) => void;
}
declare const makeUseVisualState: <I, RS>(config: UseVisualStateConfig<I, RS>) => UseVisualState<I, RS>;

interface AnimationState {
    animateChanges: (options?: AnimationOptions$1, type?: AnimationType) => Promise<any>;
    setActive: (type: AnimationType, isActive: boolean, options?: AnimationOptions$1) => Promise<any>;
    setAnimateFunction: (fn: any) => void;
    isAnimated(key: string): boolean;
    getState: () => {
        [key: string]: AnimationTypeState;
    };
}
interface AnimationTypeState {
    isActive: boolean;
    protectedKeys: {
        [key: string]: true;
    };
    needsAnimating: {
        [key: string]: boolean;
    };
    prevResolvedValues: {
        [key: string]: any;
    };
    prevProp?: VariantLabels | TargetAndTransition;
}

declare class NodeStack {
    lead?: IProjectionNode;
    prevLead?: IProjectionNode;
    members: IProjectionNode[];
    add(node: IProjectionNode): void;
    remove(node: IProjectionNode): void;
    relegate(node: IProjectionNode): boolean;
    promote(node: IProjectionNode, preserveFollowOpacity?: boolean): void;
    exitAnimationComplete(): void;
    scheduleRender(): void;
    /**
     * Clear any leads that have been removed this render to prevent them from being
     * used in future animations and to prevent memory leaks
     */
    removeLeadSnapshot(): void;
}

/**
 * @public
 */
interface AnimationPlaybackControls {
    stop: () => void;
    isAnimating: () => boolean;
}
/**
 * @public
 */
interface AnimationPlaybackLifecycles<V> {
    onUpdate?: (latest: V) => void;
    onPlay?: () => void;
    onComplete?: () => void;
    onRepeat?: () => void;
    onStop?: () => void;
}
/**
 * @public
 */
declare type AnimationOptions<V> = (Tween | Spring) & AnimationPlaybackLifecycles<V> & {
    delay?: number;
    type?: "tween" | "spring";
};
/**
 * Animate a single value or a `MotionValue`.
 *
 * The first argument is either a `MotionValue` to animate, or an initial animation value.
 *
 * The second is either a value to animate to, or an array of keyframes to animate through.
 *
 * The third argument can be either tween or spring options, and optional lifecycle methods: `onUpdate`, `onPlay`, `onComplete`, `onRepeat` and `onStop`.
 *
 * Returns `AnimationPlaybackControls`, currently just a `stop` method.
 *
 * ```javascript
 * const x = useMotionValue(0)
 *
 * useEffect(() => {
 *   const controls = animate(x, 100, {
 *     type: "spring",
 *     stiffness: 2000,
 *     onComplete: v => {}
 *   })
 *
 *   return controls.stop
 * })
 * ```
 *
 * @public
 */
declare function animate<V>(from: MotionValue<V> | V, to: V | V[], transition?: AnimationOptions<V>): AnimationPlaybackControls;

interface WithDepth {
    depth: number;
}

declare class FlatTree {
    private children;
    private isDirty;
    add(child: WithDepth): void;
    remove(child: WithDepth): void;
    forEach(callback: (child: WithDepth) => void): void;
}

interface SwitchLayoutGroup {
    register?: (member: IProjectionNode) => void;
    deregister?: (member: IProjectionNode) => void;
}
declare type InitialPromotionConfig = {
    /**
     * The initial transition to use when the elements in this group mount (and automatically promoted).
     * Subsequent updates should provide a transition in the promote method.
     */
    transition?: Transition;
    /**
     * If the follow tree should preserve its opacity when the lead is promoted on mount
     */
    shouldPreserveFollowOpacity?: (member: IProjectionNode) => boolean;
};
declare type SwitchLayoutGroupContext = SwitchLayoutGroup & InitialPromotionConfig;
/**
 * Internal, exported only for usage in Framer
 */
declare const SwitchLayoutGroupContext: React$1.Context<SwitchLayoutGroupContext>;

interface Snapshot {
    measured: Box;
    layout: Box;
    latestValues: ResolvedValues;
    isShared?: boolean;
}
interface Layout {
    measured: Box;
    actual: Box;
}
declare type LayoutEvents = "willUpdate" | "didUpdate" | "beforeMeasure" | "measure" | "projectionUpdate" | "animationStart" | "animationComplete";
interface IProjectionNode<I = unknown> {
    id: number | undefined;
    parent?: IProjectionNode;
    relativeParent?: IProjectionNode;
    root?: IProjectionNode;
    children: Set<IProjectionNode>;
    path: IProjectionNode[];
    nodes?: FlatTree;
    depth: number;
    instance: I;
    mount: (node: I, isLayoutDirty?: boolean) => void;
    unmount: () => void;
    options: ProjectionNodeOptions;
    setOptions(options: ProjectionNodeOptions): void;
    layout?: Layout;
    snapshot?: Snapshot;
    target?: Box;
    relativeTarget?: Box;
    targetDelta?: Delta;
    targetWithTransforms?: Box;
    scroll?: Point;
    isScrollRoot?: boolean;
    treeScale?: Point;
    projectionDelta?: Delta;
    latestValues: ResolvedValues;
    isLayoutDirty: boolean;
    shouldResetTransform: boolean;
    prevTransformTemplateValue: string | undefined;
    isUpdateBlocked(): boolean;
    updateManuallyBlocked: boolean;
    updateBlockedByResize: boolean;
    blockUpdate(): void;
    unblockUpdate(): void;
    isUpdating: boolean;
    needsReset: boolean;
    startUpdate(): void;
    willUpdate(notifyListeners?: boolean): void;
    didUpdate(): void;
    measure(): Box;
    updateLayout(): void;
    updateSnapshot(): void;
    clearSnapshot(): void;
    updateScroll(): void;
    scheduleUpdateProjection(): void;
    scheduleCheckAfterUnmount(): void;
    checkUpdateFailed(): void;
    potentialNodes: Map<number, IProjectionNode>;
    sharedNodes: Map<string, NodeStack>;
    registerPotentialNode(id: number, node: IProjectionNode): void;
    registerSharedNode(id: string, node: IProjectionNode): void;
    getStack(): NodeStack | undefined;
    isVisible: boolean;
    hide(): void;
    show(): void;
    scheduleRender(notifyAll?: boolean): void;
    getClosestProjectingParent(): IProjectionNode | undefined;
    setTargetDelta(delta: Delta): void;
    resetTransform(): void;
    resetRotation(): void;
    applyTransform(box: Box, transformOnly?: boolean): Box;
    resolveTargetDelta(): void;
    calcProjection(): void;
    getProjectionStyles(styles?: MotionStyle): MotionStyle | undefined;
    clearMeasurements(): void;
    resetTree(): void;
    animationValues?: ResolvedValues;
    currentAnimation?: AnimationPlaybackControls;
    isTreeAnimating?: boolean;
    isAnimationBlocked?: boolean;
    isTreeAnimationBlocked: () => boolean;
    setAnimationOrigin(delta: Delta): void;
    startAnimation(transition: Transition): void;
    finishAnimation(): void;
    isLead(): boolean;
    promote(options?: {
        needsReset?: boolean;
        transition?: Transition;
        preserveFollowOpacity?: boolean;
    }): void;
    relegate(): boolean;
    resumeFrom?: IProjectionNode;
    resumingFrom?: IProjectionNode;
    isPresent?: boolean;
    addEventListener(name: LayoutEvents, handler: any): VoidFunction;
    notifyListeners(name: LayoutEvents, ...args: any): void;
    hasListeners(name: LayoutEvents): boolean;
    preserveOpacity?: boolean;
}
interface ProjectionNodeOptions {
    animate?: boolean;
    layoutScroll?: boolean;
    alwaysMeasureLayout?: boolean;
    scheduleRender?: VoidFunction;
    onExitComplete?: VoidFunction;
    animationType?: "size" | "position" | "both";
    layoutId?: string;
    layout?: boolean | string;
    visualElement?: VisualElement;
    crossfade?: boolean;
    transition?: Transition;
    initialPromotionConfig?: InitialPromotionConfig;
}

/**
 * @public
 */
interface MotionConfigContext {
    /**
     * Internal, exported only for usage in Framer
     */
    transformPagePoint: TransformPoint;
    /**
     * Internal. Determines whether this is a static context ie the Framer canvas. If so,
     * it'll disable all dynamic functionality.
     */
    isStatic: boolean;
    /**
     * Defines a new default transition for the entire tree.
     *
     * @public
     */
    transition?: Transition;
    /**
     * If true, will respect the device prefersReducedMotion setting by switching
     * transform animations off.
     *
     * @public
     */
    reducedMotion?: "always" | "never" | "user";
}
/**
 * @public
 */
declare const MotionConfigContext: React$1.Context<MotionConfigContext>;

declare type IsValidProp = (key: string) => boolean;
declare function filterProps(props: MotionProps, isDom: boolean, forwardMotionProps: boolean): {};

interface MotionConfigProps extends Partial<MotionConfigContext> {
    children?: React$1.ReactNode;
    isValidProp?: IsValidProp;
}
/**
 * `MotionConfig` is used to set configuration options for all children `motion` components.
 *
 * ```jsx
 * import { motion, MotionConfig } from "framer-motion"
 *
 * export function App() {
 *   return (
 *     <MotionConfig transition={{ type: "spring" }}>
 *       <motion.div animate={{ x: 100 }} />
 *     </MotionConfig>
 *   )
 * }
 * ```
 *
 * @public
 */
declare function MotionConfig({ children, isValidProp, ...config }: MotionConfigProps): JSX.Element;

interface VisualElement<Instance = any, RenderState = any> extends LifecycleManager {
    treeType: string;
    depth: number;
    parent?: VisualElement;
    children: Set<VisualElement>;
    variantChildren?: Set<VisualElement>;
    current: Instance | null;
    manuallyAnimateOnMount: boolean;
    blockInitialAnimation?: boolean;
    presenceId: number | undefined;
    isMounted(): boolean;
    mount(instance: Instance): void;
    unmount(): void;
    isStatic?: boolean;
    getInstance(): Instance | null;
    sortNodePosition(element: VisualElement): number;
    measureViewportBox(withTransform?: boolean): Box;
    addVariantChild(child: VisualElement): undefined | (() => void);
    getClosestVariantNode(): VisualElement | undefined;
    shouldReduceMotion?: boolean | null;
    animateMotionValue?: typeof startAnimation;
    projection?: IProjectionNode;
    /**
     * Visibility
     */
    isVisible?: boolean;
    setVisibility(visibility: boolean): void;
    hasValue(key: string): boolean;
    addValue(key: string, value: MotionValue<any>): void;
    removeValue(key: string): void;
    getValue(key: string): undefined | MotionValue;
    getValue(key: string, defaultValue: string | number): MotionValue;
    getValue(key: string, defaultValue?: string | number): undefined | MotionValue;
    forEachValue(callback: (value: MotionValue, key: string) => void): void;
    readValue(key: string): string | number | undefined | null;
    setBaseTarget(key: string, value: string | number | null): void;
    getBaseTarget(key: string): number | string | undefined | null;
    getStaticValue(key: string): number | string | undefined;
    setStaticValue(key: string, value: number | string): void;
    getLatestValues(): ResolvedValues;
    scheduleRender(): void;
    makeTargetAnimatable(target: TargetAndTransition, isLive?: boolean): TargetAndTransition;
    setProps(props: MotionProps): void;
    getProps(): MotionProps;
    getVariant(name: string): Variant | undefined;
    getDefaultTransition(): Transition | undefined;
    getVariantContext(startAtParent?: boolean): undefined | {
        initial?: string | string[];
        animate?: string | string[];
        exit?: string | string[];
        whileHover?: string | string[];
        whileDrag?: string | string[];
        whileFocus?: string | string[];
        whileTap?: string | string[];
    };
    getTransformPagePoint: () => TransformPoint | undefined;
    build(): RenderState;
    syncRender(): void;
    isPresenceRoot?: boolean;
    isPresent?: boolean;
    prevDragCursor?: Point;
    getLayoutId(): string | undefined;
    animationState?: AnimationState;
}
interface VisualElementConfig<Instance, RenderState, Options> {
    treeType?: string;
    getBaseTarget?(props: MotionProps, key: string): string | number | undefined | MotionValue;
    build(visualElement: VisualElement<Instance>, renderState: RenderState, latestValues: ResolvedValues, options: Options, props: MotionProps): void;
    sortNodePosition?: (a: Instance, b: Instance) => number;
    makeTargetAnimatable(element: VisualElement<Instance>, target: TargetAndTransition, props: MotionProps, isLive: boolean): TargetAndTransition;
    measureViewportBox(instance: Instance, props: MotionProps & MotionConfigProps): Box;
    readValueFromInstance(instance: Instance, key: string, options: Options): string | number | null | undefined;
    resetTransform(element: VisualElement<Instance>, instance: Instance, props: MotionProps): void;
    restoreTransform(instance: Instance, renderState: RenderState): void;
    render(instance: Instance, renderState: RenderState, styleProp?: MotionStyle, projection?: IProjectionNode): void;
    removeValueFromRenderState(key: string, renderState: RenderState): void;
    scrapeMotionValuesFromProps: ScrapeMotionValuesFromProps;
}
declare type ScrapeMotionValuesFromProps = (props: MotionProps) => {
    [key: string]: MotionValue | string | number;
};
declare type VisualElementOptions<Instance, RenderState = any> = {
    visualState: VisualState<Instance, RenderState>;
    parent?: VisualElement<unknown>;
    variantParent?: VisualElement<unknown>;
    presenceId?: number | undefined;
    props: MotionProps;
    blockInitialAnimation?: boolean;
    shouldReduceMotion?: boolean | null;
};
declare type CreateVisualElement<Instance> = (Component: string | React$1.ComponentType<React$1.PropsWithChildren<unknown>>, options: VisualElementOptions<Instance>) => VisualElement<Instance>;
/**
 * A generic set of string/number values
 */
interface ResolvedValues {
    [key: string]: string | number;
}

declare type UnionStringArray$1<T extends Readonly<string[]>> = T[number];
declare const svgElements: readonly ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "svg", "switch", "symbol", "text", "tspan", "use", "view", "clipPath", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "foreignObject", "linearGradient", "radialGradient", "textPath"];
declare type SVGElements = UnionStringArray$1<typeof svgElements>;

declare type UnionStringArray<T extends Readonly<string[]>> = T[number];
declare const htmlElements: readonly ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "webview"];
declare type HTMLElements = UnionStringArray<typeof htmlElements>;

/**
 * @public
 */
declare type ForwardRefComponent<T, P> = ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
/**
 * Support for React component props
 */
declare type UnwrapFactoryAttributes<F> = F extends DetailedHTMLFactory<infer P, any> ? P : never;
declare type UnwrapFactoryElement<F> = F extends DetailedHTMLFactory<any, infer P> ? P : never;
declare type HTMLAttributesWithoutMotionProps<Attributes extends HTMLAttributes<Element>, Element extends HTMLElement> = {
    [K in Exclude<keyof Attributes, keyof MotionProps>]?: Attributes[K];
};
/**
 * @public
 */
declare type HTMLMotionProps<TagName extends keyof ReactHTML> = HTMLAttributesWithoutMotionProps<UnwrapFactoryAttributes<ReactHTML[TagName]>, UnwrapFactoryElement<ReactHTML[TagName]>> & MotionProps;
/**
 * Motion-optimised versions of React's HTML components.
 *
 * @public
 */
declare type HTMLMotionComponents = {
    [K in HTMLElements]: ForwardRefComponent<UnwrapFactoryElement<ReactHTML[K]>, HTMLMotionProps<K>>;
};

interface SVGAttributesWithoutMotionProps<T> extends Pick<SVGAttributes<T>, Exclude<keyof SVGAttributes<T>, keyof MotionProps>> {
}
/**
 * Blanket-accept any SVG attribute as a `MotionValue`
 * @public
 */
declare type SVGAttributesAsMotionValues<T> = MakeMotion<SVGAttributesWithoutMotionProps<T>>;
declare type UnwrapSVGFactoryElement<F> = F extends React.SVGProps<infer P> ? P : never;
/**
 * @public
 */
interface SVGMotionProps<T> extends SVGAttributesAsMotionValues<T>, MotionProps {
}
/**
 * Motion-optimised versions of React's SVG components.
 *
 * @public
 */
declare type SVGMotionComponents = {
    [K in SVGElements]: ForwardRefComponent<UnwrapSVGFactoryElement<JSX.IntrinsicElements[K]>, SVGMotionProps<UnwrapSVGFactoryElement<JSX.IntrinsicElements[K]>>>;
};

/**
 * @public
 */
interface FeatureProps extends MotionProps {
    visualElement: VisualElement;
}
declare type FeatureNames = {
    animation: true;
    exit: true;
    drag: true;
    tap: true;
    focus: true;
    hover: true;
    pan: true;
    inView: true;
    measureLayout: true;
};
declare type FeatureComponent = React$1.ComponentType<React$1.PropsWithChildren<FeatureProps>>;
/**
 * @public
 */
interface FeatureDefinition {
    isEnabled: (props: MotionProps) => boolean;
    Component?: FeatureComponent;
}
interface FeatureComponents {
    animation?: FeatureComponent;
    exit?: FeatureComponent;
    drag?: FeatureComponent;
    tap?: FeatureComponent;
    focus?: FeatureComponent;
    hover?: FeatureComponent;
    pan?: FeatureComponent;
    inView?: FeatureComponent;
    measureLayout?: FeatureComponent;
}
interface FeatureBundle extends FeatureComponents {
    renderer: CreateVisualElement<any>;
    projectionNodeConstructor?: any;
}
declare type LazyFeatureBundle$1 = () => Promise<FeatureBundle>;
declare type FeatureDefinitions = {
    [K in keyof FeatureNames]: FeatureDefinition;
};
declare type LoadedFeatures = FeatureDefinitions & {
    projectionNodeConstructor?: any;
};
declare type RenderComponent<Instance, RenderState> = (Component: string | React$1.ComponentType<React$1.PropsWithChildren<unknown>>, props: MotionProps, projectionId: number | undefined, ref: React$1.Ref<Instance>, visualState: VisualState<Instance, RenderState>, isStatic: boolean, visualElement?: VisualElement) => any;

interface MotionComponentConfig<Instance, RenderState> {
    preloadedFeatures?: FeatureBundle;
    createVisualElement?: CreateVisualElement<Instance>;
    projectionNodeConstructor?: any;
    useRender: RenderComponent<Instance, RenderState>;
    useVisualState: UseVisualState<Instance, RenderState>;
    Component: string | React$1.ComponentType<React$1.PropsWithChildren<unknown>>;
}
/**
 * Create a `motion` component.
 *
 * This function accepts a Component argument, which can be either a string (ie "div"
 * for `motion.div`), or an actual React component.
 *
 * Alongside this is a config option which provides a way of rendering the provided
 * component "offline", or outside the React render cycle.
 */
declare function createMotionComponent<Props extends {}, Instance, RenderState>({ preloadedFeatures, createVisualElement, projectionNodeConstructor, useRender, useVisualState, Component, }: MotionComponentConfig<Instance, RenderState>): React$1.ForwardRefExoticComponent<React$1.PropsWithoutRef<Props & MotionProps> & React$1.RefAttributes<Instance>>;

/**
 * I'd rather the return type of `custom` to be implicit but this throws
 * incorrect relative paths in the exported types and API Extractor throws
 * a wobbly.
 */
declare type CustomDomComponent<Props> = React$1.ForwardRefExoticComponent<React$1.PropsWithoutRef<Props & MotionProps> & React$1.RefAttributes<SVGElement | HTMLElement>>;
interface CustomMotionComponentConfig {
    forwardMotionProps?: boolean;
}

declare type DOMMotionComponents = HTMLMotionComponents & SVGMotionComponents;

/**
 * HTML & SVG components, optimised for use with gestures and animation. These can be used as
 * drop-in replacements for any HTML & SVG component, all CSS & SVG properties are supported.
 *
 * @public
 */
declare const motion: (<Props>(Component: string | React$1.ComponentType<React$1.PropsWithChildren<Props>>, customMotionComponentConfig?: CustomMotionComponentConfig) => CustomDomComponent<Props>) & HTMLMotionComponents & SVGMotionComponents;
/**
 * Create a DOM `motion` component with the provided string. This is primarily intended
 * as a full alternative to `motion` for consumers who have to support environments that don't
 * support `Proxy`.
 *
 * ```javascript
 * import { createDomMotionComponent } from "framer-motion"
 *
 * const motion = {
 *   div: createDomMotionComponent('div')
 * }
 * ```
 *
 * @public
 */
declare function createDomMotionComponent<T extends keyof DOMMotionComponents>(key: T): DOMMotionComponents[T];

/**
 * @public
 */
declare const m: (<Props>(Component: string | React$1.ComponentType<React$1.PropsWithChildren<Props>>, customMotionComponentConfig?: CustomMotionComponentConfig) => CustomDomComponent<Props>) & HTMLMotionComponents & SVGMotionComponents;

/**
 * @public
 */
interface AnimatePresenceProps {
    /**
     * By passing `initial={false}`, `AnimatePresence` will disable any initial animations on children
     * that are present when the component is first rendered.
     *
     * ```jsx
     * <AnimatePresence initial={false}>
     *   {isVisible && (
     *     <motion.div
     *       key="modal"
     *       initial={{ opacity: 0 }}
     *       animate={{ opacity: 1 }}
     *       exit={{ opacity: 0 }}
     *     />
     *   )}
     * </AnimatePresence>
     * ```
     *
     * @public
     */
    initial?: boolean;
    /**
     * When a component is removed, there's no longer a chance to update its props. So if a component's `exit`
     * prop is defined as a dynamic variant and you want to pass a new `custom` prop, you can do so via `AnimatePresence`.
     * This will ensure all leaving components animate using the latest data.
     *
     * @public
     */
    custom?: any;
    /**
     * Fires when all exiting nodes have completed animating out.
     *
     * @public
     */
    onExitComplete?: () => void;
    /**
     * If set to `true`, `AnimatePresence` will only render one component at a time. The exiting component
     * will finish its exit animation before the entering component is rendered.
     *
     * ```jsx
     * const MyComponent = ({ currentItem }) => (
     *   <AnimatePresence exitBeforeEnter>
     *     <motion.div key={currentItem} exit={{ opacity: 0 }} />
     *   </AnimatePresence>
     * )
     * ```
     *
     * @beta
     */
    exitBeforeEnter?: boolean;
    /**
     * Internal. Used in Framer to flag that sibling children *shouldn't* re-render as a result of a
     * child being removed.
     */
    presenceAffectsLayout?: boolean;
}

/**
 * `AnimatePresence` enables the animation of components that have been removed from the tree.
 *
 * When adding/removing more than a single child, every child **must** be given a unique `key` prop.
 *
 * Any `motion` components that have an `exit` property defined will animate out when removed from
 * the tree.
 *
 * ```jsx
 * import { motion, AnimatePresence } from 'framer-motion'
 *
 * export const Items = ({ items }) => (
 *   <AnimatePresence>
 *     {items.map(item => (
 *       <motion.div
 *         key={item.id}
 *         initial={{ opacity: 0 }}
 *         animate={{ opacity: 1 }}
 *         exit={{ opacity: 0 }}
 *       />
 *     ))}
 *   </AnimatePresence>
 * )
 * ```
 *
 * You can sequence exit animations throughout a tree using variants.
 *
 * If a child contains multiple `motion` components with `exit` props, it will only unmount the child
 * once all `motion` components have finished animating out. Likewise, any components using
 * `usePresence` all need to call `safeToRemove`.
 *
 * @public
 */
declare const AnimatePresence: React$1.FunctionComponent<React$1.PropsWithChildren<AnimatePresenceProps>>;

declare const AnimateSharedLayout: React$1.FunctionComponent<React$1.PropsWithChildren<unknown>>;

declare type LazyFeatureBundle = () => Promise<FeatureBundle>;
/**
 * @public
 */
interface LazyProps {
    children?: React.ReactNode;
    /**
     * Can be used to provide a feature bundle synchronously or asynchronously.
     *
     * ```jsx
     * // features.js
     * import { domAnimations } from "framer-motion"
     * export default domAnimations
     *
     * // index.js
     * import { LazyMotion, m } from "framer-motion"
     *
     * const loadFeatures = import("./features.js")
     *   .then(res => res.default)
     *
     * function Component() {
     *   return (
     *     <LazyMotion features={loadFeatures}>
     *       <m.div animate={{ scale: 1.5 }} />
     *     </LazyMotion>
     *   )
     * }
     * ```
     *
     * @public
     */
    features: FeatureBundle | LazyFeatureBundle;
    /**
     * If `true`, will throw an error if a `motion` component renders within
     * a `LazyMotion` component.
     *
     * ```jsx
     * // This component will throw an error that explains using a motion component
     * // instead of the m component will break the benefits of code-splitting.
     * function Component() {
     *   return (
     *     <LazyMotion features={domAnimation} strict>
     *       <motion.div />
     *     </LazyMotion>
     *   )
     * }
     * ```
     *
     * @public
     */
    strict?: boolean;
}

/**
 * Used in conjunction with the `m` component to reduce bundle size.
 *
 * `m` is a version of the `motion` component that only loads functionality
 * critical for the initial render.
 *
 * `LazyMotion` can then be used to either synchronously or asynchronously
 * load animation and gesture support.
 *
 * ```jsx
 * // Synchronous loading
 * import { LazyMotion, m, domAnimations } from "framer-motion"
 *
 * function App() {
 *   return (
 *     <LazyMotion features={domAnimations}>
 *       <m.div animate={{ scale: 2 }} />
 *     </LazyMotion>
 *   )
 * }
 *
 * // Asynchronous loading
 * import { LazyMotion, m } from "framer-motion"
 *
 * function App() {
 *   return (
 *     <LazyMotion features={() => import('./path/to/domAnimations')}>
 *       <m.div animate={{ scale: 2 }} />
 *     </LazyMotion>
 *   )
 * }
 * ```
 *
 * @public
 */
declare function LazyMotion({ children, features, strict }: LazyProps): JSX.Element;

declare type InheritOption = boolean | "id";
interface Props$2 {
    id?: string;
    inherit?: InheritOption;
    /**
     * @deprecated
     */
    inheritId?: boolean;
}
declare const LayoutGroup: React$1.FunctionComponent<React$1.PropsWithChildren<Props$2>>;

interface Props$1<V> {
    /**
     * A HTML element to render this component as. Defaults to `"li"`.
     *
     * @public
     */
    as?: keyof ReactHTML;
    /**
     * The value in the list that this component represents.
     *
     * @public
     */
    value: V;
    /**
     * A subset of layout options primarily used to disable layout="size"
     *
     * @public
     * @default true
     */
    layout?: true | "position";
}

interface Props<V> {
    /**
     * A HTML element to render this component as. Defaults to `"ul"`.
     *
     * @public
     */
    as?: keyof ReactHTML;
    /**
     * The axis to reorder along. By default, items will be draggable on this axis.
     * To make draggable on both axes, set `<Reorder.Item drag />`
     *
     * @public
     */
    axis?: "x" | "y";
    /**
     * A callback to fire with the new value order. For instance, if the values
     * are provided as a state from `useState`, this could be the set state function.
     *
     * @public
     */
    onReorder: (newOrder: any[]) => void;
    /**
     * The latest values state.
     *
     * ```jsx
     * function Component() {
     *   const [items, setItems] = useState([0, 1, 2])
     *
     *   return (
     *     <Reorder.Group values={items} onReorder={setItems}>
     *         {items.map((item) => <Reorder.Item key={item} value={item} />)}
     *     </Reorder.Group>
     *   )
     * }
     * ```
     *
     * @public
     */
    values: V[];
}

declare const Reorder: {
    Group: React$1.ForwardRefExoticComponent<Props<unknown> & {
        color?: string | undefined;
        translate?: "no" | "yes" | undefined;
        hidden?: boolean | undefined;
        onPlay?: React$1.ReactEventHandler<any> | undefined;
        className?: string | undefined;
        id?: string | undefined;
        lang?: string | undefined;
        role?: React$1.AriaRole | undefined;
        tabIndex?: number | undefined;
        "aria-activedescendant"?: string | undefined;
        "aria-atomic"?: (boolean | "false" | "true") | undefined;
        "aria-autocomplete"?: "none" | "inline" | "both" | "list" | undefined;
        "aria-busy"?: (boolean | "false" | "true") | undefined;
        "aria-checked"?: boolean | "mixed" | "false" | "true" | undefined;
        "aria-colcount"?: number | undefined;
        "aria-colindex"?: number | undefined;
        "aria-colspan"?: number | undefined;
        "aria-controls"?: string | undefined;
        "aria-current"?: boolean | "page" | "false" | "true" | "step" | "location" | "date" | "time" | undefined;
        "aria-describedby"?: string | undefined;
        "aria-details"?: string | undefined;
        "aria-disabled"?: (boolean | "false" | "true") | undefined;
        "aria-dropeffect"?: "none" | "copy" | "move" | "link" | "execute" | "popup" | undefined;
        "aria-errormessage"?: string | undefined;
        "aria-expanded"?: (boolean | "false" | "true") | undefined;
        "aria-flowto"?: string | undefined;
        "aria-grabbed"?: (boolean | "false" | "true") | undefined;
        "aria-haspopup"?: boolean | "grid" | "listbox" | "menu" | "false" | "true" | "dialog" | "tree" | undefined;
        "aria-hidden"?: (boolean | "false" | "true") | undefined;
        "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling" | undefined;
        "aria-keyshortcuts"?: string | undefined;
        "aria-label"?: string | undefined;
        "aria-labelledby"?: string | undefined;
        "aria-level"?: number | undefined;
        "aria-live"?: "off" | "assertive" | "polite" | undefined;
        "aria-modal"?: (boolean | "false" | "true") | undefined;
        "aria-multiline"?: (boolean | "false" | "true") | undefined;
        "aria-multiselectable"?: (boolean | "false" | "true") | undefined;
        "aria-orientation"?: "horizontal" | "vertical" | undefined;
        "aria-owns"?: string | undefined;
        "aria-placeholder"?: string | undefined;
        "aria-posinset"?: number | undefined;
        "aria-pressed"?: boolean | "mixed" | "false" | "true" | undefined;
        "aria-readonly"?: (boolean | "false" | "true") | undefined;
        "aria-relevant"?: "all" | "text" | "additions" | "additions removals" | "additions text" | "removals" | "removals additions" | "removals text" | "text additions" | "text removals" | undefined;
        "aria-required"?: (boolean | "false" | "true") | undefined;
        "aria-roledescription"?: string | undefined;
        "aria-rowcount"?: number | undefined;
        "aria-rowindex"?: number | undefined;
        "aria-rowspan"?: number | undefined;
        "aria-selected"?: (boolean | "false" | "true") | undefined;
        "aria-setsize"?: number | undefined;
        "aria-sort"?: "none" | "ascending" | "descending" | "other" | undefined;
        "aria-valuemax"?: number | undefined;
        "aria-valuemin"?: number | undefined;
        "aria-valuenow"?: number | undefined;
        "aria-valuetext"?: string | undefined;
        children?: React$1.ReactNode;
        dangerouslySetInnerHTML?: {
            __html: string;
        } | undefined;
        onCopy?: React$1.ClipboardEventHandler<any> | undefined;
        onCopyCapture?: React$1.ClipboardEventHandler<any> | undefined;
        onCut?: React$1.ClipboardEventHandler<any> | undefined;
        onCutCapture?: React$1.ClipboardEventHandler<any> | undefined;
        onPaste?: React$1.ClipboardEventHandler<any> | undefined;
        onPasteCapture?: React$1.ClipboardEventHandler<any> | undefined;
        onCompositionEnd?: React$1.CompositionEventHandler<any> | undefined;
        onCompositionEndCapture?: React$1.CompositionEventHandler<any> | undefined;
        onCompositionStart?: React$1.CompositionEventHandler<any> | undefined;
        onCompositionStartCapture?: React$1.CompositionEventHandler<any> | undefined;
        onCompositionUpdate?: React$1.CompositionEventHandler<any> | undefined;
        onCompositionUpdateCapture?: React$1.CompositionEventHandler<any> | undefined;
        onFocus?: React$1.FocusEventHandler<any> | undefined;
        onFocusCapture?: React$1.FocusEventHandler<any> | undefined;
        onBlur?: React$1.FocusEventHandler<any> | undefined;
        onBlurCapture?: React$1.FocusEventHandler<any> | undefined;
        onChange?: React$1.FormEventHandler<any> | undefined;
        onChangeCapture?: React$1.FormEventHandler<any> | undefined;
        onBeforeInput?: React$1.FormEventHandler<any> | undefined;
        onBeforeInputCapture?: React$1.FormEventHandler<any> | undefined;
        onInput?: React$1.FormEventHandler<any> | undefined;
        onInputCapture?: React$1.FormEventHandler<any> | undefined;
        onReset?: React$1.FormEventHandler<any> | undefined;
        onResetCapture?: React$1.FormEventHandler<any> | undefined;
        onSubmit?: React$1.FormEventHandler<any> | undefined;
        onSubmitCapture?: React$1.FormEventHandler<any> | undefined;
        onInvalid?: React$1.FormEventHandler<any> | undefined;
        onInvalidCapture?: React$1.FormEventHandler<any> | undefined;
        onLoad?: React$1.ReactEventHandler<any> | undefined;
        onLoadCapture?: React$1.ReactEventHandler<any> | undefined;
        onError?: React$1.ReactEventHandler<any> | undefined;
        onErrorCapture?: React$1.ReactEventHandler<any> | undefined;
        onKeyDown?: React$1.KeyboardEventHandler<any> | undefined;
        onKeyDownCapture?: React$1.KeyboardEventHandler<any> | undefined;
        onKeyPress?: React$1.KeyboardEventHandler<any> | undefined;
        onKeyPressCapture?: React$1.KeyboardEventHandler<any> | undefined;
        onKeyUp?: React$1.KeyboardEventHandler<any> | undefined;
        onKeyUpCapture?: React$1.KeyboardEventHandler<any> | undefined;
        onAbort?: React$1.ReactEventHandler<any> | undefined;
        onAbortCapture?: React$1.ReactEventHandler<any> | undefined;
        onCanPlay?: React$1.ReactEventHandler<any> | undefined;
        onCanPlayCapture?: React$1.ReactEventHandler<any> | undefined;
        onCanPlayThrough?: React$1.ReactEventHandler<any> | undefined;
        onCanPlayThroughCapture?: React$1.ReactEventHandler<any> | undefined;
        onDurationChange?: React$1.ReactEventHandler<any> | undefined;
        onDurationChangeCapture?: React$1.ReactEventHandler<any> | undefined;
        onEmptied?: React$1.ReactEventHandler<any> | undefined;
        onEmptiedCapture?: React$1.ReactEventHandler<any> | undefined;
        onEncrypted?: React$1.ReactEventHandler<any> | undefined;
        onEncryptedCapture?: React$1.ReactEventHandler<any> | undefined;
        onEnded?: React$1.ReactEventHandler<any> | undefined;
        onEndedCapture?: React$1.ReactEventHandler<any> | undefined;
        onLoadedData?: React$1.ReactEventHandler<any> | undefined;
        onLoadedDataCapture?: React$1.ReactEventHandler<any> | undefined;
        onLoadedMetadata?: React$1.ReactEventHandler<any> | undefined;
        onLoadedMetadataCapture?: React$1.ReactEventHandler<any> | undefined;
        onLoadStart?: React$1.ReactEventHandler<any> | undefined;
        onLoadStartCapture?: React$1.ReactEventHandler<any> | undefined;
        onPause?: React$1.ReactEventHandler<any> | undefined;
        onPauseCapture?: React$1.ReactEventHandler<any> | undefined;
        onPlayCapture?: React$1.ReactEventHandler<any> | undefined;
        onPlaying?: React$1.ReactEventHandler<any> | undefined;
        onPlayingCapture?: React$1.ReactEventHandler<any> | undefined;
        onProgress?: React$1.ReactEventHandler<any> | undefined;
        onProgressCapture?: React$1.ReactEventHandler<any> | undefined;
        onRateChange?: React$1.ReactEventHandler<any> | undefined;
        onRateChangeCapture?: React$1.ReactEventHandler<any> | undefined;
        onSeeked?: React$1.ReactEventHandler<any> | undefined;
        onSeekedCapture?: React$1.ReactEventHandler<any> | undefined;
        onSeeking?: React$1.ReactEventHandler<any> | undefined;
        onSeekingCapture?: React$1.ReactEventHandler<any> | undefined;
        onStalled?: React$1.ReactEventHandler<any> | undefined;
        onStalledCapture?: React$1.ReactEventHandler<any> | undefined;
        onSuspend?: React$1.ReactEventHandler<any> | undefined;
        onSuspendCapture?: React$1.ReactEventHandler<any> | undefined;
        onTimeUpdate?: React$1.ReactEventHandler<any> | undefined;
        onTimeUpdateCapture?: React$1.ReactEventHandler<any> | undefined;
        onVolumeChange?: React$1.ReactEventHandler<any> | undefined;
        onVolumeChangeCapture?: React$1.ReactEventHandler<any> | undefined;
        onWaiting?: React$1.ReactEventHandler<any> | undefined;
        onWaitingCapture?: React$1.ReactEventHandler<any> | undefined;
        onAuxClick?: React$1.MouseEventHandler<any> | undefined;
        onAuxClickCapture?: React$1.MouseEventHandler<any> | undefined;
        onClick?: React$1.MouseEventHandler<any> | undefined;
        onClickCapture?: React$1.MouseEventHandler<any> | undefined;
        onContextMenu?: React$1.MouseEventHandler<any> | undefined;
        onContextMenuCapture?: React$1.MouseEventHandler<any> | undefined;
        onDoubleClick?: React$1.MouseEventHandler<any> | undefined;
        onDoubleClickCapture?: React$1.MouseEventHandler<any> | undefined;
        onDragCapture?: React$1.DragEventHandler<any> | undefined;
        onDragEndCapture?: React$1.DragEventHandler<any> | undefined;
        onDragEnter?: React$1.DragEventHandler<any> | undefined;
        onDragEnterCapture?: React$1.DragEventHandler<any> | undefined;
        onDragExit?: React$1.DragEventHandler<any> | undefined;
        onDragExitCapture?: React$1.DragEventHandler<any> | undefined;
        onDragLeave?: React$1.DragEventHandler<any> | undefined;
        onDragLeaveCapture?: React$1.DragEventHandler<any> | undefined;
        onDragOver?: React$1.DragEventHandler<any> | undefined;
        onDragOverCapture?: React$1.DragEventHandler<any> | undefined;
        onDragStartCapture?: React$1.DragEventHandler<any> | undefined;
        onDrop?: React$1.DragEventHandler<any> | undefined;
        onDropCapture?: React$1.DragEventHandler<any> | undefined;
        onMouseDown?: React$1.MouseEventHandler<any> | undefined;
        onMouseDownCapture?: React$1.MouseEventHandler<any> | undefined;
        onMouseEnter?: React$1.MouseEventHandler<any> | undefined;
        onMouseLeave?: React$1.MouseEventHandler<any> | undefined;
        onMouseMove?: React$1.MouseEventHandler<any> | undefined;
        onMouseMoveCapture?: React$1.MouseEventHandler<any> | undefined;
        onMouseOut?: React$1.MouseEventHandler<any> | undefined;
        onMouseOutCapture?: React$1.MouseEventHandler<any> | undefined;
        onMouseOver?: React$1.MouseEventHandler<any> | undefined;
        onMouseOverCapture?: React$1.MouseEventHandler<any> | undefined;
        onMouseUp?: React$1.MouseEventHandler<any> | undefined;
        onMouseUpCapture?: React$1.MouseEventHandler<any> | undefined;
        onSelect?: React$1.ReactEventHandler<any> | undefined;
        onSelectCapture?: React$1.ReactEventHandler<any> | undefined;
        onTouchCancel?: React$1.TouchEventHandler<any> | undefined;
        onTouchCancelCapture?: React$1.TouchEventHandler<any> | undefined;
        onTouchEnd?: React$1.TouchEventHandler<any> | undefined;
        onTouchEndCapture?: React$1.TouchEventHandler<any> | undefined;
        onTouchMove?: React$1.TouchEventHandler<any> | undefined;
        onTouchMoveCapture?: React$1.TouchEventHandler<any> | undefined;
        onTouchStart?: React$1.TouchEventHandler<any> | undefined;
        onTouchStartCapture?: React$1.TouchEventHandler<any> | undefined;
        onPointerDown?: React$1.PointerEventHandler<any> | undefined;
        onPointerDownCapture?: React$1.PointerEventHandler<any> | undefined;
        onPointerMove?: React$1.PointerEventHandler<any> | undefined;
        onPointerMoveCapture?: React$1.PointerEventHandler<any> | undefined;
        onPointerUp?: React$1.PointerEventHandler<any> | undefined;
        onPointerUpCapture?: React$1.PointerEventHandler<any> | undefined;
        onPointerCancel?: React$1.PointerEventHandler<any> | undefined;
        onPointerCancelCapture?: React$1.PointerEventHandler<any> | undefined;
        onPointerEnter?: React$1.PointerEventHandler<any> | undefined;
        onPointerEnterCapture?: React$1.PointerEventHandler<any> | undefined;
        onPointerLeave?: React$1.PointerEventHandler<any> | undefined;
        onPointerLeaveCapture?: React$1.PointerEventHandler<any> | undefined;
        onPointerOver?: React$1.PointerEventHandler<any> | undefined;
        onPointerOverCapture?: React$1.PointerEventHandler<any> | undefined;
        onPointerOut?: React$1.PointerEventHandler<any> | undefined;
        onPointerOutCapture?: React$1.PointerEventHandler<any> | undefined;
        onGotPointerCapture?: React$1.PointerEventHandler<any> | undefined;
        onGotPointerCaptureCapture?: React$1.PointerEventHandler<any> | undefined;
        onLostPointerCapture?: React$1.PointerEventHandler<any> | undefined;
        onLostPointerCaptureCapture?: React$1.PointerEventHandler<any> | undefined;
        onScroll?: React$1.UIEventHandler<any> | undefined;
        onScrollCapture?: React$1.UIEventHandler<any> | undefined;
        onWheel?: React$1.WheelEventHandler<any> | undefined;
        onWheelCapture?: React$1.WheelEventHandler<any> | undefined;
        onAnimationStartCapture?: React$1.AnimationEventHandler<any> | undefined;
        onAnimationEnd?: React$1.AnimationEventHandler<any> | undefined;
        onAnimationEndCapture?: React$1.AnimationEventHandler<any> | undefined;
        onAnimationIteration?: React$1.AnimationEventHandler<any> | undefined;
        onAnimationIterationCapture?: React$1.AnimationEventHandler<any> | undefined;
        onTransitionEnd?: React$1.TransitionEventHandler<any> | undefined;
        onTransitionEndCapture?: React$1.TransitionEventHandler<any> | undefined;
        draggable?: (boolean | "false" | "true") | undefined;
        slot?: string | undefined;
        title?: string | undefined;
        defaultChecked?: boolean | undefined;
        defaultValue?: string | number | readonly string[] | undefined;
        suppressContentEditableWarning?: boolean | undefined;
        suppressHydrationWarning?: boolean | undefined;
        accessKey?: string | undefined;
        contentEditable?: "inherit" | (boolean | "false" | "true") | undefined;
        contextMenu?: string | undefined;
        dir?: string | undefined;
        placeholder?: string | undefined;
        spellCheck?: (boolean | "false" | "true") | undefined;
        radioGroup?: string | undefined;
        about?: string | undefined;
        datatype?: string | undefined;
        inlist?: any;
        prefix?: string | undefined;
        property?: string | undefined;
        resource?: string | undefined;
        typeof?: string | undefined;
        vocab?: string | undefined;
        autoCapitalize?: string | undefined;
        autoCorrect?: string | undefined;
        autoSave?: string | undefined;
        itemProp?: string | undefined;
        itemScope?: boolean | undefined;
        itemType?: string | undefined;
        itemID?: string | undefined;
        itemRef?: string | undefined;
        results?: number | undefined;
        security?: string | undefined;
        unselectable?: "off" | "on" | undefined;
        inputMode?: "none" | "text" | "search" | "tel" | "url" | "email" | "numeric" | "decimal" | undefined;
        is?: string | undefined;
    } & MotionProps & React$1.RefAttributes<any>>;
    Item: React$1.ForwardRefExoticComponent<Props$1<unknown> & {
        color?: string | undefined;
        translate?: "no" | "yes" | undefined;
        hidden?: boolean | undefined;
        onPlay?: React$1.ReactEventHandler<any> | undefined;
        className?: string | undefined;
        id?: string | undefined;
        lang?: string | undefined;
        role?: React$1.AriaRole | undefined;
        tabIndex?: number | undefined;
        "aria-activedescendant"?: string | undefined;
        "aria-atomic"?: (boolean | "false" | "true") | undefined;
        "aria-autocomplete"?: "none" | "inline" | "both" | "list" | undefined;
        "aria-busy"?: (boolean | "false" | "true") | undefined;
        "aria-checked"?: boolean | "mixed" | "false" | "true" | undefined;
        "aria-colcount"?: number | undefined;
        "aria-colindex"?: number | undefined;
        "aria-colspan"?: number | undefined;
        "aria-controls"?: string | undefined;
        "aria-current"?: boolean | "page" | "false" | "true" | "step" | "location" | "date" | "time" | undefined;
        "aria-describedby"?: string | undefined;
        "aria-details"?: string | undefined;
        "aria-disabled"?: (boolean | "false" | "true") | undefined;
        "aria-dropeffect"?: "none" | "copy" | "move" | "link" | "execute" | "popup" | undefined;
        "aria-errormessage"?: string | undefined;
        "aria-expanded"?: (boolean | "false" | "true") | undefined;
        "aria-flowto"?: string | undefined;
        "aria-grabbed"?: (boolean | "false" | "true") | undefined;
        "aria-haspopup"?: boolean | "grid" | "listbox" | "menu" | "false" | "true" | "dialog" | "tree" | undefined;
        "aria-hidden"?: (boolean | "false" | "true") | undefined;
        "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling" | undefined;
        "aria-keyshortcuts"?: string | undefined;
        "aria-label"?: string | undefined;
        "aria-labelledby"?: string | undefined;
        "aria-level"?: number | undefined;
        "aria-live"?: "off" | "assertive" | "polite" | undefined;
        "aria-modal"?: (boolean | "false" | "true") | undefined;
        "aria-multiline"?: (boolean | "false" | "true") | undefined;
        "aria-multiselectable"?: (boolean | "false" | "true") | undefined;
        "aria-orientation"?: "horizontal" | "vertical" | undefined;
        "aria-owns"?: string | undefined;
        "aria-placeholder"?: string | undefined;
        "aria-posinset"?: number | undefined;
        "aria-pressed"?: boolean | "mixed" | "false" | "true" | undefined;
        "aria-readonly"?: (boolean | "false" | "true") | undefined;
        "aria-relevant"?: "all" | "text" | "additions" | "additions removals" | "additions text" | "removals" | "removals additions" | "removals text" | "text additions" | "text removals" | undefined;
        "aria-required"?: (boolean | "false" | "true") | undefined;
        "aria-roledescription"?: string | undefined;
        "aria-rowcount"?: number | undefined;
        "aria-rowindex"?: number | undefined;
        "aria-rowspan"?: number | undefined;
        "aria-selected"?: (boolean | "false" | "true") | undefined;
        "aria-setsize"?: number | undefined;
        "aria-sort"?: "none" | "ascending" | "descending" | "other" | undefined;
        "aria-valuemax"?: number | undefined;
        "aria-valuemin"?: number | undefined;
        "aria-valuenow"?: number | undefined;
        "aria-valuetext"?: string | undefined;
        children?: React$1.ReactNode;
        dangerouslySetInnerHTML?: {
            __html: string;
        } | undefined;
        onCopy?: React$1.ClipboardEventHandler<any> | undefined;
        onCopyCapture?: React$1.ClipboardEventHandler<any> | undefined;
        onCut?: React$1.ClipboardEventHandler<any> | undefined;
        onCutCapture?: React$1.ClipboardEventHandler<any> | undefined;
        onPaste?: React$1.ClipboardEventHandler<any> | undefined;
        onPasteCapture?: React$1.ClipboardEventHandler<any> | undefined;
        onCompositionEnd?: React$1.CompositionEventHandler<any> | undefined;
        onCompositionEndCapture?: React$1.CompositionEventHandler<any> | undefined;
        onCompositionStart?: React$1.CompositionEventHandler<any> | undefined;
        onCompositionStartCapture?: React$1.CompositionEventHandler<any> | undefined;
        onCompositionUpdate?: React$1.CompositionEventHandler<any> | undefined;
        onCompositionUpdateCapture?: React$1.CompositionEventHandler<any> | undefined;
        onFocus?: React$1.FocusEventHandler<any> | undefined;
        onFocusCapture?: React$1.FocusEventHandler<any> | undefined;
        onBlur?: React$1.FocusEventHandler<any> | undefined;
        onBlurCapture?: React$1.FocusEventHandler<any> | undefined;
        onChange?: React$1.FormEventHandler<any> | undefined;
        onChangeCapture?: React$1.FormEventHandler<any> | undefined;
        onBeforeInput?: React$1.FormEventHandler<any> | undefined;
        onBeforeInputCapture?: React$1.FormEventHandler<any> | undefined;
        onInput?: React$1.FormEventHandler<any> | undefined;
        onInputCapture?: React$1.FormEventHandler<any> | undefined;
        onReset?: React$1.FormEventHandler<any> | undefined;
        onResetCapture?: React$1.FormEventHandler<any> | undefined;
        onSubmit?: React$1.FormEventHandler<any> | undefined;
        onSubmitCapture?: React$1.FormEventHandler<any> | undefined;
        onInvalid?: React$1.FormEventHandler<any> | undefined;
        onInvalidCapture?: React$1.FormEventHandler<any> | undefined;
        onLoad?: React$1.ReactEventHandler<any> | undefined;
        onLoadCapture?: React$1.ReactEventHandler<any> | undefined;
        onError?: React$1.ReactEventHandler<any> | undefined;
        onErrorCapture?: React$1.ReactEventHandler<any> | undefined;
        onKeyDown?: React$1.KeyboardEventHandler<any> | undefined;
        onKeyDownCapture?: React$1.KeyboardEventHandler<any> | undefined;
        onKeyPress?: React$1.KeyboardEventHandler<any> | undefined;
        onKeyPressCapture?: React$1.KeyboardEventHandler<any> | undefined;
        onKeyUp?: React$1.KeyboardEventHandler<any> | undefined;
        onKeyUpCapture?: React$1.KeyboardEventHandler<any> | undefined;
        onAbort?: React$1.ReactEventHandler<any> | undefined;
        onAbortCapture?: React$1.ReactEventHandler<any> | undefined;
        onCanPlay?: React$1.ReactEventHandler<any> | undefined;
        onCanPlayCapture?: React$1.ReactEventHandler<any> | undefined;
        onCanPlayThrough?: React$1.ReactEventHandler<any> | undefined;
        onCanPlayThroughCapture?: React$1.ReactEventHandler<any> | undefined;
        onDurationChange?: React$1.ReactEventHandler<any> | undefined;
        onDurationChangeCapture?: React$1.ReactEventHandler<any> | undefined;
        onEmptied?: React$1.ReactEventHandler<any> | undefined;
        onEmptiedCapture?: React$1.ReactEventHandler<any> | undefined;
        onEncrypted?: React$1.ReactEventHandler<any> | undefined;
        onEncryptedCapture?: React$1.ReactEventHandler<any> | undefined;
        onEnded?: React$1.ReactEventHandler<any> | undefined;
        onEndedCapture?: React$1.ReactEventHandler<any> | undefined;
        onLoadedData?: React$1.ReactEventHandler<any> | undefined;
        onLoadedDataCapture?: React$1.ReactEventHandler<any> | undefined;
        onLoadedMetadata?: React$1.ReactEventHandler<any> | undefined;
        onLoadedMetadataCapture?: React$1.ReactEventHandler<any> | undefined;
        onLoadStart?: React$1.ReactEventHandler<any> | undefined;
        onLoadStartCapture?: React$1.ReactEventHandler<any> | undefined;
        onPause?: React$1.ReactEventHandler<any> | undefined;
        onPauseCapture?: React$1.ReactEventHandler<any> | undefined;
        onPlayCapture?: React$1.ReactEventHandler<any> | undefined;
        onPlaying?: React$1.ReactEventHandler<any> | undefined;
        onPlayingCapture?: React$1.ReactEventHandler<any> | undefined;
        onProgress?: React$1.ReactEventHandler<any> | undefined;
        onProgressCapture?: React$1.ReactEventHandler<any> | undefined;
        onRateChange?: React$1.ReactEventHandler<any> | undefined;
        onRateChangeCapture?: React$1.ReactEventHandler<any> | undefined;
        onSeeked?: React$1.ReactEventHandler<any> | undefined;
        onSeekedCapture?: React$1.ReactEventHandler<any> | undefined;
        onSeeking?: React$1.ReactEventHandler<any> | undefined;
        onSeekingCapture?: React$1.ReactEventHandler<any> | undefined;
        onStalled?: React$1.ReactEventHandler<any> | undefined;
        onStalledCapture?: React$1.ReactEventHandler<any> | undefined;
        onSuspend?: React$1.ReactEventHandler<any> | undefined;
        onSuspendCapture?: React$1.ReactEventHandler<any> | undefined;
        onTimeUpdate?: React$1.ReactEventHandler<any> | undefined;
        onTimeUpdateCapture?: React$1.ReactEventHandler<any> | undefined;
        onVolumeChange?: React$1.ReactEventHandler<any> | undefined;
        onVolumeChangeCapture?: React$1.ReactEventHandler<any> | undefined;
        onWaiting?: React$1.ReactEventHandler<any> | undefined;
        onWaitingCapture?: React$1.ReactEventHandler<any> | undefined;
        onAuxClick?: React$1.MouseEventHandler<any> | undefined;
        onAuxClickCapture?: React$1.MouseEventHandler<any> | undefined;
        onClick?: React$1.MouseEventHandler<any> | undefined;
        onClickCapture?: React$1.MouseEventHandler<any> | undefined;
        onContextMenu?: React$1.MouseEventHandler<any> | undefined;
        onContextMenuCapture?: React$1.MouseEventHandler<any> | undefined;
        onDoubleClick?: React$1.MouseEventHandler<any> | undefined;
        onDoubleClickCapture?: React$1.MouseEventHandler<any> | undefined;
        onDragCapture?: React$1.DragEventHandler<any> | undefined;
        onDragEndCapture?: React$1.DragEventHandler<any> | undefined;
        onDragEnter?: React$1.DragEventHandler<any> | undefined;
        onDragEnterCapture?: React$1.DragEventHandler<any> | undefined;
        onDragExit?: React$1.DragEventHandler<any> | undefined;
        onDragExitCapture?: React$1.DragEventHandler<any> | undefined;
        onDragLeave?: React$1.DragEventHandler<any> | undefined;
        onDragLeaveCapture?: React$1.DragEventHandler<any> | undefined;
        onDragOver?: React$1.DragEventHandler<any> | undefined;
        onDragOverCapture?: React$1.DragEventHandler<any> | undefined;
        onDragStartCapture?: React$1.DragEventHandler<any> | undefined;
        onDrop?: React$1.DragEventHandler<any> | undefined;
        onDropCapture?: React$1.DragEventHandler<any> | undefined;
        onMouseDown?: React$1.MouseEventHandler<any> | undefined;
        onMouseDownCapture?: React$1.MouseEventHandler<any> | undefined;
        onMouseEnter?: React$1.MouseEventHandler<any> | undefined;
        onMouseLeave?: React$1.MouseEventHandler<any> | undefined;
        onMouseMove?: React$1.MouseEventHandler<any> | undefined;
        onMouseMoveCapture?: React$1.MouseEventHandler<any> | undefined;
        onMouseOut?: React$1.MouseEventHandler<any> | undefined;
        onMouseOutCapture?: React$1.MouseEventHandler<any> | undefined;
        onMouseOver?: React$1.MouseEventHandler<any> | undefined;
        onMouseOverCapture?: React$1.MouseEventHandler<any> | undefined;
        onMouseUp?: React$1.MouseEventHandler<any> | undefined;
        onMouseUpCapture?: React$1.MouseEventHandler<any> | undefined;
        onSelect?: React$1.ReactEventHandler<any> | undefined;
        onSelectCapture?: React$1.ReactEventHandler<any> | undefined;
        onTouchCancel?: React$1.TouchEventHandler<any> | undefined;
        onTouchCancelCapture?: React$1.TouchEventHandler<any> | undefined;
        onTouchEnd?: React$1.TouchEventHandler<any> | undefined;
        onTouchEndCapture?: React$1.TouchEventHandler<any> | undefined;
        onTouchMove?: React$1.TouchEventHandler<any> | undefined;
        onTouchMoveCapture?: React$1.TouchEventHandler<any> | undefined;
        onTouchStart?: React$1.TouchEventHandler<any> | undefined;
        onTouchStartCapture?: React$1.TouchEventHandler<any> | undefined;
        onPointerDown?: React$1.PointerEventHandler<any> | undefined;
        onPointerDownCapture?: React$1.PointerEventHandler<any> | undefined;
        onPointerMove?: React$1.PointerEventHandler<any> | undefined;
        onPointerMoveCapture?: React$1.PointerEventHandler<any> | undefined;
        onPointerUp?: React$1.PointerEventHandler<any> | undefined;
        onPointerUpCapture?: React$1.PointerEventHandler<any> | undefined;
        onPointerCancel?: React$1.PointerEventHandler<any> | undefined;
        onPointerCancelCapture?: React$1.PointerEventHandler<any> | undefined;
        onPointerEnter?: React$1.PointerEventHandler<any> | undefined;
        onPointerEnterCapture?: React$1.PointerEventHandler<any> | undefined;
        onPointerLeave?: React$1.PointerEventHandler<any> | undefined;
        onPointerLeaveCapture?: React$1.PointerEventHandler<any> | undefined;
        onPointerOver?: React$1.PointerEventHandler<any> | undefined;
        onPointerOverCapture?: React$1.PointerEventHandler<any> | undefined;
        onPointerOut?: React$1.PointerEventHandler<any> | undefined;
        onPointerOutCapture?: React$1.PointerEventHandler<any> | undefined;
        onGotPointerCapture?: React$1.PointerEventHandler<any> | undefined;
        onGotPointerCaptureCapture?: React$1.PointerEventHandler<any> | undefined;
        onLostPointerCapture?: React$1.PointerEventHandler<any> | undefined;
        onLostPointerCaptureCapture?: React$1.PointerEventHandler<any> | undefined;
        onScroll?: React$1.UIEventHandler<any> | undefined;
        onScrollCapture?: React$1.UIEventHandler<any> | undefined;
        onWheel?: React$1.WheelEventHandler<any> | undefined;
        onWheelCapture?: React$1.WheelEventHandler<any> | undefined;
        onAnimationStartCapture?: React$1.AnimationEventHandler<any> | undefined;
        onAnimationEnd?: React$1.AnimationEventHandler<any> | undefined;
        onAnimationEndCapture?: React$1.AnimationEventHandler<any> | undefined;
        onAnimationIteration?: React$1.AnimationEventHandler<any> | undefined;
        onAnimationIterationCapture?: React$1.AnimationEventHandler<any> | undefined;
        onTransitionEnd?: React$1.TransitionEventHandler<any> | undefined;
        onTransitionEndCapture?: React$1.TransitionEventHandler<any> | undefined;
        draggable?: (boolean | "false" | "true") | undefined;
        slot?: string | undefined;
        title?: string | undefined;
        defaultChecked?: boolean | undefined;
        defaultValue?: string | number | readonly string[] | undefined;
        suppressContentEditableWarning?: boolean | undefined;
        suppressHydrationWarning?: boolean | undefined;
        accessKey?: string | undefined;
        contentEditable?: "inherit" | (boolean | "false" | "true") | undefined;
        contextMenu?: string | undefined;
        dir?: string | undefined;
        placeholder?: string | undefined;
        spellCheck?: (boolean | "false" | "true") | undefined;
        radioGroup?: string | undefined;
        about?: string | undefined;
        datatype?: string | undefined;
        inlist?: any;
        prefix?: string | undefined;
        property?: string | undefined;
        resource?: string | undefined;
        typeof?: string | undefined;
        vocab?: string | undefined;
        autoCapitalize?: string | undefined;
        autoCorrect?: string | undefined;
        autoSave?: string | undefined;
        itemProp?: string | undefined;
        itemScope?: boolean | undefined;
        itemType?: string | undefined;
        itemID?: string | undefined;
        itemRef?: string | undefined;
        results?: number | undefined;
        security?: string | undefined;
        unselectable?: "off" | "on" | undefined;
        inputMode?: "none" | "text" | "search" | "tel" | "url" | "email" | "numeric" | "decimal" | undefined;
        is?: string | undefined;
    } & MotionProps & React$1.RefAttributes<any>>;
};

declare const animations: FeatureComponents;

interface MotionContextProps {
    visualElement?: VisualElement;
    initial?: false | string | string[];
    animate?: string | string[];
}
declare const MotionContext: React$1.Context<MotionContextProps>;
declare function useVisualElementContext(): VisualElement<any, any> | undefined;

declare function checkTargetForNewValues(visualElement: VisualElement, target: TargetWithKeyframes, origin: ResolvedValues): void;

declare const createBox: () => Box;

declare function calcLength(axis: Axis): number;

declare function isDragActive(): boolean;

declare type EventListenerWithPointInfo = (e: MouseEvent | TouchEvent | PointerEvent, info: EventInfo) => void;
declare const wrapHandler: (handler: EventListenerWithPointInfo, shouldFilterPrimaryPointer?: boolean) => EventListener;

declare function addPointerEvent(target: EventTarget, eventName: string, handler: EventListenerWithPointInfo, options?: AddEventListenerOptions): () => void;

declare const isMotionValue: (value: any) => value is MotionValue<any>;

declare const isBrowser: boolean;

declare function useUnmountEffect(callback: () => void): void;

declare const useIsomorphicLayoutEffect: typeof useEffect;

declare function useForceUpdate(): [VoidFunction, number];

/**
 * @public
 */
declare const domAnimation: FeatureBundle;

/**
 * @public
 */
declare const domMax: FeatureBundle;

/**
 * Creates a `MotionValue` to track the state and velocity of a value.
 *
 * Usually, these are created automatically. For advanced use-cases, like use with `useTransform`, you can create `MotionValue`s externally and pass them into the animated component via the `style` prop.
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const scale = useMotionValue(1)
 *
 *   return <motion.div style={{ scale }} />
 * }
 * ```
 *
 * @param initial - The initial state.
 *
 * @public
 */
declare function useMotionValue<T>(initial: T): MotionValue<T>;

/**
 * Combine multiple motion values into a new one using a string template literal.
 *
 * ```jsx
 * import {
 *   motion,
 *   useSpring,
 *   useMotionValue,
 *   useMotionTemplate
 * } from "framer-motion"
 *
 * function Component() {
 *   const shadowX = useSpring(0)
 *   const shadowY = useMotionValue(0)
 *   const shadow = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 20px rgba(0,0,0,0.3))`
 *
 *   return <motion.div style={{ filter: shadow }} />
 * }
 * ```
 *
 * @public
 */
declare function useMotionTemplate(fragments: TemplateStringsArray, ...values: MotionValue[]): MotionValue<string>;

/**
 * If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
 *
 * TODO: Remove and move to library
 */
declare function resolveMotionValue(value?: string | number | CustomValueType | MotionValue): string | number;

/**
 * @public
 */
interface TransformOptions<T> {
    /**
     * Clamp values to within the given range. Defaults to `true`
     *
     * @public
     */
    clamp?: boolean;
    /**
     * Easing functions to use on the interpolations between each value in the input and output ranges.
     *
     * If provided as an array, the array must be one item shorter than the input and output ranges, as the easings apply to the transition **between** each.
     *
     * @public
     */
    ease?: Easing$1 | Easing$1[];
}
/**
 * Transforms numbers into other values by mapping them from an input range to an output range.
 * Returns the type of the input provided.
 *
 * @remarks
 *
 * Given an input range of `[0, 200]` and an output range of
 * `[0, 1]`, this function will return a value between `0` and `1`.
 * The input range must be a linear series of numbers. The output range
 * can be any supported value type, such as numbers, colors, shadows, arrays, objects and more.
 * Every value in the output range must be of the same type and in the same format.
 *
 * ```jsx
 * import * as React from "react"
 * import { transform } from "framer-motion"
 *
 * export function MyComponent() {
 *    const inputRange = [0, 200]
 *    const outputRange = [0, 1]
 *    const output = transform(100, inputRange, outputRange)
 *
 *    // Returns 0.5
 *    return <div>{output}</div>
 * }
 * ```
 *
 * @param inputValue - A number to transform between the input and output ranges.
 * @param inputRange - A linear series of numbers (either all increasing or decreasing).
 * @param outputRange - A series of numbers, colors, strings, or arrays/objects of those. Must be the same length as `inputRange`.
 * @param options - Clamp: Clamp values to within the given range. Defaults to `true`.
 *
 * @public
 */
declare function transform<T>(inputValue: number, inputRange: number[], outputRange: T[], options?: TransformOptions<T>): T;
/**
 *
 * Transforms numbers into other values by mapping them from an input range to an output range.
 *
 * Given an input range of `[0, 200]` and an output range of
 * `[0, 1]`, this function will return a value between `0` and `1`.
 * The input range must be a linear series of numbers. The output range
 * can be any supported value type, such as numbers, colors, shadows, arrays, objects and more.
 * Every value in the output range must be of the same type and in the same format.
 *
 * ```jsx
 * import * as React from "react"
 * import { Frame, transform } from "framer"
 *
 * export function MyComponent() {
 *     const inputRange = [-200, -100, 100, 200]
 *     const outputRange = [0, 1, 1, 0]
 *     const convertRange = transform(inputRange, outputRange)
 *     const output = convertRange(-150)
 *
 *     // Returns 0.5
 *     return <div>{output}</div>
 * }
 *
 * ```
 *
 * @param inputRange - A linear series of numbers (either all increasing or decreasing).
 * @param outputRange - A series of numbers, colors or strings. Must be the same length as `inputRange`.
 * @param options - Clamp: clamp values to within the given range. Defaults to `true`.
 *
 * @public
 */
declare function transform<T>(inputRange: number[], outputRange: T[], options?: TransformOptions<T>): (inputValue: number) => T;

declare type InputRange = number[];
declare type SingleTransformer<I, O> = (input: I) => O;
declare type MultiTransformer<I, O> = (input: I[]) => O;
/**
 * Create a `MotionValue` that transforms the output of another `MotionValue` by mapping it from one range of values into another.
 *
 * @remarks
 *
 * Given an input range of `[-200, -100, 100, 200]` and an output range of
 * `[0, 1, 1, 0]`, the returned `MotionValue` will:
 *
 * - When provided a value between `-200` and `-100`, will return a value between `0` and  `1`.
 * - When provided a value between `-100` and `100`, will return `1`.
 * - When provided a value between `100` and `200`, will return a value between `1` and  `0`
 *
 *
 * The input range must be a linear series of numbers. The output range
 * can be any value type supported by Framer Motion: numbers, colors, shadows, etc.
 *
 * Every value in the output range must be of the same type and in the same format.
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const x = useMotionValue(0)
 *   const xRange = [-200, -100, 100, 200]
 *   const opacityRange = [0, 1, 1, 0]
 *   const opacity = useTransform(x, xRange, opacityRange)
 *
 *   return (
 *     <motion.div
 *       animate={{ x: 200 }}
 *       style={{ opacity, x }}
 *     />
 *   )
 * }
 * ```
 *
 * @param inputValue - `MotionValue`
 * @param inputRange - A linear series of numbers (either all increasing or decreasing)
 * @param outputRange - A series of numbers, colors or strings. Must be the same length as `inputRange`.
 * @param options -
 *
 *  - clamp: boolean. Clamp values to within the given range. Defaults to `true`
 *  - ease: EasingFunction[]. Easing functions to use on the interpolations between each value in the input and output ranges. If provided as an array, the array must be one item shorter than the input and output ranges, as the easings apply to the transition between each.
 *
 * @returns `MotionValue`
 *
 * @public
 */
declare function useTransform<I, O>(value: MotionValue<number>, inputRange: InputRange, outputRange: O[], options?: TransformOptions<O>): MotionValue<O>;
/**
 * Create a `MotionValue` that transforms the output of another `MotionValue` through a function.
 * In this example, `y` will always be double `x`.
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const x = useMotionValue(10)
 *   const y = useTransform(x, value => value * 2)
 *
 *   return <motion.div style={{ x, y }} />
 * }
 * ```
 *
 * @param input - A `MotionValue` that will pass its latest value through `transform` to update the returned `MotionValue`.
 * @param transform - A function that accepts the latest value from `input` and returns a new value.
 * @returns `MotionValue`
 *
 * @public
 */
declare function useTransform<I, O>(input: MotionValue<I>, transformer: SingleTransformer<I, O>): MotionValue<O>;
/**
 * Pass an array of `MotionValue`s and a function to combine them. In this example, `z` will be the `x` multiplied by `y`.
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const x = useMotionValue(0)
 *   const y = useMotionValue(0)
 *   const z = useTransform([x, y], ([latestX, latestY]) => latestX * latestY)
 *
 *   return <motion.div style={{ x, y, z }} />
 * }
 * ```
 *
 * @param input - An array of `MotionValue`s that will pass their latest values through `transform` to update the returned `MotionValue`.
 * @param transform - A function that accepts the latest values from `input` and returns a new value.
 * @returns `MotionValue`
 *
 * @public
 */
declare function useTransform<I, O>(input: MotionValue<string>[] | MotionValue<number>[] | MotionValue<string | number>[], transformer: MultiTransformer<I, O>): MotionValue<O>;

/**
 * Creates a `MotionValue` that, when `set`, will use a spring animation to animate to its new state.
 *
 * It can either work as a stand-alone `MotionValue` by initialising it with a value, or as a subscriber
 * to another `MotionValue`.
 *
 * @remarks
 *
 * ```jsx
 * const x = useSpring(0, { stiffness: 300 })
 * const y = useSpring(x, { damping: 10 })
 * ```
 *
 * @param inputValue - `MotionValue` or number. If provided a `MotionValue`, when the input `MotionValue` changes, the created `MotionValue` will spring towards that value.
 * @param springConfig - Configuration options for the spring.
 * @returns `MotionValue`
 *
 * @public
 */
declare function useSpring(source: MotionValue | number, config?: SpringOptions): MotionValue<any>;

/**
 * Creates a `MotionValue` that updates when the velocity of the provided `MotionValue` changes.
 *
 * ```javascript
 * const x = useMotionValue(0)
 * const xVelocity = useVelocity(x)
 * const xAcceleration = useVelocity(xVelocity)
 * ```
 *
 * @public
 */
declare function useVelocity(value: MotionValue<number>): MotionValue<number>;

interface UseScrollOptions extends Omit<ScrollOptions, "container" | "target"> {
    container?: RefObject<HTMLElement>;
    target?: RefObject<HTMLElement>;
}
declare function useScroll({ container, target, ...options }?: UseScrollOptions): {
    scrollX: MotionValue<number>;
    scrollY: MotionValue<number>;
    scrollXProgress: MotionValue<number>;
    scrollYProgress: MotionValue<number>;
};

declare function useElementScroll(ref: RefObject<HTMLElement>): {
    scrollX: MotionValue<number>;
    scrollY: MotionValue<number>;
    scrollXProgress: MotionValue<number>;
    scrollYProgress: MotionValue<number>;
};

declare function useViewportScroll(): {
    scrollX: MotionValue<number>;
    scrollY: MotionValue<number>;
    scrollXProgress: MotionValue<number>;
    scrollYProgress: MotionValue<number>;
};

declare function useTime(): MotionValue<number>;

/**
 * A hook that returns `true` if we should be using reduced motion based on the current device's Reduced Motion setting.
 *
 * This can be used to implement changes to your UI based on Reduced Motion. For instance, replacing motion-sickness inducing
 * `x`/`y` animations with `opacity`, disabling the autoplay of background videos, or turning off parallax motion.
 *
 * It will actively respond to changes and re-render your components with the latest setting.
 *
 * ```jsx
 * export function Sidebar({ isOpen }) {
 *   const shouldReduceMotion = useReducedMotion()
 *   const closedX = shouldReduceMotion ? 0 : "-100%"
 *
 *   return (
 *     <motion.div animate={{
 *       opacity: isOpen ? 1 : 0,
 *       x: isOpen ? 0 : closedX
 *     }} />
 *   )
 * }
 * ```
 *
 * @return boolean
 *
 * @public
 */
declare function useReducedMotion(): boolean | null;
declare function useReducedMotionConfig(): boolean | null;

/**
 * @public
 */
declare function animationControls(): AnimationControls;

/**
 * Creates `AnimationControls`, which can be used to manually start, stop
 * and sequence animations on one or more components.
 *
 * The returned `AnimationControls` should be passed to the `animate` property
 * of the components you want to animate.
 *
 * These components can then be animated with the `start` method.
 *
 * ```jsx
 * import * as React from 'react'
 * import { motion, useAnimation } from 'framer-motion'
 *
 * export function MyComponent(props) {
 *    const controls = useAnimation()
 *
 *    controls.start({
 *        x: 100,
 *        transition: { duration: 0.5 },
 *    })
 *
 *    return <motion.div animate={controls} />
 * }
 * ```
 *
 * @returns Animation controller with `start` and `stop` methods
 *
 * @public
 */
declare function useAnimationControls(): AnimationControls;
declare const useAnimation: typeof useAnimationControls;

declare type FrameCallback = (timestamp: number) => void;
declare function useAnimationFrame(callback: FrameCallback): void;

declare type Cycle = (i?: number) => void;
declare type CycleState<T> = [T, Cycle];
/**
 * Cycles through a series of visual properties. Can be used to toggle between or cycle through animations. It works similar to `useState` in React. It is provided an initial array of possible states, and returns an array of two arguments.
 *
 * An index value can be passed to the returned `cycle` function to cycle to a specific index.
 *
 * ```jsx
 * import * as React from "react"
 * import { motion, useCycle } from "framer-motion"
 *
 * export const MyComponent = () => {
 *   const [x, cycleX] = useCycle(0, 50, 100)
 *
 *   return (
 *     <motion.div
 *       animate={{ x: x }}
 *       onTap={() => cycleX()}
 *      />
 *    )
 * }
 * ```
 *
 * @param items - items to cycle through
 * @returns [currentState, cycleState]
 *
 * @public
 */
declare function useCycle<T>(...items: T[]): CycleState<T>;

/**
 * Check whether a prop name is a valid `MotionProp` key.
 *
 * @param key - Name of the property to check
 * @returns `true` is key is a valid `MotionProp`.
 *
 * @public
 */
declare function isValidMotionProp(key: string): boolean;

/**
 * @public
 */
interface PresenceContextProps {
    id: number;
    isPresent: boolean;
    register: (id: number) => () => void;
    onExitComplete?: (id: number) => void;
    initial?: false | VariantLabels;
    custom?: any;
}
/**
 * @public
 */
declare const PresenceContext: React$1.Context<PresenceContextProps | null>;

declare type SafeToRemove = () => void;
declare type AlwaysPresent = [true, null];
declare type Present = [true];
declare type NotPresent = [false, SafeToRemove];
/**
 * When a component is the child of `AnimatePresence`, it can use `usePresence`
 * to access information about whether it's still present in the React tree.
 *
 * ```jsx
 * import { usePresence } from "framer-motion"
 *
 * export const Component = () => {
 *   const [isPresent, safeToRemove] = usePresence()
 *
 *   useEffect(() => {
 *     !isPresent && setTimeout(safeToRemove, 1000)
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * If `isPresent` is `false`, it means that a component has been removed the tree, but
 * `AnimatePresence` won't really remove it until `safeToRemove` has been called.
 *
 * @public
 */
declare function usePresence(): AlwaysPresent | Present | NotPresent;
/**
 * Similar to `usePresence`, except `useIsPresent` simply returns whether or not the component is present.
 * There is no `safeToRemove` function.
 *
 * ```jsx
 * import { useIsPresent } from "framer-motion"
 *
 * export const Component = () => {
 *   const isPresent = useIsPresent()
 *
 *   useEffect(() => {
 *     !isPresent && console.log("I've been removed!")
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * @public
 */
declare function useIsPresent(): boolean;

interface Options extends Omit<InViewOptions, "root" | "amount"> {
    root?: RefObject<Element>;
    once?: boolean;
    amount?: "some" | "all" | number;
}
declare function useInView(ref: RefObject<Element>, { root, margin, amount, once }?: Options): boolean;

/**
 * Attaches an event listener directly to the provided DOM element.
 *
 * Bypassing React's event system can be desirable, for instance when attaching non-passive
 * event handlers.
 *
 * ```jsx
 * const ref = useRef(null)
 *
 * useDomEvent(ref, 'wheel', onWheel, { passive: false })
 *
 * return <div ref={ref} />
 * ```
 *
 * @param ref - React.RefObject that's been provided to the element you want to bind the listener to.
 * @param eventName - Name of the event you want listen for.
 * @param handler - Function to fire when receiving the event.
 * @param options - Options to pass to `Event.addEventListener`.
 *
 * @public
 */
declare function useDomEvent(ref: RefObject<EventTarget>, eventName: string, handler?: EventListener | undefined, options?: AddEventListenerOptions): void;

declare const visualElement: <Instance, MutableState, Options>({ treeType, build, getBaseTarget, makeTargetAnimatable, measureViewportBox, render: renderInstance, readValueFromInstance, removeValueFromRenderState, sortNodePosition, scrapeMotionValuesFromProps, }: VisualElementConfig<Instance, MutableState, Options>) => ({ parent, props, presenceId, blockInitialAnimation, visualState, shouldReduceMotion, }: VisualElementOptions<Instance, any>, options?: Options) => VisualElement<Instance, any>;

declare type ScaleCorrector = (latest: string | number, node: IProjectionNode) => string | number;
interface ScaleCorrectorDefinition {
    correct: ScaleCorrector;
    applyTo?: string[];
}
interface ScaleCorrectorMap {
    [key: string]: ScaleCorrectorDefinition;
}

declare function addScaleCorrector(correctors: ScaleCorrectorMap): void;

declare function useInstantTransition(): (callback: () => void) => void;

declare function useInstantLayoutTransition(): (cb?: (() => void) | undefined) => void;

declare function useResetProjection(): () => void;

interface NodeGroup {
    add: (node: IProjectionNode) => void;
    remove: (node: IProjectionNode) => void;
    dirty: VoidFunction;
}

interface LayoutGroupContextProps {
    id?: string;
    group?: NodeGroup;
    forceRender?: VoidFunction;
}
declare const LayoutGroupContext: React$1.Context<LayoutGroupContextProps>;

/**
 * @deprecated
 */
declare const DeprecatedLayoutGroupContext: React$1.Context<string | null>;

/**
 * @public
 */
interface ScrollMotionValues {
    scrollX: MotionValue<number>;
    scrollY: MotionValue<number>;
    scrollXProgress: MotionValue<number>;
    scrollYProgress: MotionValue<number>;
}

/**
 * This is not an officially supported API and may be removed
 * on any version.
 */
declare function useAnimatedState(initialState: any): any[];

interface ScaleMotionValues {
    scaleX: MotionValue<number>;
    scaleY: MotionValue<number>;
}
/**
 * Returns a `MotionValue` each for `scaleX` and `scaleY` that update with the inverse
 * of their respective parent scales.
 *
 * This is useful for undoing the distortion of content when scaling a parent component.
 *
 * By default, `useInvertedScale` will automatically fetch `scaleX` and `scaleY` from the nearest parent.
 * By passing other `MotionValue`s in as `useInvertedScale({ scaleX, scaleY })`, it will invert the output
 * of those instead.
 *
 * ```jsx
 * const MyComponent = () => {
 *   const { scaleX, scaleY } = useInvertedScale()
 *   return <motion.div style={{ scaleX, scaleY }} />
 * }
 * ```
 *
 * @deprecated
 */
declare function useInvertedScale(scale?: Partial<ScaleMotionValues>): ScaleMotionValues;

export { AnimatePresence, AnimatePresenceProps, AnimateSharedLayout, AnimationControls, AnimationLifecycles, AnimationOptions, AnimationPlaybackControls, AnimationProps, AnimationType, Axis, AxisDelta, BoundingBox, Box, CreateVisualElement, CustomDomComponent, CustomValueType, Delta, DeprecatedLayoutGroupContext, DragControls, DragElastic, DragHandlers, DraggableProps, EasingFunction, EventInfo, FeatureBundle, FeatureComponent, FeatureComponents, FeatureDefinition, FeatureDefinitions, FeatureNames, FeatureProps, FlatTree, FocusHandlers, ForwardRefComponent, HTMLMotionProps, HoverHandlers, IProjectionNode, Inertia, Keyframes, KeyframesTarget, LayoutGroup, LayoutGroupContext, LayoutProps, LazyFeatureBundle$1 as LazyFeatureBundle, LazyMotion, LazyProps, LoadedFeatures, MotionAdvancedProps, MotionConfig, MotionConfigContext, MotionConfigProps, MotionContext, MotionProps, MotionStyle, MotionTransform, MotionValue, None, Orchestration, PanHandlers, PanInfo, PassiveEffect, Point, PresenceContext, RelayoutInfo, RenderComponent, Reorder, Repeat, ResolveLayoutTransition, ResolvedKeyframesTarget, ResolvedSingleTarget, ResolvedValueTarget, ResolvedValues, SVGAttributesAsMotionValues, SVGMotionProps, ScrapeMotionValuesFromProps, ScrollMotionValues, SingleTarget, Spring, Subscriber, SwitchLayoutGroupContext, TapHandlers, TapInfo, Target, TargetAndTransition, TransformPoint, Transition, Tween, ValueTarget, Variant, VariantLabels, Variants, VisualElement, VisualElementLifecycles, VisualState, addPointerEvent, addScaleCorrector, animate, animateVisualElement, animationControls, animations, calcLength, checkTargetForNewValues, createBox, createDomMotionComponent, createMotionComponent, domAnimation, domMax, filterProps, isBrowser, isDragActive, isMotionValue, isValidMotionProp, m, makeUseVisualState, motion, motionValue, resolveMotionValue, transform, useAnimation, useAnimationControls, useAnimationFrame, useCycle, useAnimatedState as useDeprecatedAnimatedState, useInvertedScale as useDeprecatedInvertedScale, useDomEvent, useDragControls, useElementScroll, useForceUpdate, useInView, useInstantLayoutTransition, useInstantTransition, useIsPresent, useIsomorphicLayoutEffect, useMotionTemplate, useMotionValue, usePresence, useReducedMotion, useReducedMotionConfig, useResetProjection, useScroll, useSpring, useTime, useTransform, useUnmountEffect, useVelocity, useViewportScroll, useVisualElementContext, visualElement, wrapHandler };
