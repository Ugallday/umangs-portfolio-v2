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
      thresholds: {
        // Enforced as a CI gate, not aspirational — see ci.yml.
        // core/ carries the business logic and is held to a higher bar
        // than the overall repo average.
        "src/core/**": { statements: 90, branches: 85 },
        global: { statements: 70, branches: 65 },
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
