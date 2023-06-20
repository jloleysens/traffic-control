import { Subject, take, takeUntil, shareReplay, filter, map, } from "rxjs";
import { lazyProcess } from "./util.js";
const READY_LOG = /Kibana server is not ready yet/;
export class KbnProcess {
    constructor(cwd, watch) {
        this.cwd = cwd;
        this.kill$ = new Subject();
        const args = ["start", "--no-base-path"];
        if (!watch) {
            args.push("--no-watch");
        }
        this.proc$ = lazyProcess({
            cmd: "yarn",
            args,
            cwd: this.cwd,
            stdio: "pipe",
        });
    }
    start() {
        if (this.innerSub != null)
            throw new Error("This kbn process already started");
        const kill$ = this.kill$.pipe(take(1));
        const out$ = this.proc$.pipe(takeUntil(kill$), shareReplay());
        const ready$ = out$.pipe(filter((log) => READY_LOG.test(log)), map(() => true), take(1), shareReplay());
        this.innerSub = out$.subscribe();
        return {
            out$,
            ready$,
        };
    }
    stop() {
        this.kill$.next();
    }
}
