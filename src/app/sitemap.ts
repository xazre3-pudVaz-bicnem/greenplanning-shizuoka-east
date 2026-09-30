import type { MetadataRoute } from 'next';
import { allowIndexing, siteUrl } from '@/lib/site';
import { footerNav } from '@/data/nav';
import { galleryKeys, photos } from '@/data/photos';
import { products } from '@/data/products';
import { works } from '@/data/works';

/**
 * ページの内容を最後に更新した日（YYYY-MM-DD）。
 * ビルドのたびに今日の日付を出すと、中身が変わっていないのに「更新した」と伝えることになり、
 * 検索エンジンに信用されなくなります。内容を直したときだけ、ここを更新してください。
 */
const updatedAt: Record<string, string> = {
  '/': '2026-09-30',
  '/works': '2026-09-30',
  '/products': '2026-09-30',
  '/about': '2026-09-30',
  '/area': '2026-09-30',
  '/contact': '2026-09-30',
  '/privacy': '2026-09-30',
  '/works/kannami-garden': '2026-09-30',
};

const lastModified = (path: string) => new Date(updatedAt[path] ?? '2026-09-30');

export default function sitemap(): MetadataRoute.Sitemap {
  // 公開前（本部の承認前）・本番URL未設定のときは何も出力しない
  if (!siteUrl || !allowIndexing) return [];
  const base = siteUrl;
  const url = (p: string) => new URL(p, base).toString();
  // ページごとに載せている写真（画像検索に拾ってもらうため）
  const pageImages: Record<string, string[]> = {
    '/': [photos.sceneGarden.src, ...galleryKeys.map((k) => photos[k].src)],
    '/products': products.map((pr) => photos[pr.photo].src),
    '/about': [photos.representative.src],
    '/works': works.flatMap((w) => w.photos.map(({ photo }) => photos[photo].src)),
  };

  return [
    ...footerNav.map((l) => ({
      url: url(l.href),
      lastModified: lastModified(l.href),
      changeFrequency: 'monthly' as const,
      priority: l.href === '/' ? 1 : l.href === '/privacy' ? 0.2 : 0.7,
      ...(pageImages[l.href] ? { images: pageImages[l.href].map(url) } : {}),
    })),
    ...works.map((w) => ({
      url: url(`/works/${w.slug}`),
      lastModified: lastModified(`/works/${w.slug}`),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
      images: w.photos.map(({ photo }) => url(photos[photo].src)),
    })),
  ];
}
