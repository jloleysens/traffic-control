import React, { useState } from "react";
import { useApp, useInput, Box } from "ink";
import { Title, SubTitle } from "./components/index.js";
import { ReqBox } from "./containers/index.js";
import { useTrafficControl } from "./services/traffic-control.js";

export const App: React.FC = () => {
  const { exit } = useApp();
  const [active, setActive] = useState<"a" | "b">("a");
  const { tCtrl, a, b } = useTrafficControl();

  useInput((input, key) => {
    if (input === "q" || key.escape === true) {
      exit();
    }
    if (input === "1" || key.leftArrow) {
      tCtrl.flipTo("a");
      setActive("a");
    }
    if (input === "2" || key.rightArrow) {
      tCtrl.flipTo("b");
      setActive("b");
    }
  });

  return (
    // <FullScreen>
    <Box flexGrow={1} flexDirection="column">
      <Box flexGrow={1}>
        <Box flexGrow={1} flexShrink={0} width={1} flexDirection="column">
          <ReqBox
            active={active === "a"}
            tabTitle={`[1] http://localhost:${a}`}
            destination="a"
          />
        </Box>
        <Box flexGrow={0} flexBasis={1} />
        <Box flexGrow={1} flexShrink={0} width={1} flexDirection="column">
          <ReqBox
            active={active === "b"}
            tabTitle={`[2] http://localhost:${b}`}
            destination="b"
          />
        </Box>
      </Box>
      <Box
        flexGrow={0}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Title />
      </Box>
      <Box flexDirection="column" alignItems="flex-end">
        <SubTitle />
      </Box>
    </Box>
    // </FullScreen>
  );
};
