import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import Reveal from '@/components/ui/Reveal';
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { regions } from '@/data/areas';
import { shop } from '@/data/shop';
import { workTitle, works } from '@/data/works';

const title = `担当エリア｜${shop.areaLabel}の人工芝施工`;
const description = `${shop.name}の担当エリアは${shop.areaLabel}です。${regions
  .map((r) => (r.municipalities.length > 1 ? `${r.label}（${r.municipalities.slice(0, 3).join('・')}ほか）` : r.label))
  .join('、')}。`;

export const metadata: Metadata = buildMetadata({ title, description, path: '/area' });

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '担当エリア', href: '/area' },
];

/** その市町で施工した事例（地域名の一致で探す） */
const worksIn = (municipality: string) => works.filter((w) => w.area.endsWith(municipality));

/*
 * 担当エリア
 *
 * 市町ごとの地域ページや、地域の事情をAIで書いた説明文は置きません。
 * 施工事例がある市町だけ、その事例へリンクします。
 * 地域について書くときは、静岡EASTが実際の施工・相談の経験から書いた文章だけを使います。
 */
export default function AreaPage() {
  return (
    <>
      <header className="bg-shiro pt-24 sm:pt-32">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="display mt-8 text-[1.75rem] leading-[1.4] sm:text-[2.3rem]">担当エリア</h1>
          <p className="mt-5 max-w-[40rem] text-[0.95rem] leading-[2] text-sumi-2">
            {shop.shortName}の担当エリアは、{shop.areaLabel}です。店舗は{shop.address.prefecture}
            {shop.address.city}にあります。
          </p>
        </div>
      </header>

      <section className="cv bg-shiro py-14 sm:py-20">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="space-y-10">
            {regions.map((r, i) => (
              <Reveal key={r.key} delay={i * 60} as="section" className="grid gap-5 border-t border-sen pt-8 lg:grid-cols-[14rem_1fr] lg:gap-12">
                <h2 className="display text-[1.25rem]">{r.label}</h2>
                <ul className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3 lg:grid-cols-4">
                  {r.municipalities.map((m) => {
                    const cases = worksIn(m);
                    return (
                      <li key={m} className="border-b border-sen py-2.5 text-[0.95rem] text-sumi-2">
                        {m}
                        {cases.map((w) => (
                          <Link
                            key={w.slug}
                            href={`/works/${w.slug}`}
                            title={workTitle(w)}
                            className="ml-2 inline-block py-0.5 text-[0.78rem] text-fukami underline underline-offset-4"
                          >
                            施工事例
                          </Link>
                        ))}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand id="area-cta" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={webPageJsonLd({ type: 'WebPage', name: title, description, path: '/area' })} />
    </>
  );
}
