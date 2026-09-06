import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/ui/CtaBand';
import Faq from '@/components/ui/Faq';
import JsonLd from '@/components/ui/JsonLd';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { photos } from '@/data/photos';
import { faqGroups, faqItems, type FaqGroup } from '@/data/faq';

const title = 'よくある質問｜見積り・商品・施工・保証・犬・ゴルフ・対応エリア';
const description =
  '静岡EASTの人工芝施工についてよくある質問。写真見積り、費用、商品の選び方、ホームセンターとの違い、耐用年数、雑草、夏の熱さ、水はけ、工期、天然芝からの張り替え、お手入れ、保証、犬の臭い、パター練習の広さ、対応エリアまで。';

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: '/faq',
  ogImage: photos.gardenHouse.src,
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: 'よくある質問', href: '/faq' },
];

const order: FaqGroup[] = ['estimate', 'product', 'construction', 'after', 'dog', 'golf', 'area'];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="よくある質問"
        title="はじめての方から、よく聞かれること"
        lead="見積りの取り方から、商品の違い、施工、保証、犬やゴルフのことまで。ここに無い質問は、電話・メール・フォームでお気軽にどうぞ。"
        photo={photos.turfHandTouch}
        crumbs={crumbs}
      />

      <section className="cv bg-shiro py-12 sm:py-16">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Reveal>
            <nav aria-label="質問のカテゴリ" className="flex flex-wrap gap-x-6 gap-y-3 border-b border-sen pb-5 text-[0.88rem]">
              {order.map((g) => (
                <a key={g} href={`#faq-${g}`} className="text-sumi-2 underline-offset-4 hover:text-fukami hover:underline">
                  {faqGroups[g]}
                </a>
              ))}
            </nav>
          </Reveal>

          <div className="mt-12 space-y-16">
            {order.map((g) => {
              const items = faqItems.filter((f) => f.groups[0] === g);
              if (items.length === 0) return null;
              return (
                <section key={g} id={`faq-${g}`} aria-labelledby={`faq-${g}-heading`} className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-16">
                  <Reveal variant="line">
                    <h2 id={`faq-${g}-heading`} className="display text-[1.3rem] lg:sticky lg:top-28">
                      {faqGroups[g]}
                    </h2>
                  </Reveal>
                  <Faq items={items} />
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cv bg-kinari py-14 sm:py-16">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Reveal>
            <h2 className="eyebrow">もっとくわしく</h2>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {[
                { href: '/price', label: '施工費用・価格' },
                { href: '/how-to-choose', label: '人工芝の選び方' },
                { href: '/lifespan', label: '人工芝は何年持つ？' },
                { href: '/heat', label: '人工芝は夏に熱くなる？' },
                { href: '/maintenance', label: 'お手入れ・メンテナンス' },
                { href: '/flow', label: '施工の流れ' },
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

      <CtaBand id="faq-cta" title="ここに無い質問は、直接どうぞ。" lead="「こんなことを聞いてもいいのかな」という質問こそ歓迎です。電話・メール・フォーム、どれでも。写真を添えていただければ、概算もあわせてお返事します。" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faqItems)} />
    </>
  );
}
