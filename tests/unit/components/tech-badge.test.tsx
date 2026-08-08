import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BrandMark } from "@/components/ui/brand-mark";
import { TechBadge } from "@/components/ui/tech-badge";

describe("TechBadge", () => {
  it("renders the label and the resolved brand mark", () => {
    const { container } = render(<TechBadge label="PostgreSQL" />);

    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("exposes the brand colour as a custom property for hover", () => {
    const { container } = render(<TechBadge label="React" />);

    expect(container.firstElementChild?.getAttribute("style")).toContain("--brand");
  });

  // The mark is decorative — the label beside it already names the technology,
  // so a second accessible name would make every badge read twice.
  it("hides the mark from assistive technology", () => {
    const { container } = render(<TechBadge label="React" />);

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("falls back to initials when nothing is vendored for the label", () => {
    // One letter per word, so "VS Code" reads VC — not the first two letters.
    const { container } = render(<TechBadge label="VS Code" />);

    expect(screen.getByText("VC")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeNull();
    expect(container.firstElementChild?.getAttribute("style")).toBeNull();
  });

  it("takes the first two characters of a single-word label", () => {
    render(<TechBadge label="Canva" />);
    expect(screen.getByText("CA")).toBeInTheDocument();
  });

  it("ignores bracketed qualifiers when cutting initials", () => {
    render(<TechBadge label="SQL (advanced)" />);
    expect(screen.getByText("SA")).toBeInTheDocument();
  });

  it("honours an explicit glyph id over the resolved one", () => {
    const { container } = render(<TechBadge label="My Editor" glyphId="figma" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});

describe("BrandMark", () => {
  it("names the brand for assistive technology, since no label sits beside it", () => {
    render(<BrandMark label="Dota 2" />);
    expect(screen.getByRole("img", { name: /dota/i })).toBeInTheDocument();
  });

  it("renders nothing rather than an empty tile when no mark exists", () => {
    const { container } = render(<BrandMark label="Minesweeper" />);
    expect(container).toBeEmptyDOMElement();
  });
});
