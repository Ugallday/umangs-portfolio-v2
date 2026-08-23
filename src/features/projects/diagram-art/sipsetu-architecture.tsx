/**
 * SipSetu, drawn in the same language as the other inline diagrams.
 *
 * The whole argument of the product is one loop and one ceiling. The loop is
 * experience becoming evidence: a spoken sentence becomes a graded passport,
 * the passport is scored against a job, and completing that job promotes the
 * skills it required back up a tier. The ceiling is where the model stops —
 * it translates language into structure and never touches the score.
 *
 * Everything is kept inside x 40-840 with the return path at 862, because the
 * panel clips at the viewBox edge and a label running past it was unreadable.
 */
export function SipsetuArchitecture(): React.JSX.Element {
  return (
    <svg viewBox="0 0 920 560" role="img" aria-hidden="true" className="h-auto w-full" fill="none">
      {/* ---------- extraction ---------- */}
      <text x="40" y="34" className="fill-accent-default text-[13px] tracking-[0.08em] uppercase">
        Language in
      </text>
      <text x="880" y="34" textAnchor="end" className="fill-text-muted text-[13px]">
        Next.js 16 · React 19 · mobile-first
      </text>

      <rect
        x="40"
        y="56"
        width="380"
        height="100"
        rx="14"
        className="fill-surface-overlay stroke-border-strong"
        strokeWidth="1.5"
      />
      <text x="62" y="84" className="fill-text-primary text-[13px]">
        &ldquo;Qatar ma paanch barsa electrician…&rdquo;
      </text>
      <text x="62" y="110" className="fill-text-muted font-serif text-[11.5px]">
        Voice or typed. Nepali, Romanized, Devanagari.
      </text>
      <text x="62" y="132" className="fill-text-muted font-serif text-[11.5px]">
        44 taxonomy entries carry all three.
      </text>

      <rect
        x="480"
        y="56"
        width="400"
        height="100"
        rx="14"
        className="fill-surface-overlay stroke-border-strong"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <text x="502" y="84" className="fill-text-primary text-[13px]">
        Extraction — Claude, or offline
      </text>
      <text x="502" y="110" className="fill-accent-default font-serif text-[11.5px]">
        turns language into structure.
      </text>
      <text x="502" y="132" className="fill-accent-default font-serif text-[11.5px]">
        Never ranks anybody.
      </text>

      <path
        d="M420 106 H476"
        className="stroke-border-strong"
        strokeWidth="1.5"
        markerEnd="url(#ss-arrow)"
      />

      {/* ---------- the passport ---------- */}
      <path
        d="M680 156 V208"
        className="stroke-accent-default"
        strokeWidth="1.75"
        markerEnd="url(#ss-arrow-accent)"
      />

      <text x="40" y="200" className="fill-accent-default text-[13px] tracking-[0.08em] uppercase">
        The Skill Passport
      </text>

      <rect
        x="40"
        y="220"
        width="800"
        height="96"
        rx="14"
        className="fill-surface-overlay stroke-border-strong"
        strokeWidth="1.5"
      />
      <text x="62" y="246" className="fill-text-secondary font-serif text-[12px]">
        occupation · years · country · tools — every claim carrying its tier of proof
      </text>

      <g className="fill-surface-base stroke-border-default" strokeWidth="1.25">
        <rect x="62" y="260" width="144" height="34" rx="7" />
        <rect x="220" y="260" width="144" height="34" rx="7" />
        <rect x="378" y="260" width="144" height="34" rx="7" />
        <rect x="536" y="260" width="144" height="34" rx="7" />
      </g>
      <rect
        x="694"
        y="260"
        width="124"
        height="34"
        rx="7"
        className="fill-surface-base stroke-accent-default"
        strokeWidth="1.5"
      />
      <g className="fill-text-secondary font-serif text-[11.5px]" textAnchor="middle">
        <text x="134" y="281">
          0 self-declared
        </text>
        <text x="292" y="281">
          1 document
        </text>
        <text x="450" y="281">
          2 reference
        </text>
        <text x="608" y="281">
          3 skill-test
        </text>
      </g>
      <text
        x="756"
        y="281"
        textAnchor="middle"
        className="fill-accent-default font-serif text-[11.5px]"
      >
        4 platform history
      </text>

      {/* ---------- matching ---------- */}
      <path
        d="M300 316 V368"
        className="stroke-accent-default"
        strokeWidth="1.75"
        markerEnd="url(#ss-arrow-accent)"
      />
      <text x="312" y="348" className="fill-accent-default font-serif text-[12px]">
        skill overlap is weighted by tier — proof moves the score
      </text>

      <text x="40" y="396" className="fill-accent-default text-[13px] tracking-[0.08em] uppercase">
        Matching — a sum, not a verdict
      </text>

      <rect
        x="40"
        y="416"
        width="800"
        height="104"
        rx="14"
        className="fill-surface-overlay stroke-border-strong"
        strokeWidth="1.5"
      />

      {/* The weights, drawn to scale: skills and occupation really are 45 of
          the 100, so the bar states it rather than the caption having to. */}
      <g>
        <rect x="62" y="438" width="340" height="26" rx="5" className="fill-accent-muted" />
        <rect
          x="62"
          y="438"
          width="340"
          height="26"
          rx="5"
          className="stroke-accent-default"
          strokeWidth="1.25"
        />
        <rect
          x="404"
          y="438"
          width="414"
          height="26"
          rx="5"
          className="fill-surface-base stroke-border-default"
          strokeWidth="1.25"
        />
      </g>
      <text x="232" y="456" textAnchor="middle" className="fill-accent-default text-[11.5px]">
        skills 30 + occupation 15
      </text>
      <text
        x="611"
        y="456"
        textAnchor="middle"
        className="fill-text-secondary font-serif text-[11.5px]"
      >
        the other 55
      </text>
      {/* The breakdown sits under the bar rather than inside it: at this width
          the five factors overran the bar they were meant to be labelling. */}
      <text x="62" y="486" className="fill-text-secondary font-serif text-[11.5px]">
        location 15 · wage 12 · availability 10 · verification 10 · experience 8
      </text>
      <text x="62" y="504" className="fill-text-muted font-serif text-[11.5px]">
        Every card opens into the breakdown — a worker reads the reason, not the number.
      </text>

      {/* ---------- the loop back ---------- */}
      <path
        d="M840 468 H862 V277 H822"
        className="stroke-accent-default"
        strokeWidth="1.75"
        markerEnd="url(#ss-arrow-accent)"
      />
      <text x="62" y="544" className="fill-accent-default font-serif text-[11.5px]">
        Trust compounds — a completed hire promotes that job&apos;s required skills to tier 4.
      </text>

      <defs>
        <marker
          id="ss-arrow"
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
          id="ss-arrow-accent"
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
