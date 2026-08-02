import type { StaticImageData } from "next/image";

import mbmcLogo from "@/assets/logos/mbmc.png";
import nsaTravelsLogo from "@/assets/logos/nsa-travels.png";
import siddharthaVanasthaliLogo from "@/assets/logos/siddhartha-vanasthali.png";
import uniglobeLogo from "@/assets/logos/uniglobe.png";

/**
 * Official institution marks, keyed so content.ts can reference one by id
 * without importing image assets into what is otherwise a pure data module.
 *
 * Each file under assets/logos is the supplied original trimmed to its mark and
 * centred on a 256x256 white tile, so all four share one optical weight and can
 * be rendered at a single size wherever they appear.
 */
export interface InstitutionLogo {
  readonly src: StaticImageData;
  readonly alt: string;
}

export const institutionLogos = {
  mbmc: { src: mbmcLogo, alt: "Madan Bhandari Memorial College logo" },
  nsaTravels: {
    src: nsaTravelsLogo,
    alt: "Nepal South Asia International Travels & Tours logo",
  },
  uniglobe: { src: uniglobeLogo, alt: "Uniglobe College logo" },
  siddharthaVanasthali: {
    src: siddharthaVanasthaliLogo,
    alt: "Siddhartha Vanasthali Institute logo",
  },
} as const satisfies Record<string, InstitutionLogo>;

export type InstitutionLogoId = keyof typeof institutionLogos;
