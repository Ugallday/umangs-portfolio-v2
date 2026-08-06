import { describe, expect, it } from "vitest";

import { cn } from "@/core/utils/cn";

describe("cn", () => {
  it("joins plain class names", () => {
    expect(cn("rounded-2xl", "border")).toBe("rounded-2xl border");
  });

  it("drops falsy values so conditional classes can be inlined", () => {
    expect(cn("border", false, null, undefined, "p-4")).toBe("border p-4");
  });

  /**
   * The reason this helper exists: a caller's override has to win outright
   * rather than both classes landing in the list and the cascade deciding.
   */
  it("lets a later Tailwind class override an earlier one in the same group", () => {
    expect(cn("p-4", "p-8")).toBe("p-8");
    expect(cn("text-text-muted", "text-text-primary")).toBe("text-text-primary");
  });

  it("keeps classes from different groups side by side", () => {
    expect(cn("p-4", "text-sm")).toBe("p-4 text-sm");
  });

  it("returns an empty string when given nothing", () => {
    expect(cn()).toBe("");
  });
});
