export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  type: "Journal" | "Policy" | "Preprint";
  status: string;
  link?: string;
  takeaway: string;
  project?: string;
  projectHref?: string;
};

export const publications: Publication[] = [
  {
    title:
      "Health Desert Scorer (Nigeria): A Decision-Support System for LGA-Level Healthcare Access Barriers",
    authors: "Bello, B.",
    venue: "White paper",
    year: "2026",
    type: "Policy",
    status: "Draft v0.1, Feb 13 2026",
    link: "/documents/health-desert-whitepaper.pdf",
    takeaway:
      "Defines an LGA-level planning score that combines access, facility, and connectivity signals to support evidence-led healthcare prioritization in Nigeria.",
    project: "Health Desert Scorer (Nigeria)",
    projectHref: "/health-desert",
  },
  {
    title: "NaijaCare Research Plan",
    authors: "Bello, B.",
    venue: "Research and implementation plan",
    year: "2026",
    type: "Policy",
    status: "Working draft",
    link: "/documents/naijacare-research-plan.pdf",
    takeaway:
      "Sets out validation questions, data gaps, and mixed-method research steps for low-bandwidth maternal and child telehealth in northern Nigeria.",
    project: "NaijaCare - Low-Bandwidth Telehealth",
    projectHref: "/projects",
  },
  {
    title: "The African Century: A Geopolitical, Economic, and Cultural Projection (2025-2100)",
    authors: "Bello, B.",
    venue: "Long-form policy analysis",
    year: "2026",
    type: "Policy",
    status: "Working paper, Feb 2026",
    link: "/documents/the-african-century.pdf",
    takeaway:
      "Analyzes long-run African political economy scenarios across trade realignment, demographic change, and technology-led structural shifts.",
  },
  {
    title:
      "Measurement invariance of the Pediatric Quality of Life Inventory in child and adolescent mental health",
    authors: "Bello, B.; Bulut, O.; McCabe, E.",
    venue: "Quality of Life Research (invited submission)",
    year: "2025",
    type: "Journal",
    status: "Invited manuscript; CFA + DIF across demographics (n=429)",
    takeaway:
      "Validated PedsQL structure across demographic groups; highlights where score interpretation shifts and suggests recalibration steps.",
    project: "PedsQL measurement invariance",
    projectHref: "/projects",
  },
  {
    title: "Employment Youth Empowerment (EYE) Cohort 1 Report",
    authors: "Bello, B.; Institute of African Advancement",
    venue: "Program evaluation report",
    year: "2025",
    type: "Policy",
    status: "Draft v3, pilot cohort report",
    link: "/documents/eye-report-draft-v3.pdf",
    takeaway:
      "Reports strong pilot outcomes with marked gains in participant confidence, employability skills, and structured progression toward placements.",
    project: "EYE Initiative Curriculum",
    projectHref: "/projects",
  },
  {
    title:
      "Racialized Newcomers and Post-Migration Experiences (RNPE): Literature Review on Racism, Acculturation and Health",
    authors: "Bello, B.",
    venue: "Institute of African Advancement",
    year: "2025",
    type: "Policy",
    status: "Prepared May 2025",
    link: "/documents/rnpe-literature-review-report.pdf",
    takeaway:
      "Synthesizes evidence on how structural and interpersonal racism shape health and acculturation outcomes for racialized newcomers.",
  },
  {
    title: "The Dangerous Americanization of Alberta Democracy",
    authors: "Ballos, A.; Bello, B.; Wesley, J.",
    venue: "The Tyee",
    year: "2024",
    type: "Policy",
    status: "Published Oct 28 2024; cited by two Alberta MLAs",
    link: "https://thetyee.ca/Analysis/2024/10/28/Dangerous-Americanization-Alberta-Democracy/",
    takeaway:
      "Traced UCP policy diffusion parallels with U.S. states and surfaced democratic-risk implications for Alberta.",
    project: "Common Ground civic consultations",
    projectHref: "/projects",
  },
] as const;
