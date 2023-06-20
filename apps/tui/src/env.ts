import assert from "assert";

const showHelp = process.argv[2] === "--help" || process.argv[2] === "-h";

const portA = parseInt(process.argv[2], 10);

const portB = parseInt(process.argv[3], 10);

if (!showHelp) {
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
};
