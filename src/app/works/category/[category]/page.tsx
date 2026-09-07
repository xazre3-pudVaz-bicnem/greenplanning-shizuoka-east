import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import WorkCard from '@/components/ui/WorkCard';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { photos } from '@/data/photos';
import { getWorksByCategory, workCategories, workCategoryKeys, type WorkCategory } from '@/data/works';

type Params = { category: string };

export const dynamicParams = false;

/** 事例のあるカテゴリだけページを作る（空のカテゴリページを増やさない） */
export function generateStaticParams(): Params[] {
  return workCategoryKeys.filter((k) => getWorksByCategory(k).length > 0).map((category) => ({ category }));
}

function isCategory(v: string): v is WorkCategory {
  return v in workCategories;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  if (!isCategory(category)) return {};
  const label = workCategories[category];
  return buildMetadata({
    title: `${label}の施工事例｜静岡EASTの人工芝`,
    description: `グリーンプランニング静岡EASTによる「${label}」の人工芝施工事例一覧。静岡県内で静岡EASTが施工したと確認できた事例だけを、施工地域・面積・下地・工期・使用商品と、施工前後の写真つきで掲載しています。`,
    path: `/works/category/${category}`,
  });
}

export default async function WorkCategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  if (!isCategory(category)) notFound();
  const list = getWorksByCategory(category);
  if (list.length === 0) notFound();
  const label = workCategories[category];

  const crumbs = [
    { name: 'ホーム', href: '/' },
    { name: '施工事例', href: '/works' },
    { name: label, href: `/works/category/${category}` },
  ];

  return (
    <>
      <PageHero eyebrow="施工事例" title={`${label}の施工事例`} lead={`静岡EASTが施工した「${label}」の事例です。`} photo={photos[list[0].photoAfter]} crumbs={crumbs} />
      <section className="cv bg-shiro py-16 sm:py-24">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <Reveal>
            <nav aria-label="施工事例のカテゴリ" className="flex flex-wrap gap-x-6 gap-y-3 border-b border-sen pb-5 text-[0.88rem]">
              <Link href="/works" className="inline-block py-1 text-sumi-2 underline-offset-4 hover:text-fukami hover:underline">
                すべて
              </Link>
              {workCategoryKeys
                .filter((k) => getWorksByCategory(k).length > 0)
                .map((k) => (
                  <Link key={k} href={`/works/category/${k}`} className={k === category ? 'inline-block py-1 text-fukami' : 'inline-block py-1 text-sumi-2 underline-offset-4 hover:text-fukami hover:underline'} aria-current={k === category ? 'page' : undefined}>
                    {workCategories[k]}（{getWorksByCategory(k).length}）
                  </Link>
                ))}
            </nav>
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((w, i) => (
              <Reveal key={w.slug} delay={(i % 3) * 80}>
                <WorkCard work={w} priority={i === 0} headingLevel="h2" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand id="works-cat-cta" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
