import { KbnProcess } from './procs/index.js';
export class KbnMux {
    constructor(args) {
        this.args = args;
        this.kbnN_1 = new KbnProcess(args.kbnN_1.cwd, false);
        this.kbnN = new KbnProcess(args.kbnN.cwd, true);
    }
    start() {
        return {
            kbnN_1: this.kbnN_1.start(),
            kbnN: this.kbnN.start()
        };
    }
    stop() {
        this.kbnN_1.stop();
        this.kbnN.stop();
    }
    static from(args) {
        return new KbnMux(args);
    }
}
