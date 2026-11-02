/**
 *
 *	@Project: @cldmv/sizeofvar
 *	@Filename: /tests/cjs/entry.test.cjs
 *	@Date: 2026-11-01T12:08:00-08:00 (1793563680)
 *	@Author: Nate Corcoran <CLDMV>
 *	@Email: <Shinrai@users.noreply.github.com>
 *	-----
 *	@Last modified by: Nate Corcoran <CLDMV> (Shinrai@users.noreply.github.com)
 *	@Last modified time: 2026-11-01T12:10:03-08:00 (1793563803)
 *	-----
 *	@Copyright: Copyright (c) 2013-2026 Catalyzed Motivation Inc. All rights reserved.
 *
 */

/**
 * @fileoverview Checks the built dist/ output: dist/index.cjs is the function exported by dist/index.mjs, with
 * `.sizeofvar` and `.default` pointing at it, and returns the same results. Run after `npm run build` (see `test:dist`).
 */
"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const dist = path.resolve(__dirname, "../../dist");

const samples = [true, 0, 2 ** 31, "", "hello world", [], [1, "a", false], {}, { a: 1, b: "two", c: [3], d: { e: true } }];

test("dist/index.cjs is the function exported by dist/index.mjs", async () => {
	const esm = await import(pathToFileURL(path.join(dist, "index.mjs")).href);
	const cjs = require(path.join(dist, "index.cjs"));
	assert.equal(typeof cjs, "function");
	assert.equal(cjs, esm.default);
	assert.equal(cjs.sizeofvar, cjs);
	assert.equal(cjs.default, cjs);
	assert.equal(esm.sizeofvar, esm.default);
	assert.equal(cjs.name, "sizeofvar");
});

test("dist/index.cjs returns the same results as the ESM default export", async () => {
	const esm = await import(pathToFileURL(path.join(dist, "index.mjs")).href);
	const cjs = require(path.join(dist, "index.cjs"));
	for (const value of samples) {
		assert.equal(cjs(value), esm.default(value));
	}
});

test("dist/index.cjs is a verbatim copy of src/index.cjs", () => {
	const fs = require("node:fs");
	assert.equal(fs.readFileSync(path.join(dist, "index.cjs"), "utf8"), fs.readFileSync(path.resolve(dist, "../src/index.cjs"), "utf8"));
});
