/**
 *
 *	@Project: @cldmv/sizeofvar
 *	@Filename: /src/index.cjs
 *	@Date: 2026-11-01T12:07:23-08:00 (1793563643)
 *	@Author: Nate Corcoran <CLDMV>
 *	@Email: <Shinrai@users.noreply.github.com>
 *	-----
 *	@Last modified by: Nate Corcoran <CLDMV> (Shinrai@users.noreply.github.com)
 *	@Last modified time: 2026-11-01T13:15:26-08:00 (1793567726)
 *	-----
 *	@Copyright: Copyright (c) 2013-2026 Catalyzed Motivation Inc. All rights reserved.
 *
 */

/**
 * CommonJS entry point: a thin, synchronous re-export of the ESM build.
 *
 * Node's `require()` loads an ES module synchronously as long as its module graph has no top-level await, so this
 * file re-exports ./index.mjs instead of tsup bundling a second copy of the library for CommonJS.
 *
 * `require("@cldmv/sizeofvar")` has always returned the function itself, so that stays the export, with `.sizeofvar`
 * and `.default` pointing at the same function.
 *
 * Node.js versions without require(esm) would fail with a bare ERR_REQUIRE_ESM, so the check below fails early with a
 * message that says what to do instead.
 *
 * tsup.config.mjs copies this file verbatim to dist/index.cjs. Its `require("./index.mjs")` resolves to the sibling
 * src/index.mjs in a checkout and to the bundle in dist/.
 *
 * @module @cldmv/sizeofvar
 */
"use strict";

if (!process.features?.require_module) {
	const error = new Error(
		`@cldmv/sizeofvar: require() needs Node.js >=22.22.0 (this is ${process.version}). On older Node.js, load the package with import() instead.`
	);
	error.code = "ERR_REQUIRE_ESM";
	throw error;
}

const sizeofvar = require("./index.mjs").default;

module.exports = sizeofvar;
module.exports.sizeofvar = sizeofvar;
module.exports.default = sizeofvar;
