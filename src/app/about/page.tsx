import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CtaBand from '@/components/ui/CtaBand';
import GoogleMap from '@/components/ui/GoogleMap';
import JsonLd from '@/components/ui/JsonLd';
import Pending from '@/components/ui/Pending';
import Reveal from '@/components/ui/Reveal';
import ShopInfoTable from '@/components/ui/ShopInfoTable';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { shop } from '@/data/shop';
import { greeting } from '@/data/story';

export const metadata: Metadata = buildMetadata({
  title: '代表挨拶・店舗情報',
  description: `${shop.name}の代表挨拶・店舗情報・会社概要。所在地は${shop.address.full}。担当エリアは${shop.areaLabel}。代表は${shop.representative}。`,
  path: '/about',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '代表挨拶・店舗情報', href: '/about' },
];

/*
 * 店舗情報・会社概要
 *
 * 本部チェックリスト「本部との関係性」：代表挨拶・会社概要・店舗紹介に、指定されたパートナー区分を明記する。
 * 代表挨拶はオーナー様から届いた原文（data/story.ts）をそのまま載せます。
 */
export default function AboutPage() {
  return (
    <>
      <header className="bg-shiro pt-24 sm:pt-32">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="display mt-8 text-[1.75rem] leading-[1.4] sm:text-[2.3rem]">代表挨拶・店舗情報</h1>
          <p className="mt-5 max-w-[40rem] text-[0.95rem] leading-[2] text-sumi-2">
            {shop.name}は、{shop.hq.name}の{shop.partnerCategory ?? <Pending>本部指定のパートナー区分</Pending>}
            です。担当エリアは{shop.areaLabel}です。
          </p>
        </div>
      </header>

      <section className="cv bg-shiro py-14 sm:py-20" aria-labelledby="greeting-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Reveal variant="line" className="max-w-[44rem]">
            <h2 id="greeting-heading" className="display text-[1.4rem] sm:text-[1.7rem]">
              代表挨拶
            </h2>
            <div className="mt-8 space-y-5 text-[0.98rem] leading-[2.1] text-sumi-2">
              {greeting.map((para) => (
                <p key={para[0]}>
                  {para.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              ))}
            </div>
            <p className="mt-8 text-right text-[0.9rem] leading-[1.9] tracking-[0.04em] text-sumi">
              {shop.name}
              <br />
              <span className="text-[0.8rem] text-hai">{shop.partnerCategory ?? <Pending>本部指定のパートナー区分</Pending>}</span>
              <br />
              代表 {shop.representative}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="cv border-t border-sen bg-shiro py-14 sm:py-20" aria-labelledby="company-heading">
        <div className="mx-auto grid max-w-[80rem] gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="line">
            <h2 id="company-heading" className="display text-[1.4rem] sm:text-[1.7rem]">
              会社概要
            </h2>
            <div className="mt-6">
              <ShopInfoTable />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <GoogleMap />
            <p className="mt-3 text-[0.8rem] leading-[1.8] text-hai">
              {shop.address.full}
              <a href={shop.mapLinkUrl} target="_blank" rel="noopener noreferrer" className="ml-3 py-1 text-fukami underline underline-offset-4">
                Googleマップで開く
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand id="about-cta" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
