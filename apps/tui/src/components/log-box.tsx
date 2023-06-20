import React from "react";
import { Box, Text } from "ink";

export interface Props {
  active: boolean;
  logs: string[];
}

export const LogBox: React.FC<Props> = ({ logs, active }) => {
  return (
    <Box
      borderStyle="round"
      borderColor={active === true ? "white" : "gray"}
      flexDirection="column"
      justifyContent="flex-end"
      overflow="hidden"
      flexGrow={1}
      // height={1}
    >
      {logs.map((log, i) => (
        <Text key={i}>{log}</Text>
      ))}
    </Box>
  );
};
