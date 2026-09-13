import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CtaBand from '@/components/ui/CtaBand';
import GoogleMap from '@/components/ui/GoogleMap';
import Pending from '@/components/ui/Pending';
import Reveal from '@/components/ui/Reveal';
import ShopInfoTable from '@/components/ui/ShopInfoTable';
import { ArrowIcon } from '@/components/ui/icons';
import { buildMetadata } from '@/lib/seo';
import { defaultDescription, homeTitle } from '@/lib/site';
import { photos } from '@/data/photos';
import { regions } from '@/data/areas';
import { shop } from '@/data/shop';

const baseMeta = buildMetadata({ title: homeTitle, description: defaultDescription, path: '/' });

export const metadata: Metadata = {
  ...baseMeta,
  // トップだけはテンプレート（｜店名）を付けず、そのままのタイトルにする
  title: { absolute: homeTitle },
  ...(baseMeta.openGraph ? { openGraph: { ...baseMeta.openGraph, title: homeTitle } } : {}),
  ...(baseMeta.twitter ? { twitter: { ...baseMeta.twitter, title: homeTitle } } : {}),
};

/*
 * トップページ
 *
 * 本部チェックリストに沿って、ここに置くのは次のものだけにしています。
 *   - 店舗の事実（店名・パートナー区分・担当エリア・事業内容・連絡先）
 *   - 本部が使用可として提供した写真（出典を表示）
 *   - 静岡EASTが自分で書く文章・施工事例の置き場所（届くまでは「要確認」の目印）
 * 本部サイトと同じ分類（庭・ドッグラン・ゴルフ等）の構成、本部の実績数値・参考価格、
 * 本部の文章をもとにした説明文は置きません。
 */
export default function HomePage() {
  const hero = photos.sceneGarden;

  return (
    <>
      <section className="bg-shiro pt-16 sm:pt-[4.75rem]" aria-labelledby="home-heading">
        <div className="mx-auto grid max-w-[84rem] gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:py-20">
          <div>
            <p className="hero-fade eyebrow" style={{ ['--hero-delay' as string]: '0.05s' }}>
              担当エリア　{shop.areaLabel}
            </p>
            <h1
              id="home-heading"
              className="hero-fade display mt-5 text-[1.7rem] leading-[1.45] text-sumi sm:text-[2.3rem] xl:text-[2.6rem]"
              style={{ ['--hero-delay' as string]: '0.2s' }}
            >
              <span className="block text-[0.55em] tracking-[0.06em] text-sumi-2">静岡県の人工芝施工</span>
              <span className="mt-2 block">{shop.name}</span>
            </h1>
            <p className="hero-fade mt-5 text-[0.9rem] leading-[1.9] text-sumi-2" style={{ ['--hero-delay' as string]: '0.35s' }}>
              {shop.hq.name}の{shop.partnerCategory ?? <Pending>本部指定のパートナー区分</Pending>}
              ／{shop.address.prefecture}
              {shop.address.city}
            </p>
            <div className="hero-fade mt-7" style={{ ['--hero-delay' as string]: '0.5s' }}>
              <Pending block>
                静岡EASTの紹介文（静岡EASTで作成）。地域とのかかわり、得意なこと、実際に行っているサービスを、代表・スタッフの言葉で書いていただく欄です。
              </Pending>
            </div>
            <div className="hero-fade mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ ['--hero-delay' as string]: '0.65s' }}>
              <Link href="/contact" className="rule-link text-fukami">
                お問い合わせ
                <ArrowIcon />
              </Link>
              <Link href="/about" className="rule-link text-sumi-2">
                店舗情報
              </Link>
            </div>
          </div>

          <figure className="hero-photo">
            <div className="relative aspect-[4/3] overflow-hidden bg-kinari">
              {/* Basic認証中は画像最適化（/_next/image）が元画像を取得できないため、scripts/prepare-images.mjs で圧縮済みのファイルをそのまま配信する */}
              <Image src={hero.src} alt={hero.alt} fill priority unoptimized className="object-cover" />
            </div>
            <figcaption className="mt-2.5 text-[0.74rem] leading-[1.7] text-hai">{hero.credit}</figcaption>
          </figure>
        </div>
      </section>

      <section className="cv border-t border-sen bg-shiro py-16 sm:py-20" aria-labelledby="business-heading">
        <div className="mx-auto grid max-w-[84rem] gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="line">
            <h2 id="business-heading" className="display text-[1.4rem] sm:text-[1.7rem]">
              事業内容
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {shop.business.map((b) => (
                <li key={b} className="hairline bg-kinari px-3.5 py-1.5 text-[0.9rem] text-sumi-2">
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="display text-[1.4rem] sm:text-[1.7rem]">担当エリア</h2>
            <p className="mt-6 text-[0.95rem] leading-[2] text-sumi-2">{shop.areaLabel}</p>
            <ul className="mt-3 space-y-1.5 text-[0.88rem] leading-[1.9] text-sumi-2">
              {regions.map((r) => (
                <li key={r.key}>
                  <span className="text-hai">{r.label}：</span>
                  {r.municipalities.join('・')}
                </li>
              ))}
            </ul>
            <Link href="/area" className="rule-link mt-6 text-fukami">
              担当エリアを見る
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="cv bg-kinari py-16 sm:py-20" aria-labelledby="works-heading">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <Reveal variant="line" className="max-w-[44rem]">
            <h2 id="works-heading" className="display text-[1.4rem] sm:text-[1.7rem]">
              静岡EASTの施工事例
            </h2>
            <div className="mt-6">
              <Pending block>
                静岡EASTが施工した事例（施工地域・場所・施工前後の写真・お客様の掲載許可）。写真は静岡EASTで撮影し、お客様の許諾を得たものを使います。本部の施工実績は、ここに静岡EASTの実績として載せません。
              </Pending>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cv bg-shiro py-16 sm:py-20" aria-labelledby="shop-heading">
        <div className="mx-auto grid max-w-[84rem] gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="line">
            <h2 id="shop-heading" className="display text-[1.4rem] sm:text-[1.7rem]">
              店舗情報
            </h2>
            <div className="mt-6">
              <ShopInfoTable compact />
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

      <CtaBand id="home-cta" />
    </>
  );
}
