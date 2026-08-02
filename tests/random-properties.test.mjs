/**
 * @fileoverview Property-based tests for sizeofvar.js using randomized
 * inputs, asserting stable INVARIANTS (type consistency, monotonicity,
 * threshold behavior) rather than a single locked byte count. Complements
 * the exact-value characterization tests in the other files, which cover
 * deterministic inputs.
 */
import { describe, it, expect } from "vitest";
import sizeofvar from "../sizeofvar.js";

const BIT32 = (256 * 256 * 256 * 256) / 2; // 2147483648

function randomString(maxLen) {
	const len = Math.floor(Math.random() * maxLen);
	let s = "";
	for (let i = 0; i < len; i++) {
		s += String.fromCharCode(32 + Math.floor(Math.random() * 95));
	}
	return s;
}

describe("sizeofvar: random-input type consistency", () => {
	it("always returns a finite number for random booleans", () => {
		for (let i = 0; i < 50; i++) {
			const v = Math.random() < 0.5;
			const result = sizeofvar(v);
			expect(typeof result).toBe("number");
			expect(Number.isFinite(result)).toBe(true);
			expect(result).toBe(152);
		}
	});

	it("always returns a finite number for random top-level numbers", () => {
		for (let i = 0; i < 50; i++) {
			const v = (Math.random() - 0.5) * Number.MAX_SAFE_INTEGER;
			const result = sizeofvar(v);
			expect(typeof result).toBe("number");
			expect(Number.isFinite(result)).toBe(true);
		}
	});

	it("always returns a finite number for random strings", () => {
		for (let i = 0; i < 50; i++) {
			const result = sizeofvar(randomString(80));
			expect(typeof result).toBe("number");
			expect(Number.isFinite(result)).toBe(true);
		}
	});

	it("always returns a finite number for random flat arrays of mixed primitives", () => {
		const pool = [true, false, 1, -1, 3000000000, "a", "hello world", "", 0];
		for (let i = 0; i < 50; i++) {
			const len = Math.floor(Math.random() * 10);
			const arr = Array.from({ length: len }, () => pool[Math.floor(Math.random() * pool.length)]);
			const result = sizeofvar(arr);
			expect(typeof result).toBe("number");
			expect(Number.isFinite(result)).toBe(true);
		}
	});

	it("always returns a finite number for random flat objects of mixed primitives", () => {
		const pool = [true, false, 1, -1, 3000000000, "a", "hello world", "", 0];
		for (let i = 0; i < 50; i++) {
			const count = Math.floor(Math.random() * 10);
			const obj = {};
			for (let k = 0; k < count; k++) {
				obj["key" + k] = pool[Math.floor(Math.random() * pool.length)];
			}
			const result = sizeofvar(obj);
			expect(typeof result).toBe("number");
			expect(Number.isFinite(result)).toBe(true);
		}
	});
});

describe("sizeofvar: random-input threshold and monotonicity properties", () => {
	it("top-level number result is 168 iff the value is >= 2^31, else 152", () => {
		for (let i = 0; i < 200; i++) {
			const n = (Math.random() - 0.3) * BIT32 * 3;
			const result = sizeofvar(n);
			expect(result).toBe(n >= BIT32 ? 168 : 152);
		}
	});

	it("string size is monotonically non-decreasing as random length increases", () => {
		const lengths = Array.from({ length: 15 }, () => Math.floor(Math.random() * 500)).sort((a, b) => a - b);
		const sizes = lengths.map((n) => sizeofvar("x".repeat(n)));
		for (let i = 1; i < sizes.length; i++) {
			expect(sizes[i]).toBeGreaterThanOrEqual(sizes[i - 1]);
		}
	});

	it("array-of-numbers size is monotonically non-decreasing as random length increases", () => {
		const lengths = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b);
		const sizes = lengths.map((n) => sizeofvar(new Array(n).fill(7)));
		for (let i = 1; i < sizes.length; i++) {
			expect(sizes[i]).toBeGreaterThanOrEqual(sizes[i - 1]);
		}
	});

	it("object-of-numbers size is monotonically non-decreasing as random entry count increases", () => {
		const counts = Array.from({ length: 15 }, () => Math.floor(Math.random() * 40)).sort((a, b) => a - b);
		const sizes = counts.map((c) => {
			const obj = {};
			for (let k = 0; k < c; k++) obj["k" + k] = k;
			return sizeofvar(obj);
		});
		for (let i = 1; i < sizes.length; i++) {
			expect(sizes[i]).toBeGreaterThanOrEqual(sizes[i - 1]);
		}
	});

	it("deterministic: calling twice with the same random input yields the same result", () => {
		for (let i = 0; i < 20; i++) {
			const s = randomString(50);
			expect(sizeofvar(s)).toBe(sizeofvar(s));
			const n = Math.random() * Number.MAX_SAFE_INTEGER;
			expect(sizeofvar(n)).toBe(sizeofvar(n));
		}
	});
});

describe("sizeofvar: random recursive/nested structures don't throw and stay finite", () => {
	function randomLeaf() {
		const pool = [true, false, 1, -1, 3000000000, "x", "", 0, undefined];
		return pool[Math.floor(Math.random() * pool.length)];
	}

	function randomTree(depth) {
		if (depth <= 0) return randomLeaf();
		const kind = Math.floor(Math.random() * 3);
		if (kind === 0) return randomLeaf();
		if (kind === 1) {
			const len = Math.floor(Math.random() * 4);
			return Array.from({ length: len }, () => randomTree(depth - 1));
		}
		const count = Math.floor(Math.random() * 4);
		const obj = {};
		for (let k = 0; k < count; k++) obj["k" + k] = randomTree(depth - 1);
		return obj;
	}

	it("random nested structures up to depth 4 always produce a finite number", () => {
		for (let i = 0; i < 30; i++) {
			const tree = randomTree(4);
			let result;
			expect(() => {
				result = sizeofvar(tree);
			}).not.toThrow();
			expect(typeof result).toBe("number");
			expect(Number.isFinite(result)).toBe(true);
		}
	});
});
