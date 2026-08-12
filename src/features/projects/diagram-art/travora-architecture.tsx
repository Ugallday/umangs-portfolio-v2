/**
 * Travora architecture, drawn in the same visual language as the VAT diagram so
 * the two read as one system rather than two unrelated pictures.
 *
 * The emphasis is deliberate: the tiers are ordinary, and the only thing worth
 * drawing attention to is where ownership is decided. That line sits in
 * PostgreSQL, under every table, not in a filter somewhere in the client.
 */
export function TravoraArchitecture(): React.JSX.Element {
  return (
    <svg viewBox="0 0 920 520" role="img" aria-hidden="true" className="h-auto w-full" fill="none">
      {/* ---------- client ---------- */}
      <text x="40" y="34" className="fill-accent-default text-[13px] tracking-[0.08em] uppercase">
        In the browser
      </text>
      <text x="880" y="34" textAnchor="end" className="fill-text-muted text-[13px]">
        React 19 · TypeScript · Vite
      </text>

      <rect
        x="40"
        y="56"
        width="840"
        height="128"
        rx="14"
        className="fill-surface-overlay stroke-border-strong"
        strokeWidth="1.5"
      />

      <g className="fill-surface-base stroke-border-default" strokeWidth="1.25">
        <rect x="64" y="84" width="188" height="34" rx="8" />
        <rect x="268" y="84" width="188" height="34" rx="8" />
        <rect x="472" y="84" width="188" height="34" rx="8" />
        <rect x="676" y="84" width="180" height="34" rx="8" />
      </g>
      <g className="fill-text-primary text-[13px]" textAnchor="middle">
        <text x="158" y="106">
          Onboarding interview
        </text>
        <text x="362" y="106">
          Wallet &amp; expenses
        </text>
        <text x="566" y="106">
          Receipt capture
        </text>
        <text x="766" y="106">
          Assistant
        </text>
      </g>
      <g className="fill-text-muted text-[11.5px]" textAnchor="middle">
        <text x="158" y="140">
          becomes the trip record
        </text>
        <text x="362" y="140">
          Recharts breakdown
        </text>
        <text x="566" y="140">
          Tesseract.js, on-device
        </text>
        <text x="766" y="140">
          drafts, never totals
        </text>
      </g>
      <text x="64" y="168" className="fill-text-muted font-serif text-[11.5px]">
        Zustand holds client state · Tailwind + Radix through shadcn/ui
      </text>

      {/* OCR never leaves the device — worth stating, since that is the point. */}
      <path
        d="M566 118 V150"
        className="stroke-border-default"
        strokeWidth="1.25"
        strokeDasharray="3 3"
      />

      {/* ---------- the one external call ---------- */}
      <path
        d="M766 184 V228"
        className="stroke-border-strong"
        strokeWidth="1.5"
        markerEnd="url(#tv-arrow)"
      />
      <rect
        x="640"
        y="228"
        width="240"
        height="72"
        rx="12"
        className="fill-surface-overlay stroke-border-strong"
        strokeWidth="1.5"
      />
      <text x="664" y="256" className="fill-text-primary text-[13px]">
        Groq — hosted LLaMA
      </text>
      <text x="664" y="278" className="fill-text-muted text-[11.5px]">
        itinerary drafts, stored on the trip
      </text>

      <path
        d="M240 184 V336"
        className="stroke-accent-default"
        strokeWidth="1.75"
        markerEnd="url(#tv-arrow-accent)"
      />
      <text x="252" y="270" className="fill-accent-default font-serif text-[12px]">
        every figure comes from here
      </text>

      {/* ---------- data ---------- */}
      <text x="40" y="336" className="fill-accent-default text-[13px] tracking-[0.08em] uppercase">
        In PostgreSQL
      </text>
      <text x="880" y="336" textAnchor="end" className="fill-text-muted text-[13px]">
        Supabase — Auth + database
      </text>

      <rect
        x="40"
        y="356"
        width="840"
        height="132"
        rx="14"
        className="fill-surface-overlay stroke-border-strong"
        strokeWidth="1.5"
      />

      <g className="fill-surface-base stroke-border-default" strokeWidth="1.25">
        <rect x="64" y="382" width="148" height="30" rx="7" />
        <rect x="224" y="382" width="148" height="30" rx="7" />
        <rect x="384" y="382" width="148" height="30" rx="7" />
        <rect x="544" y="382" width="148" height="30" rx="7" />
        <rect x="704" y="382" width="152" height="30" rx="7" />
      </g>
      <g className="fill-text-secondary font-serif text-[12px]" textAnchor="middle">
        <text x="138" y="402">
          users
        </text>
        <text x="298" y="402">
          trips
        </text>
        <text x="458" y="402">
          expenses
        </text>
        <text x="618" y="402">
          categories
        </text>
        <text x="780" y="402">
          chat_messages
        </text>
      </g>

      <rect
        x="64"
        y="428"
        width="792"
        height="38"
        rx="9"
        className="fill-surface-base stroke-accent-default"
        strokeWidth="1.25"
        strokeDasharray="4 4"
      />
      <text x="80" y="446" className="fill-accent-default text-[12.5px]">
        Row-level security on all five tables — ownership is decided here, not by a filter in the
        front end
      </text>
      <text x="80" y="462" className="fill-text-muted text-[11.5px]">
        categories are the exception worth knowing: a null user_id is a shared default everyone can
        read
      </text>

      <defs>
        <marker
          id="tv-arrow"
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
          id="tv-arrow-accent"
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
