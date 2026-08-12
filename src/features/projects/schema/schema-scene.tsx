"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line, OrbitControls, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CatmullRomCurve3,
  type Group,
  type Mesh,
  type MeshStandardMaterial,
  QuadraticBezierCurve3,
  Vector3,
} from "three";

import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import type { SchemaModel, SchemaRelation, SchemaRelationKind, SchemaTable } from "./model";

/**
 * The 3D half of the schema explorer.
 *
 * Deliberately kept free of any DOM chrome: the surrounding panel owns the
 * inspector, the table list and every accessible affordance, and treats this
 * canvas as an enhancement. That split is what lets the whole thing degrade to
 * a readable document when WebGL, JavaScript or a pointing device is missing.
 */

const SLAB_HEIGHT = 0.22;

interface Palette {
  readonly slab: string;
  readonly slabRoot: string;
  readonly slabCore: string;
  readonly accent: string;
  /** Reads against `accent` — the selected slab is painted in it. */
  readonly onAccent: string;
  readonly edge: string;
  readonly edgeMuted: string;
  readonly floor: string;
}

const DARK_FALLBACK: Palette = {
  slab: "#1a1b1f",
  slabRoot: "#31302c",
  slabCore: "#26272d",
  accent: "#e2794a",
  onAccent: "#101319",
  edge: "#474349",
  edgeMuted: "#31302c",
  floor: "#111113",
};

const LIGHT_FALLBACK: Palette = {
  slab: "#e2e0db",
  slabRoot: "#cac6be",
  slabCore: "#d4d0c8",
  accent: "#9a3412",
  onAccent: "#fffefa",
  edge: "#8f887f",
  edgeMuted: "#b0aaa0",
  floor: "#f2f2f0",
};

/**
 * Colours come from the same custom properties the rest of the site paints
 * with, read once per theme change. Hard-coding them here would have created a
 * second palette that drifts the first time tokens.css is edited; the
 * fallbacks exist only for the frame before styles resolve.
 */
function useSchemaPalette(theme: "light" | "dark"): Palette {
  const [palette, setPalette] = useState<Palette>(
    theme === "light" ? LIGHT_FALLBACK : DARK_FALLBACK,
  );

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const read = (name: string, fallback: string): string => {
      const value = styles.getPropertyValue(name).trim();
      return value === "" ? fallback : value;
    };
    const fallback = theme === "light" ? LIGHT_FALLBACK : DARK_FALLBACK;

    setPalette({
      slab: read("--surface-overlay", fallback.slab),
      slabRoot: read("--border-strong", fallback.slabRoot),
      slabCore: read("--border-default", fallback.slabCore),
      accent: read("--accent-default", fallback.accent),
      onAccent: read("--text-on-accent", fallback.onAccent),
      edge: read("--border-strong", fallback.edge),
      edgeMuted: read("--border-default", fallback.edgeMuted),
      floor: read("--surface-base", fallback.floor),
    });
  }, [theme]);

  return palette;
}

function slabColor(table: SchemaTable, palette: Palette): string {
  if (table.emphasis === "root") return palette.slabRoot;
  if (table.emphasis === "core") return palette.slabCore;
  return palette.slab;
}

