export declare type FrameData = {
    delta: number;
    timestamp: number;
};
export declare type Process = (data: FrameData) => void;
export declare type Schedule = (process: Process, keepAlive?: boolean, immediate?: boolean) => Process;
export interface Step {
    schedule: Schedule;
    cancel: (process: Process) => void;
    process: (frame: FrameData) => void;
}
export declare type StepId = "read" | "update" | "postUpdate" | "preRender" | "render" | "postRender";
export declare type Sync = {
    [key in StepId]: Schedule;
};
export declare type Steps = {
    [key in StepId]: Step;
};
export declare type CancelSync = {
    [key in StepId]: (process: Process) => void;
};
export declare type FlushSync = {
    [key in StepId]: () => void;
};
