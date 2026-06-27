import { Easing } from "../easing/types";
export interface Animation<V> {
    next: (t: number) => {
        value: V;
        done: boolean;
    };
    flipTarget: () => void;
}
export interface AnimationState<V> {
    value: V;
    done: boolean;
}
export interface PlaybackControls {
    stop: () => void;
}
declare type Update = (timestamp: number) => void;
export interface DriverControls {
    start: () => void;
    stop: () => void;
}
export declare type Driver = (update: Update) => DriverControls;
export interface PlaybackOptions<V> {
    autoplay?: boolean;
    driver?: Driver;
    elapsed?: number;
    from?: V;
    repeat?: number;
    repeatType?: "loop" | "reverse" | "mirror";
    repeatDelay?: number;
    type?: "spring" | "decay" | "keyframes";
    onUpdate?: (latest: V) => void;
    onPlay?: () => void;
    onComplete?: () => void;
    onRepeat?: () => void;
    onStop?: () => void;
}
export interface KeyframeOptions<V = number> {
    to: V | V[];
    from?: V;
    duration?: number;
    ease?: Easing | Easing[];
    offset?: number[];
}
export interface DecayOptions {
    from?: number;
    to?: number;
    velocity?: number;
    power?: number;
    timeConstant?: number;
    modifyTarget?: (target: number) => number;
    restDelta?: number;
}
export interface PhysicsSpringOptions {
    velocity?: number;
    stiffness?: number;
    damping?: number;
    mass?: number;
}
export interface SpringOptions extends PhysicsSpringOptions {
    from?: number;
    to?: number;
    duration?: number;
    bounce?: number;
    restSpeed?: number;
    restDelta?: number;
}
export interface InertiaOptions extends DecayOptions {
    bounceStiffness?: number;
    bounceDamping?: number;
    min?: number;
    max?: number;
    restSpeed?: number;
    restDelta?: number;
    driver?: Driver;
    onUpdate?: (v: number) => void;
    onComplete?: () => void;
    onStop?: () => void;
}
export declare type AnimationOptions<V> = PlaybackOptions<V> & (DecayOptions | KeyframeOptions<V> | SpringOptions);
export {};
