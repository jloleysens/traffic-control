import React, { useState } from "react";
import { useApp, useInput, Box } from "ink";
import { FullScreen, Title } from "./components/index.js";
import { ReqBox } from "./containers/index.js";
import { useTrafficControl } from "./services/traffic-control.js";

export const App: React.FC = () => {
  const { exit } = useApp();
  useInput((input, key) => {
    if (input === "q" || key.escape === true) {
      exit();
    }
  });

  const { tCtrl, a, b } = useTrafficControl();

  const [active, setActive] = useState<"a" | "b">("a");
  useInput((input) => {
    if (input === "1") {
      tCtrl.flipTo("a");
      setActive("a");
    }
    if (input === "2") {
      tCtrl.flipTo("b");
      setActive("b");
    }
  });

  return (
    <FullScreen>
      <Box flexGrow={1} flexDirection="column">
        <Box flexGrow={1}>
          <Box flexGrow={1} flexShrink={0} width={1} flexDirection="column">
            <ReqBox
              active={active === "a"}
              tabText={`[1] localhost:${a}`}
              destination="a"
            />
          </Box>
          <Box flexGrow={1} flexShrink={0} width={1} flexDirection="column">
            <ReqBox
              active={active === "b"}
              tabText={`[2] localhost:${b}`}
              destination="b"
            />
          </Box>
        </Box>
        <Box flexGrow={0} justifyContent="center">
          <Title />
        </Box>
      </Box>
    </FullScreen>
  );
};
