export interface Size {
    width: number;
    height: number;
}
export interface ResizeInfo<I> {
    target: I;
    size: Size;
    contentSize: Size;
}
export declare type ResizeHandler<I> = (info: ResizeInfo<I>) => void;
//# sourceMappingURL=types.d.ts.map