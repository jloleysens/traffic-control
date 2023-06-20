import { type KbnStartContract } from './procs/index.js';
export interface KbnMuxArgs {
    kbnN_1: {
        cwd: string;
    };
    kbnN: {
        cwd: string;
    };
}
interface StartContract {
    kbnN_1: KbnStartContract;
    kbnN: KbnStartContract;
}
export declare class KbnMux {
    private readonly args;
    private readonly kbnN_1;
    private readonly kbnN;
    private constructor();
    start(): StartContract;
    stop(): void;
    static from(args: KbnMuxArgs): KbnMux;
}
export {};
