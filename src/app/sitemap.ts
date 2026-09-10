import type { MetadataRoute } from 'next';
import { blogCategoryKeys, getAllPosts, getPostsByCategory } from '@/lib/blog';
import { allowIndexing, siteUrl } from '@/lib/site';
import { guideLinks, serviceLinks } from '@/data/nav';
import { products } from '@/data/products';
import { areaPages } from '@/data/areas';
import { workCategoryKeys, works, getWorksByCategory } from '@/data/works';

type Freq = MetadataRoute.Sitemap[number]['changeFrequency'];

const staticRoutes: { path: string; priority: number; changeFrequency: Freq }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/works', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/products', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/area', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/flow', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/estimate', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'daily' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // 公開前・本番URL未設定のときは何も出力しない（プレビューURLの誤インデックス防止）
  if (!siteUrl || !allowIndexing) return [];
  const base = siteUrl;
  const now = new Date();
  const url = (p: string) => new URL(p, base).toString();

  const posts = getAllPosts();
  const latestPost = posts[0]?.updatedAt;

  return [
    ...staticRoutes.map((r) => ({
      url: url(r.path),
      lastModified: r.path === '/blog' && latestPost ? new Date(latestPost) : now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...serviceLinks.map((s) => ({
      url: url(s.href),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: s.href === '/artificial-grass' ? 0.95 : 0.85,
    })),
    ...guideLinks.map((g) => ({
      url: url(g.href),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: g.href === '/price' ? 0.9 : 0.75,
    })),
    ...products.map((p) => ({
      url: url(`/products/${p.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...areaPages.map((a) => ({
      url: url(`/area/${a.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...workCategoryKeys
      .filter((key) => getWorksByCategory(key).length > 0)
      .map((key) => ({
        url: url(`/works/category/${key}`),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      })),
    ...works.map((w) => ({
      url: url(`/works/${w.slug}`),
      lastModified: new Date(w.date),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    ...blogCategoryKeys
      .filter((key) => getPostsByCategory(key).length > 0)
      .map((key) => {
        const latest = getPostsByCategory(key)[0]?.updatedAt;
        return {
          url: url(`/blog/category/${key}`),
          lastModified: latest ? new Date(latest) : now,
          changeFrequency: 'weekly' as const,
          priority: 0.5,
        };
      }),
    ...posts.map((p) => ({
      url: url(`/blog/${p.slug}`),
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
