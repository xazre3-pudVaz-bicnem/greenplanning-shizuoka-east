import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import Reveal from '@/components/ui/Reveal';
import WorkCase from '@/components/ui/WorkCase';
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';
import { workAreaShort, workTitle, works } from '@/data/works';

const title = '人工芝の施工事例';
const description = `${shop.name}が施工した人工芝の事例です。${works.map((w) => `${workAreaShort(w)}の${w.place}（${w.size}）`).join('、')}。`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: '/works',
  ogImage: photos.kannamiGardenAfter.src,
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '施工事例', href: '/works' },
];

/*
 * 施工事例の一覧
 *
 * 静岡EASTが施工し、お客様の掲載許可を得た事例だけを載せます（data/works.ts）。
 * 本部の施工実績は載せません。1件ごとの詳細は /works/[slug]。
 */
export default function WorksPage() {
  return (
    <>
      <header className="bg-shiro pt-24 sm:pt-32">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="display mt-8 text-[1.75rem] leading-[1.4] sm:text-[2.3rem]">{title}</h1>
          <p className="mt-5 max-w-[40rem] text-[0.95rem] leading-[2] text-sumi-2">
            {shop.shortName}が施工した事例です。お客様の許可を得て掲載しています。
          </p>
        </div>
      </header>

      <section className="cv bg-shiro py-12 sm:py-16">
        <div className="mx-auto max-w-[80rem] space-y-16 px-5 sm:px-8">
          {works.map((w) => (
            <Reveal key={w.slug} className="border-t border-sen pt-10">
              <WorkCase work={w} compact />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand id="works-cta" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={webPageJsonLd({ type: 'CollectionPage', name: title, description, path: '/works' })} />
      <JsonLd data={itemListJsonLd({ name: title, items: works.map((w) => ({ name: workTitle(w), href: `/works/${w.slug}` })) })} />
    </>
  );
}
