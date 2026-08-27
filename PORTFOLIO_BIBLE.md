# Portfolio content bible - Umang Gupta

Single source of truth for who this site is about and what it says. Update
this file when the story changes; treat the actual `content.ts` and MDX
files as what's currently live, not always perfectly in sync with this doc.

---

## 1. Identity

| Field | Value |
|---|---|
| Name | Umang Gupta |
| Origin | Nepal |
| Based in | Ogden, Utah, US (Weber State University) |
| Status | Final-year Computer Science student, Data Analytics minor - Weber State University |
| Graduating | December 2026, GPA 3.87 |
| Site | umanggupta.com.np |
| GitHub | github.com/Ugallday |
| LinkedIn | linkedin.com/in/ug-umang-gupta |
| Email | umanggupta.ug2004@gmail.com |

**Central message:** the full arc - hands-on production data work now,
research alongside it, and a funded grad-school track next.

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

---

## 3. Flagship projects (in `content/projects/*.mdx`)

1. **uta-fleet-availability-warehouse** (flagship) - star-schema data
   warehouse, SSIS ETL, Power BI/DAX dashboard for UTA fleet operations.
2. **ev-fleet-automation** - Python/Playwright automation pulling EV
   charging data from Viriciti and ABB into the same warehouse.
3. **obfuscope** - research paper on fingerprinting malware obfuscation
   toolchains with a Weber State CS professor, submitted to ACM TOPS.
4. **personal-data-projects** - movie recommendation engine, airline delay
   analytics, ongoing SQL practice.

Homepage `FEATURED_SLUGS` in `src/app/page.tsx` currently shows the first
three of these, in that order.

**Still pending:** additional personal/academic projects Umang plans to add.
When ready, follow the same MDX frontmatter schema
(`src/core/infrastructure/mdx/schemas/project.schema.ts`) - slug, title,
summary, phase, period, role, organization, techStack, metrics, visual,
sections (each with id/heading/body/bullets), order, status.

---

## 4. Education

**Weber State University** - BS Computer Science, Data Analytics minor.
GPA 3.87. Expected graduation December 2026. Relevant coursework: CS 2350
(Data Structures & Algorithms), Software Engineering I/II, Windows
Application Development, CS 4110 (Formal Languages and Algorithms),
Advanced SQL, CS 4890 (Senior Project/capstone).

---

## 5. Skills (source of truth in `content.ts` `skillGroups`)

- **Core:** SQL Server/T-SQL, Oracle SQL, SSIS, Power BI (DAX, Power Query),
  Python (pandas, NumPy, scikit-learn), SSRS, Argos/Banner, Git.
- **Also:** Tableau, KNIME, PostgreSQL, MySQL, MongoDB, Microsoft Fabric,
  Azure.
- **Concepts:** star schema/dimensional modeling, ETL pipeline design,
  applied ML, data validation, BI reporting.

---

## 6. Grad school / research angle

Funded MS in Data Science or Computer Science, Fall 2027 target. Research
interests grounded in the ObfuScope work (applied ML, security-adjacent data
analysis). Actively reaching out to professors for research-assistantship
fit; also exploring staying at UTA via OPT after December 2026 graduation.

---

## 7. Design system

Clean, minimal, restrained - true neutral grayscale palette (no warm or
tinted cast), a single blue accent color used sparingly, generous soft
corners, Inter for both display and body type. Motion is a simple fade/slide
on scroll - no 3D backgrounds, no typewriter effects, no skeuomorphic
tilt/fold transforms. (Note: as of the last working session, the visual
redesign was paused in favor of finishing content - tokens.css, fonts.ts,
and the fold-reveal/hero components were partially updated toward this
direction but the pass wasn't completed end-to-end.)

---

## 8. Asset checklist

- [x] Headshot - in place at `src/assets/portrait.png`
- [ ] `public/resume.pdf`
- [ ] UTA dashboard screenshots (confirm what's shareable publicly first)
- [ ] ObfuScope paper link/PDF once published or preprint available
- [ ] Personal project screenshots (movie recommender, airline analytics)
- [ ] Any additional project screenshots for projects still to be added

---

## 9. Voice notes

First person, grounded and specific about what was built and what changed
as a result. Where a UTA project touches internal/sensitive data, describe
mechanism and impact without disclosing anything proprietary - check with
UTA before publishing specifics that might not be public.
