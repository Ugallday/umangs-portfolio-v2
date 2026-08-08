import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

const SIZE = { width: 1200, height: 630 };

/**
 * Share-card image. Generated rather than a static asset so it can never drift
 * out of sync with siteConfig, and so shipping does not depend on someone
 * remembering to export a PNG. `buildPageMetadata` points every route's
 * openGraph.images here.
 */
export function GET(): ImageResponse {
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
            fontSize: 68,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: "#faf8f5",
            maxWidth: 940,
          }}
        >
          I didn&apos;t wait for an internship. I found a business that needed fixing.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 4, background: "#d9a25c" }} />
          <div style={{ fontSize: 28, color: "#b8b0a4" }}>
            Systems fixer · BSc CSIT · Travel operations
          </div>
        </div>
      </div>
    </div>,
    SIZE,
  );
}
