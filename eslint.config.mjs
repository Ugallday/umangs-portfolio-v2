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
  // Static media (diagrams, logos) imported through next/image. Leaf-only:
  // nothing imports out of it, so it carries no dependency direction risk.
  { type: "assets", pattern: "src/assets/**" },
];

/**
 * Global ignores. This has to be its own config object containing *only*
 * `ignores` — listing them next to `files` in the config below would only
 * filter that one config's matches, leaving build output to be linted with no
 * config at all (which surfaces as "rule definition not found" on the inline
 * eslint-disable comments inside bundled dependencies).
 */
const globalIgnores = {
  ignores: [".next/**", "node_modules/**", "coverage/**", "playwright-report/**"],
};

/**
 * The Next plugin is registered with no `files` restriction, deliberately.
 *
 * `next build` runs its own lint check, and detects the plugin by resolving
 * the ESLint config for `eslint.config.mjs` and `package.json` — paths that
 * match none of baseConfig's globs. Registering the plugin only under
 * `src/**` therefore made every build report "The Next.js plugin was not
 * detected in your ESLint configuration" and skip its rules.
 *
 * Registering a plugin costs nothing on its own: it supplies rules, it does
 * not enable them. The rules stay scoped to source in baseConfig below.
 */
const nextPluginRegistration = {
  plugins: { "@next/next": nextPlugin },
  // `rules` is set explicitly because once Next finds the plugin it reads the
  // resolved rules straight into Object.entries(). With no rules key anywhere
  // in scope that value is undefined, and the build fails with "Cannot convert
  // undefined or null to object" instead of linting. An empty object is enough.
  rules: {},
};

const baseConfig = {
  files: ["src/**/*.{ts,tsx}", "tests/**/*.{ts,tsx}"],
  ...js.configs.recommended,
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    "@typescript-eslint": tsPlugin,
    "jsx-a11y": jsxA11y,
    boundaries,
  },
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
          {
            from: "app",
            allow: [
              "features",
              "components",
              "core-application",
              "core-domain",
              "config",
              "assets",
            ],
          },
          {
            from: "features",
            allow: [
              "components",
              "core-application",
              "core-domain",
              "core-contracts",
              "core-infrastructure",
              "core-utils",
              "config",
              "assets",
            ],
          },
          { from: "components", allow: ["components", "core-utils", "config", "assets"] },
          { from: "assets", allow: [] },
          { from: "core-application", allow: ["core-domain", "core-contracts"] },
          { from: "core-infrastructure", allow: ["core-domain", "core-contracts", "core-utils"] },
          { from: "core-domain", allow: [] },
          { from: "core-contracts", allow: ["core-domain"] },
          { from: "core-utils", allow: [] },
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
    // core/* must never depend on React or Next — this is what keeps it
    // genuinely extractable into a future package.
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["react", "react-dom", "next", "next/*"],
            message: "core/ must stay framework-independent.",
          },
        ],
      },
    ],
  },
};

export default [globalIgnores, nextPluginRegistration, baseConfig, coreOnlyConfig];
