/**
 * VAT Billing System architecture, drawn as a folded sheet.
 *
 * The old version was a stack of outlined rectangles with hard-coded dark
 * hexes, which meant it also inverted into an unreadable slab in light theme.
 * This one is inline SVG, so it paints from the same tokens as the rest of the
 * site and follows the theme toggle.
 *
 * The composition carries the argument. The crease across the middle is the
 * sync boundary: everything above it happens in the browser and keeps working
 * with the connection down, everything below it is the shared copy that every
 * installation converges on. Push crosses the crease before pull does, which is
 * the ordering the whole offline story depends on.
 */
export function VatBillingArchitecture(): React.JSX.Element {
  return (
    <svg viewBox="0 0 920 560" role="img" aria-hidden="true" className="h-auto w-full" fill="none">
      <defs>
        {/* The stops name a token directly. `currentColor` resolves against the
            element that *references* a gradient, which for a <stop> inside
            <defs> is nothing, so the crease came out invisible. --border-strong
            was then still too dark to see against the panel; --text-muted is
            the lightest neutral and reads on both themes. */}
        <linearGradient id="vat-crease" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--text-muted)" stopOpacity="0" />
          <stop offset="14%" stopColor="var(--text-muted)" stopOpacity="0.85" />
          <stop offset="86%" stopColor="var(--text-muted)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--text-muted)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ---------- above the crease: one client's installation ---------- */}
      <text x="40" y="34" className="fill-accent-default text-[13px] tracking-[0.22em] uppercase">
        In the browser
      </text>
      <text x="880" y="34" textAnchor="end" className="fill-text-muted text-[13px]">
        keeps working with the connection down
      </text>

      {/* Two ghosted installations behind the detailed one — many clients, one
          build, no per-client deployment. */}
      <rect
        x="96"
        y="72"
        width="600"
        height="150"
        rx="14"
        className="stroke-border-subtle"
        strokeWidth="1.5"
      />
      <rect
        x="72"
        y="64"
        width="600"
        height="150"
        rx="14"
        className="stroke-border-default"
        strokeWidth="1.5"
      />

      <rect
        x="48"
        y="56"
        width="600"
        height="150"
        rx="14"
        className="fill-surface-overlay stroke-border-strong"
        strokeWidth="1.5"
      />

      <text x="72" y="88" className="fill-text-muted text-[12px] tracking-[0.2em] uppercase">
        One installation
      </text>

      {/* The shell sits above a core of modules that never touch the DOM. */}
      <rect
        x="72"
        y="100"
        width="552"
        height="34"
        rx="8"
        className="fill-surface-base stroke-border-default"
        strokeWidth="1.25"
      />
      <text x="88" y="122" className="fill-text-primary text-[14px]">
        app.html — one shell, four transaction screens
      </text>

      <g className="fill-surface-base stroke-border-default" strokeWidth="1.25">
        <rect x="72" y="144" width="104" height="30" rx="8" />
        <rect x="184" y="144" width="104" height="30" rx="8" />
        <rect x="296" y="144" width="104" height="30" rx="8" />
        <rect x="408" y="144" width="104" height="30" rx="8" />
        <rect x="520" y="144" width="104" height="30" rx="8" />
      </g>
      <g className="fill-text-secondary font-serif text-[12px]" textAnchor="middle">
        <text x="124" y="164">
          ledger.js
        </text>
        <text x="236" y="164">
          fiscal
        </text>
        <text x="348" y="164">
          auth
        </text>
        <text x="460" y="164">
          sync
        </text>
        <text x="572" y="164">
          accounts
        </text>
      </g>
      <text x="72" y="196" className="fill-text-muted text-[12px]">
        Framework-free core. No DOM dependencies, so it is testable under Node.
      </text>

      {/* Local persistence, drawn as the thing the core writes through. */}
      <rect
        x="688"
        y="56"
        width="184"
        height="150"
        rx="14"
        className="fill-surface-overlay stroke-border-strong"
        strokeWidth="1.5"
      />
      <text x="712" y="88" className="fill-text-muted text-[12px] tracking-[0.2em] uppercase">
        Local copy
      </text>
      <text x="712" y="120" className="fill-text-primary font-serif text-[14px]">
        IndexedDB
      </text>
      <text x="712" y="146" className="fill-text-secondary text-[12px]">
        The working copy every
      </text>
      <text x="712" y="164" className="fill-text-secondary text-[12px]">
        screen reads.
      </text>
      <text x="712" y="192" className="fill-accent-default font-serif text-[12px]">
        + outbox (queued writes)
      </text>

      <path
        d="M648 131 H688"
        className="stroke-border-strong"
        strokeWidth="1.5"
        markerEnd="url(#vat-arrow)"
      />

      {/* ---------- the crease: the sync boundary ---------- */}
      <path d="M40 268 H880" stroke="url(#vat-crease)" strokeWidth="1.5" strokeDasharray="9 6" />

      {/* The label sits on the crease rather than floating beside it, with the
          panel colour behind it so the dashes break cleanly around the text. */}
      <rect
        x="374"
        y="253"
        width="172"
        height="30"
        rx="15"
        className="fill-surface-raised stroke-border-strong"
        strokeWidth="1.25"
      />
      <text
        x="460"
        y="272"
        textAnchor="middle"
        className="fill-text-secondary text-[11.5px] tracking-[0.2em] uppercase"
      >
        Sync boundary
      </text>

      <text x="880" y="246" textAnchor="end" className="fill-text-muted text-[12px]">
        a cycle is push, then pull — never the other way round
      </text>

      {/* Push and pull, drawn crossing the crease in opposite directions. */}
      <path
        d="M240 206 V330"
        className="stroke-accent-default"
        strokeWidth="1.75"
        markerEnd="url(#vat-arrow-accent)"
      />
      <text x="252" y="300" className="fill-accent-default font-serif text-[12px]">
        1. push
      </text>

      <path
        d="M660 330 V206"
        className="stroke-border-strong"
        strokeWidth="1.75"
        markerEnd="url(#vat-arrow)"
      />
      <text x="560" y="300" className="fill-text-muted font-serif text-[12px]">
        2. then pull
      </text>

      {/* ---------- below the crease: the shared database ---------- */}
      <text x="40" y="368" className="fill-accent-default text-[13px] tracking-[0.22em] uppercase">
        In PostgreSQL
      </text>
      <text x="880" y="368" textAnchor="end" className="fill-text-muted text-[13px]">
        one deployment, every client
      </text>

      <rect
        x="40"
        y="388"
        width="840"
        height="140"
        rx="14"
        className="fill-surface-overlay stroke-border-strong"
        strokeWidth="1.5"
      />

      <text x="64" y="418" className="fill-text-primary text-[14px]">
        Supabase — PostgreSQL + Auth
      </text>

      <g className="fill-surface-base stroke-border-default" strokeWidth="1.25">
        <rect x="64" y="432" width="92" height="28" rx="7" />
        <rect x="164" y="432" width="92" height="28" rx="7" />
        <rect x="264" y="432" width="92" height="28" rx="7" />
        <rect x="364" y="432" width="92" height="28" rx="7" />
        <rect x="464" y="432" width="92" height="28" rx="7" />
        <rect x="564" y="432" width="112" height="28" rx="7" />
        <rect x="684" y="432" width="92" height="28" rx="7" />
        <rect x="784" y="432" width="72" height="28" rx="7" />
      </g>
      <g className="fill-text-secondary font-serif text-[11px]" textAnchor="middle">
        <text x="110" y="450">
          tenants
        </text>
        <text x="210" y="450">
          users
        </text>
        <text x="310" y="450">
          accounts
        </text>
        <text x="410" y="450">
          parties
        </text>
        <text x="510" y="450">
          vouchers
        </text>
        <text x="620" y="450">
          ledger_lines
        </text>
        <text x="730" y="450">
          audit_log
        </text>
        <text x="820" y="450">
          settings
        </text>
      </g>

      {/* The boundary that makes one database safe to share. */}
      <rect
        x="64"
        y="476"
        width="792"
        height="36"
        rx="9"
        className="fill-surface-base stroke-accent-default"
        strokeWidth="1.25"
        strokeDasharray="4 4"
      />
      <text x="80" y="499" className="fill-accent-default text-[12.5px]">
        Row-level security — every table keyed to the tenant_id inside the caller&rsquo;s signed
        token, never to anything the browser can edit
      </text>

      <defs>
        <marker
          id="vat-arrow"
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
          id="vat-arrow-accent"
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
