import { getSubstackFeed } from '@/lib/rss';
import Link from 'next/link';
import { Badge } from '../ui/badge';

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

function formatDate(value?: string) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return formatter.format(date);
}

export async function SubstackFeed() {
  const posts = await getSubstackFeed();

  if (!posts.length) {
    return <p className="text-sm text-[var(--muted)]">No recent Substack posts could be loaded right now.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {posts.map((post) => (
        <Link
          key={post.link}
          href={post.link}
          className="group rounded-2xl border border-[var(--border)] bg-white/70 p-4 transition hover:border-[var(--accent)]"
        >
          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
            <span>{formatDate(post.isoDate)}</span>
            <Badge tone="accent">Substack</Badge>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-[var(--text)] group-hover:text-[var(--accent)]">
            {post.title}
          </h3>
          <p className="mt-1 text-sm text-[var(--muted)] line-clamp-3">{post.contentSnippet}</p>
        </Link>
      ))}
    </div>
  );
}
