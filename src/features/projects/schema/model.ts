/**
 * Database schemas rendered by the 3D explorer.
 *
 * Every table, column and foreign key below is transcribed from the project's
 * own `schema.sql`, not summarised from memory — the explorer replaced a link
 * that used to send visitors to that file on GitHub, so it has to be at least
 * as truthful as the file was.
 *
 * Positions are authored by hand rather than solved by a layout algorithm. The
 * arrangement is the argument: in the VAT schema everything tenant-scoped sits
 * on one plane beneath `tenants`, with the postings table at the centre because
 * every figure in the product is derived from it.
 */

export type SchemaKeyKind = "pk" | "fk";

export interface SchemaColumn {
  readonly name: string;
  readonly type: string;
  /** Shown after the type — a check constraint's allowed values, usually. */
  readonly note?: string;
  readonly key?: SchemaKeyKind;
}

/** `root` is what everything hangs off; `core` is the table that matters most. */
export type SchemaEmphasis = "root" | "core" | "normal";

export interface SchemaTable {
  readonly id: string;
  readonly name: string;
  /** One line, shown under the name in the inspector and on the fallback list. */
  readonly role: string;
  readonly detail: string;
  readonly columns: readonly SchemaColumn[];
  /** [x, y, z] in scene units. y separates the tenant plate from the rest. */
  readonly position: readonly [number, number, number];
  readonly footprint: readonly [number, number];
  readonly emphasis: SchemaEmphasis;
}

/**
 * `scoped` is the composite (tenant_id, …) form — the one that makes crossing a
 * tenant boundary physically impossible rather than merely forbidden.
 */
export type SchemaRelationKind = "tenant" | "scoped" | "plain" | "self";

export interface SchemaRelation {
  readonly from: string;
  readonly to: string;
  readonly label: string;
  readonly kind: SchemaRelationKind;
}

export interface SchemaLegendEntry {
  readonly kind: SchemaRelationKind;
  readonly label: string;
}

export interface SchemaModel {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly caption: string;
  readonly source: string;
  readonly tables: readonly SchemaTable[];
  readonly relations: readonly SchemaRelation[];
  readonly legend: readonly SchemaLegendEntry[];
}

