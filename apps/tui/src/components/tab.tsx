import React from "react";
import { Box, Text } from "ink";

import type { FC } from "../types.js";

interface Props {
  active: boolean;
  text: string;
}

export const Tab: FC<Props> = ({ active, text }) => {
  return (
    <Box justifyContent="center">
      <Text
        backgroundColor={active ? "white" : undefined}
        color={active ? "black" : undefined}
      >
        {text}
      </Text>
    </Box>
  );
};
