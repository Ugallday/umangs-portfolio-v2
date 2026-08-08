import { describe, expect, it } from "vitest";

import { getSchemaModel } from "@/features/projects/schema/model";

const SLUGS = ["vat-billing-system", "travora"] as const;

describe("getSchemaModel", () => {
  it("returns undefined for a project with no schema registered", () => {
    expect(getSchemaModel("nsa-travels")).toBeUndefined();
    expect(getSchemaModel("nope")).toBeUndefined();
  });

  it.each(SLUGS)("returns the model registered under %s", (slug) => {
    expect(getSchemaModel(slug)?.slug).toBe(slug);
  });
});

describe.each(SLUGS)("%s schema", (slug) => {
  const model = getSchemaModel(slug);

  it("is registered", () => {
    expect(model).toBeDefined();
  });

  it("gives every table a unique id and at least one column", () => {
    const ids = model!.tables.map((table) => table.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const table of model!.tables) {
      expect(table.columns.length, table.id).toBeGreaterThan(0);
      expect(table.role, table.id).toBeTruthy();
      expect(table.detail, table.id).toBeTruthy();
    }
  });

  // The scene resolves a relation's endpoints by id and silently draws nothing
  // when one is missing, so a typo here would vanish from the diagram rather
  // than fail. This is the check that makes that impossible.
  it("only relates tables that exist", () => {
    const ids = new Set(model!.tables.map((table) => table.id));

    for (const relation of model!.relations) {
      expect(ids.has(relation.from), `${relation.from} (from)`).toBe(true);
      expect(ids.has(relation.to), `${relation.to} (to)`).toBe(true);
      expect(relation.label).toBeTruthy();
    }
  });

  it("has exactly one root table, raised above the rest", () => {
    const roots = model!.tables.filter((table) => table.emphasis === "root");
    expect(roots).toHaveLength(1);

    const others = model!.tables.filter((table) => table.emphasis !== "root");
    for (const table of others) {
      expect(table.position[1], table.id).toBeLessThan(roots[0]!.position[1]);
    }
  });

  it("marks exactly one table as the core one", () => {
    expect(model!.tables.filter((table) => table.emphasis === "core")).toHaveLength(1);
  });

  it("gives every table a positive footprint so no slab renders inside out", () => {
    for (const table of model!.tables) {
      const [width, depth] = table.footprint;
      expect(width, table.id).toBeGreaterThan(0);
      expect(depth, table.id).toBeGreaterThan(0);
    }
  });

  it("documents every relation kind it actually uses in the legend", () => {
    const used = new Set(model!.relations.map((relation) => relation.kind));
    const documented = new Set(model!.legend.map((entry) => entry.kind));

    for (const kind of used) {
      expect(documented.has(kind), `${kind} is drawn but not in the legend`).toBe(true);
    }
  });

  it("names the file it was transcribed from", () => {
    expect(model!.source).toMatch(/schema\.sql$/);
  });
});
