import assert from "assert";
import meow from "meow";

const cli = meow(
  `
    Usage
      $ tctrl <portA> <portB>

    Options
      --help, -h  Show this help message
      --a-capture, -a  Paths that will always directed to port A
      --b-capture, -b  Paths that will always directed to port B

`,
  {
    importMeta: import.meta,
    autoHelp: true,
    allowUnknownFlags: false,
    flags: {
      aCapture: {
        type: "string",
        shortFlag: "a",
      },
      bCapture: {
        type: "string",
        shortFlag: "b",
      },
      help: {
        type: "boolean",
        shortFlag: "h",
      },
    },
  }
);

const showHelp = cli.flags.help as unknown as boolean;
const portA = parseInt(cli.input.at(0) as unknown as string, 10);
const portB = parseInt(cli.input.at(1) as unknown as string, 10);

if (showHelp) {
  assert(
    // eslint-disable-next-line
    portA && portB,
    `Port A & B must be specified, got Port A: "${portA}" and Port B "${portB}"`
  );
}

export default {
  showHelp,
  portA,
  portB,
  captureA: cli.flags.aCapture?.split(","),
  captureB: cli.flags.bCapture?.split(","),
};