const vatBillingSchema: SchemaModel = {
  slug: "vat-billing-system",
  title: "VAT Billing System — the multi-tenant ledger, in three dimensions",
  summary:
    "Nine tables. One of them — tenants — sits on its own plate above the rest, and every table below carries a tenant id that points back up at it. Drag to orbit, and select any table to read its columns.",
  caption:
    "The raised plate is the client registry the vendor owns. Everything on the lower plane belongs to exactly one tenant, and the amber links are composite foreign keys: a row cannot physically reference another tenant's row.",
  source: "db/schema.sql",
  tables: [
    {
      id: "tenants",
      name: "tenants",
      role: "The client registry — one row per business the system was sold to",
      detail:
        "Written by the vendor console and read-only to the client, so a business can see its own plan and expiry but cannot extend either. Every other table in the schema references this one.",
      position: [0, 2.9, 0],
      footprint: [2.5, 1.5],
      emphasis: "root",
      columns: [
        { name: "id", type: "text", key: "pk" },
        { name: "code", type: "text", note: "unique short handle" },
        { name: "name", type: "text", note: "trading name" },
        { name: "status", type: "text", note: "trial · active · suspended · closed" },
        { name: "plan", type: "text" },
        { name: "trial_ends_on", type: "date" },
        { name: "expires_on", type: "date", note: "null = no expiry" },
        { name: "auth_user_id", type: "uuid", note: "the owner account" },
        { name: "notes", type: "text", note: "vendor's private notes" },
      ],
    },
    {
      id: "ledger_lines",
      name: "ledger_lines",
      role: "The postings — the single source of truth for every figure",
      detail:
        "No report reads a voucher's totals. Every balance, register and return in the product is a sum over these rows, which is why they cannot disagree with one another. Two check constraints hold the shape: exactly one of debit and credit is non-zero, and neither is ever negative.",
      position: [0, 0, 0],
      footprint: [2.9, 1.7],
      emphasis: "core",
      columns: [
        { name: "id", type: "text", key: "pk" },
        { name: "tenant_id", type: "text", key: "fk" },
        { name: "voucher_id", type: "text", key: "fk" },
        { name: "account_code", type: "text", key: "fk" },
        { name: "party_id", type: "text", key: "fk", note: "nullable" },
        { name: "date", type: "date" },
        { name: "seq", type: "integer" },
        { name: "debit", type: "numeric(16,2)", note: "check: one side is zero" },
        { name: "credit", type: "numeric(16,2)", note: "check: never negative" },
      ],
    },
    {
      id: "vouchers",
      name: "vouchers",
      role: "The document header — nine types over one chart of accounts",
      detail:
        "One row per business document. A return points at the purchase or sale it reverses through linked_voucher_id, and that constraint is deferrable because a batch push can legitimately carry both rows in one statement and PostgREST does not get to choose their order.",
      position: [0, 0, -2.9],
      footprint: [2.7, 1.6],
      emphasis: "normal",
      columns: [
        { name: "id", type: "text", key: "pk" },
        { name: "tenant_id", type: "text", key: "fk" },
        { name: "voucher_no", type: "text", note: "unique within a tenant" },
        {
          name: "type",
          type: "text",
          note: "purchase · sales · both returns · payment · receipt · journal · contra · opening",
        },
        { name: "date", type: "date" },
        { name: "party_id", type: "text", key: "fk" },
        { name: "taxable", type: "numeric(16,2)" },
        { name: "non_taxable", type: "numeric(16,2)" },
        { name: "vat", type: "numeric(16,2)" },
        { name: "total", type: "numeric(16,2)" },
        {
          name: "linked_voucher_id",
          type: "text",
          key: "fk",
          note: "deferrable, self-referencing",
        },
        { name: "void", type: "boolean", note: "cancels the effect, keeps the number" },
      ],
    },
    {
      id: "accounts",
      name: "accounts",
      role: "The chart of accounts, keyed by (tenant, code)",
      detail:
        "Every client has their own account 1010, and they are different accounts. That is why the primary key is composite and why every posting references it as a composite pair rather than by code alone.",
      position: [-3.3, 0, -1.0],
      footprint: [2.4, 1.4],
      emphasis: "normal",
      columns: [
        { name: "tenant_id", type: "text", key: "pk" },
        { name: "code", type: "text", key: "pk" },
        { name: "name", type: "text" },
        { name: "type", type: "text", note: "asset · liability · equity · income · expense" },
        { name: "group", type: "text" },
        { name: "system", type: "boolean", note: "seeded, not user-created" },
        { name: "active", type: "boolean" },
      ],
    },
    {
      id: "parties",
      name: "parties",
      role: "Debtors and creditors in one list",
      detail:
        "v1 joined reports to parties on the name string, so renaming a customer silently detached their history. Parties are now referenced by id, and by a composite id that carries the tenant with it.",
      position: [3.3, 0, -1.0],
      footprint: [2.4, 1.4],
      emphasis: "normal",
      columns: [
        { name: "id", type: "text", key: "pk" },
        { name: "tenant_id", type: "text", key: "fk" },
        { name: "name", type: "text" },
        { name: "type", type: "text", note: "customer · supplier · both" },
        { name: "pan_vat", type: "text" },
        { name: "credit_limit", type: "numeric(16,2)" },
        { name: "credit_days", type: "integer" },
      ],
    },
    {
      id: "fiscal_years",
      name: "fiscal_years",
      role: "The register that makes a closed year actually closed",
      detail:
        "Closing records the books as they stood at the moment of closure, so a reopen can be reconciled against the figures the closer signed off. A database trigger — not a UI guard — refuses writes dated inside a closed year.",
      position: [-3.3, 0, 1.9],
      footprint: [2.4, 1.4],
      emphasis: "normal",
      columns: [
        { name: "tenant_id", type: "text", key: "pk" },
        { name: "fy", type: "integer", key: "pk" },
        { name: "label", type: "text" },
        { name: "start_date", type: "date" },
        { name: "end_date", type: "date", note: "check: after start_date" },
        { name: "status", type: "text", note: "open · closed" },
        { name: "closing_debit", type: "numeric(16,2)" },
        { name: "closing_credit", type: "numeric(16,2)" },
        { name: "closing_vouchers", type: "integer" },
      ],
    },
    {
      id: "users",
      name: "users",
      role: "Staff and their roles — and no password material at all",
      detail:
        "The salt, password hash, failed-attempt counter and lockout timestamp were dropped outright when credentials moved to Supabase Auth. What is kept is only what the application genuinely owns: whether someone still has to choose their own password, and when they last did.",
      position: [3.3, 0, 1.9],
      footprint: [2.4, 1.4],
      emphasis: "normal",
      columns: [
        { name: "id", type: "text", key: "pk" },
        { name: "tenant_id", type: "text", key: "fk" },
        { name: "username", type: "text", note: "unique within a tenant, case-insensitive" },
        { name: "role", type: "text", note: "superadmin · admin · accountant · staff · viewer" },
        { name: "must_change_password", type: "boolean" },
        { name: "password_changed_at", type: "timestamptz" },
        { name: "active", type: "boolean" },
        { name: "last_login_at", type: "timestamptz" },
      ],
    },
    {
      id: "audit_log",
      name: "audit_log",
      role: "Append-only record of who changed what",
      detail:
        "Indexed by tenant and time descending, because the only question ever asked of it is what happened most recently in one client's books.",
      position: [-1.6, 0, 3.6],
      footprint: [2.2, 1.3],
      emphasis: "normal",
      columns: [
        { name: "id", type: "text", key: "pk" },
        { name: "tenant_id", type: "text", key: "fk" },
        { name: "at", type: "timestamptz" },
        { name: "user", type: "text" },
        { name: "action", type: "text" },
        { name: "entity", type: "text" },
        { name: "ref_id", type: "text" },
      ],
    },
    {
      id: "app_settings",
      name: "app_settings",
      role: "Company details, counters and print options, as documents",
      detail:
        "Kept as one jsonb document per key rather than shredded into columns that would need a migration every time a print option is added. These are single objects, not collections — the one place where jsonb is the honest choice.",
      position: [1.6, 0, 3.6],
      footprint: [2.2, 1.3],
      emphasis: "normal",
      columns: [
        { name: "tenant_id", type: "text", key: "pk" },
        { name: "key", type: "text", key: "pk", note: "company · settings · counters · schema" },
        { name: "value", type: "jsonb" },
        { name: "updated_at", type: "timestamptz" },
      ],
    },
  ],
  relations: [
    { from: "users", to: "tenants", label: "tenant_id → tenants.id", kind: "tenant" },
    { from: "accounts", to: "tenants", label: "tenant_id → tenants.id", kind: "tenant" },
    { from: "parties", to: "tenants", label: "tenant_id → tenants.id", kind: "tenant" },
    { from: "fiscal_years", to: "tenants", label: "tenant_id → tenants.id", kind: "tenant" },
    { from: "vouchers", to: "tenants", label: "tenant_id → tenants.id", kind: "tenant" },
    { from: "ledger_lines", to: "tenants", label: "tenant_id → tenants.id", kind: "tenant" },
    { from: "audit_log", to: "tenants", label: "tenant_id → tenants.id", kind: "tenant" },
    { from: "app_settings", to: "tenants", label: "tenant_id → tenants.id", kind: "tenant" },
    {
      from: "ledger_lines",
      to: "vouchers",
      label: "(tenant_id, voucher_id) → vouchers",
      kind: "scoped",
    },
    {
      from: "ledger_lines",
      to: "accounts",
      label: "(tenant_id, account_code) → accounts",
      kind: "scoped",
    },
    {
      from: "ledger_lines",
      to: "parties",
      label: "(tenant_id, party_id) → parties",
      kind: "scoped",
    },
    { from: "vouchers", to: "parties", label: "(tenant_id, party_id) → parties", kind: "scoped" },
    {
      from: "vouchers",
      to: "vouchers",
      label: "linked_voucher_id → vouchers.id",
      kind: "self",
    },
  ],
  legend: [
    { kind: "tenant", label: "tenant_id → tenants.id, on delete cascade" },
    { kind: "scoped", label: "Composite key — cannot cross a tenant boundary" },
    { kind: "self", label: "Self-reference, deferrable" },
  ],
};

