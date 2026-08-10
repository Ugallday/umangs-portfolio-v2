/**
 * Copy for the writing pages.
 *
 * Lives in the feature rather than in features/portfolio/content.ts because
 * the boundaries rule in eslint.config.mjs forbids one feature importing
 * another — app/ composes them, features do not reach sideways.
 */
export const writingLead =
  "Notes on things that broke, decisions with trade-offs I can articulate, measurements I produced, and the parts of the travel and accounting domain that software usually gets wrong. One a month, and none of it filler.";

/**
 * Shown when nothing is published. The site's background page already says it
 * would rather show a gap than invent a link; an empty writing index is the
 * same principle, so it says what is missing instead of padding itself with
 * placeholder posts.
 */
export const writingEmptyState = {
  heading: "Nothing published here yet.",
  body: "I would rather this page be honestly empty than padded out. The first piece is drafted and named below; it goes up when it is finished and not before.",
  nextUpLabel: "First post",
  nextUpTitle: "How I test a double-entry ledger for correctness under concurrent offline sync.",
  nextUpBody:
    "Three app instances against an in-memory PostgREST stand-in, what each one is allowed to see, and what happens to a voucher number when two of them post while offline.",
} as const;

export const writingTopicsIntro = "What this page is for";

export const writingTopics = [
  "Things that broke, and why",
  "Decisions with trade-offs I can articulate",
  "Measurements I actually produced",
  "Domain translation — what a BSP settlement file is, and why software gets it wrong",
] as const;
