import React, { createContext, useContext, useEffect, useState } from "react";
import { TrafficControl } from "traffic-control";
import { type FC } from "../types.js";

interface Value {
  tCtrl: TrafficControl;
  a: number;
  b: number;
}

export const TrafficControlContext = createContext<undefined | Value>(
  undefined
);

interface Props {
  a: number;
  b: number;
}

export const TrafficControlProvider: FC<Props> = ({ a, b, children }) => {
  const [tCtrl] = useState(() =>
    TrafficControl.from({ a: { port: a }, b: { port: b } })
  );

  useEffect(() => {
    tCtrl.start();
    return () => {
      console.log("Shutting down...");
      tCtrl.stop();
    };
  }, [tCtrl]);

  return (
    <TrafficControlContext.Provider value={{ tCtrl, a, b }}>
      {children}
    </TrafficControlContext.Provider>
  );
};

export const useTrafficControl = (): Value => {
  const ctx = useContext(TrafficControlContext);
  if (ctx == null) {
    throw new Error(
      "useTrafficControl must be used within a TrafficControlProvider"
    );
  }
  return ctx;
};
