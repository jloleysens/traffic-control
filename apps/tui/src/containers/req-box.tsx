import React, { useCallback, useEffect, useRef, useState } from "react";
import chalk from "chalk";
import {
  type Destination,
  type OnErrorArg,
  type OnRequestArg,
} from "traffic-control";

import { LogBox, TabInfo } from "../components/index.js";
import type { FC } from "../types.js";
import { useTrafficControl } from "../services/traffic-control.js";

interface Props {
  active: boolean;
  destination: Destination;
  tabTitle: string;
}

export const ReqBox: FC<Props> = ({ active, tabTitle, destination }) => {
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
      setLogs(() => [...logsRef.current]);
      setLoading(false);
    }, 100);
  }, []);

  const onRequest = useCallback((req: OnRequestArg) => {
    if (req.target !== destination) return;
    const color =
      req.statusCode < 200
        ? chalk.grey
        : req.statusCode < 399
        ? chalk.green
        : req.statusCode <= 499
        ? chalk.yellow
        : chalk.red;
    appendLog(
      `${chalk.grey("[")}${color(`${req.statusCode}`)}${chalk.grey(
        "]"
      )} ${chalk.grey(req.method)} ${req.path}`
    );
  }, []);

  const onError = useCallback((req: OnErrorArg) => {
    if (req.target !== destination) return;
    appendLog(`${chalk.red("error")} ${req.error.message}`);
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
        text={tabTitle}
        capturePaths={tCtrl.readDestination(destination).capturePaths}
      />
    </>
  );
};
