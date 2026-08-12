# aalokbhandari.com.np — improvement plan

Everything here is drawn from the AALOK 2030 document (§1, §2, §7, §9.1, §11.1–11.2). Each item states the change, the reason, and where possible the exact replacement copy. Ordered by return per hour.

---

## Priority 0 — this weekend

### 1. Rewrite the hero. Lead with correctness, not "real-world problems."

**Current:** _Building Software That Solves Real-World Problems_

The problem: every developer says this. It is unfalsifiable, so it carries no information.

**Replace with:**

> **Aalok Bhandari**
> _I build software that has to be correct._
> Accounting, compliance, and operations systems for businesses that can't afford to be wrong.

**Proof line under it:** `Real books · Multi-tenant PostgreSQL · Offline-first · Nepal`

This works because it is narrow, memorable, and it invites the question _how do you know it's correct?_ — which is a question you want asked, provided item 3 is done.

### 2. Retire or reframe the 1,050× number.

**Current:** _"imported two years of real books — 29,825 rows — in 420 ms, roughly 1,050× faster than the version it replaced."_

A hostile technical reader — which is what an admissions committee and a senior engineer both are — reads 30,000 rows in 420 ms and thinks _that's a bulk insert; `COPY` does that on a laptop_. And a 1,050× speedup means the old version was doing something pathological, almost certainly a row-by-row insert with a round trip each. The sentence advertises that your previous system was slow and invites a question you don't want.

The interesting claim about the VAT system is not speed. It is that it **maintains double-entry correctness across offline clients that reconverge on one multi-tenant database.** That is a distributed-systems problem wearing an accounting costume, and almost no student portfolio has one.

**Replacement headline copy:**

> One ledger, many tenants, no internet required. Double-entry VAT accounting for Nepali travel agencies — each client offline-capable, all of them converging on one multi-tenant PostgreSQL database with row-level security enforced at the database rather than in the frontend.

**If you keep a number, keep a correctness number,** e.g. _"zero unbalanced journal entries across N transactions and M sync conflicts"_ — but only once a test harness exists that produces it. Don't ship the sentence before the harness.

### 3. Make every link canonical.

Currently there are two LinkedIn URLs across your surfaces (`/in/alokbndry10` on the site, `/in/aalok-bhandari-4a28b2247` on GitHub) and three different social handles for the same platforms across pages. One of those LinkedIn profiles is dead or duplicate.

- [ ] Pick one LinkedIn. Delete or merge the other.
- [ ] One GitHub, one site, one email, one WhatsApp number — identical on every page and on GitHub.
- [ ] Fix the GitHub timezone (currently UTC−12; Nepal is UTC+05:45) and location.

Trivial individually. Together they're the kind of thing that, once noticed, makes a reader wonder what else wasn't checked.

---

## Priority 1 — this month

### 4. Cut the skills list from ~40 items to 8.

The site currently lists twelve languages, fourteen frameworks, and ten data/hosting items — including C#, PHP, ASP.NET, Bootstrap, Three.js, Framer Motion, Recharts, Zustand, Vite, and Firebase. A skills list with 40 items communicates less than one with 8, because the reader assumes none of them are deep.

**Keep and defend:** TypeScript · PostgreSQL · React/Next.js · Node.js · SQL · Supabase (RLS) · offline sync/IndexedDB · Git

**Remove from presented capability** (keep the repos, stop listing them as skills): Three.js · Framer Motion · ASP.NET · C# · PHP · MongoDB · Firebase · Bootstrap · Vite-as-a-skill · Zustand-as-a-skill · Recharts-as-a-skill

Consider a second, explicitly labelled tier: _"Learning properly, not claiming yet"_ — Go, AWS, OpenTelemetry, Docker. Honest, and it signals direction.

### 5. Fix the Focus line — two of the three items are aspirational logos.

**Current:** _Focus: Applied AI, cloud, architecture_

