/**
 *
 *	@Project: @cldmv/sizeofvar
 *	@Filename: /.configs/vitest.config.mjs
 *	@Date: 2026-08-01T23:22:31-07:00 (1785651751)
 *	@Author: Nate Corcoran <CLDMV>
 *	@Email: <Shinrai@users.noreply.github.com>
 *	-----
 *	@Last modified by: Nate Corcoran <CLDMV> (Shinrai@users.noreply.github.com)
 *	@Last modified time: 2026-11-07T22:11:32-08:00 (1794118292)
 *	-----
 *	@Copyright: Copyright (c) 2013-2026 Catalyzed Motivation Inc. All rights reserved.
 *
 */

import { defineConfig, mergeConfig } from "vitest/config";
import { devCondition } from "@cldmv/configs/vitest.config.mjs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Anchor the project root to the package directory so include/exclude work no
// matter what cwd vitest is invoked from.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// `--mode=dist` (npm run test:dist) leaves the -dev condition off, so tests that import "@cldmv/sizeofvar" by name run
// against the build in dist/ instead of src/.
export default defineConfig(({ mode }) =>
	mergeConfig(
		mode === "dist" ? {} : devCondition({ root }),
		defineConfig({
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
					include: ["src/**/*.mjs"],
					exclude: ["**/*.json", "tests/**", "test/**"],
					reporter: ["text", "html", "json-summary", "json"]
				}
			}
		})
	)
);
