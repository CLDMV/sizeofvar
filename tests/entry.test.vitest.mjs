/**
 *
 *	@Project: @cldmv/sizeofvar
 *	@Filename: /tests/entry.test.vitest.mjs
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
 * @fileoverview Checks the source entry points: the ESM default and named exports are the same function, and the CJS
 * entry src/index.cjs (loaded through `require`) returns that function, as `require("@cldmv/sizeofvar")` always has.
 * The package name resolves to src/ here because the suite runs with the `sizeofvar-dev` condition.
 */
import { createRequire } from "node:module";
import { describe, it, expect } from "vitest";
import sizeofvar, { sizeofvar as named } from "../src/index.mjs";
import * as byName from "@cldmv/sizeofvar";

const require = createRequire(import.meta.url);

const samples = [true, 0, 2 ** 31, "", "hello world", [], [1, "a", false], {}, { a: 1, b: "two", c: [3], d: { e: true } }];

describe("ESM entry", () => {
	it("exports the same function as default and as `sizeofvar`", () => {
		expect(typeof sizeofvar).toBe("function");
		expect(named).toBe(sizeofvar);
		expect(sizeofvar.name).toBe("sizeofvar");
	});

	it("resolves the package name to src/ under the sizeofvar-dev condition", () => {
		expect(byName.default).toBe(sizeofvar);
		expect(byName.sizeofvar).toBe(sizeofvar);
		expect(Object.keys(byName).sort()).toEqual(["default", "sizeofvar"]);
	});
});

describe("CJS entry (src/index.cjs)", () => {
	const cjs = require("../src/index.cjs");

	it("is the function itself, with .sizeofvar and .default pointing at it", () => {
		expect(typeof cjs).toBe("function");
		expect(cjs.sizeofvar).toBe(cjs);
		expect(cjs.default).toBe(cjs);
	});

	it("returns the same results as the ESM default export", () => {
		for (const value of samples) {
			expect(cjs(value)).toBe(sizeofvar(value));
		}
	});

	it("is what require() of the package name returns under the sizeofvar-dev condition", () => {
		expect(require("@cldmv/sizeofvar")).toBe(cjs);
	});
});
