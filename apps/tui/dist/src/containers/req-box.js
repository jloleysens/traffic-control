import React, { useCallback, useEffect, useState } from "react";
import chalk from "chalk";
import { LogBox, Tab } from "../components/index.js";
import { useTrafficControl } from "../services/traffic-control.js";
export const ReqBox = ({ active, tabText, destination }) => {
    const [logs, setLogs] = useState([]);
    const { tCtrl } = useTrafficControl();
    const onRequest = useCallback((req) => {
        if (req.target !== destination)
            return;
        setLogs((prev) => {
            return [...prev, `${chalk.green("request")} ${req.method} ${req.path}`];
        });
    }, []);
    const onError = useCallback((req) => {
        if (req.target !== destination)
            return;
        setLogs((prev) => {
            return [...prev, `${chalk.red("error")} ${req.message}`];
        });
    }, []);
    useEffect(() => {
        tCtrl.on("request", onRequest);
        tCtrl.on("responseError", onError);
        return () => {
            tCtrl.off("request", onRequest);
            tCtrl.off("responseError", onError);
        };
    }, [tCtrl]);
    return (React.createElement(React.Fragment, null,
        React.createElement(LogBox, { active: active, logs: logs }),
        React.createElement(Tab, { active: active, text: tabText })));
};
