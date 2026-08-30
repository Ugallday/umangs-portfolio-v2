"use client";

/**
 * AsciiArt - "Neon Nebula", made with the 21st.dev ASCII editor and baked
 * to its exact rendered output (looping video + poster). Zero dependencies:
 * one <video> that fills its parent. Drop it behind or inside content:
 * <div className="relative h-96"><AsciiArt className="absolute inset-0" /></div>
 *
 * Unmodified from the pasted snippet - no project-specific token/import
 * fixes were needed here, since it's just a self-contained <video> with no
 * external color, utility, or alias dependencies.
 *
 * Remix the source recipe (styles, animation, palette) in the editor:
 * https://21st.dev/community/ascii/editor?from=0d9813a1-8a52-4899-912d-4975bc123c7c
 */
export function AsciiArt({ className }: { className?: string }) {
  return (
    <video
      className={className}
      src="https://assets.21st.dev/ascii-recipes/videos/user_3GfKZHMVrEGaZQLVz5Qufduwjfk/b1e07644-b9c3-4bf3-a409-44a1e95759db.mp4"
      poster="https://assets.21st.dev/ascii-recipes/thumbnails/user_3GfKZHMVrEGaZQLVz5Qufduwjfk/5a2bb8d2-7315-4c9d-a2ff-0b1bc615c76c.webp"
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
