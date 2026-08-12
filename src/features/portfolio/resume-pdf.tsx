import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import { siteConfig } from "@/config/site";
import {
  resumeEducation,
  resumeProjects,
  resumeRoles,
  resumeSummary,
  resumeTitle,
  skillGroups,
  trainings,
} from "@/features/portfolio/content";

/**
 * The CV as a real PDF, drawn rather than printed.
 *
 * `window.print()` produced a good document but could never produce a clean
 * one: the date and page title along the top of the sheet, and the URL and
 * "1/3" along the bottom, are painted by the browser into the page margin box.
 * No selector reaches them and no CSS property disables them — the only switch
 * is a checkbox in the reader's own print dialogue, which defaults to on and
 * which a website cannot set on anyone's behalf. A CV going to admissions
 * readers with "localhost:3000/resume 1/3" across the foot of it is not a
 * document you can send, and the only way to be certain it never happens is to
 * stop asking the browser to make the file.
 *
 * The original reason for printing rather than checking a PDF into `public/`
 * still holds, and is preserved here: this renders from the same content module
 * the /resume page reads, so the file can never drift into describing a version
 * of the site that no longer exists. It is generated per request, not built.
 *
 * Set in Helvetica, which ships inside the PDF format itself. Registering IBM
 * Plex to match the site would mean shipping four font binaries into a
 * serverless bundle to gain nothing a recruiter will notice — and Helvetica is
 * what a CV is expected to look like, including to the keyword parsers that
 * read it before a person does.
 */

// react-pdf hyphenates aggressively by default, which on a narrow measure
// breaks words like "double-entry" into fragments mid-column. A CV should
// never hyphenate; returning the word whole switches it off.
Font.registerHyphenationCallback((word) => [word]);

const INK = "#111111";
const INK_SOFT = "#333333";
const RULE = "#999999";
const ACCENT = "#9a3412";

/** 14mm at 72dpi, matching the margin the print stylesheet used. */
const PAGE_MARGIN = 40;

const styles = StyleSheet.create({
  page: {
    paddingTop: PAGE_MARGIN,
    paddingBottom: PAGE_MARGIN,
    paddingHorizontal: PAGE_MARGIN,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.45,
    color: INK_SOFT,
  },
  // The page's 1.45 leading is right for body copy and far too loose at 20pt,
  // where it dropped the name onto the line beneath it.
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 20,
    lineHeight: 1.15,
    color: INK,
    letterSpacing: 0.5,
  },
  title: { fontSize: 10.5, marginTop: 4, color: INK_SOFT },
  contacts: { flexDirection: "row", flexWrap: "wrap", marginTop: 6, fontSize: 9 },
  contactSep: { color: RULE, marginHorizontal: 5 },
  link: { color: ACCENT, textDecoration: "none" },

  sectionHeading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: INK,
    letterSpacing: 1.1,
    marginTop: 15,
    paddingBottom: 3,
    borderBottomWidth: 0.75,
    borderBottomColor: RULE,
  },

  entry: { marginTop: 9 },
  entryTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  entryTitle: { fontFamily: "Helvetica-Bold", fontSize: 10.5, color: INK, flexShrink: 1 },
  entryMeta: { fontSize: 9, color: INK_SOFT, marginLeft: 12 },
  entrySubtitle: { fontFamily: "Helvetica-Oblique", fontSize: 9, marginTop: 1.5 },

  bulletRow: { flexDirection: "row", marginTop: 3, paddingRight: 4 },
  bulletDot: { width: 9, fontSize: 9.5 },
  bulletText: { flex: 1 },

  paragraph: { marginTop: 6 },

  twoColumn: { flexDirection: "row", flexWrap: "wrap", marginTop: 5 },
  twoColumnItem: { width: "50%", paddingRight: 12, marginBottom: 3 },

  skillRow: { flexDirection: "row", marginTop: 3 },
  skillLabel: { fontFamily: "Helvetica-Bold", color: INK, width: 130 },
  skillItems: { flex: 1 },
});

/**
 * Display text is derived from the href rather than written beside it — the
 * same rule the web résumé follows, so the two can never advertise different
 * accounts for the same service.
 */
