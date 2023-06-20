interface TrafficControlDestination {
    port: number;
}
interface Target {
    target: "a" | "b";
}
interface OnRequestArg extends Target {
    statusCode: number;
    method: string;
    path: string;
    port: number;
}
interface OnErrorArg extends Target {
    error: Error;
}
export interface TrafficControlArgs {
    a: TrafficControlDestination;
    b: TrafficControlDestination;
}
export declare class TrafficControl {
    private readonly args;
    private flip;
    private readonly server;
    private readonly ee;
    private constructor();
    private readonly requestListener;
    flipTo(val: "a" | "b"): void;
    start(): void;
    stop(): void;
    on(event: "responseError", cb: (arg: OnErrorArg) => void): void;
    on(event: "request", cb: (arg: OnRequestArg) => void): void;
    off(event: "responseError" | "request", cb: (...arg: any) => void): void;
    static from(args: TrafficControlArgs): TrafficControl;
}
export {};
