import { EasingFunction } from "@motionone/types";
export interface AxisScrollInfo {
    current: number;
    offset: number[];
    progress: number;
    scrollLength: number;
    velocity: number;
    targetOffset: number;
    targetLength: number;
    containerLength: number;
    interpolatorOffsets?: number[];
    interpolate?: EasingFunction;
}
export interface ScrollInfo {
    time: number;
    x: AxisScrollInfo;
    y: AxisScrollInfo;
}
export declare type OnScroll = (info: ScrollInfo) => void;
export declare type OnScrollHandler = {
    measure: () => void;
    update: (time: number) => void;
    notify: () => void;
};
export declare type SupportedEdgeUnit = "px" | "vw" | "vh" | "%";
export declare type EdgeUnit = `${number}${SupportedEdgeUnit}`;
export declare type NamedEdges = "start" | "end" | "center";
export declare type EdgeString = NamedEdges | EdgeUnit | `${number}`;
export declare type Edge = EdgeString | number;
export declare type ProgressIntersection = [number, number];
export declare type Intersection = `${Edge} ${Edge}`;
export declare type ScrollOffset = Array<Edge | Intersection | ProgressIntersection>;
export interface ScrollOptions {
    container?: HTMLElement;
    target?: Element;
    axis?: "x" | "y";
    offset?: ScrollOffset;
    smooth?: number;
}
//# sourceMappingURL=types.d.ts.map