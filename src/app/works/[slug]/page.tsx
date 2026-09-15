import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import WorkCase from '@/components/ui/WorkCase';
import { ArrowIcon } from '@/components/ui/icons';
import { breadcrumbJsonLd, workJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';
import { getWork, workAreaShort, workTitle, works } from '@/data/works';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = getWork((await params).slug);
  if (!work) return {};
  const cover = work.photos.at(-1);
  return buildMetadata({
    title: workTitle(work),
    description: `${shop.shortName}の施工事例。${work.area}の${work.place}（${work.size}）。${work.request}`,
    path: `/works/${work.slug}`,
    ogImage: cover ? photos[cover.photo].src : undefined,
  });
}

/*
 * 施工事例の詳細
 * 文章はオーナー様の回答を整理したもの（data/works.ts）。ここで説明文を足さない。
 */
export default async function WorkPage({ params }: Props) {
  const work = getWork((await params).slug);
  if (!work) notFound();

  const crumbs = [
    { name: 'ホーム', href: '/' },
    { name: '施工事例', href: '/works' },
    { name: `${workAreaShort(work)}・${work.place}`, href: `/works/${work.slug}` },
  ];
  const others = works.filter((w) => w.slug !== work.slug);

  return (
    <>
      <header className="bg-shiro pt-24 sm:pt-32">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Breadcrumbs crumbs={crumbs} />
          <p className="eyebrow mt-8">静岡EASTの施工事例</p>
          <h1 className="display mt-4 text-[1.6rem] leading-[1.45] sm:text-[2.1rem]">{workTitle(work)}</h1>
        </div>
      </header>

      <section className="bg-shiro py-10 sm:py-14">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <WorkCase work={work} />

          <nav aria-label="ほかのページ" className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-sen pt-8">
            {others.map((w) => (
              <Link key={w.slug} href={`/works/${w.slug}`} className="rule-link text-fukami">
                {workTitle(w)}
                <ArrowIcon />
              </Link>
            ))}
            <Link href="/works" className="rule-link text-fukami">
              施工事例の一覧
              <ArrowIcon />
            </Link>
            <Link href="/area" className="rule-link text-sumi-2">
              担当エリア
            </Link>
          </nav>
        </div>
      </section>

      <CtaBand id="work-cta" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={workJsonLd(work)} />
    </>
  );
}
