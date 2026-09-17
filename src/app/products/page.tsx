import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import Pending from '@/components/ui/Pending';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import { ArrowIcon } from '@/components/ui/icons';
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { photos } from '@/data/photos';
import { products, productsPage } from '@/data/products';
import { shop } from '@/data/shop';

const title = `${productsPage.title}｜高品質人工芝`;
const description = `${shop.name}が扱う人工芝。${products.map((p) => p.name).join('、')}。${shop.hq.name}と同じラインナップを取り扱っています。`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: '/products',
  ogImage: photos.productAmazingTurf.src,
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '取り扱い商品', href: '/products' },
];

/*
 * 取り扱い商品
 *
 * 見出し・リード文・各商品の紹介文は、静岡EAST側から届いた原稿です（data/products.ts）。
 * 制作側で文章を足したり、本部サイトの文章をAIで言い換えたりしないこと。
 * 仕様の数値は本部の情報にあたるため、公開前に本部の確認が必要です（ページ上部の「要確認」）。
 */
export default function ProductsPage() {
  return (
    <>
      <header className="bg-shiro pt-24 sm:pt-32">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="display mt-8 text-[1.75rem] leading-[1.4] sm:text-[2.3rem]">{productsPage.title}</h1>
          <p className="mt-6 max-w-[44rem] text-[0.98rem] leading-[2.05] text-sumi-2">{productsPage.lead}</p>
          <p className="mt-5 max-w-[44rem] text-[0.85rem] leading-[1.9] text-hai">
            {shop.shortName}は、{shop.hq.name}と同じラインナップを扱っています。商品名・仕様は本部公式情報です。
          </p>
          <div className="mt-8 max-w-[44rem]">
            <Pending block>
              公開前に確認すること：
              <span className="mt-2 block">
                {productsPage.toConfirm.map((t) => (
                  <span key={t} className="mt-1 block">
                    ・{t}
                  </span>
                ))}
              </span>
            </Pending>
          </div>
        </div>
      </header>

      <section className="cv bg-shiro py-12 sm:py-16">
        <div className="mx-auto max-w-[80rem] space-y-14 px-5 sm:px-8">
          {products.map((product, i) => {
            const photo = photos[product.photo];
            return (
              <Reveal key={product.name} as="article" className="grid gap-8 border-t border-sen pt-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
                <figure>
                  <div className="relative aspect-[500/280] overflow-hidden bg-kinari">
                    <Photo photo={photo} sizes="(min-width: 1024px) 28rem, 100vw" priority={i === 0} />
                  </div>
                  <figcaption className="mt-2.5 text-[0.74rem] leading-[1.7] text-hai">{photo.credit}</figcaption>
                </figure>
                <div>
                  <h2 className="display text-[1.3rem] leading-[1.5] sm:text-[1.5rem]">
                    {product.name}
                    <span className="ml-3 text-[0.72em] tracking-[0.06em] text-hai">{product.nameEn}</span>
                  </h2>
                  {product.pile && <p className="mt-2 text-[0.85rem] text-hai">{product.pile}（本部公式情報）</p>}
                  <p className="display mt-4 text-[1.02rem] text-fukami">{product.catch}</p>
                  <p className="mt-3 text-[0.95rem] leading-[2] text-sumi-2">{product.body}</p>
                  {product.ownerNote && (
                    <p className="mt-5 border-l-2 border-shiba pl-4 text-[0.93rem] leading-[1.95] text-sumi">
                      <span className="mr-2 text-[0.78rem] text-hai">静岡EASTより</span>
                      {product.ownerNote}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-shiro pb-12">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <nav aria-label="ほかのページ" className="flex flex-wrap gap-x-8 gap-y-3 border-t border-sen pt-8">
            <Link href="/works" className="rule-link text-fukami">
              施工事例
              <ArrowIcon />
            </Link>
            <Link href="/contact" className="rule-link text-sumi-2">
              お問い合わせ
            </Link>
          </nav>
        </div>
      </section>

      <CtaBand id="products-cta" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={webPageJsonLd({ type: 'CollectionPage', name: productsPage.title, description, path: '/products' })} />
    </>
  );
}
