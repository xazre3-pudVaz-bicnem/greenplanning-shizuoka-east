import type { MetadataRoute } from 'next';
import { allowIndexing, siteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  // 公開前は全面 Disallow。
  // NEXT_PUBLIC_SITE_URL と NEXT_PUBLIC_ALLOW_INDEXING=true がそろって初めて開放します。
  if (!siteUrl || !allowIndexing) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
    host: siteUrl,
  };
}
