import http from "http";
import EventEmitter from "events";
export class TrafficControl {
    constructor(args) {
        this.args = args;
        this.flip = "a";
        this.ee = new EventEmitter();
        this.requestListener = (clientRequest, clientResponse) => {
            const port = this.args[this.flip].port;
            const options = {
                hostname: "localhost",
                port,
                path: clientRequest.url,
                method: clientRequest.method,
                headers: clientRequest.headers,
            };
            const proxyRequest = http.request(options);
            proxyRequest.on("response", (proxyResponse) => {
                var _a, _b, _c;
                if (proxyResponse.errored != null)
                    return;
                const statusCode = (_a = proxyResponse.statusCode) !== null && _a !== void 0 ? _a : 0;
                this.ee.emit("request", {
                    target: this.flip,
                    method: (_b = options.method) !== null && _b !== void 0 ? _b : "<UNKNOWN>",
                    path: (_c = options.path) !== null && _c !== void 0 ? _c : "<NONE>",
                    port: options.port,
                    statusCode,
                });
                clientResponse.writeHead(statusCode, proxyResponse.headers);
                proxyResponse.pipe(clientResponse, {
                    end: true,
                });
            });
            proxyRequest.on("error", (error) => {
                Object.defineProperty(error, "target", {
                    value: this.flip,
                    enumerable: true,
                });
                this.ee.emit("responseError", error);
                clientResponse.writeHead(503);
                clientResponse.end(`Sorry, I tried to to connect to ${options.hostname}:${options.port}, but something went wrong: "${error.message}". Check that everything is up and running OK.`);
            });
            clientRequest.pipe(proxyRequest, {
                end: true,
            });
        };
        this.server = http.createServer(this.requestListener.bind(this));
        this.server.on("error", (error) => {
            this.ee.emit("error", error);
        });
    }
    flipTo(val) {
        this.flip = val;
    }
    start() {
        this.server.listen(56015);
    }
    stop() {
        this.server.close();
        this.ee.removeAllListeners();
    }
    on(event, cb) {
        this.ee.on(event, cb);
    }
    off(event, cb) {
        this.ee.off(event, cb);
    }
    static from(args) {
        return new TrafficControl(args);
    }
}
//# sourceMappingURL=traffic-control.js.map