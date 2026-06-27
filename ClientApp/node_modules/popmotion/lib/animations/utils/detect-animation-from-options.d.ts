import { spring } from "../generators/spring";
import { keyframes } from "../generators/keyframes";
import { decay } from "../generators/decay";
interface Options {
    to?: any;
    type?: "decay" | "keyframes" | "spring";
}
export declare function detectAnimationFromOptions<T extends Options>(config: T): typeof spring | typeof keyframes | typeof decay;
export {};
