"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import { useTheme } from "@/components/layout/theme-provider";
import { cn } from "@/core/utils/cn";
import type { SchemaModel, SchemaRelationKind } from "./model";

/**
 * The database schema, explorable in place.
 *
 * This panel replaced a link that sent visitors to `schema.sql` on GitHub —
 * which is a fine file and a bad answer to "how is this system shaped". The 3D
 * canvas is an enhancement layered on top of a document that already works: the
 * table list is a real set of buttons, the inspector is real prose and a real
 * table, and both are fully usable if WebGL never initialises.
 */

const SchemaScene = dynamic(() => import("./schema-scene"), {
  ssr: false,
  loading: () => (
    <div className="text-text-muted flex h-full w-full items-center justify-center text-xs tracking-[0.08em] uppercase">
      Building the model…
    </div>
  ),
});

const LEGEND_SWATCH: Record<SchemaRelationKind, string> = {
  tenant: "bg-border-default",
  scoped: "bg-accent-default",
  plain: "bg-border-strong",
  self: "bg-border-strong",
};

export function SchemaPanel({ model }: { readonly model: SchemaModel }): React.JSX.Element {
  const { theme } = useTheme();
  const [selectedId, setSelectedId] = useState<string>(
    model.tables.find((table) => table.emphasis === "core")?.id ?? model.tables[0]?.id ?? "",
  );

  const selected = model.tables.find((table) => table.id === selectedId) ?? model.tables[0];

  const selectedRelations = useMemo(
    () =>
      model.relations.filter(
        (relation) => relation.from === selected?.id || relation.to === selected?.id,
      ),
    [model.relations, selected?.id],
  );

  if (!selected) {
    return <></>;
  }

  return (
    <section id="schema" className="fold-panel scroll-mt-24 rounded-3xl p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-text-muted text-xs tracking-[0.08em] uppercase">Database schema</p>
        <p className="text-text-muted font-serif text-xs">{model.source}</p>
      </div>

      <h3 className="text-text-primary mt-3 text-2xl font-semibold tracking-tight">
        {model.title}
      </h3>
      <p className="text-text-secondary mt-4 max-w-3xl text-base leading-8">{model.summary}</p>

      <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          {/* The canvas carries no information the list below does not, so it
              is hidden from assistive technology rather than described twice. */}
          <div
            aria-hidden="true"
            className="border-border-subtle bg-surface-overlay h-[24rem] overflow-hidden rounded-2xl border sm:h-[30rem]"
          >
            <SchemaScene
              model={model}
              theme={theme}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {model.legend.map((entry) => (
              <span
                key={entry.label}
                className="text-text-muted flex items-center gap-2 text-xs leading-5"
              >
                <span
                  aria-hidden="true"
                  className={cn("h-[2px] w-6 rounded-full", LEGEND_SWATCH[entry.kind])}
                />
                {entry.label}
              </span>
            ))}
          </div>

          <p className="text-text-muted text-sm leading-6">{model.caption}</p>

          <div>
            <p className="text-text-muted text-xs tracking-[0.08em] uppercase">
              Tables — select one to inspect it
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {model.tables.map((table) => {
                const isSelected = table.id === selectedId;
                return (
                  <button
                    key={table.id}
                    type="button"
                    onClick={() => setSelectedId(table.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      "rounded-full border px-3 py-1.5 font-serif text-xs transition",
                      isSelected
                        ? "border-accent-default text-accent-default"
                        : "border-border-default text-text-secondary hover:border-border-strong hover:text-text-primary",
                    )}
                  >
                    {table.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* aria-live so choosing a table from the list announces the change —
            without it the only feedback is a visual one inside a hidden canvas. */}
        <div
          aria-live="polite"
          className="border-border-subtle bg-surface-overlay rounded-2xl border p-5 sm:p-6"
        >
          <p className="text-accent-default font-serif text-sm">{selected.name}</p>
          <p className="text-text-primary mt-2 text-base leading-7 font-medium">{selected.role}</p>
          <p className="text-text-secondary mt-3 text-sm leading-7">{selected.detail}</p>

          <p className="text-text-muted mt-6 text-xs tracking-[0.08em] uppercase">Columns</p>
          <ul className="mt-3 grid gap-1.5">
            {selected.columns.map((column) => (
              <li
                key={column.name}
                className="border-border-subtle flex flex-wrap items-baseline gap-x-2 gap-y-1 border-b pb-1.5 last:border-b-0"
              >
                <span className="text-text-primary font-serif text-xs">{column.name}</span>
                <span className="text-text-muted font-serif text-xs">{column.type}</span>
                {column.key ? (
                  <span className="border-border-default text-text-muted rounded-full border px-1.5 text-[10px] tracking-[0.05em] uppercase">
                    {column.key}
                  </span>
                ) : null}
                {column.note ? (
                  <span className="text-text-muted basis-full text-xs leading-5">
                    {column.note}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>

          {selectedRelations.length > 0 ? (
            <>
              <p className="text-text-muted mt-6 text-xs tracking-[0.08em] uppercase">
                Foreign keys
              </p>
              <ul className="mt-3 grid gap-2">
                {selectedRelations.map((relation) => (
                  <li
                    key={`${relation.from}-${relation.to}-${relation.label}`}
                    className="text-text-secondary font-serif text-xs leading-5"
                  >
                    {relation.from === selected.id ? (
                      relation.label
                    ) : (
                      <>
                        <span className="text-text-muted">{relation.from}</span> {relation.label}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
