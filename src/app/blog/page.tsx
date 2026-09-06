import type { Metadata } from 'next';
import Link from 'next/link';
import CategoryNav from '@/components/blog/CategoryNav';
import PostList from '@/components/blog/PostList';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { getAllPosts } from '@/lib/blog';
import { photos } from '@/data/photos';
import { guideLinks, serviceLinks } from '@/data/nav';

const title = '人工芝コラム｜静岡の庭・雑草対策・犬・ゴルフ・費用・お手入れ';
const description =
  'グリーンプランニング静岡EASTの人工芝コラム。静岡の庭の雑草対策、犬とドッグラン、自宅ゴルフ、子どもの庭、施工と下地、費用、メンテナンス、DIY比較、沼津・三島・富士などエリア情報。監修：静岡EAST。';

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: '/blog',
  ogImage: photos.gardenHouse.src,
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '人工芝コラム', href: '/blog' },
];

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="人工芝コラム"
        title="人工芝と庭のこと、すこしずつ。"
        lead="静岡で人工芝を検討している方に向けて、雑草、犬、ゴルフ、子ども、費用、施工、お手入れのことを、1記事1テーマで書いています。監修はグリーンプランニング静岡EAST。商品の性能や保証は本部公式の情報に基づき、架空の事例や価格は書きません。"
        photo={photos.turfHandTouch}
        crumbs={crumbs}
      />

      <section className="cv bg-shiro py-14 sm:py-20">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
            <div>
              <Reveal>
                <CategoryNav />
              </Reveal>
              <div className="mt-8">
                <PostList posts={posts} />
              </div>
            </div>
            <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
              <Reveal delay={100}>
                <h2 className="eyebrow">用途から探す</h2>
                <ul className="mt-4 space-y-2 text-[0.88rem]">
                  {serviceLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sumi-2 underline-offset-4 hover:text-fukami hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={150}>
                <h2 className="eyebrow">知る・比べる</h2>
                <ul className="mt-4 space-y-2 text-[0.88rem]">
                  {guideLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sumi-2 underline-offset-4 hover:text-fukami hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <CtaBand id="blog-cta" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
