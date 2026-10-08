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
npm i @cldmv/sizeofvar --save
```

## Usage
```Javascript
const sizeofvar = require('@cldmv/sizeofvar');
console.log(sizeofvar(variable));
```





## Test Examples
The included tests allow you to verify that the number returned from this module represents the memory usage reported by node for a variable.
```Javascript
node -expose-gc test/test-mem.js command [-v]
```
#### -expose-gc
This option is required to run the memory tests. Without it you will recieve an error.

#### test/test-mem.js
This is the test file. It handles a command to test various variable tests.

#### command
Valid values are:
* array
* bool
* number
* object
* object-complex
* object-key-length
* object-string
* string

## ❤️ Contributors

This project exists thanks to all the people who contribute. [[Contributors](https://github.com/CLDMV/sizeofvar/graphs/contributors)].
<a href="https://github.com/CLDMV/sizeofvar/graphs/contributors"><img src="https://image.cldmv.net/github/contributors/?repo=sizeofvar" /></a>
