/**
 * @fileoverview Characterization tests for values that fall OUTSIDE the six
 * handled switch cases (boolean/number/string/object/array) in sizeofvar.js,
 * plus the two default-parameter branches (`level`/`from_array` omitted).
 *
 * `undefined`, functions, symbols, and bigints all produce a `type` string
 * that matches no `case` in the switch (lines 21-111), so `size` stays at
 * its initial 0 and the function returns 0 — this exercises the switch's
 * implicit "no case matched" control-flow path.
 *
 * `null` is a special case: `typeof null === "object"` (line 11 is false),
 * so it goes through `Object.prototype.toString.call(null)` -> `"[object
 * Null]"`, which does NOT include "Array" (line 15), so it's dispatched to
 * the "object" case. But `Object.entries(null)` (line 60) throws a
 * TypeError before any size is computed — the current implementation does
 * not special-case null, and this test locks that throwing behavior as-is.
 */
import { describe, it, expect } from "vitest";
import sizeofvar from "../sizeofvar.js";

describe("sizeofvar: types with no matching switch case return 0", () => {
	it("undefined", () => {
		expect(sizeofvar(undefined)).toBe(0);
	});

	it("function", () => {
		expect(sizeofvar(function () {})).toBe(0);
	});

	it("symbol", () => {
		expect(sizeofvar(Symbol("x"))).toBe(0);
	});

	it("bigint", () => {
		expect(sizeofvar(10n)).toBe(0);
	});

	it("calling with zero arguments (object itself undefined) also returns 0", () => {
		expect(sizeofvar()).toBe(0);
	});
});

describe("sizeofvar: null throws instead of sizing", () => {
	it("throws a TypeError from Object.entries(null)", () => {
		expect(() => sizeofvar(null)).toThrow(TypeError);
		expect(() => sizeofvar(null)).toThrow(/Cannot convert undefined or null to object/);
	});

	it("null nested as an object value propagates the same throw", () => {
		expect(() => sizeofvar({ a: null })).toThrow(TypeError);
	});
});

describe("sizeofvar: unmatched-type values nested inside containers", () => {
	it("undefined as the sole array element contributes only the array's flat overhead", () => {
		expect(sizeofvar([undefined])).toBe(200);
	});

	it("undefined as an object value contributes nothing extra", () => {
		expect(sizeofvar({ a: undefined })).toBe(208);
	});

	it("a function as an object value contributes nothing extra", () => {
		expect(sizeofvar({ a: function () {} })).toBe(208);
	});

	it("mixing several unmatched-type elements in one array", () => {
		expect(sizeofvar([undefined, function () {}, Symbol("x"), 10n])).toBe(200);
	});
});

describe("sizeofvar: default parameters (level/from_array omitted)", () => {
	it("omitting level defaults it to 0, matching an explicit 0", () => {
		expect(sizeofvar(5)).toBe(sizeofvar(5, 0));
		expect(sizeofvar("hi")).toBe(sizeofvar("hi", 0));
		expect(sizeofvar({ a: 1 })).toBe(sizeofvar({ a: 1 }, 0));
		expect(sizeofvar([1, 2])).toBe(sizeofvar([1, 2], 0));
	});

	it("omitting from_array defaults it to false, matching an explicit false", () => {
		expect(sizeofvar(5, 1)).toBe(sizeofvar(5, 1, false));
		expect(sizeofvar(3000000000, 2)).toBe(sizeofvar(3000000000, 2, false));
	});

	it("top-level default-args call matches an explicit (0, false) call", () => {
		expect(sizeofvar({ a: 1 }, 0, false)).toBe(sizeofvar({ a: 1 }));
	});
});
