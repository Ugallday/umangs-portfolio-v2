import Link from "next/link";

import { footerClosingStatement } from "@/features/portfolio/content";
import { siteConfig } from "@/config/site";

function HeaderNav(): React.JSX.Element {
  return (
    <nav
      aria-label="Primary"
      className="text-text-secondary flex flex-wrap items-center justify-end gap-x-5 gap-y-3 text-sm"
    >
      {siteConfig.nav.map((item) => (
        <Link key={item.label} href={item.href} className="hover:text-text-primary transition">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function SiteShell({ children }: { readonly children: React.ReactNode }): React.JSX.Element {
  return (
    <div className="min-h-screen">
      <div className="border-border-subtle sticky top-0 z-40 border-b bg-[color:var(--surface-base)]/82 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
          <Link
            href="/"
            className="text-text-primary text-sm font-medium tracking-[0.28em] uppercase"
          >
            {siteConfig.shortName}
          </Link>
          <div className="hidden md:block">
            <HeaderNav />
          </div>
        </div>
      </div>
      <main>{children}</main>
      <footer className="border-border-subtle border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 sm:py-12 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)]">
            <div className="space-y-4">
              <p className="text-text-muted text-xs tracking-[0.3em] uppercase">Footer</p>
              <p className="text-text-secondary max-w-2xl text-lg leading-8">
                {footerClosingStatement}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {Object.entries(siteConfig.socials).map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="fold-panel fold-hover text-text-secondary hover:text-text-primary rounded-2xl px-4 py-4 text-sm transition"
                >
                  <span className="text-text-muted block text-xs tracking-[0.24em] uppercase">
                    {label}
                  </span>
                  <span className="mt-2 block break-all">{href}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="border-border-subtle text-text-muted flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs tracking-[0.28em] uppercase">
            <span>Dark-first, type-driven, MDX-backed</span>
            <span>Built for the long run</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
