import type { MetadataRoute } from 'next';
import { allowIndexing, siteUrl } from '@/lib/site';
import { footerNav } from '@/data/nav';

export default function sitemap(): MetadataRoute.Sitemap {
  // 公開前（本部の承認前）・本番URL未設定のときは何も出力しない
  if (!siteUrl || !allowIndexing) return [];
  const base = siteUrl;
  const now = new Date();
  return footerNav.map((l) => ({
    url: new URL(l.href, base).toString(),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: l.href === '/' ? 1 : l.href === '/privacy' ? 0.2 : 0.7,
  }));
}
