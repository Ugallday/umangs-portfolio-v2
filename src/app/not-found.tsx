import Link from "next/link";

import { siteConfig } from "@/config/site";
import { SiteShell } from "@/features/portfolio/shell";
import { actionClass } from "@/components/ui/action";

export default function NotFound(): React.JSX.Element {
  return (
    <SiteShell>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-10 px-6 py-24 lg:px-8 lg:py-32">
        <div className="max-w-2xl space-y-6">
          <p className="text-text-muted text-xs tracking-[0.32em] uppercase">404</p>
          <h1 className="text-text-primary text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            This fold doesn&apos;t exist.
          </h1>
          <p className="text-text-secondary text-lg leading-8">
            The page you&apos;re looking for isn&apos;t here — it may have moved, or it may never
            have been folded in the first place. Everything else is one link away.
          </p>
          <Link href="/" className={actionClass({ size: "md" })}>
            Back to home
          </Link>
        </div>
        <nav aria-label="Site sections" className="w-full">
          <p className="text-text-muted text-xs tracking-[0.24em] uppercase">Or jump to</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="fold-panel fold-hover text-text-secondary hover:text-text-primary rounded-2xl px-4 py-4 text-sm transition"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </SiteShell>
  );
}
