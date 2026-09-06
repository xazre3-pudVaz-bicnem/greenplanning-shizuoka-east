import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/ui/CtaBand';
import GoogleMap from '@/components/ui/GoogleMap';
import JsonLd from '@/components/ui/JsonLd';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import { ArrowIcon } from '@/components/ui/icons';
import { breadcrumbJsonLd, itemListJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';
import { regions, areaPages, areaPageForMunicipality } from '@/data/areas';

const title = '対応エリア｜静岡県東部・中部・伊豆の人工芝施工';
const description =
  'グリーンプランニング静岡EASTの対応エリア。沼津市・三島市・富士市・富士宮市・御殿場市・裾野市・函南町・清水町・長泉町・小山町、静岡市・島田市・焼津市・藤枝市・牧之原市・吉田町・川根本町、熱海・伊東・下田・伊豆・伊豆の国など伊豆地域。地域ごとの庭の事情も解説。';

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: '/area',
  ogImage: photos.gardenHouse.src,
  keywords: ['人工芝 静岡 対応エリア', '人工芝 沼津', '人工芝 三島', '人工芝 富士市', '人工芝 静岡市', '人工芝 伊豆'],
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '対応エリア', href: '/area' },
];

export default function AreaIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="対応エリア"
        title="沼津から、静岡県東部・中部・伊豆へ"
        lead="店舗は沼津市泉町。同じ静岡県でも、海沿いの砂まじりの土、富士山麓の火山灰土、三島の湧水、御殿場の雪と霜、伊豆の傾斜地と別荘。庭の事情は地域で違います。地域ごとの考え方をまとめたページから、お住まいの市町を選んでください。"
        photo={photos.gardenHouse}
        crumbs={crumbs}
      />

      <section className="cv bg-shiro py-16 sm:py-24">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <div className="space-y-12">
            {regions.map((r, i) => (
              <Reveal key={r.key} delay={i * 60} as="section" className="grid gap-6 border-t border-sen pt-8 lg:grid-cols-[14rem_1fr] lg:gap-12">
                <h2 className="display text-[1.3rem]">{r.label}</h2>
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                  {r.municipalities.map((m) => {
                    const page = areaPageForMunicipality(m);
                    return (
                      <li key={m} className="border-b border-sen">
                        {page ? (
                          <Link href={`/area/${page.slug}`} className="group flex items-center justify-between py-3 text-sumi transition-colors hover:text-fukami">
                            <span className="display text-[0.98rem]">{m}</span>
                            <span className="flex items-center gap-2 text-[0.72rem] text-hai">
                              {page.name !== m && page.name}
                              <ArrowIcon className="text-fukami transition-transform duration-500 group-hover:translate-x-1" />
                            </span>
                          </Link>
                        ) : (
                          <span className="flex items-center justify-between py-3 text-sumi-2">
                            <span className="display text-[0.98rem]">{m}</span>
                            <span className="text-[0.72rem] text-hai">対応エリア</span>
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-[0.82rem] leading-[1.9] text-hai">
            地域ページは、その地域について書けることがある市町から順に用意しています。ページのない市町も対応エリアです。エリア外でも、まずご相談ください。
          </p>
        </div>
      </section>

      <section className="cv bg-kinari py-16 sm:py-24" aria-labelledby="how-heading">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="line">
              <p className="eyebrow">対応の仕方</p>
              <h2 id="how-heading" className="display mt-4 text-[1.5rem] sm:text-[1.9rem]">
                遠い地域ほど、写真見積りが役に立ちます。
              </h2>
              <div className="mt-6 space-y-4 text-[0.95rem] leading-[2] text-sumi-2">
                <p>沼津の店舗から近い東部は日程を合わせやすく、施工後の様子の確認にも伺いやすい地域です。静岡市・焼津・藤枝の中部や、熱海・伊東・南伊豆方面は距離があるため、まず写真と広さで概算をお伝えし、現地確認と施工の日程をまとめて調整しています。</p>
                <p>どの地域でも、相談・写真見積り・現地調査は無料です。</p>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                <li>
                  <Link href="/estimate" className="rule-link text-fukami">
                    写真で概算見積り
                    <span aria-hidden>→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/flow" className="rule-link text-fukami">
                    施工の流れ
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <GoogleMap />
              <p className="mt-3 text-[0.8rem] leading-[1.8] text-hai">店舗：{shop.address.full}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand id="area-cta" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={itemListJsonLd({ name: '対応エリア', items: areaPages.map((a) => ({ name: `${a.name}の人工芝施工`, href: `/area/${a.slug}` })) })} />
    </>
  );
}
