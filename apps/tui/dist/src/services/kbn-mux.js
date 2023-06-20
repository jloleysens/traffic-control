import React, { createContext, useContext, useState } from "react";
import { KbnMux } from "kbn-mux";
export const KbnMuxContext = createContext(undefined);
export const KbnMuxProvider = ({ kbnN1Cwd, kbnNCwd, children }) => {
    const [kbnMux] = useState(() => KbnMux.from({ kbnN: { cwd: kbnNCwd }, kbnN_1: { cwd: kbnN1Cwd } }));
    return (React.createElement(KbnMuxContext.Provider, { value: kbnMux }, children));
};
export const useKbnMux = () => {
    const ctx = useContext(KbnMuxContext);
    if (ctx == null) {
        throw new Error("useKbnMux must be used within a KbnMuxProvider");
    }
    return ctx;
};
