import React, { memo } from "react";
import BigText from "ink-big-text";
import Gradient from "ink-gradient";
export const Title = memo(function Title() {
    return (React.createElement(Gradient, { name: "vice" },
        React.createElement(BigText, { font: "tiny", letterSpacing: 10, space: true, text: "TrafficControl" })));
});
