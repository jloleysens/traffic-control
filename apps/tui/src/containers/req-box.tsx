import React, { useCallback, useEffect, useRef, useState } from "react";
import chalk from "chalk";
import { type Destination } from "traffic-control";
import { Spinner } from "@inkjs/ui";

import { LogBox, TabInfo } from "../components/index.js";
import type { FC } from "../types.js";
import { useTrafficControl } from "../services/traffic-control.js";

interface Props {
  active: boolean;
  destination: Destination;
  tabText: string;
}

export const ReqBox: FC<Props> = ({ active, tabText, destination }) => {
  const logsRef = useRef<string[]>([]);
  const timeoutHandle = useRef<undefined | any>(undefined);
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { tCtrl } = useTrafficControl();

  const appendLog = useCallback((log: string) => {
    logsRef.current.push(log);
    setLoading(true);
    if (timeoutHandle.current) {
      clearTimeout(timeoutHandle.current);
      timeoutHandle.current = undefined;
    }
    timeoutHandle.current = setTimeout(() => {
      console.log("setting logs", logsRef.current);
      setLogs(() => [...logsRef.current]);
      setLoading(false);
    }, 100);
  }, []);

  const onRequest = useCallback((req: any) => {
    if (req.target !== destination) return;
    appendLog(`${chalk.green("request")} ${req.method} ${req.path}`);
  }, []);

  const onError = useCallback((req: any) => {
    if (req.target !== destination) return;
    appendLog(`${chalk.red("error")} ${req.message}`);
  }, []);

  useEffect(() => {
    const handle = setTimeout(() => {
      setLogs(logsRef.current);
    }, 100);
    return () => {
      clearInterval(handle);
    };
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
      <LogBox loading={loading} active={active} logs={logs} />
      <TabInfo
        active={active}
        text={tabText}
        capturePaths={tCtrl.readDestination(destination).capturePaths}
      />
    </>
  );
};
