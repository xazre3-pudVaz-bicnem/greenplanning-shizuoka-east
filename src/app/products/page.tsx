import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import PageHero from '@/components/ui/PageHero';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import { ArrowIcon, ExternalIcon } from '@/components/ui/icons';
import { breadcrumbJsonLd, itemListJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { photos } from '@/data/photos';
import { products } from '@/data/products';
import { shop } from '@/data/shop';

const title = '人工芝の商品ラインナップ｜アメイジングターフ・アイランドグラス・ゴルフグリーン・ジオフィル';
const description =
  'グリーンプランニング静岡EASTが扱う人工芝の商品一覧。134万本/㎡の超高密度アメイジングターフ、国産アイランドグラス（タイプR・C・G）、ゴルフグリーン用ターフ、天然素材の充填材ジオフィル。芝丈・仕様・材料価格と「どんな人に向いているか」を解説。';

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: '/products',
  ogImage: photos.turfRollsWide.src,
  keywords: ['人工芝 商品', 'アメイジングターフ', 'アイランドグラス 人工芝', 'ゴルフグリーン用ターフ', 'ジオフィル 充填材'],
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '商品ラインナップ', href: '/products' },
];

const factory = [
  { photo: 'factoryTufting' as const, caption: 'タフティング工程。芝糸を基布に打ち込む' },
  { photo: 'factoryBacking' as const, caption: 'バッキング工程。裏面をコーティングして芝糸を固定する' },
  { photo: 'factoryYarn' as const, caption: '芝糸のボビン。素材と断面の形状が踏み心地を決める' },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="商品ラインナップ"
        title="用途で選ぶ、7つの人工芝と充填材"
        lead="グリーンプランニングが扱う人工芝は、134万本/㎡の超高密度アメイジングターフ、国産オリジナルのアイランドグラス、ゴルフ専用のターフ、そして天然素材の充填材ジオフィル。スペックだけでなく、「どんな人に向いているか」で選べるように整理しました。"
        photo={photos.turfRollsWide}
        crumbs={crumbs}
      />

      <section className="cv bg-shiro py-16 sm:py-24">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <ul className="divide-y divide-sen border-t border-sen">
            {products.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={Math.min(i, 3) * 60}>
                <Link href={`/products/${p.slug}`} className="group grid gap-6 py-10 lg:grid-cols-[18rem_1fr_auto] lg:items-center lg:gap-12">
                  <div className="relative aspect-[16/9] overflow-hidden bg-kinari">
                    <Photo photo={photos[p.photo]} fill sizes="(min-width: 1024px) 18rem, 100vw" quality={70} className="transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]" />
                  </div>
                  <div>
                    <p className="text-[0.72rem] tracking-[0.14em] text-hai">
                      {p.nameEn}
                      {p.pile !== '—' && ` / 芝丈 ${p.pile}`}
                    </p>
                    <h2 className="display mt-1.5 text-[1.3rem] transition-colors group-hover:text-fukami sm:text-[1.5rem]">{p.name}</h2>
                    <p className="mt-2 text-[0.94rem] leading-[1.9] text-sumi-2">{p.catch}</p>
                    <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.74rem] tracking-[0.06em] text-fukami">
                      {p.features.map((f) => (
                        <li key={f} className="border border-wakaba-2 bg-wakaba px-2 py-0.5">
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-[0.82rem] text-sumi-2">
                      <span className="text-hai">向いている：</span>
                      {p.suitableFor.slice(0, 2).join('／')}
                    </p>
                  </div>
                  <div className="lg:text-right">
                    {p.prices ? (
                      <p className="text-[0.8rem] text-hai">
                        材料価格
                        <span className="num ml-2 text-[1.05rem] text-sumi">{p.prices[0].priceTaxIn}</span>
                        {p.prices.length > 1 && <span className="ml-1 text-[0.72rem]">〜</span>}
                      </p>
                    ) : (
                      <p className="text-[0.8rem] text-hai">価格はお問い合わせください</p>
                    )}
                    <span className="rule-link mt-4 text-fukami">
                      くわしく
                      <ArrowIcon className="transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-[0.78rem] leading-[1.8] text-hai">
            材料価格は本部公式サイト掲載の㎡あたり税込価格（2026年9月確認）。カット加工料・施工料は別途です。施工を含めた費用の考え方は
            <Link href="/price" className="ml-1 py-1 text-fukami underline underline-offset-4">
              施工費用・価格
            </Link>
            をご覧ください。
          </p>
        </div>
      </section>

      {/* 工場 */}
      <section className="cv bg-kinari py-16 sm:py-24" aria-labelledby="factory-heading">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <Reveal variant="line">
              <p className="eyebrow">製造について</p>
              <h2 id="factory-heading" className="display mt-4 text-[1.5rem] sm:text-[1.9rem]">
                人工芝専門の工場でつくられています
              </h2>
              <p className="mt-5 text-[0.94rem] leading-[2] text-sumi-2">
                グリーンプランニングの人工芝は、人工芝製造に特化した専門工場で生産されています。アメイジングターフはFIFA認定工場で、アイランドグラスは素材選びから製造・検品まで国内で管理されています。密度・断面・基布といった、見た目では分からない差が、数年後の仕上がりに表れます。
              </p>
              <a href={shop.hq.lineupUrl} target="_blank" rel="noopener noreferrer" className="rule-link mt-6 text-fukami">
                本部サイトの商品紹介
                <ExternalIcon className="text-[0.85em]" />
              </a>
            </Reveal>
            <ul className="grid gap-6 sm:grid-cols-3">
              {factory.map((f, i) => (
                <Reveal as="li" key={f.photo} delay={i * 80}>
                  <figure>
                    <div className="relative aspect-[10/7] overflow-hidden bg-kinari-2">
                      <Photo photo={photos[f.photo]} fill sizes="(min-width: 640px) 20vw, 100vw" quality={70} />
                    </div>
                    <figcaption className="mt-3 text-[0.78rem] leading-[1.8] text-hai">{f.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="cv bg-shiro py-16 sm:py-20">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <Reveal>
            <h2 className="eyebrow">選び方に迷ったら</h2>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {[
                { href: '/how-to-choose', label: '人工芝の選び方' },
                { href: '/dogrun', label: '犬と暮らす庭に向く人工芝' },
                { href: '/golf', label: 'ゴルフ用人工芝' },
                { href: '/balcony', label: 'ベランダに向く人工芝' },
                { href: '/price', label: '施工費用・価格' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="rule-link text-fukami">
                    {l.label}
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand id="products-cta" title="サンプルで、実際の色と質感を確かめられます。" lead="用途と予算をお聞かせいただければ、2〜3種類に絞ってサンプルをご用意します。庭の写真をお送りいただければ、商品の組み合わせを含めた概算もお伝えします。" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={itemListJsonLd({ name: '商品ラインナップ', items: products.map((p) => ({ name: p.name, href: `/products/${p.slug}` })) })} />
    </>
  );
}
