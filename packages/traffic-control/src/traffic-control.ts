import http from "http";
import EventEmitter from "events";

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

export class TrafficControl {
  private flip: "a" | "b" = "a";
  private readonly server: http.Server;
  private readonly ee = new EventEmitter();

  private constructor(private readonly args: TrafficControlArgs) {
    this.server = http.createServer(this.requestListener.bind(this));
    this.server.on("error", (error: Error): void => {
      this.ee.emit("error", error);
    });
  }

  private readonly requestListener: http.RequestListener = (
    clientRequest,
    clientResponse
  ): void => {
    const port = this.args[this.flip].port;
    const options = {
      hostname: "localhost",
      port,
      path: clientRequest.url,
      method: clientRequest.method,
      headers: clientRequest.headers,
    };

    const proxyRequest = http.request(options);

    proxyRequest.on("response", (proxyResponse): void => {
      if (proxyResponse.errored != null) return;
      const statusCode = proxyResponse.statusCode ?? 0;
      this.ee.emit("request", {
        target: this.flip,
        method: options.method ?? "<UNKNOWN>",
        path: options.path ?? "<NONE>",
        port: options.port,
        statusCode,
      });
      clientResponse.writeHead(statusCode, proxyResponse.headers);
      proxyResponse.pipe(clientResponse, {
        end: true,
      });
    });

    proxyRequest.on("error", (error): void => {
      Object.defineProperty(error, "target", {
        value: this.flip,
        enumerable: true,
      });
      this.ee.emit("responseError", error);
      clientResponse.writeHead(503);
      clientResponse.end(
        `Sorry, I tried to to connect to ${options.hostname}:${options.port}, but something went wrong: "${error.message}". Check that everything is up and running OK.`
      );
    });

    clientRequest.pipe(proxyRequest, {
      end: true,
    });
  };

  public flipTo(val: "a" | "b"): void {
    this.flip = val;
  }

  public start(): void {
    this.server.listen(56015);
  }

  public stop(): void {
    this.server.close();
    this.ee.removeAllListeners();
  }

  public on(event: "responseError", cb: (arg: OnErrorArg) => void): void;
  public on(event: "request", cb: (arg: OnRequestArg) => void): void;
  public on(event: string, cb: (...arg: any) => void): void {
    this.ee.on(event, cb);
  }

  public off(
    event: "responseError" | "request",
    cb: (...arg: any) => void
  ): void {
    this.ee.off(event, cb);
  }

  public static from(args: TrafficControlArgs): TrafficControl {
    return new TrafficControl(args);
  }
}
