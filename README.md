# sizeofvar

## Description
sizeofvar allows you to get a realistic memory size of any variable upon initialization or variable setting.  

## ✨ What's New

### Latest: v1.0.13 (October 2026)

- **Dev-tooling dependency bumps ([#32](https://github.com/CLDMV/sizeofvar/pull/32), [#35](https://github.com/CLDMV/sizeofvar/pull/35), [#37](https://github.com/CLDMV/sizeofvar/pull/37))** — `@cldmv/fix-headers` moves from 2.1.1 to 2.2.0, so `@Last modified by` now follows content edits only, `@cldmv/configs` from 1.2.0 to 1.2.4, and the `@cldmv/vitest-runner` test runner from 1.2.0 to 1.5.3 (it now needs Node 22.12.0 or later, the floor CI already used). No file header changed. The `sizeofvar()` function is unchanged and the package still has no runtime dependencies; it's a drop-in replacement for the previous version.
- [View full v1.0.13 Changelog](https://github.com/CLDMV/sizeofvar/blob/master/docs/changelog/v1/v1.0.13.md)

### Recent Releases

- **v1.0.12** (October 2026) — CI only: the in-repo PR mirror job now always runs and reports under a non-required name instead of being skipped ([Changelog](https://github.com/CLDMV/sizeofvar/blob/master/docs/changelog/v1/v1.0.12.md))
- **v1.0.11** (October 2026) — CI only: a skipped PR-run mirror job no longer satisfies the `✅ Required PR Check` ruleset gate ([Changelog](https://github.com/CLDMV/sizeofvar/blob/master/docs/changelog/v1/v1.0.11.md))
- **v1.0.10** (October 2026) — workflows synced to the CLDMV/.github v4.29.2 templates, bundle-size workflow, shared fix-headers config (comment-only header in `sizeofvar.js`); no runtime change ([Changelog](https://github.com/CLDMV/sizeofvar/blob/master/docs/changelog/v1/v1.0.10.md))
- **v1.0.9** (September 2026) — vitest 5 test toolchain, a CI Node matrix of 22.12.0–26, and signed hotfix-redirector cherry-picks; no runtime change ([Changelog](https://github.com/CLDMV/sizeofvar/blob/master/docs/changelog/v1/v1.0.9.md))

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
