# Traffic Control

A package for proxying requests using Node.js plus a TUI.

## Development

This is a monorepo using [turbo](https://turbo.build/).

### Starting the TUI

```bash
pnpm run start # run the tui
```

See `package.json` for more scripts.

## TUI example usage

```bash
tctrl 5601 5602 -a '^\/[\d]+\/bundles' -a '^\/bootstrap\.js' -a '^\/node_modules' -a '^\/ui\/' -a '^\/translations.*json$'
```

- Switch between 5601 and 5602
- Capture requests that match the provided regexes and forward them to 5601 (port A) always
