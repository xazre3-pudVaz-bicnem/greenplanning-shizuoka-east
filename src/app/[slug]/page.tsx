import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicePage from '@/components/pages/ServicePage';
import GuidePage from '@/components/pages/GuidePage';
import { buildMetadata } from '@/lib/seo';
import { getService, serviceSlugs } from '@/data/services';
import { getGuide, guideSlugs } from '@/data/guides';
import { photos } from '@/data/photos';

/**
 * 用途別サービスページ（/dogrun など）と、検索意図別ガイドページ（/price など）を
 * 1つの動的ルートで受ける。slug の一覧は data 側で管理し、それ以外は 404。
 */
type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return [...serviceSlugs, ...guideSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (service) {
    return buildMetadata({
      title: service.metaTitle,
      description: service.description,
      path: `/${service.slug}`,
      ogImage: photos[service.photo].src,
      keywords: service.keywords,
    });
  }
  const guide = getGuide(slug);
  if (guide) {
    return buildMetadata({
      title: guide.metaTitle,
      description: guide.description,
      path: `/${guide.slug}`,
      ogImage: photos[guide.photo].src,
      ogType: 'article',
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      keywords: guide.keywords,
    });
  }
  return {};
}

export default async function SlugPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (service) return <ServicePage service={service} />;
  const guide = getGuide(slug);
  if (guide) return <GuidePage guide={guide} />;
  notFound();
}