- **Applied AI** — the evidence is one call to a hosted LLaMA endpoint for itinerary drafts, plus Tesseract.js OCR. That's API consumption. No evaluation, no dataset, no retrieval, no measurement of whether the output is any good.
- **Cloud** — the evidence is Supabase, Vercel, Netlify, Firebase. Those are platforms that _abstract cloud away_. No VPC, no queue, no infrastructure you provisioned that could fail.
- **Architecture** — real, defensible, evidenced in the VAT system.

Your own site states the principle "no aspirational logos." Two of these three are exactly that.

**Interim replacement:** `Focus: Correctness, PostgreSQL, systems that run offline`

Add AI and cloud back **after** the artifacts exist — a measured accuracy number on a labelled test set, and something actually running on AWS rather than Supabase.

### 6. Add `/now`.

One paragraph, dated, updated monthly. What you're building, what you're reading, what you're deliberately not doing. Cheap to maintain and disproportionately effective — it's the page that tells a stranger you're currently active rather than currently frozen.

### 7. Move `/gaming` to a footer link, or remove it.

7,000 hours in Dota and a Valorant trophy don't serve any of your goals, and they cost you with two specific audiences: admissions committees reading for focus, and employers in your target market. If you keep it, demote it to a personal footer link — not a top-level card alongside your case studies.

### 8. Soften the "two systems, both deployed" framing.

Presenting Travora as a co-flagship next to the VAT system inflates Travora and, by association, deflates the VAT system. Travora is a good seventh-semester project: five tables, RLS, browser OCR, a hosted LLM call — sensible choices that add up to a CRUD app with two integrations.

Restructure the featured section as **one flagship + supporting work**, not two equals.

---

## Priority 2 — this quarter

### 9. Add `/writing`.

Currently missing, and it's where credibility accumulates. One post a month, 1,500+ words, specific. Twelve a year is enough.

**Write about:** things that broke and why · decisions with trade-offs you can articulate · measurements you produced · domain translation (what a BSP settlement file is and why software gets it wrong — almost nobody can write this and it's genuinely interesting).

**Don't write:** motivational posts · "Day 47 of 100 Days of Code" · roadmap screenshots · AI-generated threads · anything political.

**First post, already sitting there:** _"How I test a double-entry ledger for correctness under concurrent offline sync."_

### 10. Add a status page link once one exists.

Nothing says "production" like public uptime. Pair it with a written incident report from a real (or deliberately induced) failure.

---

## The gap the site can't close by editing

Copy changes make the site accurate. They don't make the claims verifiable. These do — and until they exist, every claim on the site rests on your word alone:

| Missing                                                       | Why it matters                                                                          |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| A test suite you can point at                                 | Correctness claims without tests are assertions                                         |
| CI running on every push                                      | Shows discipline, not just capability                                                   |
| Observability — logs, metrics, traces                         | You can't claim production without knowing what production is doing                     |
| A documented incident                                         | Nothing signals "real system" like "here's how it broke and what I changed"             |
| A backup and restore procedure **you have actually executed** | You are holding a business's books — this is the most urgent item in the whole document |
| A second customer                                             | One customer who is your family is a pilot, not a product                               |
| Load / concurrency characteristics                            | You don't know what breaks first                                                        |

The target: **by late 2027, every claim on the site is backed by an artifact a stranger can inspect.** That's the only working definition of a good portfolio.

---

## Checklist

**This weekend**

- [ ] New hero copy + proof line
- [ ] 1,050× metric retired or reframed
- [ ] One LinkedIn; all links canonical across site, GitHub, LinkedIn
- [ ] GitHub timezone and location fixed
- [ ] GitHub profile README replaced (see `README.md`)
- [ ] Rename repo `app` → `travora`, add description and README

**This month**

- [ ] Skills list cut to 8 + an honest "learning" tier
- [ ] Focus line corrected
- [ ] `/now` published
- [ ] `/gaming` demoted to footer
- [ ] Featured section restructured: one flagship, not two

**This quarter**

- [ ] `/writing` shipped with the ledger-testing post
- [ ] Restore drill rehearsed and documented — then link the write-up from the VAT case study
- [ ] Test suite + CI on the VAT system; then add the correctness number to the site
