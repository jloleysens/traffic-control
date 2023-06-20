import React, { useState, useRef, useEffect } from "react";
import { Box } from "ink";
import type { FC } from "../types.js";

const enterAltScreenCommand = "\x1b[?1049h";
const leaveAltScreenCommand = "\x1b[?1049l";

export const FullScreen: FC = (props) => {
  const hasRunRef = useRef(false);
  const [size, setSize] = useState({
    columns: process.stdout.columns,
    rows: process.stdout.rows,
  });

  if (!hasRunRef.current) {
    process.stdout.write(enterAltScreenCommand);
    hasRunRef.current = true;
  }

  useEffect(() => {
    const onResize = (): void => {
      setSize({
        columns: process.stdout.columns,
        rows: process.stdout.rows,
      });
    };

    process.stdout.on("resize", onResize);
    return () => {
      process.stdout.off("resize", onResize);
      process.stdout.write(leaveAltScreenCommand);
    };
  }, []);

  return (
    <Box height={size.rows} width={size.columns}>
      {props.children}
    </Box>
  );
};
