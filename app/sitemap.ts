import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import { projects } from '@/data/projects';

const base = SITE.url.replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['/', '/projects', '/writing', '/lab', '/about', '/contact'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const caseStudies = ['africa-centre-digital-literacy', 'iaa-rnpe-review', 'flowfield-gpu-lab'].map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: new Date(),
  }));

  const projectDrawers = projects.map((project) => ({
    url: `${base}/projects#${project.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...caseStudies, ...projectDrawers];
}
