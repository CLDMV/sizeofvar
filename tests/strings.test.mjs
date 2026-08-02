/**
 * @fileoverview Characterization tests for the "string" branch of sizeofvar.js.
 *
 * The string branch (lines 43-51) is:
 *   size = 144
 *        + (level === 0 ? 8 : 0)
 *        + (length > 0 ? 24 : 0)
 *        + ceil(length / 8) * 8
 *
 * Notably this branch does NOT read `from_array` at all — only `level`
 * matters for the +8 term. That asymmetry is verified explicitly below.
 */
import { describe, it, expect } from "vitest";
import sizeofvar from "../sizeofvar.js";

describe("sizeofvar: string, top-level (level 0)", () => {
	it("empty string sizes to 152", () => {
		expect(sizeofvar("")).toBe(152);
	});

	it("steps every 8 characters via ceil(length / 8) * 8", () => {
		expect(sizeofvar("a")).toBe(184); // length 1 -> ceil(1/8)=1
		expect(sizeofvar("12345678")).toBe(184); // length 8 -> ceil(8/8)=1, same bucket
		expect(sizeofvar("123456789")).toBe(192); // length 9 -> ceil(9/8)=2, next bucket
	});
});

describe("sizeofvar: string, nested (level !== 0) — from_array has no effect", () => {
	it("drops the level-0 +8 term regardless of from_array", () => {
		expect(sizeofvar("", 1)).toBe(144);
		expect(sizeofvar("", 1, true)).toBe(144);
		expect(sizeofvar("", 1, false)).toBe(144);
	});

	it("non-empty nested string is identical whether from_array is true or false", () => {
		expect(sizeofvar("a", 1, true)).toBe(176);
		expect(sizeofvar("a", 1, false)).toBe(176);
		expect(sizeofvar("a", 1)).toBe(176);
	});
});

describe("sizeofvar: string, nested via container (net contribution)", () => {
	it("empty string as an object value nets to 0 extra (144 subtracted, 144 added back)", () => {
		expect(sizeofvar({ a: "" })).toBe(208);
	});

	it("non-empty string as an object value nets +32", () => {
		expect(sizeofvar({ a: "hello" })).toBe(240);
	});

	it("empty string as an array element nets +24 (136 subtracted vs. 144 added, plus the array's own +16 for being non-empty)", () => {
		expect(sizeofvar([""])).toBe(208);
	});

	it("multiple non-empty strings in an array each contribute independently", () => {
		// "a" (len 1) and "bb" (len 2) both fall in the same ceil(len/8)=1
		// bucket, so each contributes the same net amount.
		expect(sizeofvar(["a", "bb"])).toBe(280);
	});
});

describe("sizeofvar: string, independent formula cross-check", () => {
	it("top-level size matches the length-bucket formula for many random lengths", () => {
		for (let i = 0; i < 150; i++) {
			const len = Math.floor(Math.random() * 200);
			const str = "x".repeat(len);
			const expected = 144 + 8 + (len > 0 ? 24 : 0) + Math.ceil(len / 8) * 8;
			expect(sizeofvar(str)).toBe(expected);
		}
	});

	it("is monotonically non-decreasing as string length increases", () => {
		const lengths = [0, 1, 2, 7, 8, 9, 15, 16, 17, 63, 64, 65, 100];
		const sizes = lengths.map((n) => sizeofvar("x".repeat(n)));
		for (let i = 1; i < sizes.length; i++) {
			expect(sizes[i]).toBeGreaterThanOrEqual(sizes[i - 1]);
		}
	});
});
