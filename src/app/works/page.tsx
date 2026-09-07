import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import WorkCard from '@/components/ui/WorkCard';
import { ExternalIcon, InstagramIcon } from '@/components/ui/icons';
import { breadcrumbJsonLd, itemListJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';
import { workCategories, workCategoryKeys, works, getWorksByCategory } from '@/data/works';

const title = '施工事例｜静岡EASTの人工芝施工（庭・ドッグラン・ゴルフ・マンション）';
const description =
  'グリーンプランニング静岡EASTの人工芝施工事例。静岡県田方郡の天然芝からの張り替えなど、施工地域・面積・使用商品・工期・施工前の悩み・提案・工程をビフォーアフター写真とともに掲載。静岡EASTの施工と確認できた事例のみ。';

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: '/works',
  ogImage: photos.workTagataAfter.src,
  keywords: ['人工芝 施工事例 静岡', '人工芝 ビフォーアフター', '人工芝 施工例'],
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '施工事例', href: '/works' },
];

export default function WorksPage() {
  const categoriesWithWorks = workCategoryKeys.filter((k) => getWorksByCategory(k).length > 0);

  return (
    <>
      <PageHero
        eyebrow="施工事例"
        title="静岡EASTの施工事例"
        lead="掲載しているのは、グリーンプランニング静岡EASTの施工と確認できた事例だけです。施工地域・面積・下地・工期・使用商品を、施工前後の写真とともに残しています。事例は順次追加します。"
        photo={photos.workTagataAfter}
        crumbs={crumbs}
      />

      <section className="cv bg-shiro py-16 sm:py-24">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <Reveal>
            <nav aria-label="施工事例のカテゴリ" className="flex flex-wrap gap-x-6 gap-y-3 border-b border-sen pb-5 text-[0.88rem]">
              <span className="text-fukami" aria-current="page">
                すべて（{works.length}）
              </span>
              {workCategoryKeys.map((k) => {
                const n = getWorksByCategory(k).length;
                return n > 0 ? (
                  <Link key={k} href={`/works/category/${k}`} className="inline-block py-1 text-sumi-2 underline-offset-4 hover:text-fukami hover:underline">
                    {workCategories[k]}（{n}）
                  </Link>
                ) : (
                  <span key={k} className="text-hai/70">
                    {workCategories[k]}（準備中）
                  </span>
                );
              })}
            </nav>
          </Reveal>

          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((w, i) => (
              <Reveal key={w.slug} delay={(i % 3) * 80}>
                <WorkCard work={w} priority={i === 0} headingLevel="h2" />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 grid gap-10 border-t border-sen pt-10 lg:grid-cols-2">
            <div>
              <h2 className="display text-[1.2rem]">日々の施工はInstagramで</h2>
              <p className="mt-3 text-[0.92rem] leading-[1.9] text-sumi-2">
                庭、ドッグラン、施設、ゴルフ、ゴムチップ舗装や防球ネットまで、静岡EASTの施工の様子を写真で投稿しています。このページに載せる事例は、詳細が確認できたものから順に追加します。
              </p>
              <a href={shop.instagram} target="_blank" rel="noopener noreferrer" className="rule-link mt-5 text-fukami">
                <InstagramIcon />
                {shop.instagramHandle}
                <ExternalIcon className="text-[0.85em]" />
              </a>
            </div>
            <div>
              <h2 className="display text-[1.2rem]">全国の施工実績（本部サイト）</h2>
              <p className="mt-3 text-[0.92rem] leading-[1.9] text-sumi-2">
                グリーンプランニング全国の施工実績は本部サイトに掲載されています。ドッグラン、ゴルフ、屋上、施設など、用途ごとの仕上がりの参考にしてください。
              </p>
              <a href={shop.hq.worksUrl} target="_blank" rel="noopener noreferrer" className="rule-link mt-5 text-fukami">
                本部サイトの施工実績
                <ExternalIcon className="text-[0.85em]" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand id="works-cta" title="似た条件の庭なら、写真から概算をお伝えできます。" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={itemListJsonLd({ name: '施工事例', items: works.map((w) => ({ name: w.title, href: `/works/${w.slug}` })) })} />
      {categoriesWithWorks.length === 0 && null}
    </>
  );
}
