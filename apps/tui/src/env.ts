import assert from "node:assert";
import meow from "meow";

const cli = meow(
  `
    Usage
      $ tctrl :<portA> :<portB>

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
        isMultiple: true,
      },
      bCapture: {
        type: "string",
        shortFlag: "b",
        isMultiple: true,
      },
      help: {
        type: "boolean",
        shortFlag: "h",
      },
    },
  }
);

function throwIfUndefinedish(value: unknown, message: string): void | never {
  if (value == null) throw new Error(message);
}

const showHelp = cli.flags.help as unknown as boolean;
throwIfUndefinedish(cli.input.at(0), "Port A must be specified, see help");
const portA = parseInt(cli.input.at(0) as unknown as string, 10);
throwIfUndefinedish(cli.input.at(1), "Port B must be specified, see help");
const portB = parseInt(cli.input.at(1) as unknown as string, 10);

if (!showHelp) {
  assert(
    // eslint-disable-next-line
    portA && portB,
    `Port A & B must be specified, got Port A: "${portA}" and Port B "${portB}". See help.`
  );
}

export default {
  showHelp,
  portA,
  portB,
  captureA: cli.flags.aCapture,
  captureB: cli.flags.bCapture,
};
