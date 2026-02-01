export type WritingItem = {
  title: string;
  outlet: string;
  date: string;
  link: string;
  summary: string;
};

export const featuredWriting: WritingItem[] = [
  {
    title: 'Housing Justice Needs Narrative Infrastructure',
    outlet: 'The Tyee (co-authored)',
    date: 'Oct 28, 2024',
    link: 'https://thetyee.ca/',
    summary: 'Policy brief translating community consultations into concrete asks and story beats for local media.',
  },
  {
    title: 'Learning Aids for Newcomer Seniors',
    outlet: 'Substack — Notes from the Lab',
    date: '2025',
    link: 'https://0thello.substack.com/',
    summary: 'Reflections on designing AI-supported tech-literacy sessions without overwhelming learners.',
  },
  {
    title: 'Measurement Invariance: A Field Note',
    outlet: 'Manuscript in progress',
    date: '2025 (invited)',
    link: '#',
    summary: 'Plain-language explainer of DIF and invariance testing steps for pediatric quality-of-life surveys.',
  },
];
