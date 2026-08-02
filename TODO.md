# TODO — private working notes

Not rendered on the site. This file exists because these notes were previously
shipping as visitor-facing copy (a "Still needed before launch" checklist in the
contact section, and per-timeline-entry "scan the certificate" instructions).
Keep asset tracking here, never in `content.ts` or MDX bodies.

## Assets still needed

- [ ] `public/resume.pdf` — required by the Download Resume button
- [ ] `public/logos/nsa-travels-logo.svg` — credibility mark for the case study
- [ ] `public/certificates/` — certificate + achievement images
- [ ] Open Graph share image
- [ ] Professional headshot (current portrait is `src/assets/portrait.png`)
- [ ] Company website screenshots
- [ ] Accounting app screenshots
- [ ] Travora screenshots or demo captures
- [ ] Travelport / Sabre / Galileo / VAT certificate scans
- [ ] Workshop certificates (UI/UX, WordPress, QA)
- [ ] SEE certificate / transcript scan
- [ ] Office or team photo

Once the NSA Travels screenshots exist, restore an `artifacts` section to
`content/projects/nsa-travels.mdx` — it was removed because it had no real
content, only a note describing what would eventually go there.

## Open decisions

- Unused dependencies: Resend, React Hook Form, Cloudinary, React Three Fiber,
  Radix UI, cmdk are installed but unreferenced in `src/`. Use or uninstall.
- `docs/` references several files that don't exist (`system-design.md`,
  `adr/0001`, `adr/0003`). Write them or drop the references.
