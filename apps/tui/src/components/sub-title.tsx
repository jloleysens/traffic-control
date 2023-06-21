import React, { memo } from "react";
import chalk from "chalk";
import { Text } from "ink";
import type { FC } from "../types.js";
import { useTrafficControl } from "../services/traffic-control.js";

export const SubTitle: FC = memo(function SubTitle() {
  const { tCtrl } = useTrafficControl();
  return <Text>{chalk.grey(`👂 http://localhost:${tCtrl.port}`)}</Text>;
});
