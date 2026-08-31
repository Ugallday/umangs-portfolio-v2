# Portfolio content bible - Umang Gupta

Single source of truth for who this site is about and what it says. Update
this file when the story changes; treat the actual `content.ts` and MDX
files as what's currently live, not always perfectly in sync with this doc.

---

## 1. Identity

| Field      | Value                                                                              |
| ---------- | ---------------------------------------------------------------------------------- |
| Name       | Umang Gupta                                                                        |
| Origin     | Nepal                                                                              |
| Based in   | Ogden, Utah, US (Weber State University)                                           |
| Status     | Final-year Computer Science student, Data Analytics minor - Weber State University |
| Graduating | December 2026, GPA 3.88                                                            |
| Site       | umanggupta.com.np                                                                  |
| GitHub     | github.com/Ugallday                                                                |
| LinkedIn   | linkedin.com/in/umangupta1                                                         |
| Email      | umanggupta.ug2004@gmail.com                                                        |

**Central message:** hands-on production data-analyst work now, applied ML
research alongside it, positioned as a stepping stone toward data science,
data engineering, and eventually a PhD - not a detour from them.

---

## 2. Job history (source: LinkedIn, as of Aug 2026)

In reverse-chronological order as shown on the résumé and timeline:

1. **Data Analysis and Research Intern**, Utah Transit Authority - 2026-present.
   Data warehousing, ETL, and BI reporting on live fleet data, plus EV fleet
   automation.
2. **Student Data Analyst**, Weber State University - May 2026-present.
   SQL queries, Tableau dashboards, and Argos reports for institutional
   stakeholders.
3. **EAST Dean's Office Student Admin**, Weber State University - Aug
   2025-present. Departmental website content, budget records, event and
   faculty operations logistics.
4. **Food Sustainability Coordinator**, Weber State University - Jun
   2025-Aug 2026. Food recovery logistics (500+ lbs/month), sustainability
   metrics, campus composting program.
5. **Computer Lab Assistant**, Weber State University - Jan 2023-May 2025.
   Technical support across Windows/macOS labs.

Update this list directly from LinkedIn whenever a role changes - it's the
source of truth for both the résumé and timeline sections in `content.ts`.

**Scholarships** (also on the résumé and Background page): Bob and Karen
Woodbury Scholarship (2026-2027, awarded Jun 2026), Louis F. Moench
Scholarship (2023-2027, renewable across the degree), Barbara L. Tanner
Community Engaged Learning Scholarship (2024-2025, awarded Apr 2025), EAST
Dean's Scholarship (renewed every semester since Aug 2025).

---

## 3. Projects (in `content/projects/*.mdx`), ordered by date descending

The `order` field in each file's frontmatter controls display order on
`/projects` and must stay in sync with this list if a new project is added
or a date changes.

1. **obfuscope** (research, Jul 2026-present) - fingerprinting malware
   obfuscation toolchains with a Weber State CS professor, submitted to ACM
   TOPS.
2. **uta-fleet-availability-warehouse** (flagship, 2026-present) -
   star-schema data warehouse, SSIS ETL, Power BI/DAX dashboard for UTA
   fleet operations.
3. **ev-fleet-automation** (2026) - Python/Playwright automation pulling EV
   charging data from Viriciti and ABB into the same warehouse.
4. **ml-trading-bot** (~Apr 2026) - FinBERT sentiment-driven trading bot,
   co-built with a friend, backtested at 15% return / 1.45 Sharpe.
5. **dillards-illinois-analysis** (2024-2025) - group BI project, Power BI,
   $1.65M-$1.7M profitability recommendation.
6. **movie-recommendation-engine** (2024) - KNN + NLP recommender over
   9,000+ titles.
7. **airline-delay-analytics** (2024) - Power BI delay-pattern analysis.

Homepage `FEATURED_SLUGS` in `src/app/page.tsx` shows the top 3 of these
(obfuscope, uta-fleet-availability-warehouse, ev-fleet-automation), same
order as `/projects`.

**Still open:** any further personal/academic projects Umang wants added.
Follow the schema in `src/core/infrastructure/mdx/schemas/project.schema.ts`

- slug, title, summary, phase, period, role, organization, techStack,
  metrics, visual, sections (each with id/heading/body/bullets), order,
  status. Quote `period` in frontmatter even for a bare year (`period: "2026"`)
- an unquoted bare year parses as a YAML number and fails the schema.

---

## 4. Education

**Weber State University** - BS Computer Science, Data Analytics minor.
GPA 3.88. Expected graduation December 2026. Relevant coursework: CS 2350
(Data Structures & Algorithms), Software Engineering I/II, Windows
Application Development, CS 4110 (Formal Languages and Algorithms),
Advanced SQL, CS 4890 (Senior Project/capstone).

---

## 5. Skills (source of truth in `content.ts` `skillGroups`)

- **What I build with:** SQL Server/T-SQL, Oracle SQL, SSIS, Power BI (DAX,
  Power Query), Python (pandas, NumPy, scikit-learn), SSRS, Argos/Banner,
  Git.
- **Also use:** Tableau, KNIME, PostgreSQL, MySQL, MongoDB, Microsoft
  Fabric, Azure.
- **Concepts:** star schema/dimensional modeling, ETL pipeline design,
  applied ML, data validation, BI reporting.

---

## 6. Grad school / research angle

MS in Data Science, Fall 2027 target - explicitly framed around making
research progress in big data, AI, and robotics, then a PhD, then industry
(data engineer, data scientist, analyst, governance, or research
scientist). The Background page's "What's next" section carries this in
full; the framing throughout is that the analyst work already done is the
stepping stone into research, not separate from it. Actively reaching out
to professors for research-assistantship fit; also exploring staying at
UTA via OPT after December 2026 graduation.

---

## 7. Design system

Clean, minimal, restrained - true neutral grayscale palette (no warm or
tinted cast), a single blue accent color used sparingly, generous soft
corners, Inter for both display and body type. Motion is scroll- or
state-triggered, not perpetual - the homepage hero has a subtle animated
line background (`floating-paths.tsx`, opacity-based, GPU-cheap); an
earlier ASCII-video background on the Projects page was tried and removed
(didn't look good, and depended on a third-party CDN the site's CSP
correctly blocked anyway).

---

## 8. Asset checklist

- [x] Headshot - in place at `src/assets/portrait.png`
- [x] Favicon/icon set - "UG" monogram, generated across all sizes
- [ ] `public/resume.pdf` static file (the site generates the CV as a PDF
      on request instead, from the same content module - see
      `src/app/resume.pdf/route.ts`)
- [ ] UTA dashboard screenshots (confirm what's shareable publicly first)
- [ ] ObfuScope paper link/PDF once published or preprint available
- [ ] Personal project screenshots (movie recommender, airline analytics,
      Dillard's, trading bot)

---

## 9. Voice notes

First person, grounded and specific about what was built and what changed
as a result. Where a UTA project touches internal/sensitive data, describe
mechanism and impact without disclosing anything proprietary - check with
UTA before publishing specifics that might not be public.

Known past issue worth remembering: this site started from someone else's
template (a different developer's travel-agency case study), and wrong-person
leftovers have surfaced repeatedly in places that were assumed clean -
section headlines, page metadata, even a code comment. When adding new
sections or copy, grep for anything that doesn't sound like Umang's actual
work before considering it done.
