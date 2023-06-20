import { type Observable } from "rxjs";
export interface KbnStartContract {
    out$: Observable<string>;
    ready$: Observable<boolean>;
}
export declare class KbnProcess {
    private readonly cwd;
    private readonly proc$;
    private readonly kill$;
    private innerSub;
    constructor(cwd: string, watch: boolean);
    start(): KbnStartContract;
    stop(): void;
}
