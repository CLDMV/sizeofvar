/**
 * @fileoverview Characterization tests for the "object" branch of sizeofvar.js.
 *
 * The object branch (lines 52-85):
 *   - base size is 208 at level 0, 56 at any nested level;
 *   - each entry is pre-subtracted (152 boolean / 152 number / 144 string)
 *     then recursed into with `sizeofvar(value, level+1)` — from_array is
 *     omitted, so it defaults to false, which is what distinguishes object
 *     values from array elements in the number branch;
 *   - a "hash bucket" style overhead based on entry COUNT only: after the
 *     loop, `c` = number of entries; if `c > 0`, decrement it, and if it's
 *     still > 0, add `40 + ceil(c / 3) * 24`. Key NAMES (and their lengths)
 *     are never read (the `key` from `Object.entries` is destructured but
 *     unused outside a commented-out console.log) — verified explicitly
 *     below by a key-length-invariance assertion.
 *
 * Detected via `Object.prototype.toString.call(x)` NOT including 'Array', so
 * this also covers the object-vs-array type-dispatch branch (line 15) for
 * plain objects, Dates, RegExps, and null (which throws — see edge-types).
 */
import { describe, it, expect } from "vitest";
import sizeofvar from "../sizeofvar.js";

describe("sizeofvar: object, base sizes", () => {
	it("empty object at level 0 sizes to 208", () => {
		expect(sizeofvar({})).toBe(208);
	});

	it("empty object at a nested level sizes to 56", () => {
		expect(sizeofvar({}, 1)).toBe(56);
	});

	it("omitting level/from_array at top level matches explicitly passing 0/false", () => {
		expect(sizeofvar({ a: 1 })).toBe(sizeofvar({ a: 1 }, 0, false));
	});
});

describe("sizeofvar: object, single-value-type entries", () => {
	it("single number entry nets to the empty-object size (152 sub, 152 add back)", () => {
		expect(sizeofvar({ a: 1 })).toBe(208);
	});

	it("single boolean entry also nets to the empty-object size", () => {
		expect(sizeofvar({ a: true })).toBe(208);
	});

	it("single string entry nets +32 (152 base string minus 144 sub, plus level-based extras)", () => {
		expect(sizeofvar({ a: "x" })).toBe(240);
	});

	it("single large number entry nets +32 (magnitude offset survives the subtraction)", () => {
		expect(sizeofvar({ a: 3000000000 })).toBe(240);
	});
});

describe("sizeofvar: object, entry-count overhead staircase", () => {
	// c=0 -> outer `if (c > 0)` is false, no overhead.
	// c=1 -> outer true, but `c -= 1` makes it 0, inner `if (c > 0)` is false.
	// c=2..4 -> inner c-1 in [1,3], ceil(./3)=1 -> +40+24=+64.
	// c=5..7 -> inner c-1 in [4,6], ceil(./3)=2 -> +40+48=+88.
	// c=8 -> inner c-1=7, ceil(7/3)=3 -> +40+72=+112.
	// All entries below are numbers, which net 0 extra per-entry, isolating
	// the count-based overhead in the totals.
	it("0 entries: 208 (no overhead)", () => {
		expect(sizeofvar({})).toBe(208);
	});

	it("1 entry: 208 (no overhead — inner branch not reached)", () => {
		expect(sizeofvar({ a: 1 })).toBe(208);
	});

	it("2, 3, and 4 entries all land in the same +64 bucket", () => {
		expect(sizeofvar({ a: 1, b: 2 })).toBe(272);
		expect(sizeofvar({ a: 1, b: 2, c: 3 })).toBe(272);
		expect(sizeofvar({ a: 1, b: 2, c: 3, d: 4 })).toBe(272);
	});

	it("5, 6, and 7 entries all land in the same +88 bucket", () => {
		expect(sizeofvar({ a: 1, b: 2, c: 3, d: 4, e: 5 })).toBe(296);
		expect(sizeofvar({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 })).toBe(296);
		expect(sizeofvar({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 })).toBe(296);
	});

	it("8 entries steps up to the +112 bucket", () => {
		expect(sizeofvar({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 })).toBe(320);
	});
});

describe("sizeofvar: object, key length has NO effect on size", () => {
	it("a short key name and a very long key name produce identical sizes", () => {
		const shortKey = sizeofvar({ a: "hello" });
		const longKey = sizeofvar({ thisIsAVeryLongKeyNameIndeedForSure123456789: "hello" });
		expect(shortKey).toBe(240);
		expect(longKey).toBe(240);
		expect(shortKey).toBe(longKey);
	});

	it("holds across many random key-name lengths for an otherwise-identical value", () => {
		const makeKey = (len) =>
			Array.from({ length: len }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join("");
		const baseline = sizeofvar({ [makeKey(1)]: 42 });
		for (let i = 0; i < 20; i++) {
			const len = 1 + Math.floor(Math.random() * 200);
			expect(sizeofvar({ [makeKey(len)]: 42 })).toBe(baseline);
		}
	});
});

describe("sizeofvar: object, nested containers as values", () => {
	it("object value nested inside an object", () => {
		expect(sizeofvar({ a: { b: 1 } })).toBe(264);
	});

	it("array value nested inside an object", () => {
		expect(sizeofvar({ a: [1, 2, 3] })).toBe(280);
	});

	it("three levels of object nesting", () => {
		expect(sizeofvar({ a: { b: { c: 1 } } })).toBe(320);
	});

	it("object containing an array which contains objects", () => {
		expect(sizeofvar({ a: [{ b: 1 }, { c: 2 }] })).toBe(368);
	});

	it("mixed-type object (number, string, boolean) at 3 and 5 entries", () => {
		expect(sizeofvar({ a: 1, b: "x", c: true })).toBe(304);
		expect(sizeofvar({ a: 1, b: "x", c: true, d: [1, 2], e: { f: 1 } })).toBe(448);
	});
});

describe("sizeofvar: object, non-plain-object values via Object.prototype.toString dispatch", () => {
	it("a Date has no own enumerable keys, so it sizes like an empty object", () => {
		expect(sizeofvar(new Date())).toBe(208);
	});

	it("a RegExp has no own enumerable keys, so it sizes like an empty object", () => {
		expect(sizeofvar(/abc/)).toBe(208);
	});

	it("a Date nested as an object value nets to the empty-object nested overhead", () => {
		expect(sizeofvar({ a: new Date() })).toBe(264);
	});
});

describe("sizeofvar: object, independent formula cross-check (numbers-only values)", () => {
	it("size matches base(208) + count-overhead(c) for many random entry counts", () => {
		const overhead = (c) => {
			if (c <= 0) return 0;
			const rest = c - 1;
			if (rest <= 0) return 0;
			return 40 + Math.ceil(rest / 3) * 24;
		};
		for (let i = 0; i < 60; i++) {
			const c = Math.floor(Math.random() * 30);
			const obj = {};
			for (let k = 0; k < c; k++) obj["k" + k] = k;
			expect(sizeofvar(obj)).toBe(208 + overhead(c));
		}
	});
});
