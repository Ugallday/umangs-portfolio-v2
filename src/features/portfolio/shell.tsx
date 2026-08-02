import Link from "next/link";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { SocialLink } from "@/components/ui/social-link";
import { WhatsAppGlyph } from "@/components/ui/whatsapp-glyph";
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
    label: "Instagram",
    href: siteConfig.socials.instagram,
    icon: <Instagram className={ICON} aria-hidden="true" />,
  },
  {
    label: "WhatsApp",
    href: siteConfig.whatsapp.href,
    icon: <WhatsAppGlyph className={ICON} />,
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.socials.email}`,
    icon: <Mail className={ICON} aria-hidden="true" />,
  },
] as const;

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
            <div className="flex flex-col gap-4 lg:items-end">
              <p className="text-text-muted text-xs tracking-[0.3em] uppercase">Elsewhere</p>
              <nav aria-label="Social links" className="flex flex-wrap gap-3">
                {footerLinks.map(({ label, href, icon }) => (
                  <SocialLink key={label} href={href} label={label}>
                    {icon}
                  </SocialLink>
                ))}
              </nav>
            </div>
          </div>
          <div className="border-border-subtle text-text-muted flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs tracking-[0.28em] uppercase">
            <span>Dark-first, type-driven, MDX-backed</span>
            <span>{siteConfig.location}</span>
          </div>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  );
}
