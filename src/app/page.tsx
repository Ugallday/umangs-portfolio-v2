import { SiteShell } from "@/features/portfolio/shell";
import { HeroSection, HubSection } from "@/features/portfolio/sections";

export default function HomePage(): React.JSX.Element {
  return (
    <SiteShell>
      <HeroSection />
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <HubSection />
      </div>
    </SiteShell>
  );
}
