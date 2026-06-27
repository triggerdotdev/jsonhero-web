export declare type DevMessage = (check: boolean, message: string) => void;
declare let warning: DevMessage;
declare let invariant: DevMessage;
export { warning, invariant };
