/**
 *
 *	@Project: @cldmv/sizeofvar
 *	@Filename: /tsup.config.mjs
 *	@Date: 2026-11-01T12:07:23-08:00 (1793563643)
 *	@Author: Nate Corcoran <CLDMV>
 *	@Email: <Shinrai@users.noreply.github.com>
 *	-----
 *	@Last modified by: Nate Corcoran <CLDMV> (Shinrai@users.noreply.github.com)
 *	@Last modified time: 2026-11-01T16:30:33-08:00 (1793579433)
 *	-----
 *	@Copyright: Copyright (c) 2013-2026 Catalyzed Motivation Inc. All rights reserved.
 *
 */

/**
 * @fileoverview Bundler config: produces the published dist/ output from source.
 *
 *  - dist/index.mjs: tsup bundle of src/index.mjs (minified, names kept).
 *  - dist/index.cjs: the thin, hand-written CJS entry src/index.cjs, copied verbatim by onSuccess below and never
 *    transformed by esbuild. It `require()`s ./index.mjs, which Node loads synchronously because the module graph has
 *    no top-level await.
 *
 * Sourcemaps are generated for local debugging but excluded from the published tarball via package.json's `files`
 * negation entry.
 */
import { copyFileSync } from "node:fs";
import { defineConfig } from "tsup";

export default defineConfig({
	entry: { index: "src/index.mjs" },
	format: ["esm"],
	outDir: "dist",
	// engines.node is >=16.0.0; the build must not emit syntax newer than that.
	target: "node16",
	platform: "node",
	splitting: false,
	sourcemap: true,
	dts: false,
	minify: true,
	keepNames: true,
	removeNodeProtocol: false,
	clean: true,
	outExtension() {
		return { js: ".mjs" };
	},
	onSuccess() {
		copyFileSync("src/index.cjs", "dist/index.cjs");
	}
});
