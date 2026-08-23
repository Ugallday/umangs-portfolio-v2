import type { StaticImageData } from "next/image";

import { NiryatHubArchitecture } from "@/features/projects/diagram-art/niryat-hub-architecture";
import { SipsetuArchitecture } from "@/features/projects/diagram-art/sipsetu-architecture";
import { TravoraArchitecture } from "@/features/projects/diagram-art/travora-architecture";
import { VatBillingArchitecture } from "@/features/projects/diagram-art/vat-billing-architecture";
import armyTrainingCenterPmWorkflow from "@/assets/diagrams/army-training-center-pm-workflow.svg";
import distributedCalculatorRmi from "@/assets/diagrams/distributed-calculator-rmi.svg";
import hotelBookingArchitecture from "@/assets/diagrams/hotel-booking-architecture.svg";
import nsaTravelsDfd from "@/assets/diagrams/nsa-travels-dfd.svg";
import studentRecordAppArchitecture from "@/assets/diagrams/student-record-app-architecture.svg";
import transportManagementDfd from "@/assets/diagrams/transport-management-dfd.svg";

/**
 * A diagram is either a file or a drawing.
 *
 * The exported .svg files are flat artwork with baked-in dark hexes, so they
 * invert into an unreadable slab under the light theme. The four case studies
 * are drawn inline instead: as real elements they paint from the same
 * tokens as everything else and follow the theme toggle. The remaining
 * coursework diagrams stay as files until they are worth redrawing.
 */
export type DiagramArt =
  | { readonly kind: "image"; readonly src: StaticImageData }
  | { readonly kind: "inline"; readonly Art: () => React.JSX.Element };

export interface ProjectDiagram {
  readonly art: DiagramArt;
  /** Describes the diagram's content, not just its title — screen readers get the shape of it. */
  readonly alt: string;
  readonly caption: string;
}

/**
 * Keyed by project slug. A project without an entry simply renders no
 * diagram, so adding a case study never requires touching this file.
 */
const diagramsBySlug: Readonly<Record<string, ProjectDiagram>> = {
  "niryat-hub": {
    art: { kind: "inline", Art: NiryatHubArchitecture },
    alt: "Architecture diagram for NiryatHub. Eight screens run in one browser, from consignment through to invoice, with session state held in localStorage. Every figure they display comes from a layer of pure functions below — scoring on seven fixed weights, logistics across 48 legs and 24 nodes, eleven seasonal disruptions, and landed cost. Beside that layer, fenced by a dashed border, sit two Claude routes that receive already-computed figures and return prose only, falling back to deterministic text. Everything trade-related enters through one repository module, which reads a bundled seed of 60 market pairs, 58 compliance requirements, 21 importers, 48 costed legs and 11 disruptions.",
    caption:
      "NiryatHub — one seam for the trade data, and a hard ceiling on what the language model is allowed to touch.",
  },
  "vat-billing-system": {
    art: { kind: "inline", Art: VatBillingArchitecture },
    alt: "Layered architecture diagram for the VAT Billing System. Views sit above a framework-free core of ledger, fiscal, authentication and sync modules, which persists the whole database to IndexedDB with an outbox. A push-then-pull sync boundary connects that installation to one Supabase PostgreSQL deployment, where row-level security keyed to the tenant id in a signed token keeps each client's books separate.",
    caption:
      "VAT Billing System — one offline-capable installation per client, converging on one multi-tenant database.",
  },
  "nsa-travels": {
    art: { kind: "image", src: nsaTravelsDfd },
    alt: "Data flow diagram for the NSA Travels internal systems, tracing bookings, customer records, and accounting entries between the travel desk, the accounting app, and cloud backup.",
    caption: "NSA Travels — data flow across the travel desk, accounting, and backup.",
  },
  travora: {
    art: { kind: "inline", Art: TravoraArchitecture },
    alt: "Three-tier architecture diagram for Travora. A React 19 and TypeScript single-page app on Vite handles onboarding, the wallet, in-browser receipt OCR and the assistant. Beneath it, Zustand holds trip and budget state while Groq's hosted LLaMA drafts itineraries without computing any figure. Both sit on Supabase PostgreSQL, whose five tables — users, trips, categories, expenses and chat messages — all have row-level security enabled.",
    caption:
      "Travora — three tiers, with ownership enforced by row-level security in the database rather than by a filter in the client.",
  },
  sipsetu: {
    art: { kind: "inline", Art: SipsetuArchitecture },
    alt: "Architecture diagram for SipSetu. A spoken or typed sentence in Nepali, Romanized Nepali or English enters an extraction step — Claude, or an offline taxonomy matcher of 44 entries as the default fallback — which translates language into structure and never ranks anybody. The result is a Skill Passport whose every claim carries one of five evidence tiers, from self-declared to platform work history. Matching below it is a weighted sum drawn to scale: skills 30 and occupation 15 together fill 45 of the 100, with location 15, wage 12, availability 10, verification 10 and experience 8 filling the rest. An arrow loops from matching back to the passport, because a completed hire promotes that job's required skills to the top tier.",
    caption:
      "SipSetu — the model translates language into structure and stops there; the score is a sum the worker can read.",
  },
  "transport-management": {
    art: { kind: "image", src: transportManagementDfd },
    alt: "Data flow diagram for the transport management system, covering vehicle records, trip scheduling, and reporting.",
    caption: "Transport Management — data flow.",
  },
  "hotel-booking": {
    art: { kind: "image", src: hotelBookingArchitecture },
    alt: "Architecture diagram for the hotel booking system, showing the booking interface, availability logic, and persistence layer.",
    caption: "Hotel Booking — system architecture.",
  },
  "student-record-app": {
    art: { kind: "image", src: studentRecordAppArchitecture },
    alt: "Architecture diagram for the student record application, showing the interface, record management logic, and database.",
    caption: "Student Record App — system architecture.",
  },
  "distributed-calculator": {
    art: { kind: "image", src: distributedCalculatorRmi },
    alt: "Diagram of the distributed calculator, showing Java RMI communication between the client stub, the RMI registry, and the remote server implementation.",
    caption: "Distributed Calculator — Java RMI client/server topology.",
  },
  "army-training-center-pm": {
    art: { kind: "image", src: armyTrainingCenterPmWorkflow },
    alt: "Project management workflow for the Army Training Center engagement, from requirements through planning, delivery, and review.",
    caption: "Army Training Center — project management workflow.",
  },
};

export function getProjectDiagram(slug: string): ProjectDiagram | undefined {
  return diagramsBySlug[slug];
}
