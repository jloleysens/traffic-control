import React from "react";
import { Box, Text } from "ink";
import { Badge } from "@inkjs/ui";

import type { FC } from "../types.js";

interface Props {
  active: boolean;
  text: string;
  capturePaths?: string[];
}

export const TabInfo: FC<Props> = ({ active, text, capturePaths }) => {
  return (
    <Box justifyContent="center">
      <Text
        backgroundColor={active ? "white" : undefined}
        color={active ? "black" : undefined}
      >
        {text}
      </Text>
      {Boolean(capturePaths?.length) && (
        <>
          <Text> </Text>
          <Badge color={active ? "blueBright" : "blue"}>
            <Text>
              Capturing {capturePaths![0]}
              {capturePaths!.length > 1
                ? ` and ${capturePaths!.length} others`
                : ""}
            </Text>
          </Badge>
        </>
      )}
    </Box>
  );
};
