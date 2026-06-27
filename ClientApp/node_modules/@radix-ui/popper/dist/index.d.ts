import * as CSS from "csstype";
export const SIDE_OPTIONS: readonly ["top", "right", "bottom", "left"];
export const ALIGN_OPTIONS: readonly ["start", "center", "end"];
export type Side = typeof SIDE_OPTIONS[number];
export type Align = typeof ALIGN_OPTIONS[number];
type Size = {
    width: number;
    height: number;
};
type GetPlacementDataOptions = {
    /** The rect of the anchor we are placing around */
    anchorRect?: ClientRect;
    /** The size of the popper to place */
    popperSize?: Size;
    /** An optional arrow size */
    arrowSize?: Size;
    /** An optional arrow offset (along the side, default: 0) */
    arrowOffset?: number;
    /** The desired side */
    side: Side;
    /** An optional side offset (distance from the side, default: 0)  */
    sideOffset?: number;
    /** The desired alignment */
    align: Align;
    /** An optional alignment offset (distance along the side, default: 0) */
    alignOffset?: number;
    /** An option to turn on/off the collision handling (default: true) */
    shouldAvoidCollisions?: boolean;
    /** The rect which represents the boundaries for collision checks */
    collisionBoundariesRect?: ClientRect;
    /** The tolerance used for collisions, ie. if we want them to trigger a bit earlier (default: 0) */
    collisionTolerance?: number;
};
type PlacementData = {
    popperStyles: CSS.Properties;
    arrowStyles: CSS.Properties;
    placedSide?: Side;
    placedAlign?: Align;
};
/**
 * Given all the information necessary to compute it,
 * this function calculates all the necessary placement data.
 *
 * It will return:
 *
 * - the styles to apply to the popper (including a custom property that is useful to set the transform origin in the right place)
 * - the styles to apply to the arrow
 * - the placed side (because it might have changed because of collisions)
 * - the placed align (because it might have changed because of collisions)
 */
export function getPlacementData({ anchorRect, popperSize, arrowSize, arrowOffset, side, sideOffset, align, alignOffset, shouldAvoidCollisions, collisionBoundariesRect, collisionTolerance, }: GetPlacementDataOptions): PlacementData;

//# sourceMappingURL=index.d.ts.map
