import type { MetadataRoute } from 'next';
import { allowIndexing, siteUrl } from '@/lib/site';
import { footerNav } from '@/data/nav';
import { photos } from '@/data/photos';
import { works } from '@/data/works';

export default function sitemap(): MetadataRoute.Sitemap {
  // 公開前（本部の承認前）・本番URL未設定のときは何も出力しない
  if (!siteUrl || !allowIndexing) return [];
  const base = siteUrl;
  const url = (p: string) => new URL(p, base).toString();
  const now = new Date();

  return [
    ...footerNav.map((l) => ({
      url: url(l.href),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: l.href === '/' ? 1 : l.href === '/privacy' ? 0.2 : 0.7,
    })),
    ...works.map((w) => ({
      url: url(`/works/${w.slug}`),
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
      images: w.photos.map(({ photo }) => url(photos[photo].src)),
    })),
  ];
}
