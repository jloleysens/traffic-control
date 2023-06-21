import React from "react";
import { Box, Text } from "ink";
import { Spinner } from "@inkjs/ui";

export interface Props {
  active: boolean;
  loading: boolean;
  logs: string[];
}

export const LogBox: React.FC<Props> = ({ logs, active, loading }) => {
  return (
    <Box
      borderStyle="round"
      borderLeft={false}
      borderRight={false}
      borderTop={false}
      borderColor={active === true ? "white" : "gray"}
      flexDirection="column"
      justifyContent="flex-end"
      overflow="hidden"
      flexGrow={1}
    >
      {logs.map((log, i) => (
        <Text key={i}>{log}</Text>
      ))}
      {loading && <Spinner />}
    </Box>
  );
};
