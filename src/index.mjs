/**
 *
 *	@Project: @cldmv/sizeofvar
 *	@Filename: /src/index.mjs
 *	@Date: 2018-03-01T23:13:55-08:00 (1519974835)
 *	@Author: Nate Corcoran <CLDMV>
 *	@Email: <Shinrai@users.noreply.github.com>
 *	-----
 *	@Last modified by: Nate Corcoran <CLDMV> (Shinrai@users.noreply.github.com)
 *	@Last modified time: 2026-10-02T11:30:30-07:00 (1790965830)
 *	-----
 *	@Copyright: Copyright (c) 2013-2026 Catalyzed Motivation Inc. All rights reserved.
 *
 */

/**
 * @fileoverview Public entry point for @cldmv/sizeofvar: estimates how much memory a JavaScript value takes when it is
 * created or assigned.
 *
 * @module @cldmv/sizeofvar
 */

/**
 * Estimates the memory a value uses, in bytes.
 *
 * @param {*} object - The value to measure: a boolean, number, string, array or plain object (nested values are
 *   measured recursively).
 * @param {number} [level] - Nesting depth; internal, leave it out when calling.
 * @param {boolean} [from_array] - Whether the value is an array element; internal, leave it out when calling.
 * @returns {number} The estimated size in bytes (0 for types it doesn't measure, such as functions or undefined).
 */
function sizeofvar(object, level, from_array) {
	/** @type {string} */
	var type;
	if (typeof level == "undefined") {
		level = 0;
	}
	if (typeof from_array == "undefined") {
		from_array = false;
	}
	var size = 0;
	if (typeof object != "object") {
		type = typeof object;
	} else {
		type = Object.prototype.toString.call(object);
		if (type.includes("Array")) {
			type = "array";
		} else {
			type = "object";
		}
	}
	switch (type) {
		case "boolean":
			size += 152;
			// size += 152;
			break;
		case "number":
			var bit32 = (256 * 256 * 256 * 256) / 2;
			var offset = 16;
			if (level != 0 && !from_array) {
				offset = 32;
			}
			size += 152;
			// size += (object>0?168:152);
			size += object >= bit32 ? offset : 0;
			// size += (Math.ceil(object / bit32) * 16);
			if (from_array) {
				size += 8;
			}
			break;
		case "string":
			size += 144;
			// size += 152 + (object.length>0?24:0) + (Math.ceil(object.length / 8) * 8);
			offset = 24;
			if (level == 0) {
				size += 8;
			}
			size += (object.length > 0 ? offset : 0) + Math.ceil(object.length / 8) * 8;
			break;
		case "object":
			if (level == 0) {
				size += 208;
			} else {
				size += 56;
			}
			// for (var key in objects[index]){
			var c = 0;
			Object.entries(object).forEach(([_, o]) => {
				switch (typeof o) {
					case "boolean":
						size -= 152;
						break;
					case "number":
						size -= 152;
						break;
					case "string":
						size -= 144;
						break;
				}
				size += sizeofvar(o, level + 1);
				// console.log(key);
				// console.log(typeof o);
				// console.log(o);
				c += 1;
			});
			if (c > 0) {
				c -= 1;
				if (c > 0) {
					size += 40;
					size += Math.ceil(c / 3) * 24;
				}
			}
			break;
		case "array":
			if (level == 0) {
				size += 184;
			} else {
				size += 32;
			}
			size += object.length > 0 ? 16 : 0;
			object.forEach(function (o) {
				switch (typeof o) {
					case "boolean":
						size -= 144;
						// if (object.length > 0) {
						// size -= 8;
						// }
						break;
					case "number":
						size -= 152;
						break;
					case "string":
						size -= 136;
						break;
				}
				size += sizeofvar(o, level + 1, true);
			});
			break;
	}
	return size;
}

export default sizeofvar;
export { sizeofvar };
