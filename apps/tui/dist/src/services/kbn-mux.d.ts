import React from "react";
import { KbnMux } from "kbn-mux";
import { type FC } from "../types.js";
export declare const KbnMuxContext: React.Context<KbnMux | undefined>;
interface Props {
    kbnNCwd: string;
    kbnN1Cwd: string;
}
export declare const KbnMuxProvider: FC<Props>;
export declare const useKbnMux: () => KbnMux;
export {};
