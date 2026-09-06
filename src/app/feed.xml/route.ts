import { getAllPosts } from '@/lib/blog';
import { absoluteUrl, defaultDescription, siteUrl } from '@/lib/site';
import { shop } from '@/data/shop';

export const dynamic = 'force-static';

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

/** 人工芝コラムのRSS。本番URLが未設定のときは 404 を返します。 */
export function GET() {
  const home = absoluteUrl('/');
  const feedUrl = absoluteUrl('/feed.xml');

  if (!siteUrl || !home || !feedUrl) {
    return new Response('', { status: 404 });
  }

  const posts = getAllPosts().slice(0, 30);
  const updated = posts[0]?.updatedAt ?? new Date().toISOString().slice(0, 10);

  const items = posts
    .map((p) => {
      const url = absoluteUrl(`/blog/${p.slug}`)!;
      return `    <item>
      <title>${escape(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(p.description)}</description>
      <pubDate>${new Date(`${p.publishedAt}T00:00:00+09:00`).toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${shop.shortName}｜人工芝コラム`)}</title>
    <link>${home}</link>
    <description>${escape(defaultDescription)}</description>
    <language>ja</language>
    <lastBuildDate>${new Date(`${updated}T00:00:00+09:00`).toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
