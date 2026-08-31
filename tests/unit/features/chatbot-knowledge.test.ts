import { describe, expect, it } from "vitest";

import { buildKnowledgeBase } from "@/features/chatbot/knowledge";
import { siteConfig } from "@/config/site";

/**
 * Runs against the real content module and the real content/projects
 * directory, same reasoning as mdx-project-repository.test.ts - this proves
 * the knowledge base actually assembles from what's currently live, not a
 * fixture that could silently drift from the real site.
 */
describe("buildKnowledgeBase", () => {
  it("includes the site owner's name and contact info", async () => {
    const knowledge = await buildKnowledgeBase();
    expect(knowledge).toContain(siteConfig.name);
    expect(knowledge).toContain(siteConfig.socials.github);
    expect(knowledge).toContain(siteConfig.socials.linkedin);
  });

  it("includes every published project by title", async () => {
    const knowledge = await buildKnowledgeBase();
    expect(knowledge).toContain("UTA Fleet Availability Data Warehouse");
    expect(knowledge).toContain("ObfuScope");
  });

  it("includes project slugs so the model can produce real links", async () => {
    const knowledge = await buildKnowledgeBase();
    expect(knowledge).toContain("/projects/uta-fleet-availability-warehouse");
  });

  it("is non-empty and reasonably substantial", async () => {
    const knowledge = await buildKnowledgeBase();
    expect(knowledge.length).toBeGreaterThan(500);
  });
});
