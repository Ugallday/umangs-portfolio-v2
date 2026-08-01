import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";
import jsxA11y from "eslint-plugin-jsx-a11y";
import boundaries from "eslint-plugin-boundaries";

/**
 * Element types map directly onto the layered architecture from
 * docs/adr/0003-package-ready-layering-without-monorepo.md.
 * Dependency direction is enforced below: app -> features -> components -> core,
 * with core forbidden from ever importing react/next or anything above it.
 */
const boundaryElements = [
  { type: "app", pattern: "src/app/**" },
  { type: "features", pattern: "src/features/*/**", capture: ["feature"] },
  { type: "components", pattern: "src/components/**" },
  {
    type: "core-domain",
    pattern: "src/core/domain/**",
  },
  {
    type: "core-application",
    pattern: "src/core/application/**",
  },
  {
    type: "core-contracts",
    pattern: "src/core/contracts/**",
  },
  {
    type: "core-infrastructure",
    pattern: "src/core/infrastructure/**",
  },
  { type: "core-utils", pattern: "src/core/utils/**" },
  { type: "config", pattern: "src/config/**" },
];

const baseConfig = {
  ignores: [".next/**", "node_modules/**", "coverage/**", "playwright-report/**"],
  ...js.configs.recommended,
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: { "@typescript-eslint": tsPlugin, "@next/next": nextPlugin, "jsx-a11y": jsxA11y, boundaries },
  settings: {
    "boundaries/elements": boundaryElements,
    "boundaries/ignore": ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts"],
  },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs["core-web-vitals"].rules,
    ...jsxA11y.configs.recommended.rules,

    // --- Architectural boundaries (the enforcement Phase 1 promised) ---
    "boundaries/element-types": [
      "error",
      {
        default: "disallow",
        rules: [
          { from: "app", allow: ["features", "components", "core-application", "core-domain", "config"] },
          { from: "features", allow: ["components", "core-application", "core-domain", "core-contracts", "core-infrastructure", "core-utils", "config"] },
          { from: "components", allow: ["components", "core-utils", "config"] },
          { from: "core-application", allow: ["core-domain", "core-contracts"] },
          { from: "core-infrastructure", allow: ["core-domain", "core-contracts", "core-utils"] },
          { from: "core-domain", allow: [] },
          { from: "core-contracts", allow: ["core-domain"] },
          { from: "core-utils", allow: [] },
        ],
      },
    ],

    // core/* must never depend on React or Next — this is what keeps it
    // genuinely extractable into a future package.
    "no-restricted-imports": [
      "error",
      {
        paths: [
          { name: "react", message: "core/ must remain framework-independent. React belongs in components/ or features/." },
          { name: "next", message: "core/ must remain framework-independent." },
        ],
      },
    ],

    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
};

const coreOnlyConfig = {
  files: ["src/core/**/*.ts"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          { group: ["react", "react-dom", "next", "next/*"], message: "core/ must stay framework-independent." },
        ],
      },
    ],
  },
};

export default [baseConfig, coreOnlyConfig];
