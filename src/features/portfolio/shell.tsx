import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { SocialLink } from "@/components/ui/social-link";
import { footerClosingStatement } from "@/features/portfolio/content";
import { siteConfig } from "@/config/site";

const ICON = "h-[18px] w-[18px]";

/**
 * Icon-only, so no raw URLs render. Each entry's label is the accessible name
 * and the tooltip text. Socials hold a bare address for email; the rest are
 * already URLs.
 */
const footerLinks = [
  {
    label: "GitHub",
    href: siteConfig.socials.github,
    icon: <Github className={ICON} aria-hidden="true" />,
  },
  {
    label: "LinkedIn",
    href: siteConfig.socials.linkedin,
    icon: <Linkedin className={ICON} aria-hidden="true" />,
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.socials.email}`,
    icon: <Mail className={ICON} aria-hidden="true" />,
  },
] as const;

export function SiteShell({ children }: { readonly children: React.ReactNode }): React.JSX.Element {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main id="main-content">{children}</main>
      <footer data-print-hide className="border-border-subtle border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 sm:py-12 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)]">
            <div className="space-y-4">
              <p className="text-text-muted text-xs tracking-[0.1em] uppercase">Footer</p>
              <p className="text-text-secondary max-w-2xl text-lg leading-8">
                {footerClosingStatement}
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <p className="text-text-muted text-xs tracking-[0.1em] uppercase">Elsewhere</p>
              <nav aria-label="Social links" className="flex flex-wrap gap-3">
                {footerLinks.map(({ label, href, icon }) => (
                  <SocialLink key={label} href={href} label={label}>
                    {icon}
                  </SocialLink>
                ))}
              </nav>
            </div>
          </div>
          <div className="border-border-subtle text-text-muted flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs tracking-[0.09em] uppercase">
            <span>Dark-first, type-driven, MDX-backed</span>
            <nav aria-label="More" className="flex flex-wrap items-center gap-5">
              {siteConfig.footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-text-primary transition"
                >
                  {item.label}
                </Link>
              ))}
              <span>{siteConfig.location}</span>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