function TableSlab({
  table,
  palette,
  isSelected,
  isRelated,
  isMuted,
  onSelect,
  onHover,
  instant,
}: {
  readonly table: SchemaTable;
  readonly palette: Palette;
  readonly isSelected: boolean;
  readonly isRelated: boolean;
  readonly isMuted: boolean;
  readonly onSelect: (id: string) => void;
  readonly onHover: (id: string | null) => void;
  readonly instant: boolean;
}): React.JSX.Element {
  const lift = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);
  const [width, depth] = table.footprint;

  const targetY = isSelected ? 0.42 : isRelated ? 0.16 : 0;
  const targetOpacity = isMuted ? 0.35 : 1;

  useFrame((_state, delta) => {
    const group = lift.current;
    if (group) {
      const step = instant ? 1 : Math.min(1, delta * 8);
      group.position.y += (targetY - group.position.y) * step;
    }

    const material = mesh.current?.material as MeshStandardMaterial | undefined;
    if (material) {
      const step = instant ? 1 : Math.min(1, delta * 8);
      material.opacity += (targetOpacity - material.opacity) * step;
    }
  });

  return (
    <group position={[table.position[0], table.position[1], table.position[2]]}>
      <group ref={lift}>
        <RoundedBox
          ref={mesh}
          args={[width, SLAB_HEIGHT, depth]}
          radius={0.07}
          smoothness={3}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(table.id);
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            onHover(table.id);
          }}
          onPointerOut={() => onHover(null)}
        >
          <meshStandardMaterial
            color={isSelected ? palette.accent : slabColor(table, palette)}
            roughness={0.62}
            metalness={0.06}
            transparent
            opacity={1}
          />
        </RoundedBox>

        {/* A hairline crease along the top edge, the same device the paper
            panels use in 2D — it is what keeps a slab from reading as a
            featureless block at grazing angles. */}
        <Line
          points={[
            [-width / 2, SLAB_HEIGHT / 2 + 0.002, -depth / 2],
            [width / 2, SLAB_HEIGHT / 2 + 0.002, -depth / 2],
            [width / 2, SLAB_HEIGHT / 2 + 0.002, depth / 2],
            [-width / 2, SLAB_HEIGHT / 2 + 0.002, depth / 2],
            [-width / 2, SLAB_HEIGHT / 2 + 0.002, -depth / 2],
          ]}
          color={isSelected ? palette.accent : palette.edge}
          lineWidth={isSelected ? 2 : 1}
          transparent
          opacity={isMuted ? 0.3 : 0.8}
        />

        <Html
          center
          distanceFactor={10}
          position={[0, SLAB_HEIGHT / 2 + 0.06, 0]}
          zIndexRange={[10, 0]}
          style={{ pointerEvents: "none" }}
        >
          {/* The selected slab is painted in the accent, so an accent label on
              top of it would be invisible — it flips to the ink that colour is
              designed to carry instead. */}
          <span
            className="font-serif text-[13px] whitespace-nowrap"
            style={{
              color: isSelected ? palette.onAccent : undefined,
              opacity: isMuted ? 0.45 : 1,
            }}
          >
            {table.name}
          </span>
        </Html>
      </group>
    </group>
  );
}

const RELATION_COLOR: Record<SchemaRelationKind, keyof Palette> = {
  tenant: "edgeMuted",
  scoped: "accent",
  plain: "edge",
  self: "edge",
};

function relationPoints(relation: SchemaRelation, tables: readonly SchemaTable[]): Vector3[] {
  const from = tables.find((table) => table.id === relation.from);
  const to = tables.find((table) => table.id === relation.to);
  if (!from || !to) return [];

  const start = new Vector3(...from.position);
  const end = new Vector3(...to.position);

  // A self-reference has no distance to travel, so it is drawn as a loop that
  // leaves and re-enters the same slab rather than as a degenerate line.
  if (relation.from === relation.to) {
    const [width] = from.footprint;
    const loop = new CatmullRomCurve3(
      [
        new Vector3(start.x + width * 0.3, start.y, start.z - 0.1),
        new Vector3(start.x + width * 0.72, start.y + 0.62, start.z - 0.5),
        new Vector3(start.x + width * 0.2, start.y + 0.95, start.z - 0.1),
        new Vector3(start.x - width * 0.1, start.y + 0.5, start.z + 0.25),
        new Vector3(start.x + width * 0.16, start.y, start.z + 0.12),
      ],
      false,
      "catmullrom",
      0.6,
    );
    return loop.getPoints(48);
  }

  // Links to the raised plate bow outward; links across the lower plane bow
  // upward. Both keep the curve clear of the slabs it passes between.
  const mid = start.clone().lerp(end, 0.5);
  const climbing = Math.abs(end.y - start.y) > 0.5;
  mid.y += climbing ? 0.15 : 0.75;
  if (climbing) {
    mid.x *= 1.28;
    mid.z *= 1.28;
  }

  return new QuadraticBezierCurve3(start, mid, end).getPoints(40).map((point) => point);
}

function RelationCurve({
  relation,
  tables,
  palette,
  isActive,
  isMuted,
}: {
  readonly relation: SchemaRelation;
  readonly tables: readonly SchemaTable[];
  readonly palette: Palette;
  readonly isActive: boolean;
  readonly isMuted: boolean;
}): React.JSX.Element | null {
  const points = useMemo(() => relationPoints(relation, tables), [relation, tables]);
  if (points.length === 0) return null;

  const baseColor = palette[RELATION_COLOR[relation.kind]];

  return (
    <Line
      points={points}
      color={isActive ? palette.accent : baseColor}
      lineWidth={isActive ? 2.4 : 1.2}
      transparent
      opacity={isMuted ? 0.16 : isActive ? 1 : 0.62}
      dashed={relation.kind === "self"}
      dashSize={0.12}
      gapSize={0.08}
    />
  );
}

