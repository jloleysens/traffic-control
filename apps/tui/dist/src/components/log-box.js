import React from "react";
import { Box, Text } from "ink";
export const LogBox = ({ logs, active }) => {
    return (React.createElement(Box, { borderStyle: "round", borderColor: active === true ? "white" : "gray", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden", flexGrow: 1, height: 1 }, logs.map((log, i) => (React.createElement(Text, { key: i }, log)))));
};
