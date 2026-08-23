/**
 * NiryatHub, drawn in the same language as the VAT and Travora diagrams.
 *
 * The thing worth drawing here is not the framework stack — it is the seam and
 * the ceiling. Every trade figure enters through one repository module, which
 * is what makes a live Comtrade feed a swap rather than a rewrite. And the two
 * model routes sit above a line they cannot cross: they receive figures that
 * are already computed and return prose. Nothing on the deterministic side
 * asks the model for a number.
 */
export function NiryatHubArchitecture(): React.JSX.Element {
  return (
    <svg viewBox="0 0 920 560" role="img" aria-hidden="true" className="h-auto w-full" fill="none">
      {/* ---------- the run ---------- */}
      <text x="40" y="34" className="fill-accent-default text-[13px] tracking-[0.08em] uppercase">
        The run, in one browser
      </text>
      <text x="880" y="34" textAnchor="end" className="fill-text-muted text-[13px]">
        Next.js 15 · React 19 · TypeScript
      </text>

      <rect
        x="40"
        y="56"
        width="840"
        height="104"
        rx="14"
        className="fill-surface-overlay stroke-border-strong"
        strokeWidth="1.5"
      />

      <g className="fill-surface-base stroke-border-default" strokeWidth="1.25">
        <rect x="60" y="80" width="92" height="30" rx="7" />
        <rect x="164" y="80" width="92" height="30" rx="7" />
        <rect x="268" y="80" width="92" height="30" rx="7" />
        <rect x="372" y="80" width="92" height="30" rx="7" />
        <rect x="476" y="80" width="104" height="30" rx="7" />
        <rect x="592" y="80" width="92" height="30" rx="7" />
        <rect x="696" y="80" width="76" height="30" rx="7" />
        <rect x="784" y="80" width="76" height="30" rx="7" />
      </g>
      <g className="fill-text-secondary font-serif text-[11.5px]" textAnchor="middle">
        <text x="106" y="100">
          consignment
        </text>
        <text x="210" y="100">
          research
        </text>
        <text x="314" y="100">
          market
        </text>
        <text x="418" y="100">
          buyer
        </text>
        <text x="528" y="100">
          compliance
        </text>
        <text x="638" y="100">
          route
        </text>
        <text x="734" y="100">
          shipping
        </text>
        <text x="822" y="100">
          invoice
        </text>
      </g>
      <text x="60" y="140" className="fill-text-muted font-serif text-[11.5px]">
        Voice in through the browser&apos;s own recogniser · session state in localStorage — no
        account, no server, nothing to leak
      </text>

      {/* ---------- the deterministic core ---------- */}
      <path
        d="M300 160 V212"
        className="stroke-accent-default"
        strokeWidth="1.75"
        markerEnd="url(#nh-arrow-accent)"
      />
      <text x="312" y="192" className="fill-accent-default font-serif text-[12px]">
        every figure on screen comes from here
      </text>

      <text x="40" y="240" className="fill-accent-default text-[13px] tracking-[0.08em] uppercase">
        Pure functions
      </text>
      <text x="880" y="240" textAnchor="end" className="fill-text-muted text-[13px]">
        62 tests across five suites
      </text>

      <rect
        x="40"
        y="260"
        width="560"
        height="112"
        rx="14"
        className="fill-surface-overlay stroke-border-strong"
        strokeWidth="1.5"
      />

      <g className="fill-surface-base stroke-border-default" strokeWidth="1.25">
        <rect x="62" y="284" width="122" height="30" rx="7" />
        <rect x="196" y="284" width="122" height="30" rx="7" />
        <rect x="330" y="284" width="122" height="30" rx="7" />
        <rect x="464" y="284" width="114" height="30" rx="7" />
      </g>
      <g className="fill-text-secondary font-serif text-[11.5px]" textAnchor="middle">
        <text x="123" y="304">
          scoring
        </text>
        <text x="257" y="304">
          logistics
        </text>
        <text x="391" y="304">
          disruptions
        </text>
        <text x="521" y="304">
          money
        </text>
      </g>
      <g className="fill-text-muted font-serif text-[11px]" textAnchor="middle">
        <text x="123" y="336">
          7 weights, sum 1
        </text>
        <text x="257" y="336">
          48 legs, 24 nodes
        </text>
        <text x="391" y="336">
          11 events, by month
        </text>
        <text x="521" y="336">
          landed cost
        </text>
      </g>
      <text x="62" y="360" className="fill-text-muted font-serif text-[11.5px]">
        Fixed anchors, not relative ones — an eleventh market cannot move the first ten
      </text>

      {/* ---------- the model, fenced ---------- */}
      <rect
        x="632"
        y="260"
        width="248"
        height="112"
        rx="14"
        className="fill-surface-overlay stroke-border-strong"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <text x="654" y="286" className="fill-text-primary text-[13px]">
        Claude — two routes
      </text>
      <text x="654" y="308" className="fill-text-muted text-[11.5px]">
        market reading · delay briefing
      </text>
      <text x="654" y="334" className="fill-accent-default font-serif text-[11.5px]">
        receives computed figures,
      </text>
      <text x="654" y="352" className="fill-accent-default font-serif text-[11.5px]">
        returns prose. Never a number.
      </text>

      {/* Facts out, prose back. Unlabelled: the gutter between the two panels
          is 32px, and a label in it collided with the box copy either side. */}
      <path
        d="M600 296 H628"
        className="stroke-border-strong"
        strokeWidth="1.5"
        markerEnd="url(#nh-arrow)"
      />
      <path
        d="M628 330 H600"
        className="stroke-border-strong"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        markerEnd="url(#nh-arrow)"
      />

      {/* ---------- the seam ---------- */}
      <path
        d="M320 372 V416"
        className="stroke-accent-default"
        strokeWidth="1.75"
        markerEnd="url(#nh-arrow-accent)"
      />

      <rect
        x="40"
        y="416"
        width="840"
        height="44"
        rx="10"
        className="fill-surface-base stroke-accent-default"
        strokeWidth="1.25"
        strokeDasharray="4 4"
      />
      <text x="60" y="444" className="fill-accent-default text-[12.5px]">
        repository.ts — the seam. Everything trade-related enters here, so a live Comtrade adapter
        replaces the seed without a component noticing.
      </text>

      {/* ---------- the data ---------- */}
      <rect
        x="40"
        y="476"
        width="840"
        height="64"
        rx="14"
        className="fill-surface-overlay stroke-border-strong"
        strokeWidth="1.5"
      />
      <g className="fill-surface-base stroke-border-default" strokeWidth="1.25">
        <rect x="62" y="494" width="152" height="30" rx="7" />
        <rect x="226" y="494" width="152" height="30" rx="7" />
        <rect x="390" y="494" width="152" height="30" rx="7" />
        <rect x="554" y="494" width="152" height="30" rx="7" />
        <rect x="718" y="494" width="140" height="30" rx="7" />
      </g>
      <g className="fill-text-secondary font-serif text-[11.5px]" textAnchor="middle">
        <text x="138" y="514">
          60 market pairs
        </text>
        <text x="302" y="514">
          58 requirements
        </text>
        <text x="466" y="514">
          21 importers
        </text>
        <text x="630" y="514">
          48 costed legs
        </text>
        <text x="788" y="514">
          11 disruptions
        </text>
      </g>

      <defs>
        <marker
          id="nh-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" className="fill-border-strong" />
        </marker>
        <marker
          id="nh-arrow-accent"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" className="fill-accent-default" />
        </marker>
      </defs>
    </svg>
  );
}
