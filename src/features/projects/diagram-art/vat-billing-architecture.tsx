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
    <svg viewBox="0 0 920 480" role="img" aria-hidden="true" className="h-auto w-full" fill="none">
      <defs>
        {/* Three separate things kept this gradient from painting, which is why
            it survived two earlier attempts at fixing the colour.

            1. `currentColor` resolves against whatever references a gradient,
               and for a <stop> inside <defs> that is nothing.
            2. `stopColor` compiles to the stop-color *attribute*, and no SVG
               presentation attribute accepts var() — the token has to be
               handed over as a CSS property, through style.
            3. The real one: gradientUnits defaults to objectBoundingBox, and
               the crease is a horizontal line, so its bounding box is 840 x 0.
               The spec says a gradient in bounding-box units is not rendered
               when either dimension is zero. Any colour fix was going to be
               invisible until this became userSpaceOnUse. */}
        <linearGradient
          id="vat-crease"
          gradientUnits="userSpaceOnUse"
          x1="40"
          y1="0"
          x2="880"
          y2="0"
        >
          <stop offset="0%" style={{ stopColor: "var(--text-muted)", stopOpacity: 0 }} />
          <stop offset="14%" style={{ stopColor: "var(--text-muted)", stopOpacity: 0.85 }} />
          <stop offset="86%" style={{ stopColor: "var(--text-muted)", stopOpacity: 0.85 }} />
          <stop offset="100%" style={{ stopColor: "var(--text-muted)", stopOpacity: 0 }} />
        </linearGradient>
      </defs>

      {/* ---------- above the crease: one client's installation ---------- */}
      <text x="40" y="34" className="fill-accent-default text-[13px] tracking-[0.08em] uppercase">
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

      <text x="72" y="88" className="fill-text-muted text-[12px] tracking-[0.07em] uppercase">
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
      <text x="712" y="88" className="fill-text-muted text-[12px] tracking-[0.07em] uppercase">
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

      {/* ---------- the crease: the sync boundary ----------

          The band between the two blocks used to run from y=222 to y=388 —
          166 units of empty diagram for a label 30 units tall. Worse, both
          arrows stopped at y=330, well short of the database panel, so they
          ended in mid-air instead of touching anything. The band is now sized
          to the arrows that cross it, and the arrows span the full distance
          between the two blocks. */}
      <path d="M40 276 H880" stroke="url(#vat-crease)" strokeWidth="1.5" strokeDasharray="9 6" />

      {/* The label sits on the crease rather than floating beside it, with the
          panel colour behind it so the dashes break cleanly around the text. */}
      <rect
        x="374"
        y="261"
        width="172"
        height="30"
        rx="15"
        className="fill-surface-raised stroke-border-strong"
        strokeWidth="1.25"
      />
      <text
        x="460"
        y="280"
        textAnchor="middle"
        className="fill-text-secondary text-[11.5px] tracking-[0.07em] uppercase"
      >
        Sync boundary
      </text>

      {/* Right-aligned at x=880 this ran straight through the pull arrow. It
          now sits centred under the chip, inside the lane between the two
          arrows (300 and 600) where nothing else is drawn. */}
      <text x="460" y="308" textAnchor="middle" className="fill-text-muted text-[11.5px]">
        push, then pull — never the other way round
      </text>

      {/* Both arrows run the whole way, from just under the browser block to
          the top edge of the database panel, crossing the crease between them.
          Their x positions clear the label chip (374–546) and sit under the
          installation card rather than in the gap beside it — the pull arrow
          used to point at x=660, which is between two panels and belongs to
          neither. */}
      <path
        d="M300 230 V322"
        className="stroke-accent-default"
        strokeWidth="1.75"
        markerEnd="url(#vat-arrow-accent)"
      />
      <text x="312" y="256" className="fill-accent-default font-serif text-[12px]">
        1. push
      </text>

      <path
        d="M600 322 V230"
        className="stroke-border-strong"
        strokeWidth="1.75"
        markerEnd="url(#vat-arrow)"
      />
      <text x="588" y="256" textAnchor="end" className="fill-text-secondary font-serif text-[12px]">
        2. then pull
      </text>

      {/* ---------- below the crease: the shared database ---------- */}
      <text x="40" y="302" className="fill-accent-default text-[13px] tracking-[0.08em] uppercase">
        In PostgreSQL
      </text>
      <text x="880" y="302" textAnchor="end" className="fill-text-muted text-[13px]">
        one deployment, every client
      </text>

      <rect
        x="40"
        y="322"
        width="840"
        height="140"
        rx="14"
        className="fill-surface-overlay stroke-border-strong"
        strokeWidth="1.5"
      />

      <text x="64" y="352" className="fill-text-primary text-[14px]">
        Supabase — PostgreSQL + Auth
      </text>

      <g className="fill-surface-base stroke-border-default" strokeWidth="1.25">
        <rect x="64" y="366" width="92" height="28" rx="7" />
        <rect x="164" y="366" width="92" height="28" rx="7" />
        <rect x="264" y="366" width="92" height="28" rx="7" />
        <rect x="364" y="366" width="92" height="28" rx="7" />
        <rect x="464" y="366" width="92" height="28" rx="7" />
        <rect x="564" y="366" width="112" height="28" rx="7" />
        <rect x="684" y="366" width="92" height="28" rx="7" />
        <rect x="784" y="366" width="72" height="28" rx="7" />
      </g>
      <g className="fill-text-secondary font-serif text-[11px]" textAnchor="middle">
        <text x="110" y="384">
          tenants
        </text>
        <text x="210" y="384">
          users
        </text>
        <text x="310" y="384">
          accounts
        </text>
        <text x="410" y="384">
          parties
        </text>
        <text x="510" y="384">
          vouchers
        </text>
        <text x="620" y="384">
          ledger_lines
        </text>
        <text x="730" y="384">
          audit_log
        </text>
        <text x="820" y="384">
          settings
        </text>
      </g>

      {/* The boundary that makes one database safe to share. */}
      <rect
        x="64"
        y="410"
        width="792"
        height="36"
        rx="9"
        className="fill-surface-base stroke-accent-default"
        strokeWidth="1.25"
        strokeDasharray="4 4"
      />
      <text x="80" y="433" className="fill-accent-default text-[12.5px]">
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
