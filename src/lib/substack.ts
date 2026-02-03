export type SubstackPostPreview = {
  title: string;
  subtitle?: string;
  link: string;
  image?: string;
  pubDate?: string;
};

function extractFirstImgFromHtml(html?: string): string | undefined {
  if (!html) return undefined;
  // first <img src="...">
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m?.[1];
}

function normalizeSubstackUrl(url: string): string {
  // allow passing either "https://your.substack.com" or "your.substack.com"
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url.replace(/\/+$/, "");
  return `https://${url.replace(/\/+$/, "")}`;
}

export async function fetchSubstackPosts(substackUrl: string, limit = 3): Promise<SubstackPostPreview[]> {
  const base = normalizeSubstackUrl(substackUrl);
  const rssUrl = `${base}/feed`;

  const res = await fetch(rssUrl, {
    headers: {
      // Some feeds behave better with an explicit UA
      "User-Agent": "Mozilla/5.0",
      Accept: "application/rss+xml, text/xml;q=0.9, */*;q=0.8",
    },
  });

  if (!res.ok) return [];

  const xml = await res.text();
  // Parse RSS without extra deps (simple XML parsing via DOMParser in Node is not guaranteed)
  // So we use a small regex-based parse that’s “good enough” for Substack RSS.

  const items = xml.split("<item>").slice(1).map((chunk) => chunk.split("</item>")[0]);

  const pick = (chunk: string, tag: string) => {
    const m = chunk.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
    return m?.[1]?.trim();
  };

  const decodeCdata = (s?: string) =>
    s?.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();

  const posts: SubstackPostPreview[] = [];

  for (const item of items.slice(0, limit)) {
    const title = decodeCdata(pick(item, "title")) ?? "";
    const link = decodeCdata(pick(item, "link")) ?? "";
    const pubDate = decodeCdata(pick(item, "pubDate")) ?? "";

    // Substack often includes HTML in <description> and/or <content:encoded>
    const description = decodeCdata(pick(item, "description"));
    const contentEncoded = decodeCdata(pick(item, "content:encoded"));

    // Some feeds include enclosure/media content
    const enclosure = item.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]*\/?>/i)?.[1];
    const mediaContent = item.match(/<media:content[^>]+url=["']([^"']+)["'][^>]*\/?>/i)?.[1];

    const image =
      enclosure ||
      mediaContent ||
      extractFirstImgFromHtml(contentEncoded) ||
      extractFirstImgFromHtml(description);

    // optional: a “subtitle” derived from description text (strip tags lightly)
    const subtitle = decodeCdata(description)
      ?.replace(/<[^>]+>/g, " ")
      ?.replace(/\s+/g, " ")
      ?.trim()
      ?.slice(0, 110);

    if (!title || !link) continue;

    posts.push({ title, link, pubDate, subtitle, image });
  }

  return posts;
}
