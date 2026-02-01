import Parser from 'rss-parser';
import { cache } from 'react';
import { SITE } from './constants';

export type SubstackPost = {
  title: string;
  link: string;
  isoDate?: string;
  contentSnippet?: string;
};

const parser = new Parser();

export const getSubstackFeed = cache(async (): Promise<SubstackPost[]> => {
  try {
    const feed = await parser.parseURL(SITE.substackFeed);
    return (feed.items ?? []).slice(0, 5).map((item) => ({
      title: item.title ?? 'Untitled',
      link: item.link ?? '#',
      isoDate: item.isoDate,
      contentSnippet: item.contentSnippet ?? item.content?.replace(/<[^>]+>/g, '') ?? '',
    }));
  } catch (error) {
    console.error('Failed to fetch Substack feed', error);
    return [];
  }
});
