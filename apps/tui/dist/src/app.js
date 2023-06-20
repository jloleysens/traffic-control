import React, { useState } from "react";
import { useApp, useInput, Box } from "ink";
import { FullScreen, Title } from "./components/index.js";
import { ReqBox } from "./containers/index.js";
import { useTrafficControl } from "./services/traffic-control.js";
export const App = () => {
    const { exit } = useApp();
    useInput((input, key) => {
        if (input === "q" || key.escape === true) {
            exit();
        }
    });
    const { tCtrl, a, b } = useTrafficControl();
    const [active, setActive] = useState("a");
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
    return (React.createElement(FullScreen, null,
        React.createElement(Box, { flexGrow: 1, flexDirection: "column" },
            React.createElement(Box, { flexGrow: 1 },
                React.createElement(Box, { flexGrow: 1, flexShrink: 0, width: 1, flexDirection: "column" },
                    React.createElement(ReqBox, { active: active === "a", tabText: `[1] localhost:${a}`, destination: "a" })),
                React.createElement(Box, { flexGrow: 1, flexShrink: 0, width: 1, flexDirection: "column" },
                    React.createElement(ReqBox, { active: active === "b", tabText: `[2] localhost:${b}`, destination: "b" }))),
            React.createElement(Box, { flexGrow: 0, justifyContent: "center" },
                React.createElement(Title, null)))));
};
