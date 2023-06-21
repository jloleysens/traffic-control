import http from "http";
import EventEmitter from "node:events";

export type Destination = "a" | "b";

interface TrafficControlDestination {
  port: number;
  /** A list of globs that will capture paths that match */
  capturePaths?: string[];
}

interface Target {
  target: Destination;
}

export interface OnRequestArg extends Target {
  statusCode: number;
  method: string;
  path: string;
  port: number;
}

export interface OnErrorArg extends Target {
  error: Error;
}

export interface TrafficControlArgs {
  a: TrafficControlDestination;
  b: TrafficControlDestination;
}

export const DEFAULT_PORT = 56015;

export class TrafficControl {
  private target: Destination = "a";
  private readonly server: http.Server;
  private readonly ee = new EventEmitter();

  private readonly aCapture: RegExp[];
  private readonly bCapture: RegExp[];
  private constructor(private readonly args: TrafficControlArgs) {
    this.server = http.createServer(this.requestListener.bind(this));
    this.server.on("error", (error: Error): void => {
      this.ee.emit("error", error);
    });
    this.aCapture =
      this.args.a.capturePaths?.map((path) => new RegExp(path)) ?? [];
    this.bCapture =
      this.args.b.capturePaths?.map((path) => new RegExp(path)) ?? [];
  }

  private getDestination(path: string): Destination {
    if (path === "") return this.target;
    if (this.aCapture.some((re) => re.test(path))) return "a";
    if (this.bCapture.some((re) => re.test(path))) return "b";
    return this.target;
  }

  private readonly requestListener: http.RequestListener = (
    clientRequest,
    clientResponse
  ): void => {
    const target = this.getDestination(clientRequest.url ?? "");
    const port = this.args[target].port;
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
        target,
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
        value: this.target,
        enumerable: true,
      });
      this.ee.emit("responseError", { error });
      clientResponse.writeHead(503);
      clientResponse.end(
        `Sorry, I tried to to connect to ${options.hostname}:${options.port}, but something went wrong: "${error.message}". Check that everything is up and running OK.`
      );
    });

    clientRequest.pipe(proxyRequest, {
      end: true,
    });
  };

  public flipTo(val: Destination): void {
    this.target = val;
  }

  public start(): void {
    this.server.listen(this.port);
  }

  public stop(): void {
    this.server.close();
    this.ee.removeAllListeners();
  }

  public readDestination(
    dest: Destination
  ): Readonly<TrafficControlDestination> {
    return this.args[dest];
  }

  public get port(): number {
    return DEFAULT_PORT;
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
