import type { StaticImageData } from "next/image";

/**
 * Official institution marks, keyed so content.ts can reference one by id
 * without importing image assets into what is otherwise a pure data module.
 *
 * Empty for now - no logo assets have been supplied yet. Add an entry here
 * (plus the image under src/assets/logos/) and reference its key from a
 * timeline entry's `logo` field once real marks (Weber State, UTA, etc.) are
 * available and cleared for use.
 */
export interface InstitutionLogo {
  readonly src: StaticImageData;
  readonly alt: string;
}

export const institutionLogos: Record<string, InstitutionLogo> = {};

export type InstitutionLogoId = string;
