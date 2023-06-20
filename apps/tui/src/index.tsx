import React from "react";
import env from "./env.js";
import { render } from "ink";

import { TrafficControlProvider } from "./services/index.js";
import { App } from "./app.js";

export function main(): void {
  if (env.showHelp) {
    console.log(`Hello! Use this CLI like: TODO`);
    return;
  }
  render(
    <TrafficControlProvider a={env.portA} b={env.portB}>
      <App />
    </TrafficControlProvider>
  );
}
