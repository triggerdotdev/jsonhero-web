import { Easing } from '../easing/types';
declare type MixEasing = Easing | Easing[];
declare type InterpolateOptions<T> = {
    clamp?: boolean;
    ease?: MixEasing;
    mixer?: MixerFactory<T>;
};
declare type Mix<T> = (v: number) => T;
export declare type MixerFactory<T> = (from: T, to: T) => Mix<T>;
export declare function interpolate<T>(input: number[], output: T[], { clamp: isClamp, ease, mixer }?: InterpolateOptions<T>): (v: number) => T;
export {};
