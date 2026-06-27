import { Process, FrameData, CancelSync, FlushSync, Sync } from "./types";
declare const sync: Sync;
declare const cancelSync: CancelSync;
declare const flushSync: FlushSync;
declare const getFrameData: () => {
    delta: number;
    timestamp: number;
};
export default sync;
export { cancelSync, flushSync, getFrameData, FrameData, Process };
