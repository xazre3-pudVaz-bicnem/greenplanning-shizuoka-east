import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import LinkList from '@/components/ui/LinkList';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import Supervisor from '@/components/ui/Supervisor';
import { CheckIcon, ExternalIcon } from '@/components/ui/icons';
import { breadcrumbJsonLd, productJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { photos } from '@/data/photos';
import { getProduct, products } from '@/data/products';
import { services } from '@/data/services';
import { guides } from '@/data/guides';

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return buildMetadata({
    title: `${p.name}${p.pile !== '—' ? ` ${p.pile}` : ''}｜仕様・価格・向いている人`,
    description: p.description,
    path: `/products/${p.slug}`,
    ogImage: photos[p.photo].src,
    keywords: [p.name, p.nameEn, '人工芝', 'グリーンプランニング'],
  });
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const photo = photos[p.photo];
  const crumbs = [
    { name: 'ホーム', href: '/' },
    { name: '商品ラインナップ', href: '/products' },
    { name: p.name, href: `/products/${p.slug}` },
  ];

  const related = p.relatedServices
    .map((s) => {
      const sv = services.find((x) => x.slug === s);
      if (sv) return { href: `/${sv.slug}`, label: sv.label };
      const g = guides.find((x) => x.slug === s);
      if (g) return { href: `/${g.slug}`, label: g.label };
      return null;
    })
    .filter((x): x is { href: string; label: string } => x !== null);

  const others = products.filter((x) => x.slug !== p.slug);

  return (
    <>
      <header className="bg-shiro pt-20 sm:pt-24">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div className="pb-2 pt-6 lg:pb-10 lg:pt-10">
              <Breadcrumbs crumbs={crumbs} />
              <p className="eyebrow mt-8">
                {p.series}
                {p.pile !== '—' && `／芝丈 ${p.pile}`}
              </p>
              <h1 className="display mt-4 text-[1.9rem] leading-[1.35] sm:text-[2.5rem]">{p.name}</h1>
              <p className="mt-2 text-[0.8rem] tracking-[0.14em] text-hai">{p.nameEn}</p>
              <p className="mt-6 max-w-[34rem] text-[1rem] leading-[2] text-sumi-2">{p.catch}</p>
              <ul className="mt-6 flex flex-wrap gap-2 text-[0.76rem] tracking-[0.06em] text-fukami">
                {p.features.map((f) => (
                  <li key={f} className="border border-wakaba-2 bg-wakaba px-2.5 py-1">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hero-photo relative aspect-[16/9] overflow-hidden bg-kinari lg:aspect-[5/3]">
              <Photo photo={photo} fill sizes="(min-width: 1024px) 50vw, 100vw" priority quality={78} />
            </div>
          </div>
        </div>
      </header>

      <section className="cv bg-shiro py-16 sm:py-20">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <Reveal>
              <h2 className="eyebrow">この商品について</h2>
              <div className="mt-5 space-y-5">
                {p.body.map((t, i) => (
                  <p key={i} className="text-[0.96rem] leading-[2.05] text-sumi-2">
                    {t}
                  </p>
                ))}
              </div>
              <Supervisor className="mt-10" />
            </Reveal>
            <Reveal delay={100}>
              <h2 className="eyebrow">こんな人・場所に向いています</h2>
              <ul className="mt-5 space-y-3">
                {p.suitableFor.map((s) => (
                  <li key={s} className="flex gap-3 text-[0.95rem] leading-[1.9] text-sumi-2">
                    <CheckIcon className="mt-[0.45em] shrink-0 text-shiba" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              {p.notes && (
                <>
                  <h2 className="eyebrow mt-10">選ぶときの注意</h2>
                  <ul className="mt-5 space-y-3">
                    {p.notes.map((n) => (
                      <li key={n} className="flex gap-3 text-[0.92rem] leading-[1.9] text-sumi-2">
                        <span aria-hidden className="mt-[0.95em] h-px w-4 shrink-0 bg-hai" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* 仕様・価格 */}
      <section className="cv bg-kinari py-16 sm:py-24" aria-labelledby="spec-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <Reveal>
              <h2 id="spec-heading" className="eyebrow">
                製品仕様
              </h2>
              <div className="table-scroll mt-5">
                <table className="spec-table">
                  <tbody>
                    {p.spec.map((s) => (
                      <tr key={s.label}>
                        <th scope="row">{s.label}</th>
                        <td className="text-sumi-2">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="eyebrow">材料価格</h2>
              {p.prices ? (
                <>
                  <ul className="mt-5 divide-y divide-sen border-y border-sen">
                    {p.prices.map((pr) => (
                      <li key={pr.variant} className="flex items-baseline justify-between gap-4 py-4">
                        <span className="text-[0.9rem] text-sumi-2">{pr.variant}</span>
                        <span className="text-right">
                          <span className="num block text-[1.2rem] text-sumi">{pr.priceTaxIn}</span>
                          <span className="text-[0.74rem] text-hai">税別 {pr.price}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[0.78rem] leading-[1.8] text-hai">本部公式サイト掲載の材料価格（2026年9月確認）。カット加工料・施工料は別途。施工を含めた費用は面積と下地で変わります。</p>
                </>
              ) : (
                <p className="mt-5 text-[0.92rem] leading-[1.9] text-sumi-2">充填材の価格は、人工芝の面積と充填量で変わるため、お見積りの際にご案内します。</p>
              )}
              <Link href="/price" className="rule-link mt-6 text-fukami">
                施工費用の考え方
                <span aria-hidden>→</span>
              </Link>
              <a href={p.hqUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 py-1 text-[0.78rem] text-hai underline-offset-4 hover:text-fukami hover:underline">
                本部サイトの商品ページ
                <ExternalIcon className="text-[0.85em]" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 関連 */}
      <section className="cv bg-shiro py-16 sm:py-20" aria-labelledby="related-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 id="related-heading" className="eyebrow">
                この商品を使う用途
              </h2>
              <div className="mt-5">
                <LinkList items={related} columns={1} />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="eyebrow">ほかの商品</h2>
              <div className="mt-5">
                <LinkList items={others.map((o) => ({ href: `/products/${o.slug}`, label: o.name, note: o.catch }))} columns={1} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand id="product-cta" title={`${p.name}のサンプルをご用意できます。`} lead="実際の色と質感を、庭の光で確かめてください。写真と広さをお送りいただければ、この商品での概算もお伝えします。相談・見積り・サンプルは無料です。" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={productJsonLd({ name: p.name, description: p.description, path: `/products/${p.slug}`, image: photo.src })} />
    </>
  );
}
