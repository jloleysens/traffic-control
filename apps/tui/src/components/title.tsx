import React, { memo } from "react";
import BigText from "ink-big-text";
import Gradient from "ink-gradient";
import type { FC } from "../types.js";

export const Title: FC = memo(function Title() {
  return (
    <Gradient name="vice">
      <BigText font="tiny" letterSpacing={10} space text="TrafficControl" />
    </Gradient>
  );
});
