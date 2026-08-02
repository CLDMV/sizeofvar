/**
 * @fileoverview Characterization tests for the "number" branch of sizeofvar.js.
 *
 * The number branch (lines 26-42) has three independent knobs:
 *   - a 2^31 magnitude threshold (`bit32 = 256**4 / 2 = 2147483648`) that adds
 *     an "offset" (16 or 32 bytes) when the value is >= the threshold;
 *   - whether `level === 0` (offset stays 16) vs. `level !== 0` combined with
 *     `from_array` (offset becomes 32 only when level != 0 AND !from_array);
 *   - an unconditional +8 whenever `from_array` is truthy, regardless of level.
 *
 * All exact values below were captured by executing sizeofvar.js directly, so
 * they lock current behavior rather than a hand-derived expectation.
 */
import { describe, it, expect } from "vitest";
import sizeofvar from "../sizeofvar.js";

const BIT32 = (256 * 256 * 256 * 256) / 2; // 2147483648

describe("sizeofvar: number, top-level (level 0, from_array false)", () => {
	it("small/typical numbers all size to 152", () => {
		expect(sizeofvar(0)).toBe(152);
		expect(sizeofvar(42)).toBe(152);
		expect(sizeofvar(-100)).toBe(152);
	});

	it("is exactly 152 just below the 2^31 threshold and 168 at/after it", () => {
		expect(BIT32).toBe(2147483648);
		expect(sizeofvar(2147483647)).toBe(152);
		expect(sizeofvar(2147483648)).toBe(168);
		expect(sizeofvar(3000000000)).toBe(168);
	});

	it("handles NaN and +/-Infinity per the >= comparison", () => {
		// NaN >= BIT32 is false in JS, so NaN takes the "small" branch.
		expect(sizeofvar(NaN)).toBe(152);
		// Infinity >= BIT32 is true.
		expect(sizeofvar(Infinity)).toBe(168);
		expect(sizeofvar(-Infinity)).toBe(152);
	});
});

describe("sizeofvar: number, explicit level/from_array combinations", () => {
	it("level 0 with from_array=true still skips the offset bump but adds +8", () => {
		// At level 0 the `if (level == 0) {}` branch is a no-op regardless of
		// from_array, so offset stays 16 (irrelevant here since 5 < BIT32);
		// the trailing `if (from_array) size += 8` still applies unconditionally.
		expect(sizeofvar(5, 0, true)).toBe(160);
	});

	it("level !== 0 and from_array=true (typical array element): +8, offset 16", () => {
		expect(sizeofvar(5, 1, true)).toBe(160);
		expect(sizeofvar(3000000000, 1, true)).toBe(176);
	});

	it("level !== 0 and from_array=false (typical object value): no +8, offset 32", () => {
		expect(sizeofvar(5, 1, false)).toBe(152);
		expect(sizeofvar(3000000000, 1, false)).toBe(184);
	});

	it("omitting from_array at a nested level defaults it to false", () => {
		expect(sizeofvar(5, 1)).toBe(sizeofvar(5, 1, false));
		expect(sizeofvar(3000000000, 1)).toBe(sizeofvar(3000000000, 1, false));
	});
});

describe("sizeofvar: number, nested via container (net contribution)", () => {
	it("a small number as an object value nets to 0 extra (152 subtracted, 152 added back)", () => {
		expect(sizeofvar({ a: 1 })).toBe(208);
	});

	it("a large number as an object value nets +32 (offset 32 survives the subtraction)", () => {
		expect(sizeofvar({ a: 3000000000 })).toBe(240);
	});

	it("a small number as an array element nets +8 (from_array's flat +8)", () => {
		expect(sizeofvar([1, 2, 3])).toBe(224);
	});

	it("a large number as an array element nets +24 (offset 16 + from_array's +8)", () => {
		expect(sizeofvar([3000000000, 3000000000])).toBe(248);
	});
});

describe("sizeofvar: number, independent formula cross-check", () => {
	it("top-level size matches the 152/168 threshold formula for many random magnitudes", () => {
		for (let i = 0; i < 200; i++) {
			// Spread samples across a wide range straddling BIT32, including
			// negatives, to exercise the >= comparison broadly.
			const n = Math.floor((Math.random() - 0.3) * BIT32 * 3);
			const expected = n >= BIT32 ? 168 : 152;
			expect(sizeofvar(n)).toBe(expected);
		}
	});
});