const travoraSchema: SchemaModel = {
  slug: "travora",
  title: "Travora — five tables, all of them behind row-level security",
  summary:
    "A small schema on purpose. Users extend Supabase Auth rather than duplicating it, expenses hang off both a trip and a category, and a category with no owner is a system default everybody can read.",
  caption:
    "Row-level security is enabled on all five tables, so 'whose data is this' is answered by PostgreSQL rather than by a filter in the front end. Drag to orbit, and select a table to read its columns.",
  source: "database/schema.sql",
  tables: [
    {
      id: "users",
      name: "users",
      role: "Profiles, keyed to Supabase Auth rather than copied from it",
      detail:
        "The primary key is the auth user's id, so there is exactly one identity in the system. Deleting the auth user cascades through everything below.",
      position: [0, 2.6, 0],
      footprint: [2.5, 1.5],
      emphasis: "root",
      columns: [
        { name: "id", type: "uuid", key: "pk", note: "→ auth.users.id" },
        { name: "email", type: "text", note: "unique" },
        { name: "full_name", type: "text" },
        { name: "avatar_url", type: "text", note: "populated from Google OAuth" },
        { name: "preferred_currency", type: "text", note: "default NPR" },
      ],
    },
    {
      id: "expenses",
      name: "expenses",
      role: "The records everything else exists to explain",
      detail:
        "Each expense stores the amount as it was paid, the NPR equivalent, and the rate that connects them — so a total can be re-derived and explained months later instead of being taken on trust. The receipt image is kept alongside it.",
      position: [0, 0, 0],
      footprint: [2.9, 1.7],
      emphasis: "core",
      columns: [
        { name: "id", type: "text", key: "pk" },
        { name: "trip_id", type: "text", key: "fk" },
        { name: "category_id", type: "text", key: "fk" },
        { name: "amount", type: "numeric", note: "as paid" },
        { name: "currency", type: "text" },
        { name: "amount_in_npr", type: "numeric" },
        { name: "exchange_rate", type: "numeric", note: "the rate actually used" },
        { name: "payment_method", type: "text", note: "cash · card · digital" },
        { name: "receipt_image", type: "text", note: "from in-browser OCR" },
        { name: "expense_date", type: "timestamptz" },
      ],
    },
    {
      id: "trips",
      name: "trips",
      role: "A journey with a budget, not a folder for receipts",
      detail:
        "Created by the onboarding interview: destination, dates, budget, party size and interests. The generated itinerary is stored back onto the row as jsonb, so it survives a reload and can be revised.",
      position: [-3.0, 0, -2.1],
      footprint: [2.5, 1.5],
      emphasis: "normal",
      columns: [
        { name: "id", type: "text", key: "pk" },
        { name: "user_id", type: "uuid", key: "fk" },
        { name: "name", type: "text" },
        { name: "destination", type: "text" },
        { name: "start_date", type: "date" },
        { name: "end_date", type: "date" },
        { name: "budget", type: "numeric" },
        { name: "status", type: "text", note: "active · completed · planned" },
        { name: "number_of_travelers", type: "integer" },
        { name: "interests", type: "text[]" },
        { name: "itinerary", type: "jsonb", note: "generated, then editable" },
      ],
    },
    {
      id: "categories",
      name: "categories",
      role: "Seven seeded defaults, plus whatever you add yourself",
      detail:
        "The one genuinely interesting policy in the schema: a null user_id means a system default that every account can read, and a non-null one means a category somebody made for themselves. Reads match either; writes match only your own.",
      position: [3.0, 0, -2.1],
      footprint: [2.5, 1.5],
      emphasis: "normal",
      columns: [
        { name: "id", type: "text", key: "pk" },
        { name: "user_id", type: "uuid", key: "fk", note: "null = system default" },
        { name: "name", type: "text" },
        { name: "icon", type: "text" },
        { name: "color", type: "text", note: "hex, for the breakdown chart" },
        { name: "is_default", type: "boolean" },
      ],
    },
    {
      id: "chat_messages",
      name: "chat_messages",
      role: "What makes a follow-up question make sense",
      detail:
        "The assistant's conversation history, stored per user so a multi-turn exchange has something to remember. Message and response are kept as a pair rather than as separate rows.",
      position: [0, 0, 3.0],
      footprint: [2.5, 1.4],
      emphasis: "normal",
      columns: [
        { name: "id", type: "text", key: "pk" },
        { name: "user_id", type: "uuid", key: "fk" },
        { name: "message", type: "text" },
        { name: "response", type: "text" },
        { name: "created_at", type: "timestamptz" },
      ],
    },
  ],
  relations: [
    { from: "trips", to: "users", label: "user_id → users.id, cascade", kind: "tenant" },
    { from: "chat_messages", to: "users", label: "user_id → users.id, cascade", kind: "tenant" },
    {
      from: "categories",
      to: "users",
      label: "user_id → users.id, nullable",
      kind: "plain",
    },
    { from: "expenses", to: "trips", label: "trip_id → trips.id, cascade", kind: "scoped" },
    {
      from: "expenses",
      to: "categories",
      label: "category_id → categories.id",
      kind: "scoped",
    },
  ],
  legend: [
    { kind: "tenant", label: "Owned by a user — cascades on delete" },
    { kind: "scoped", label: "Links an expense to its trip and its kind" },
    { kind: "plain", label: "Nullable owner — null means a shared default" },
  ],
};

const schemasBySlug: Readonly<Record<string, SchemaModel>> = {
  [vatBillingSchema.slug]: vatBillingSchema,
  [travoraSchema.slug]: travoraSchema,
};

export function getSchemaModel(slug: string): SchemaModel | undefined {
  return schemasBySlug[slug];
}
