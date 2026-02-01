export type ProjectCategory = 'Community' | 'Research' | 'Tech' | 'Writing' | 'Media';

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  role: string;
  impact: string;
  timeframe: string;
  tags: string[];
  stack: string[];
  cover: string;
  links?: { label: string; href: string }[];
  highlight?: string;
};

export const projectCategories: ProjectCategory[] = ['Community', 'Research', 'Tech', 'Writing', 'Media'];

export const projects: Project[] = [
  {
    slug: 'africa-centre-digital-literacy',
    title: 'Digital Skills for Seniors — Africa Centre',
    category: 'Community',
    summary:
      'Designed and taught tech-literacy pathways for immigrant and refugee seniors, pairing live coaching with AI-based learning aids tailored to low-bandwidth devices.',
    role: 'Digital Skills Instructor',
    impact: 'Built bilingual learning aids, accessible device setup flows, and peer mentor scaffolds for sustained adoption.',
    timeframe: '2024 — present',
    tags: ['Instructional design', 'AI co-pilots', 'Accessibility'],
    stack: ['Notion curriculum', 'Canva guides', 'Voice-friendly prompts'],
    cover: '/projects/project-1.svg',
    links: [{ label: 'Africa Centre', href: 'https://africacentre.ca/' }],
  },
  {
    slug: 'iaa-rnpe-review',
    title: 'RNPE Literature Review — Institute of African Advancement',
    category: 'Research',
    summary:
      'Coordinated a 25-page review on the Right to Non-Discrimination in Public Education (RNPE), blending academic synthesis with stakeholder interviews and bilingual workshop design.',
    role: 'Project Coordinator (Assessment/Research/Advocacy)',
    impact: 'Clarified evidence gaps, shaped workshop agendas, and outlined pilot partnerships with community schools.',
    timeframe: '2024',
    tags: ['Policy analysis', 'Advocacy', 'Workshop design'],
    stack: ['NVivo coding', 'Miro facilitation', 'R for charts'],
    cover: '/projects/project-2.svg',
    links: [{ label: 'Institute of African Advancement', href: 'https://www.instituteforafricanadvancement.org/' }],
  },
  {
    slug: 'bysi-program-leadership',
    title: 'Black Youth for Social Innovation — University of Alberta',
    category: 'Community',
    summary:
      'Led recruitment, mentorship pairing, and professional development sprints for the university-backed youth innovation cohort.',
    role: 'Program Lead',
    impact: 'Stood up advocacy touchpoints with municipal and university partners; built a repeatable onboarding playbook.',
    timeframe: '2023 — 2024',
    tags: ['Program design', 'Advocacy', 'Mentorship'],
    stack: ['Airtable', 'Mailers', 'Workshop kits'],
    cover: '/projects/project-3.svg',
    links: [{ label: 'University of Alberta', href: 'https://www.ualberta.ca/' }],
  },
  {
    slug: 'common-ground-lab-policy',
    title: 'Housing Justice Brief — Common Ground Lab',
    category: 'Research',
    summary:
      'Supported consultations and NVivo thematic coding for a housing justice brief later published in The Tyee and cited by municipal partners.',
    role: 'Data Analysis Assistant',
    impact: 'Translated interview themes into a policy narrative and visualization set for advocacy meetings.',
    timeframe: '2024',
    tags: ['Qualitative coding', 'Policy brief', 'Storytelling'],
    stack: ['NVivo', 'Figma data cards', 'R charts'],
    cover: '/projects/project-4.svg',
    links: [{ label: 'The Tyee publication', href: 'https://thetyee.ca/' }],
  },
  {
    slug: 'pedsql-measurement-invariance',
    title: 'PedsQL Measurement Invariance Study',
    category: 'Research',
    summary:
      'Analyzed Differential Item Functioning and measurement invariance for pediatric quality-of-life instruments using lavaan and semTools.',
    role: 'Research Assistant',
    impact: 'Prepared model comparisons and effect size reporting for an upcoming manuscript on culturally robust measurement.',
    timeframe: '2024 — 2025',
    tags: ['Measurement invariance', 'SEM', 'Health outcomes'],
    stack: ['R', 'lavaan', 'semTools'],
    cover: '/projects/project-5.svg',
    links: [{ label: 'UAlberta Pediatrics', href: 'https://www.ualberta.ca/' }],
  },
  {
    slug: 'flowfield-gpu-lab',
    title: 'Flowfield GPU Playground (from GitHub repo)',
    category: 'Tech',
    summary:
      'Lightweight react-three-fiber experiment that drives tendril-like flow fields with shader-based noise and pointer-responsive uniforms.',
    role: 'Developer / Designer',
    impact: 'Demonstrates performance-friendly GPU motion and adjustable parameters for workshops.',
    timeframe: '2025',
    tags: ['WebGL', 'Three.js', 'Shaders'],
    stack: ['@react-three/fiber', 'glsl'],
    cover: '/projects/project-6.svg',
    links: [{ label: 'GitHub repo placeholder', href: 'https://github.com/bellonaut' }],
  },
  {
    slug: 'transit-ridership-dossier',
    title: 'Transit Ridership Dossier (from GitHub repo)',
    category: 'Tech',
    summary:
      'Data storytelling kit exploring Edmonton transit ridership with fast EDA notebooks and a compact web dashboard.',
    role: 'Data Analyst',
    impact: 'Shows approach to tidy data, metric selection, and lean interface framing.',
    timeframe: '2024',
    tags: ['Data viz', 'Open data', 'Storytelling'],
    stack: ['Python', 'Pandas', 'React'],
    cover: '/projects/project-7.svg',
    links: [{ label: 'GitHub repo placeholder', href: 'https://github.com/bellonaut' }],
  },
  {
    slug: 'resume-parser-lite',
    title: 'Resume Parser Lite (from GitHub repo)',
    category: 'Tech',
    summary:
      'Mini pipeline that extracts structured fields from PDF resumes and prepares recruiter-friendly summaries; tuned for transparency over black-box scoring.',
    role: 'Developer',
    impact: 'Illustrates ethical review notes and fallback heuristics for low-resource parsing.',
    timeframe: '2024',
    tags: ['NLP', 'ETL', 'Responsible AI'],
    stack: ['Python', 'spaCy', 'FastAPI'],
    cover: '/projects/project-8.svg',
    links: [{ label: 'GitHub repo placeholder', href: 'https://github.com/bellonaut' }],
  },
  {
    slug: 'learning-aids-bot',
    title: 'Learning Aids Bot (from GitHub repo)',
    category: 'Tech',
    summary:
      'Prototype chat helper that turns lesson plans into digestible, mobile-first study cards with multilingual support.',
    role: 'Developer',
    impact: 'Useful for demonstrating prompt safety, guardrails, and bilingual UX decisions.',
    timeframe: '2025',
    tags: ['LLM UX', 'Education', 'Prompt design'],
    stack: ['TypeScript', 'Next.js', 'OpenAI API (stub)'],
    cover: '/projects/project-9.svg',
    links: [{ label: 'GitHub repo placeholder', href: 'https://github.com/bellonaut' }],
  },
  {
    slug: 'writing-portfolio-engine',
    title: 'Writing & Notes Engine',
    category: 'Writing',
    summary:
      'MDX-first writing system that pulls Substack RSS alongside long-form case studies, keeping research notes and publication links in one surface.',
    role: 'Product / Developer',
    impact: 'Demonstrates structured content modeling and metadata discipline for editorial sites.',
    timeframe: '2025',
    tags: ['MDX', 'Content design', 'Next.js'],
    stack: ['Next.js', 'MDX', 'RSS'],
    cover: '/projects/project-10.svg',
    links: [{ label: 'Substack', href: 'https://0thello.substack.com/' }],
  },
];
