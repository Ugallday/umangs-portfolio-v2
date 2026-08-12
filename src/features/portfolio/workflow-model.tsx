import { FoldReveal } from "@/components/motion/fold-reveal";
import {
  workflowModelCloser,
  workflowModelLead,
  workflowStages,
} from "@/features/portfolio/content";
import type { CardHeadingLevel } from "@/features/portfolio/sections";

/**
 * The workflow, drawn rather than listed.
 *
 * The diagram is one idea: a seam running down the middle of six stages, with
 * drafted work on one side and owned decisions on the other. It is built from
 * grid and borders instead of an SVG so it reflows on a phone, inherits the
 * theme through tokens, and stays readable to a screen reader as what it
 * actually is — a definition list of stages, each with two halves.
 *
 * The numbering is real: these run in order, and the last one feeds the first.
 */
export function WorkflowModel({
  as: Heading = "h3",
}: {
  readonly as?: CardHeadingLevel;
}): React.JSX.Element {
  return (
    <div className="fold-panel rounded-3xl p-5 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-text-muted text-xs tracking-[0.08em] uppercase">The loop</p>
        <p className="text-text-muted font-serif text-xs tabular-nums">
          {workflowStages.length} stages
        </p>
      </div>
      <p className="text-text-secondary mt-4 max-w-3xl text-base leading-8">{workflowModelLead}</p>

      {/* The column headers only make sense once the two halves sit side by
          side, so they are hidden at the width where the layout stacks. */}
      <div className="mt-8 hidden grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-6 md:grid">
        <p className="text-text-muted text-right text-xs tracking-[0.08em] uppercase">
          Drafted with AI
        </p>
        <span className="bg-accent-default h-1.5 w-1.5 rounded-full" aria-hidden="true" />
        <p className="text-text-muted text-xs tracking-[0.08em] uppercase">Decided by me</p>
      </div>

      <ol className="mt-4 grid gap-3">
        {workflowStages.map((stage, index) => (
          <FoldReveal key={stage.name} delayMs={index * 40}>
            <li className="grid items-stretch gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-x-6">
              <div className="border-border-subtle bg-surface-overlay rounded-2xl border border-dashed p-4 md:text-right">
                <p className="text-text-secondary text-sm leading-6">{stage.drafted}</p>
              </div>

              {/* The seam. On a narrow screen the vertical rule would have
                  nothing to run between, so it becomes a plain label row. */}
              <div className="flex items-center gap-3 md:w-32 md:flex-col md:gap-2">
                <span
                  aria-hidden="true"
                  className="border-border-subtle hidden w-px flex-1 border-l md:block"
                />
                <span className="border-accent-default text-accent-default flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-serif text-xs tabular-nums">
                  {index + 1}
                </span>
                <Heading className="text-text-primary text-sm font-semibold tracking-tight md:text-center">
                  {stage.name}
                </Heading>
                <span
                  aria-hidden="true"
                  className="border-border-subtle hidden w-px flex-1 border-l md:block"
                />
              </div>

              <div className="border-border-default bg-surface-overlay rounded-2xl border p-4">
                <p className="text-text-primary text-sm leading-6">{stage.decided}</p>
              </div>
            </li>
          </FoldReveal>
        ))}
      </ol>

      <p className="text-text-muted border-border-subtle mt-6 border-t pt-5 text-sm leading-7">
        {workflowModelCloser}
      </p>
    </div>
  );
}
