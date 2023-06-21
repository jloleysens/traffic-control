import React from "react";
import env from "./env.js";
import { render } from "ink";

import { TrafficControlProvider } from "./services/index.js";
import { App } from "./app.js";

export function main(): void {
  if (env.showHelp) {
    return;
  }
  console.clear();
  render(
    <TrafficControlProvider
      a={env.portA}
      aCapture={env.captureA}
      b={env.portB}
      bCapture={env.captureB}
    >
      <App />
    </TrafficControlProvider>
  );
}
