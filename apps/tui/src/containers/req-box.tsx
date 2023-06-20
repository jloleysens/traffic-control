import React, { useCallback, useEffect, useState } from "react";
import chalk from "chalk";

import { LogBox, Tab } from "../components/index.js";
import type { FC } from "../types.js";
import { useTrafficControl } from "../services/traffic-control.js";

interface Props {
  active: boolean;
  destination: "a" | "b";
  tabText: string;
}

export const ReqBox: FC<Props> = ({ active, tabText, destination }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const { tCtrl } = useTrafficControl();

  const onRequest = useCallback((req: any) => {
    if (req.target !== destination) return;
    setLogs((prev) => {
      return [...prev, `${chalk.green("request")} ${req.method} ${req.path}`];
    });
  }, []);

  const onError = useCallback((req: any) => {
    if (req.target !== destination) return;
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
  return (
    <>
      <LogBox active={active} logs={logs} />
      <Tab active={active} text={tabText} />
    </>
  );
};