function displayUrl(href: string): string {
  return href
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

/**
 * `minPresenceAhead` reserves space below the heading before committing it to
 * the current page. Without it a section title lands alone at the foot of a
 * sheet with its first entry overleaf — which is the paged-media equivalent of
 * the `break-after: avoid` the print stylesheet already applies to headings.
 */
function SectionHeading({ children }: { readonly children: string }): React.JSX.Element {
  return (
    <View minPresenceAhead={54}>
      <Text style={styles.sectionHeading}>{children.toUpperCase()}</Text>
    </View>
  );
}

function Bullets({ items }: { readonly items: readonly string[] }): React.JSX.Element {
  return (
    <View>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow} wrap={false}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

/**
 * `wrap={false}` keeps a heading with its first lines. Without it react-pdf
 * will happily leave a job title alone at the foot of a page.
 */
function Entry({
  title,
  meta,
  subtitle,
  children,
}: {
  readonly title: string;
  readonly meta: string;
  readonly subtitle?: string;
  readonly children?: React.ReactNode;
}): React.JSX.Element {
  return (
    <View style={styles.entry} wrap={false}>
      <View style={styles.entryTopRow}>
        <Text style={styles.entryTitle}>{title}</Text>
        <Text style={styles.entryMeta}>{meta}</Text>
      </View>
      {subtitle ? <Text style={styles.entrySubtitle}>{subtitle}</Text> : null}
      {children}
    </View>
  );
}

export function ResumeDocument(): React.JSX.Element {
  const contacts = [
    { value: siteConfig.socials.email, href: `mailto:${siteConfig.socials.email}` },
    { value: `+${siteConfig.whatsapp.number}`, href: siteConfig.whatsapp.href },
    { value: displayUrl(siteConfig.url), href: siteConfig.url },
    { value: displayUrl(siteConfig.socials.github), href: siteConfig.socials.github },
    { value: displayUrl(siteConfig.socials.linkedin), href: siteConfig.socials.linkedin },
  ];

  return (
    <Document
      title={`${siteConfig.name} — CV`}
      author={siteConfig.name}
      subject={resumeTitle}
      creator={siteConfig.url}
      producer={siteConfig.url}
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{siteConfig.name.toUpperCase()}</Text>
        <Text style={styles.title}>{resumeTitle}</Text>

        {/* One run separated by rules, the way a CV header reads. The links are
            real PDF annotations, so a reader can click through to the work —
            something the printed version could never offer. */}
        <View style={styles.contacts}>
          {contacts.map((contact, index) => (
            <View key={contact.value} style={{ flexDirection: "row" }}>
              <Link src={contact.href} style={styles.link}>
                {contact.value}
              </Link>
              {index < contacts.length - 1 ? <Text style={styles.contactSep}>|</Text> : null}
            </View>
          ))}
          <Text style={styles.contactSep}>|</Text>
          <Text>{siteConfig.location}</Text>
        </View>

        <SectionHeading>Summary</SectionHeading>
        <Text style={styles.paragraph}>{resumeSummary}</Text>

        <SectionHeading>Experience</SectionHeading>
        {resumeRoles.map((role) => (
          <Entry
            key={`${role.organization}-${role.period}`}
            title={role.title}
            meta={role.period}
            subtitle={`${role.organization}, ${role.location}`}
          >
            <Bullets items={role.bullets} />
          </Entry>
        ))}

        <SectionHeading>Selected projects</SectionHeading>
        {resumeProjects.map((project) => (
          <Entry
            key={project.slug}
            title={project.name}
            meta={project.period}
            subtitle={`${displayUrl(siteConfig.url)}/projects/${project.slug}`}
          >
            <Bullets items={project.bullets} />
          </Entry>
        ))}

        <SectionHeading>Education</SectionHeading>
        {resumeEducation.map((entry) => (
          <Entry
            key={entry.qualification}
            title={entry.qualification}
            meta={entry.period}
            subtitle={entry.institution}
          >
            <Text style={{ marginTop: 2 }}>{entry.result}</Text>
          </Entry>
        ))}

        <SectionHeading>Industry training</SectionHeading>
        <View style={styles.twoColumn}>
          {trainings.map((training) => (
            <View key={`${training.title}-${training.period}`} style={styles.twoColumnItem}>
              <Text>
                <Text style={{ fontFamily: "Helvetica-Bold", color: INK }}>{training.title}</Text>
                {` — ${training.provider}, ${training.period}`}
              </Text>
            </View>
          ))}
        </View>

        <SectionHeading>Technical</SectionHeading>
        {skillGroups.map((group) => (
          <View key={group.title} style={styles.skillRow} wrap={false}>
            <Text style={styles.skillLabel}>{group.title}</Text>
            <Text style={styles.skillItems}>{group.items.join(", ")}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
