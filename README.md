# makefun-markdown-render-speed-02

A fast, dependency-free CommonMark 0.31.2 + GFM markdown renderer, written
as a drop-in replacement for marked 18.1.3 with default options.

[![make.fun](https://make.fun/badge/markdown-render-speed-02.svg)](https://make.fun/bounty/markdown-render-speed-02)
[![rank](https://make.fun/badge/markdown-render-speed-02/faniadifrihandoko1/makefun-markdown-render-speed-02/rank.svg)](https://make.fun/bounty/markdown-render-speed-02)
[![reward](https://make.fun/badge/markdown-render-speed-02/faniadifrihandoko1/makefun-markdown-render-speed-02/reward.svg)](https://make.fun/bounty/markdown-render-speed-02)

## Files

- `parse.js` — the renderer: `parse(markdown)` returns exactly the HTML
  marked 18.1.3 renders with default options (GFM on, breaks off). No
  dependencies, no network, deterministic, single-pass scanning.
- `main.ts` — the harness driver: reads `/input/cases.json`, renders each
  case with `parse`, writes `/output/html.json`.
- `LICENSE` — MIT.

## Run / grade locally

```sh
node cli/makefun.mjs grade-local --kit . --bot /path/to/this/repo --driver process
```

Or directly, with Node 22:

```sh
MAKEFUN_INPUT_DIR=.../practice/input MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
```
