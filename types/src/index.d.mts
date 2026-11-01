export default sizeofvar;
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
export function sizeofvar(object: any, level?: number, from_array?: boolean): number;
