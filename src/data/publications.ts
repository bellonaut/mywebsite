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
};

export const publications: Publication[] = [
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
  },
] as const;
