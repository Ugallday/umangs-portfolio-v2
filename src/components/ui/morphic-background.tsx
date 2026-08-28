"use client";

import { useEffect, useRef } from "react";

/**
 * Adapted from a community snippet (originally shadcn/Tailwind styled). Two
 * changes from the original:
 *  - The default fill color is `var(--accent-default)` instead of a
 *    hardcoded Google-blue hex, so the bubbles pick up this site's actual
 *    accent color (and follow a theme change) rather than a fixed color.
 *  - The default backdrop class uses `bg-surface-base` instead of the
 *    original `bg-secondary dark:bg-background` — those shadcn token names
 *    and the `dark:` variant don't exist in this project, which themes
 *    through a `[data-theme]` attribute and its own CSS variables instead.
 *
 * Everything else - the imperative particle system, the goo SVG filter, the
 * continuous setInterval/requestAnimationFrame loop - is unchanged. Note for
 * whoever reaches for this next: it's a genuinely heavier, continuously
 * running effect (a new DOM node roughly every 180ms, forever, while
 * mounted) compared to the rest of this site's motion, which is scroll- or
 * state-triggered rather than perpetual. Fine for a small decorative area;
 * think twice before using it somewhere large or persistent across routes.
 */
class Particle {
  private element: SVGElement;
  private container: HTMLElement;
  private position: number;
  private friction: number;
  private coordinates: { x: number; y: number };
  private scale: number;
  private siner: number;
  private rotationDirection: "+" | "-";
  private rotationValue: number;
  private ballColor: string;
  private readonly steps: number;
  private readonly dimensions = { width: 30, height: 30 };

  constructor(
    container: HTMLElement,
    coordinates: { x: number; y: number },
    friction: number,
    ballColor: string,
  ) {
    this.container = container;
    this.coordinates = coordinates;
    this.friction = friction;
    this.ballColor = ballColor;

    this.position = this.coordinates.y;
    this.steps = window.innerHeight / 2;
    this.rotationValue = 0;
    this.rotationDirection = Math.random() > 0.5 ? "+" : "-";
    this.scale = 0.4 + Math.random() * 2;
    this.siner = (window.innerWidth / 2.5) * Math.random();

    this.element = this.render();
  }

  private render(): SVGElement {
    const svgNS = "http://www.w3.org/2000/svg";
    const svgEl = document.createElementNS(svgNS, "svg");
    svgEl.setAttribute("viewBox", "0 0 67.4 67.4");

    const circleEl = document.createElementNS(svgNS, "circle");
    circleEl.setAttribute("cx", "33.7");
    circleEl.setAttribute("cy", "33.7");
    circleEl.setAttribute("r", "33.7");
    circleEl.setAttribute("fill", this.ballColor);

    svgEl.appendChild(circleEl);

    svgEl.style.position = "absolute";
    svgEl.style.width = `${this.dimensions.width}px`;
    svgEl.style.height = `${this.dimensions.height}px`;
    svgEl.style.transform = `translateX(${this.coordinates.x}px) translateY(${this.coordinates.y}px)`;

    this.container.appendChild(svgEl);
    return svgEl;
  }

  public move(): boolean {
    this.position -= this.friction;
    const top = this.position;
    const left = this.coordinates.x + Math.sin((this.position * Math.PI) / this.steps) * this.siner;

    this.rotationValue += this.friction;
    const rotation = this.rotationDirection === "+" ? this.rotationValue : -this.rotationValue;

    this.element.style.transform = `translateX(${left}px) translateY(${top}px) scale(${this.scale}) rotate(${rotation}deg)`;

    if (this.position < -this.dimensions.height) {
      this.destroy();
      return false;
    }
    return true;
  }

  private destroy(): void {
    this.element.remove();
  }
}

export function MorphicBackground({
  ballColor = "var(--accent-default)",
  className = "absolute inset-0 -z-20 bg-surface-base",
}: {
  readonly ballColor?: string;
  readonly className?: string;
}): React.JSX.Element {
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | undefined>(undefined);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const container = particleContainerRef.current;
    if (!container) return;

    const handleFocus = () => {
      isPausedRef.current = false;
    };
    const handleBlur = () => {
      isPausedRef.current = true;
    };
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    const particleInterval = setInterval(() => {
      if (!isPausedRef.current && container) {
        const newParticle = new Particle(
          container,
          {
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
          },
          1 + Math.random(),
          ballColor,
        );
        particlesRef.current.push(newParticle);
      }
    }, 180);

    const update = () => {
      particlesRef.current = particlesRef.current.filter((p) => p.move());
      animationFrameId.current = requestAnimationFrame(update);
    };
    update();

    return () => {
      clearInterval(particleInterval);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      container.innerHTML = "";
    };
  }, [ballColor]);

  return (
    <>
      <div
        ref={particleContainerRef}
        className="pointer-events-none absolute inset-0 z-1 [filter:url('#goo')]"
      />

      <div className={className} />

      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="12" />
            <feColorMatrix
              in="blur"
              result="colormatrix"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9"
            />
            <feBlend in="SourceGraphic" in2="colormatrix" />
          </filter>
        </defs>
      </svg>
    </>
  );
}
