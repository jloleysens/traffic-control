/// <reference types="node" resolution-mode="require"/>
import { type StdioOptions } from "child_process";
import { Observable } from "rxjs";
interface Options {
    cmd: string;
    args: string[];
    cwd: string;
    stdio: StdioOptions;
}
export declare function lazyProcess({ cmd, args, stdio, cwd, }: Options): Observable<string>;
export {};
