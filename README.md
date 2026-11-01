# sizeofvar

## Description

sizeofvar allows you to get a realistic memory size of any variable upon initialization or variable setting.

## ✨ What's New

### Latest: v1.0.14 (October 2026)

- **Vitest 5.0.3 ([#39](https://github.com/CLDMV/sizeofvar/pull/39), [#40](https://github.com/CLDMV/sizeofvar/pull/40))** — `vitest` and `@vitest/coverage-v8` move from 5.0.2 to 5.0.3 in the lockfile, development dependencies only. The `sizeofvar()` function is unchanged and the package still has no runtime dependencies; it's a drop-in replacement for the previous version.
- [View full v1.0.14 Changelog](https://github.com/CLDMV/sizeofvar/blob/master/docs/changelog/v1/v1.0.14.md)

### Recent Releases

- **v1.0.13** (October 2026) — dev-tooling bumps: `@cldmv/fix-headers` 2.2.0, `@cldmv/configs` 1.2.4 and `@cldmv/vitest-runner` 1.5.3; no file header changed ([Changelog](https://github.com/CLDMV/sizeofvar/blob/master/docs/changelog/v1/v1.0.13.md))
- **v1.0.12** (October 2026) — CI only: the in-repo PR mirror job now always runs and reports under a non-required name instead of being skipped ([Changelog](https://github.com/CLDMV/sizeofvar/blob/master/docs/changelog/v1/v1.0.12.md))
- **v1.0.11** (October 2026) — CI only: a skipped PR-run mirror job no longer satisfies the `✅ Required PR Check` ruleset gate ([Changelog](https://github.com/CLDMV/sizeofvar/blob/master/docs/changelog/v1/v1.0.11.md))
- **v1.0.10** (October 2026) — workflows synced to the CLDMV/.github v4.29.2 templates, bundle-size workflow, shared fix-headers config (comment-only header in `sizeofvar.js`); no runtime change ([Changelog](https://github.com/CLDMV/sizeofvar/blob/master/docs/changelog/v1/v1.0.10.md))

📚 **For complete version history and detailed release notes, see the [docs/changelog/](https://github.com/CLDMV/sizeofvar/tree/master/docs/changelog/) folder.**

## Install

```bash
npm i @cldmv/sizeofvar
```

Requires Node.js `>=22.22.0`.

## Usage

ESM:

```js
import sizeofvar from "@cldmv/sizeofvar";
// or the named export
import { sizeofvar } from "@cldmv/sizeofvar";

console.log(sizeofvar({ a: 1, b: "two" }));
```

CommonJS:

```js
const sizeofvar = require("@cldmv/sizeofvar");

console.log(sizeofvar([1, 2, 3]));
```

`require()` returns the function itself, as in 1.x; `sizeofvar.sizeofvar` and `sizeofvar.default` point at the same function. The package is ESM, and the CommonJS entry loads it through Node's `require(esm)`, which is why `require()` needs Node.js `>=22.22.0`. On older versions, load it with `import()`.

Only the package root is exported. Deep imports such as `@cldmv/sizeofvar/sizeofvar.js` no longer resolve.

## Development

The source lives in `src/` (`src/index.mjs`, plus the CommonJS entry `src/index.cjs`), and `npm run build` bundles it into `dist/` with tsup. Without a build, the package name resolves to `dist/` and fails with `ERR_MODULE_NOT_FOUND`. To run a checkout from source instead, pass the `sizeofvar-dev` condition:

```bash
node --conditions=sizeofvar-dev app.mjs
# or once per shell
export NODE_OPTIONS=--conditions=sizeofvar-dev
```

| Script              | What it does                                                        |
| ------------------- | ------------------------------------------------------------------- |
| `npm test`          | runs the vitest suite against `src/`, then builds and tests `dist/` |
| `npm run coverage`  | runs the vitest suite with coverage                                 |
| `npm run test:dist` | builds, then checks `dist/index.cjs` against `dist/index.mjs`       |
| `npm run build:ci`  | lint, format check, type declarations and the build                 |

## ❤️ Contributors

This project exists thanks to all the people who contribute. [[Contributors](https://github.com/CLDMV/sizeofvar/graphs/contributors)].
<a href="https://github.com/CLDMV/sizeofvar/graphs/contributors"><img src="https://image.cldmv.net/github/contributors/?repo=sizeofvar" alt="sizeofvar contributors" /></a>
