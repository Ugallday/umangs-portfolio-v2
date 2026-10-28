"use client";

import { useState } from "react";

/**
 * The portfolio opens as an invitation, not a conventional homepage. This
 * keeps the cinematic first frame separate from the more information-dense
 * work that follows once a visitor chooses to enter.
 */
export function ExperienceGate({
  children,
}: {
  readonly children: React.ReactNode;
}): React.JSX.Element {
  const [hasEntered, setHasEntered] = useState(false);

  if (hasEntered) {
    return <>{children}</>;
  }

  return (
    <main className="experience-gate relative min-h-[100svh] overflow-hidden bg-black text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero-data-landscape.png)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.34)_0%,rgba(0,0,0,.06)_43%,rgba(0,0,0,.72)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(0,0,0,.34)_76%)]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col justify-between px-6 py-7 sm:px-10 sm:py-9 lg:px-14 lg:py-11">
        <div className="flex items-center justify-between gap-4 font-serif text-[0.64rem] tracking-[0.18em] text-white/75 uppercase sm:text-xs">
          <span>Umang Gupta // 2026</span>
          <span>System boot sequence</span>
        </div>

        <div className="mx-auto flex max-w-4xl flex-col items-center pb-[10vh] text-center">
          <p className="mb-5 font-serif text-[0.63rem] tracking-[0.2em] text-white/65 uppercase sm:text-xs">
            Data systems · applied research · real decisions
          </p>
          <h1 className="experience-name leading-[0.78] text-white">
            <span>Umang</span>
            <em>Gupta</em>
          </h1>
          <p className="mt-7 max-w-xl text-sm leading-7 text-white/75 sm:text-base sm:leading-7">
            Data warehousing, automation, and applied ML for systems people use to make decisions.
          </p>
          <button
            type="button"
            onClick={() => setHasEntered(true)}
            className="experience-enter mt-8 inline-flex min-h-12 items-center justify-center border border-white/45 px-8 font-serif text-[0.65rem] tracking-[0.18em] text-white uppercase transition hover:border-[var(--accent-default)] hover:bg-[color:var(--accent-default)] hover:text-black focus-visible:border-[var(--accent-default)] focus-visible:bg-[color:var(--accent-default)] focus-visible:text-black"
          >
            Begin the experience
          </button>
        </div>

        <div className="flex items-center justify-between gap-4 font-serif text-[0.6rem] tracking-[0.14em] text-white/55 uppercase sm:text-[0.68rem]">
          <span>© 2026 Umang Gupta</span>
          <span>Engineered for data</span>
        </div>
      </div>
    </main>
  );
}
