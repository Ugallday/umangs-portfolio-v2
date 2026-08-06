import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    // tests/e2e is Playwright's; vitest would otherwise try to collect those
    // specs and fail on test.describe().
    include: ["tests/unit/**/*.test.{ts,tsx}", "src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      // Without this, coverage instruments the whole repo — including .next/
      // build output and the coverage report's own HTML. That inflated
      // statements to 93% off bundled vendor code while src/ went unmeasured,
      // which is worse than no gate at all: the number looked healthy and
      // meant nothing.
      include: ["src/**/*.{ts,tsx}"],
      thresholds: {
        // Repo-wide thresholds are flat keys. They were previously nested
        // under a `global: {}` object, which is Jest's syntax — Vitest read
        // "global" as a glob pattern, matched no files, and enforced nothing.
        // The 70/65 recorded there had never once been checked.
        //
        // These are the real numbers today, and they only go up. The view
        // layer (features/, components/) has no tests yet, which is what
        // keeps statements this low; raising the floor is the job of those
        // tests, not of editing this line downward.
        statements: 5,
        branches: 45,

        // Enforced as a CI gate, not aspirational — see ci.yml.
        // core/ carries the business logic and is held to a higher bar than
        // the overall repo average. Glob thresholds do work, and this is the
        // one that had been failing CI.
        "src/core/**": { statements: 90, branches: 85 },
      },
      exclude: ["**/*.d.ts", "src/app/**/layout.tsx", "src/app/**/page.tsx"],
    },
  },
  resolve: {
    alias: {
      "@/app": path.resolve(__dirname, "./src/app"),
      "@/features": path.resolve(__dirname, "./src/features"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/core": path.resolve(__dirname, "./src/core"),
      "@/config": path.resolve(__dirname, "./src/config"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
    },
  },
});
