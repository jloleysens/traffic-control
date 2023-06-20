import { spawn } from "child_process";
import { Observable } from "rxjs";
export function lazyProcess({ cmd, args, stdio, cwd, }) {
    return new Observable((subscriber) => {
        var _a, _b;
        const proc = spawn(cmd, args, { stdio, cwd });
        (_a = proc.stdout) === null || _a === void 0 ? void 0 : _a.on("data", (data) => {
            subscriber.next(data.toString());
        });
        (_b = proc.stderr) === null || _b === void 0 ? void 0 : _b.on("data", (error) => {
            subscriber.error(error.toString());
        });
        proc.on("exit", () => {
            subscriber.complete();
        });
        subscriber.add(() => {
            proc.kill();
        });
    });
}
