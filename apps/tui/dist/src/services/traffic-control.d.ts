import React from "react";
import { TrafficControl } from "traffic-control";
import { type FC } from "../types.js";
interface Value {
    tCtrl: TrafficControl;
    a: number;
    b: number;
}
export declare const TrafficControlContext: React.Context<Value | undefined>;
interface Props {
    a: number;
    b: number;
}
export declare const TrafficControlProvider: FC<Props>;
export declare const useTrafficControl: () => Value;
export {};
