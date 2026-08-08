/**
 * Turns a section's slug into something written for a reader.
 *
 * The case study pages were printing the raw frontmatter id as the eyebrow,
 * so visitors saw WHAT-WAS-BUILT and WHATS-NEXT — kebab-case identifiers
 * leaking out of the content model and onto the page.
 *
 * Most ids humanise cleanly by rule. The map holds only the ones that do not:
 * acronyms that must stay upper case, an apostrophe the slug cannot carry, a
 * compound that keeps its hyphen, and `hook`, which is a writing term rather
 * than something a reader should be shown.
 */
const OVERRIDES: Readonly<Record<string, string>> = {
  hook: "Overview",
  ai: "AI",
  ocr: "OCR",
  "whats-next": "What's next",
  "multi-tenant": "Multi-tenant",
};

export function sectionLabel(id: string): string {
  const override = OVERRIDES[id];
  if (override !== undefined) return override;

  const words = id.replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}
