import React from "react";
import { Box, Text } from "ink";
export const Tab = ({ active, text }) => {
    return (React.createElement(Box, { justifyContent: "center" },
        React.createElement(Text, { backgroundColor: active ? "white" : undefined, color: active ? "black" : undefined }, text)));
};
