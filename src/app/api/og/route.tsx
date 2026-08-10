import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { heroHeadline, heroProofPoints } from "@/features/portfolio/content";

const SIZE = { width: 1200, height: 630 };

/** Long titles have to shrink or they overflow the card rather than wrapping. */
function headlineSize(title: string): number {
  if (title.length > 78) return 46;
  if (title.length > 48) return 56;
  return 68;
}

/**
 * Share-card image.
 *
 * Generated rather than exported as a PNG so shipping never depends on
 * somebody remembering to re-cut an asset. The headline is read from
 * `heroHeadline` when no title is passed — it used to be hardcoded here, and
 * duly went stale the first time the hero was rewritten, which is exactly the
 * drift this route was supposed to prevent.
 *
 * `buildPageMetadata` appends `?title=` for every route except the home page,
 * so each shared link renders its own card.
 */
export function GET(request: Request): ImageResponse {
  const title = new URL(request.url).searchParams.get("title")?.trim() || heroHeadline;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(140deg, #16130f 0%, #0a0a0b 55%)",
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#8a8378",
        }}
      >
        <span>{siteConfig.name}</span>
        <span>{siteConfig.location}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            display: "flex",
            fontSize: headlineSize(title),
            lineHeight: 1.05,
            letterSpacing: -2,
            color: "#faf8f5",
            maxWidth: 940,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 4, background: "#d9a25c" }} />
          <div style={{ display: "flex", fontSize: 26, color: "#b8b0a4" }}>
            {heroProofPoints.join(" · ")}
          </div>
        </div>
      </div>
    </div>,
    SIZE,
  );
}
