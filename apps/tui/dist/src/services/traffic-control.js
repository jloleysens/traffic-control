import React, { createContext, useContext, useEffect, useState } from "react";
import { TrafficControl } from "traffic-control";
export const TrafficControlContext = createContext(undefined);
export const TrafficControlProvider = ({ a, b, children }) => {
    const [tCtrl] = useState(() => TrafficControl.from({ a: { port: a }, b: { port: b } }));
    useEffect(() => {
        tCtrl.start();
        return () => {
            console.log("Shutting down...");
            tCtrl.stop();
        };
    }, [tCtrl]);
    return (React.createElement(TrafficControlContext.Provider, { value: { tCtrl, a, b } }, children));
};
export const useTrafficControl = () => {
    const ctx = useContext(TrafficControlContext);
    if (ctx == null) {
        throw new Error("useTrafficControl must be used within a TrafficControlProvider");
    }
    return ctx;
};
