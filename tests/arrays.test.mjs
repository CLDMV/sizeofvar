/**
 * @fileoverview Characterization tests for the "array" branch of sizeofvar.js.
 *
 * The array branch (lines 86-110):
 *   - base size is 184 at level 0, 32 at any nested level;
 *   - a flat +16 whenever the array is non-empty (regardless of level);
 *   - each element is pre-subtracted (144 boolean / 152 number / 136 string)
 *     then recursed into with `sizeofvar(element, level+1, true)` — the
 *     `true` for from_array is what distinguishes array elements from
 *     object values in the number/boolean/string branches.
 *
 * Detected via `Object.prototype.toString.call(x).includes('Array')`, so this
 * also covers the array-vs-object type-dispatch branch (line 15).
 */
import { describe, it, expect } from "vitest";
import sizeofvar from "../sizeofvar.js";

describe("sizeofvar: array, base sizes", () => {
	it("empty array at level 0 sizes to 184 (no +16 for empty)", () => {
		expect(sizeofvar([])).toBe(184);
	});

	it("empty array at a nested level sizes to 32", () => {
		expect(sizeofvar([], 1)).toBe(32);
	});

	it("non-empty nested array adds the base plus the flat +16", () => {
		expect(sizeofvar([1], 1)).toBeGreaterThan(32);
	});
});

describe("sizeofvar: array of a single primitive type", () => {
	it("array of numbers", () => {
		expect(sizeofvar([1, 2, 3])).toBe(224);
	});

	it("array of booleans", () => {
		expect(sizeofvar([true, false])).toBe(216);
	});

	it("array of strings", () => {
		expect(sizeofvar(["a", "bb"])).toBe(280);
	});

	it("array of large (>= 2^31) numbers", () => {
		expect(sizeofvar([3000000000, 3000000000])).toBe(248);
	});
});

describe("sizeofvar: array, mixed types and nesting", () => {
	it("array mixing boolean/number/string/array/object elements", () => {
		expect(sizeofvar([1, "a", true, [1, 2], { x: 1 }])).toBe(376);
	});

	it("array of arrays (nested arrays increment level correctly)", () => {
		expect(sizeofvar([[1, 2], [3, 4]])).toBe(328);
	});

	it("three levels of array nesting", () => {
		expect(sizeofvar([[[1]]])).toBe(304);
	});

	it("array containing an object which itself contains an array", () => {
		expect(sizeofvar([{ a: [1, 2, 3] }, { b: 4 }])).toBe(384);
	});
});

describe("sizeofvar: array, element types outside the boolean/number/string subtraction switch", () => {
	// undefined/function/symbol/bigint elements don't match any case in the
	// pre-recursion subtraction switch, and recurse to 0 (no matching type in
	// the outer switch either), so they only contribute the flat array
	// overhead, never a per-element adjustment.
	it("array of a single undefined element", () => {
		expect(sizeofvar([undefined])).toBe(200);
	});

	it("array mixing undefined/function/symbol/bigint elements", () => {
		expect(sizeofvar([undefined, function () {}, Symbol("x"), 10n])).toBe(200);
	});

	it("array of Date objects (treated as plain objects with no own enumerable keys)", () => {
		expect(sizeofvar([new Date(), new Date()])).toBe(312);
	});
});

describe("sizeofvar: array, independent formula cross-check (numbers only)", () => {
	it("top-level array-of-small-numbers size matches base + 16 + 8*n", () => {
		for (let i = 0; i < 100; i++) {
			const n = Math.floor(Math.random() * 40);
			const arr = new Array(n).fill(1); // all small numbers, net +8 each
			const expected = 184 + (n > 0 ? 16 : 0) + n * 8;
			expect(sizeofvar(arr)).toBe(expected);
		}
	});

	it("is monotonically non-decreasing as array length increases", () => {
		const lengths = [0, 1, 2, 3, 5, 10, 20];
		const sizes = lengths.map((n) => sizeofvar(new Array(n).fill(1)));
		for (let i = 1; i < sizes.length; i++) {
			expect(sizes[i]).toBeGreaterThanOrEqual(sizes[i - 1]);
		}
	});
});
