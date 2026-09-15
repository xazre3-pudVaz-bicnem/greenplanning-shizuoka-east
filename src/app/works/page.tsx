import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import Reveal from '@/components/ui/Reveal';
import WorkCase from '@/components/ui/WorkCase';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { shop } from '@/data/shop';
import { works } from '@/data/works';

export const metadata: Metadata = buildMetadata({
  title: '施工事例',
  description: `${shop.name}が施工した人工芝の事例。${works.map((w) => `${w.area.replace('静岡県', '')}の${w.place}（${w.size}）`).join('、')}。`,
  path: '/works',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '施工事例', href: '/works' },
];

/*
 * 施工事例
 *
 * 静岡EASTが施工し、お客様の掲載許可を得た事例だけを載せます（data/works.ts）。
 * 本部の施工実績は載せません。事例が少ないうちは、1ページにすべてを載せます。
 */
export default function WorksPage() {
  return (
    <>
      <header className="bg-shiro pt-24 sm:pt-32">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="display mt-8 text-[1.75rem] leading-[1.4] sm:text-[2.3rem]">施工事例</h1>
          <p className="mt-5 max-w-[40rem] text-[0.95rem] leading-[2] text-sumi-2">
            {shop.shortName}が施工した事例です。お客様の許可を得て掲載しています。
          </p>
        </div>
      </header>

      <section className="cv bg-shiro py-12 sm:py-16">
        <div className="mx-auto max-w-[80rem] space-y-16 px-5 sm:px-8">
          {works.map((w) => (
            <Reveal key={w.slug} className="border-t border-sen pt-10">
              <div id={w.slug}>
                <WorkCase work={w} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand id="works-cta" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
