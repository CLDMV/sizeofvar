/**
 *
 *	@Project: @cldmv/sizeofvar
 *	@Filename: /.configs/vitest.config.mjs
 *	@Date: 2026-08-01T23:22:31-07:00 (1785651751)
 *	@Author: Nate Corcoran <CLDMV>
 *	@Email: <Shinrai@users.noreply.github.com>
 *	-----
 *	@Last modified by: Nate Corcoran <CLDMV> (Shinrai@users.noreply.github.com)
 *	@Last modified time: 2026-11-01T12:09:56-08:00 (1793563796)
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
	resolve: {
		// Replaces the defaults, so keep the usual ones alongside the package's own
		// condition (which routes the "." export to src/).
		conditions: ["sizeofvar-dev", "module", "browser", "development|production"]
	},
	ssr: {
		// Vitest often goes through the SSR resolve pipeline even in node tests.
		resolve: {
			conditions: ["sizeofvar-dev", "node", "development|production"]
		}
	},
	test: {
		include: ["tests/**/*.test.vitest.mjs"],
		exclude: ["node_modules"],
		environment: "node",
		testTimeout: 30000,
		// Workers get the condition on their node CLI (execArgv), so Node's own resolver
		// loads src/ too.
		nodeOptions: ["--conditions=sizeofvar-dev"],
		// "dot" keeps non-interactive CI logs to one character per test file. The
		// final "Test Files X passed" / "Tests Y passed" summary is unaffected.
		reporters: ["dot"],
		coverage: {
			provider: "v8",
			include: ["src/**/*.mjs"],
			exclude: ["**/*.json", "tests/**", "test/**"],
			reporter: ["text", "html", "json-summary", "json"]
		}
	}
});
