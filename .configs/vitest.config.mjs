/**
 *
 *	@Project: @cldmv/sizeofvar
 *	@Filename: /.configs/vitest.config.mjs
 *	@Date: 2026-08-01T23:22:31-07:00 (1785651751)
 *	@Author: Nate Corcoran <CLDMV>
 *	@Email: <Shinrai@users.noreply.github.com>
 *	-----
 *	@Last modified by: Nate Corcoran <CLDMV> (Shinrai@users.noreply.github.com)
 *	@Last modified time: 2026-10-02T11:30:28-07:00 (1790965828)
 *	-----
 *	@Copyright: Copyright (c) 2013-2026 Catalyzed Motivation Inc. All rights reserved.
 *
 */

import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Anchor the project root to the package directory so include/exclude work no
// matter what cwd vitest is invoked from.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export default defineConfig({
	root,
	test: {
		include: ["tests/**/*.test.vitest.mjs"],
		exclude: ["node_modules"],
		environment: "node",
		testTimeout: 30000,
		// "dot" keeps non-interactive CI logs to one character per test file. The
		// final "Test Files X passed" / "Tests Y passed" summary is unaffected.
		reporters: ["dot"],
		coverage: {
			provider: "v8",
			// Single-file library — the only source under test is sizeofvar.js.
			include: ["sizeofvar.js"],
			exclude: ["**/*.json", "tests/**", "test/**"],
			reporter: ["text", "html", "json-summary", "json"]
		}
	}
});
