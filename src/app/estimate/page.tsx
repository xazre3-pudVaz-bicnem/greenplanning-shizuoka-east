import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import JsonLd from '@/components/ui/JsonLd';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import InquiryForm from '@/components/forms/InquiryForm';
import { CheckIcon, MailIcon, PhoneIcon } from '@/components/ui/icons';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';

const title = '写真で概算見積り（無料）｜庭の写真を送るだけ';
const description =
  '静岡の人工芝施工、写真を送るだけで概算見積り。庭・ベランダ・専用庭の写真とおおよその広さ、今の状態、用途をフォームから送信。まだ依頼するか決めていない段階でも無料で相談できます。グリーンプランニング静岡EAST。';

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: '/estimate',
  ogImage: photos.workTagataAfter.src,
  keywords: ['人工芝 見積もり 静岡', '人工芝 写真 見積り', '人工芝 概算 見積り', '人工芝 無料見積り'],
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '写真で概算見積り', href: '/estimate' },
];

const points = [
  '「まだ依頼するか決めていない」段階で大丈夫です',
  '写真2枚と広さがあれば、費用の目安をお返事します',
  '人工芝が向いているかどうかも、正直にお答えします',
  '相談・写真見積り・現地調査・サンプルはすべて無料',
  'しつこい営業はしません',
];

const tips = [
  { title: '全体がわかる1枚', body: '庭やベランダ全体が入るように、少し離れて。建物やフェンスとの境目が写っていると納まりが分かります。' },
  { title: '別アングルの1枚', body: '反対側から、または気になる場所（水がたまる所、雑草が多い所、段差）を寄りで。' },
  { title: 'おおよその広さ', body: '縦×横のメートルで。歩幅で測った目安でも構いません。図面があれば一緒に。' },
];

export default function EstimatePage() {
  return (
    <>
      <header className="bg-shiro pt-24 sm:pt-32">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Breadcrumbs crumbs={crumbs} />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow">写真で概算見積り</p>
              <h1 className="display mt-4 text-[1.75rem] leading-[1.4] sm:text-[2.3rem] lg:text-[2.5rem]">
                庭の写真を送るだけで、
                <br />
                概算をお伝えします。
              </h1>
              <p className="mt-6 max-w-[36rem] text-[0.98rem] leading-[2.05] text-sumi-2">
                依頼するかどうかは、費用の目安を見てから決めてください。写真と広さから、費用の目安・向いている商品・人工芝が向いているかどうかを、{shop.representative}がお返事します。
              </p>
              <ul className="mt-7 space-y-2.5">
                {points.map((p) => (
                  <li key={p} className="flex gap-3 text-[0.92rem] leading-[1.8] text-sumi-2">
                    <CheckIcon className="mt-[0.4em] shrink-0 text-shiba" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hero-photo relative aspect-[4/3] overflow-hidden bg-kinari">
              <Photo photo={photos.workTagataAfter} fill sizes="(min-width: 1024px) 40vw, 100vw" priority quality={78} />
            </div>
          </div>
        </div>
      </header>

      <section className="cv bg-shiro py-14 sm:py-20">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <Reveal>
              <h2 className="display text-[1.3rem] sm:text-[1.5rem]">写真見積りフォーム</h2>
              <p className="mt-2 text-[0.86rem] leading-[1.8] text-hai">分かる範囲で構いません。写真は送信前に自動で縮小されるので、スマホで撮ったままで送れます。</p>
              <div className="mt-8">
                <InquiryForm variant="estimate" />
              </div>
            </Reveal>
            <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
              <Reveal delay={100}>
                <h2 className="eyebrow">写真の撮り方のコツ</h2>
                <ol className="mt-5 border-t border-sen">
                  {tips.map((t, i) => (
                    <li key={t.title} className="grid grid-cols-[2.2rem_1fr] gap-2 border-b border-sen py-4">
                      <span className="num text-[0.8rem] text-fukami">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <h3 className="display text-[0.98rem]">{t.title}</h3>
                        <p className="mt-1 text-[0.86rem] leading-[1.9] text-sumi-2">{t.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
              <Reveal delay={150}>
                <h2 className="eyebrow">電話・メールでも</h2>
                <ul className="mt-5 space-y-3 text-[0.92rem] text-sumi-2">
                  <li>
                    <a href={shop.telHref} className="inline-flex items-center gap-2 text-fukami underline underline-offset-4">
                      <PhoneIcon />
                      <span className="num">{shop.tel}</span>
                    </a>
                    <span className="ml-2 text-[0.78rem] text-hai">{shop.hours.label}</span>
                  </li>
                  <li>
                    <a href={`mailto:${shop.email}`} className="inline-flex items-center gap-2 break-all text-fukami underline underline-offset-4">
                      <MailIcon />
                      {shop.email}
                    </a>
                    <span className="ml-2 text-[0.78rem] text-hai">写真を添付して送れます</span>
                  </li>
                </ul>
              </Reveal>
              <Reveal delay={200}>
                <h2 className="eyebrow">見積りの前に</h2>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.88rem]">
                  {[
                    { href: '/price', label: '費用の考え方' },
                    { href: '/flow', label: '施工の流れ' },
                    { href: '/how-to-choose', label: '人工芝の選び方' },
                    { href: '/faq', label: 'よくある質問' },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-fukami underline underline-offset-4">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
