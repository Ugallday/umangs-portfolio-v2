"use client";

import { useState } from "react";

import type { ProjectVideo } from "@/core/domain/entities/project.entity";

/**
 * A recorded walkthrough, loaded only when somebody asks for it.
 *
 * The panel starts as a facade — the site's own stock, rule and type, with a
 * play control. No YouTube iframe exists in the document until the control is
 * pressed, so a page carrying a walkthrough costs a visitor who never plays it
 * nothing: no third-party script, no cookie, no ~700kB of player.
 *
 * The facade is drawn rather than a thumbnail. YouTube's thumbnail is a remote
 * image, and this site deliberately authorises no remote image host — the
 * poster would have been the only exception, in exchange for a frame nobody
 * watches. Once playing, the embed uses youtube-nocookie.com.
 */
export function VideoPanel({ video }: { readonly video: ProjectVideo }): React.JSX.Element {
  const [playing, setPlaying] = useState(false);

  const ratio = video.aspect === "4:3" ? "4 / 3" : "16 / 9";

  return (
    <figure className="fold-panel rounded-3xl p-6 sm:p-8">
      <p className="text-text-muted text-xs tracking-[0.08em] uppercase">Walkthrough</p>

      <div
        className="border-border-subtle bg-surface-overlay relative mt-4 overflow-hidden rounded-2xl border"
        style={{ aspectRatio: ratio }}
      >
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="focus-visible:outline-accent-default group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-5 focus-visible:outline-2 focus-visible:outline-offset-[-4px]"
          >
            <VideoFacadeBackdrop />

            <span className="border-border-strong bg-surface-raised group-hover:border-accent-default relative flex h-16 w-16 items-center justify-center rounded-full border transition-colors sm:h-20 sm:w-20">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="fill-accent-default ml-1 h-6 w-6 sm:h-7 sm:w-7"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>

            <span className="relative max-w-md px-6 text-center">
              <span className="text-text-primary block text-base font-medium">{video.title}</span>
              <span className="text-text-muted mt-1 block text-xs tracking-[0.06em] uppercase">
                Play on YouTube — nothing loads until you press it
              </span>
            </span>
          </button>
        )}
      </div>

      <figcaption className="text-text-muted mt-4 text-sm leading-6">{video.caption}</figcaption>
    </figure>
  );
}

/**
 * The facade's ground: two hairline rules and a sparse frame grid, so the empty
 * player reads as a strip of film rather than as an image that failed to load.
 */
function VideoFacadeBackdrop(): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <g className="stroke-border-subtle" strokeWidth="0.5">
        <path d="M0 22 H320" />
        <path d="M0 158 H320" />
      </g>
      <g className="fill-border-subtle" opacity="0.55">
        {Array.from({ length: 16 }, (_unused, index) => (
          <rect key={index} x={6 + index * 20} y={7} width="10" height="8" rx="1.5" />
        ))}
        {Array.from({ length: 16 }, (_unused, index) => (
          <rect key={index} x={6 + index * 20} y={165} width="10" height="8" rx="1.5" />
        ))}
      </g>
    </svg>
  );
}
