/**
 * @fileoverview Characterization tests for the "boolean" branch of sizeofvar.js.
 *
 * Booleans are the simplest branch: `size += 152` unconditionally, with no
 * dependency on `level` or `from_array`. These tests lock that behavior and
 * also cover how a boolean value nested inside an array vs. an object nets
 * out once the caller's pre-recursion subtraction (144 for array elements,
 * 152 for object values — see sizeofvar.js lines 62-64 and 95-96) is applied.
 */
import { describe, it, expect } from "vitest";
import sizeofvar from "../sizeofvar.js";

describe("sizeofvar: boolean", () => {
	it("top-level true/false both size to 152", () => {
		expect(sizeofvar(true)).toBe(152);
		expect(sizeofvar(false)).toBe(152);
	});

	it("ignores level and from_array entirely (always 152)", () => {
		expect(sizeofvar(true, 0)).toBe(152);
		expect(sizeofvar(true, 0, false)).toBe(152);
		expect(sizeofvar(true, 0, true)).toBe(152);
		expect(sizeofvar(true, 1)).toBe(152);
		expect(sizeofvar(true, 1, false)).toBe(152);
		expect(sizeofvar(true, 1, true)).toBe(152);
		expect(sizeofvar(false, 5, true)).toBe(152);
	});

	it("nested as an object value nets to the object's base size (152 subtracted, 152 added back)", () => {
		// {} would be 208; a single boolean value is a net-zero contribution
		// because the pre-recursion subtraction (152) exactly cancels the
		// boolean branch's own 152.
		expect(sizeofvar({ a: true })).toBe(208);
		expect(sizeofvar({ a: false })).toBe(208);
	});

	it("nested as an array element contributes +8 net (144 subtracted vs. 152 added)", () => {
		// [] is 184; a 2-element boolean array demonstrates the +8-per-element
		// asymmetry between the array pre-recursion subtraction (144) and the
		// boolean branch's fixed 152.
		expect(sizeofvar([true, false])).toBe(216);
	});

	it("nested boolean values are unaffected by recursion depth beyond level 1", () => {
		expect(sizeofvar({ a: { b: true } })).toBe(sizeofvar({ a: { b: false } }));
		expect(sizeofvar([[true]], 0)).toBe(sizeofvar([[false]], 0));
	});
});