/** The fence the whole VAT schema exists to defend, drawn as one. */
function TenantBoundary({
  palette,
  radius,
}: {
  readonly palette: Palette;
  readonly radius: number;
}): React.JSX.Element {
  const ring = useMemo(() => {
    const points: [number, number, number][] = [];
    for (let index = 0; index <= 96; index += 1) {
      const angle = (index / 96) * Math.PI * 2;
      points.push([Math.cos(angle) * radius, -0.16, Math.sin(angle) * radius]);
    }
    return points;
  }, [radius]);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.17, 0]}>
        <circleGeometry args={[radius, 96]} />
        <meshBasicMaterial color={palette.floor} transparent opacity={0.85} />
      </mesh>
      <Line points={ring} color={palette.accent} lineWidth={1.4} transparent opacity={0.5} />
    </group>
  );
}

function Scene({
  model,
  palette,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  reducedMotion,
}: {
  readonly model: SchemaModel;
  readonly palette: Palette;
  readonly selectedId: string | null;
  readonly hoveredId: string | null;
  readonly onSelect: (id: string) => void;
  readonly onHover: (id: string | null) => void;
  readonly reducedMotion: boolean;
}): React.JSX.Element {
  // Selection and hover do different jobs. A table is always selected — the
  // inspector has to show something — so letting selection drive the dimming
  // left the diagram permanently greyed out and the auto-rotate permanently
  // off. Dimming is therefore hover-only: it answers "what did I just point
  // at", and returns the whole model to full contrast the moment you leave.
  const focusId = hoveredId ?? selectedId;
  const dimmingId = hoveredId;

  const relatedIds = useMemo(() => {
    if (!focusId) return new Set<string>();
    const ids = new Set<string>();
    for (const relation of model.relations) {
      if (relation.from === focusId) ids.add(relation.to);
      if (relation.to === focusId) ids.add(relation.from);
    }
    ids.delete(focusId);
    return ids;
  }, [focusId, model.relations]);

  const boundaryRadius = useMemo(() => {
    const reach = model.tables
      .filter((table) => table.position[1] < 1)
      .map((table) => Math.hypot(table.position[0], table.position[2]) + table.footprint[0] / 2);
    return Math.max(...reach, 4) + 0.5;
  }, [model.tables]);

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[6, 10, 6]} intensity={1.15} />
      <directionalLight position={[-7, 5, -4]} intensity={0.35} color={palette.accent} />

      <TenantBoundary palette={palette} radius={boundaryRadius} />

      {model.relations.map((relation) => (
        <RelationCurve
          key={`${relation.from}-${relation.to}-${relation.label}`}
          relation={relation}
          tables={model.tables}
          palette={palette}
          isActive={focusId !== null && (relation.from === focusId || relation.to === focusId)}
          isMuted={dimmingId !== null && relation.from !== dimmingId && relation.to !== dimmingId}
        />
      ))}

      {model.tables.map((table) => (
        <TableSlab
          key={table.id}
          table={table}
          palette={palette}
          isSelected={table.id === focusId}
          isRelated={relatedIds.has(table.id)}
          isMuted={dimmingId !== null && table.id !== dimmingId && !relatedIds.has(table.id)}
          onSelect={onSelect}
          onHover={onHover}
          instant={reducedMotion}
        />
      ))}

      <OrbitControls
        makeDefault
        enablePan={false}
        target={[0, 0.75, 0.4]}
        minDistance={11}
        maxDistance={26}
        minPolarAngle={0.25}
        maxPolarAngle={1.42}
        autoRotate={!reducedMotion && dimmingId === null}
        autoRotateSpeed={0.45}
        enableDamping={!reducedMotion}
      />
    </>
  );
}

export default function SchemaScene({
  model,
  theme,
  selectedId,
  onSelect,
}: {
  readonly model: SchemaModel;
  readonly theme: "light" | "dark";
  readonly selectedId: string | null;
  readonly onSelect: (id: string) => void;
}): React.JSX.Element {
  const palette = useSchemaPalette(theme);
  const reducedMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <Canvas
      camera={{ position: [0, 7.6, 13.4], fov: 40 }}
      dpr={[1, 1.75]}
      style={{ cursor: hoveredId ? "pointer" : "grab" }}
      onPointerMissed={() => setHoveredId(null)}
    >
      <Scene
        model={model}
        palette={palette}
        selectedId={selectedId}
        hoveredId={hoveredId}
        onSelect={onSelect}
        onHover={setHoveredId}
        reducedMotion={reducedMotion}
      />
    </Canvas>
  );
}
