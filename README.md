# sizeofvar

## Description

sizeofvar allows you to get a realistic memory size of any variable upon initialization or variable setting.

## ✨ What's New

### Latest: v1.1.0 (November 2026)

- **ESM with a CommonJS entry** — sizeofvar is now an ES module with a default and a named `sizeofvar` export, built with tsup, and it ships TypeScript declarations. `require("@cldmv/sizeofvar")` still returns the function, and the size heuristic is unchanged ([#59](https://github.com/CLDMV/sizeofvar/pull/59), [#53](https://github.com/CLDMV/sizeofvar/issues/53)).
- **Node.js 22.22.0 or later** — the package now declares an `engines` floor (v1.0.14 had none) and exports the package root; import `@cldmv/sizeofvar` rather than a file path.
- [View full v1.1.0 Changelog](https://github.com/CLDMV/sizeofvar/blob/master/docs/changelog/v1/v1.1.0.md)

### Recent Releases

- **v1.0.14** (October 2026) — dev-dependency patch: `vitest` and `@vitest/coverage-v8` 5.0.3; no runtime change ([Changelog](https://github.com/CLDMV/sizeofvar/blob/master/docs/changelog/v1/v1.0.14.md))
- **v1.0.13** (October 2026) — dev-tooling bumps: `@cldmv/fix-headers` 2.2.0, `@cldmv/configs` 1.2.4 and `@cldmv/vitest-runner` 1.5.3; no file header changed ([Changelog](https://github.com/CLDMV/sizeofvar/blob/master/docs/changelog/v1/v1.0.13.md))
- **v1.0.12** (October 2026) — CI only: the in-repo PR mirror job now always runs and reports under a non-required name instead of being skipped ([Changelog](https://github.com/CLDMV/sizeofvar/blob/master/docs/changelog/v1/v1.0.12.md))
- **v1.0.11** (October 2026) — CI only: a skipped PR-run mirror job no longer satisfies the `✅ Required PR Check` ruleset gate ([Changelog](https://github.com/CLDMV/sizeofvar/blob/master/docs/changelog/v1/v1.0.11.md))

📚 **For complete version history and detailed release notes, see the [docs/changelog/](https://github.com/CLDMV/sizeofvar/tree/master/docs/changelog/) folder.**

## Install

```bash
npm i @cldmv/sizeofvar
```

Requires Node.js `>=16.0.0` for `import` (the package's `engines` range). `require()` needs Node.js `^20.19.0 || >=22.13.0` (see below).

Developing this package needs Node.js 22.22.0 or later (`devEngines`).

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

`require()` returns the function itself, as in 1.x; `sizeofvar.sizeofvar` and `sizeofvar.default` point at the same function. The package is ESM, and the CommonJS entry loads it through Node's `require(esm)`, which is why `require()` needs Node.js `^20.19.0 || >=22.13.0`. On older versions, load it with `import()`.

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
