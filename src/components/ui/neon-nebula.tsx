"use client";

/**
 * AsciiArt - "Neon Nebula", made with the 21st.dev ASCII editor.
 *
 * Originally referenced 21st.dev's own CDN (assets.21st.dev) directly.
 * This site's CSP (default-src 'self') correctly blocked that as an
 * untrusted third-party origin - so the video and poster were downloaded
 * once and are now self-hosted under /public/videos/, served same-origin.
 * No CSP change needed, and it no longer depends on a third-party asset
 * host that could rename or remove the file without notice.
 *
 * Remix the source recipe (styles, animation, palette) in the editor:
 * https://21st.dev/community/ascii/editor?from=0d9813a1-8a52-4899-912d-4975bc123c7c
 */
export function AsciiArt({ className }: { className?: string }) {
  return (
    <video
      className={className}
      src="/videos/neon-nebula.mp4"
      poster="/videos/neon-nebula-poster.webp"
      autoPlay
      loop
      muted
      playsInline
      aria-label="Neon Nebula - animated ASCII art"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
}
