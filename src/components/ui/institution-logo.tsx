import Image, { type StaticImageData } from "next/image";

import { cn } from "@/core/utils/cn";

/**
 * Institution logo tile.
 *
 * One fixed size and one container for every mark, so a logo never sets its own
 * scale at the call site — that is what keeps them optically consistent across
 * the timeline. The assets are pre-trimmed onto square white tiles, so the
 * rounded container plus overflow-hidden is the whole treatment.
 */
export function InstitutionLogo({
  src,
  alt,
  className,
}: {
  readonly src: StaticImageData;
  readonly alt: string;
  readonly className?: string;
}): React.JSX.Element {
  return (
    <span
      className={cn(
        "border-border-subtle inline-flex h-11 w-11 shrink-0 overflow-hidden rounded-2xl border",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={44}
        height={44}
        sizes="44px"
        className="h-full w-full object-contain"
      />
    </span>
  );
}
