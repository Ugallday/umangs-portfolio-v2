"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { BufferAttribute, BufferGeometry, type Group } from "three";

/**
 * The ambient 3D layer behind the hero: a drift of folded sheets.
 *
 * Each object is literally one fold — two triangles hinged along a shared
 * edge — because that is the site's whole visual premise, and a generic
 * particle field or floating torus would have said nothing about it. They sit
 * far back, unlit on one face, and never cross into the text column.
 *
 * Purely decorative: the mount point marks it aria-hidden and pointer-events
 * none, and does not render it at all under reduced motion.
 */

interface Sheet {
  readonly position: readonly [number, number, number];
  readonly rotation: readonly [number, number, number];
  readonly scale: number;
  readonly spin: number;
  readonly accent: boolean;
}

const SHEETS: readonly Sheet[] = [
  { position: [-3.4, 1.6, -2], rotation: [0.4, 0.9, -0.3], scale: 1.25, spin: 0.05, accent: true },
  {
    position: [3.1, 2.1, -3.4],
    rotation: [-0.5, 0.2, 0.7],
    scale: 1.6,
    spin: -0.038,
    accent: false,
  },
  {
    position: [1.9, -1.7, -1.4],
    rotation: [0.9, -0.6, 0.2],
    scale: 0.95,
    spin: 0.062,
    accent: false,
  },
  {
    position: [-2.4, -2.2, -2.9],
    rotation: [-0.3, 1.4, 0.5],
    scale: 1.35,
    spin: -0.045,
    accent: true,
  },
  {
    position: [4.4, -0.4, -4.6],
    rotation: [0.7, 0.4, -0.8],
    scale: 1.9,
    spin: 0.03,
    accent: false,
  },
  {
    position: [-4.6, 0.2, -4.2],
    rotation: [-0.8, -0.5, 0.4],
    scale: 1.7,
    spin: 0.034,
    accent: false,
  },
];

/**
 * Two triangles sharing the edge along x = 0, angled apart — a sheet creased
 * down the middle. Built by hand rather than taken from a primitive because no
 * primitive is a fold, and flat shading needs the normals per face anyway.
 */
function useFoldGeometry(dihedral: number): BufferGeometry {
  return useMemo(() => {
    const lift = Math.sin(dihedral) * 0.55;
    const inset = Math.cos(dihedral) * 0.9;

    // prettier-ignore
    const vertices = new Float32Array([
      // left leaf
      0, -1, 0,
      0, 1, 0,
      -inset, 0.2, lift,
      // right leaf
      0, 1, 0,
      0, -1, 0,
      inset, 0.2, lift,
    ]);

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    return geometry;
  }, [dihedral]);
}

function FoldedSheet({
  sheet,
  accentColor,
  paperColor,
  index,
  animate,
}: {
  readonly sheet: Sheet;
  readonly accentColor: string;
  readonly paperColor: string;
  readonly index: number;
  readonly animate: boolean;
}): React.JSX.Element {
  const group = useRef<Group>(null);
  const geometry = useFoldGeometry(0.75);

  // Each sheet drifts on its own period and phase. Shared timing would read as
  // one object cut into pieces rather than as paper hanging in air.
  const driftSpeed = 0.22 + index * 0.045;
  const driftPhase = index * 1.7;

  useFrame((state, delta) => {
    const node = group.current;
    if (!node || !animate) return;

    node.rotation.y += sheet.spin * delta;
    node.rotation.x += sheet.spin * delta * 0.35;

    const time = state.clock.elapsedTime;
    node.position.y = sheet.position[1] + Math.sin(time * driftSpeed + driftPhase) * 0.42;
    node.position.x = sheet.position[0] + Math.cos(time * driftSpeed * 0.7 + driftPhase) * 0.18;
  });

  return (
    <group
      ref={group}
      position={[sheet.position[0], sheet.position[1], sheet.position[2]]}
      rotation={[sheet.rotation[0], sheet.rotation[1], sheet.rotation[2]]}
      scale={sheet.scale}
    >
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={sheet.accent ? accentColor : paperColor}
          flatShading
          transparent
          opacity={sheet.accent ? 0.32 : 0.2}
          roughness={0.9}
          metalness={0}
          side={2}
        />
      </mesh>
    </group>
  );
}

export default function FoldFieldScene({
  accentColor,
  paperColor,
  animate,
}: {
  readonly accentColor: string;
  readonly paperColor: string;
  /** When false the sheets are drawn once and never move again. */
  readonly animate: boolean;
}): React.JSX.Element {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      frameloop={animate ? "always" : "demand"}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      <directionalLight position={[-5, -2, 2]} intensity={0.5} color={accentColor} />
      {SHEETS.map((sheet, index) => (
        <FoldedSheet
          key={index}
          sheet={sheet}
          index={index}
          animate={animate}
          accentColor={accentColor}
          paperColor={paperColor}
        />
      ))}
    </Canvas>
  );
}
