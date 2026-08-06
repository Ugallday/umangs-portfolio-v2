import type { StaticImageData } from "next/image";

import armyTrainingCenterPmWorkflow from "@/assets/diagrams/army-training-center-pm-workflow.svg";
import distributedCalculatorRmi from "@/assets/diagrams/distributed-calculator-rmi.svg";
import hotelBookingArchitecture from "@/assets/diagrams/hotel-booking-architecture.svg";
import nsaTravelsDfd from "@/assets/diagrams/nsa-travels-dfd.svg";
import studentRecordAppArchitecture from "@/assets/diagrams/student-record-app-architecture.svg";
import transportManagementDfd from "@/assets/diagrams/transport-management-dfd.svg";
import travoraArchitecture from "@/assets/diagrams/travora-architecture.svg";
import vatBillingSystemArchitecture from "@/assets/diagrams/vat-billing-system-architecture.svg";

export interface ProjectDiagram {
  readonly src: StaticImageData;
  /** Describes the diagram's content, not just its title — screen readers get the shape of it. */
  readonly alt: string;
  readonly caption: string;
}

/**
 * Keyed by project slug. A project without an entry simply renders no
 * diagram, so adding a case study never requires touching this file.
 */
const diagramsBySlug: Readonly<Record<string, ProjectDiagram>> = {
  "vat-billing-system": {
    src: vatBillingSystemArchitecture,
    alt: "Layered architecture diagram for the VAT Billing System. Views sit above a framework-free core of ledger, fiscal, authentication and sync modules, which persists the whole database to IndexedDB with an outbox. A push-then-pull sync boundary connects that installation to one Supabase PostgreSQL deployment, where row-level security keyed to the tenant id in a signed token keeps each client's books separate.",
    caption:
      "VAT Billing System — one offline-capable installation per client, converging on one multi-tenant database.",
  },
  "nsa-travels": {
    src: nsaTravelsDfd,
    alt: "Data flow diagram for the NSA Travels internal systems, tracing bookings, customer records, and accounting entries between the travel desk, the accounting app, and cloud backup.",
    caption: "NSA Travels — data flow across the travel desk, accounting, and backup.",
  },
  travora: {
    src: travoraArchitecture,
    alt: "Architecture diagram for Travora, showing the client application, API layer, and data services.",
    caption: "Travora — system architecture.",
  },
  "transport-management": {
    src: transportManagementDfd,
    alt: "Data flow diagram for the transport management system, covering vehicle records, trip scheduling, and reporting.",
    caption: "Transport Management — data flow.",
  },
  "hotel-booking": {
    src: hotelBookingArchitecture,
    alt: "Architecture diagram for the hotel booking system, showing the booking interface, availability logic, and persistence layer.",
    caption: "Hotel Booking — system architecture.",
  },
  "student-record-app": {
    src: studentRecordAppArchitecture,
    alt: "Architecture diagram for the student record application, showing the interface, record management logic, and database.",
    caption: "Student Record App — system architecture.",
  },
  "distributed-calculator": {
    src: distributedCalculatorRmi,
    alt: "Diagram of the distributed calculator, showing Java RMI communication between the client stub, the RMI registry, and the remote server implementation.",
    caption: "Distributed Calculator — Java RMI client/server topology.",
  },
  "army-training-center-pm": {
    src: armyTrainingCenterPmWorkflow,
    alt: "Project management workflow for the Army Training Center engagement, from requirements through planning, delivery, and review.",
    caption: "Army Training Center — project management workflow.",
  },
};

export function getProjectDiagram(slug: string): ProjectDiagram | undefined {
  return diagramsBySlug[slug];
}
