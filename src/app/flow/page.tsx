import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import PageHero from '@/components/ui/PageHero';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import { CheckIcon } from '@/components/ui/icons';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';

const title = '施工の流れ｜ご相談から写真見積り・現地調査・施工・お引き渡しまで';
const description =
  '静岡EASTの人工芝施工の流れ。ご相談、写真による概算見積り、現地調査と正式見積り、ご契約と日程調整、施工（多くの庭は1〜2日）、完成・お引き渡し、5年品質保証・1年施工保証。準備していただくもの、施工当日の立ち会いについても解説。';

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: '/flow',
  ogImage: photos.eastWorkInProgress.src,
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '施工の流れ', href: '/flow' },
];

const steps = [
  {
    title: 'ご相談',
    body: '電話、メール、フォームからご連絡ください。「人工芝が向いているか分からない」「砂利と迷っている」という段階で構いません。用途・広さ・今の状態をうかがい、考え方をお伝えします。',
    note: `電話 ${shop.tel}（${shop.hours.label}）／メール ${shop.email}`,
  },
  {
    title: '写真見積り（概算）',
    body: '施工したい場所の全体写真と別アングルの写真、おおよその広さをお送りください。手書きの図面やハウスメーカーの配置図があれば、より正確になります。写真から、費用の目安と向いている商品をお返事します。',
    note: '無料。写真は写真見積りフォームから送れます',
  },
  {
    title: '現地調査・正式見積り',
    body: '現地で下地の状態、水のたまり方、搬入経路、既存の芝や雑草の量を確認し、正式なお見積りを作成します。サンプルを持参して、実際の光で色と質感を見ていただけます。',
    note: '無料。内訳（撤去・下地・防草シート・人工芝・施工）を明記します',
  },
  {
    title: 'ご契約・日程調整',
    body: '内容にご納得いただけたら、施工日を決めてご契約です。天候で日程が変わる場合は事前にご相談します。',
    note: '雨天は仕上がりと安全を優先して延期することがあります',
  },
  {
    title: '施工',
    body: '既存の撤去、不陸調整、転圧、防草シート、人工芝の敷き込み、継ぎ目・端部の処理、仕上げのブラッシング。多くの庭は1〜2日で完了します。作業の開始時と完了時にご確認いただければ、施工中は外出されても構いません。',
    note: '参考例の12〜30㎡はいずれも1日で完了',
  },
  {
    title: '完成・お引き渡し',
    body: '仕上がりを一緒に確認してお引き渡しです。お手入れの方法をお伝えします。5年間の品質保証と1年間の施工保証が付き、2年目以降は年1回のブラッシングメンテナンスを含む延長保証プランもあります。',
    note: '施工後に気になることがあれば、状況を確認して対応します',
  },
];

const prepare = [
  '施工したい場所の写真（全体と別アングルの2枚以上）',
  'おおよその広さ（縦×横のメートル、または図面）',
  '今の状態（土・雑草・天然芝・砂利・コンクリートなど）',
  '使い方（子ども・犬・ゴルフ・雑草対策・見た目など）',
  'あればハウスメーカーの配置図や外構図面',
];

export default function FlowPage() {
  return (
    <>
      <PageHero
        eyebrow="施工の流れ"
        title="ご相談から、お引き渡しまで。6つのステップ"
        lead="「まだ決めていない」段階のご相談から、写真での概算、現地調査、施工、そして施工後のフォローまで。どこで何が決まるのかを、順番に説明します。"
        photo={photos.eastWorkInProgress}
        crumbs={crumbs}
      />

      <section className="cv bg-shiro py-16 sm:py-24">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <ol className="border-t border-sen">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={Math.min(i, 4) * 60} className="grid gap-4 border-b border-sen py-8 sm:grid-cols-[5rem_1fr] sm:gap-8 sm:py-10">
                <span className="num text-[0.85rem] tracking-[0.16em] text-fukami">STEP {i + 1}</span>
                <div className="max-w-[44rem]">
                  <h2 className="display text-[1.3rem] sm:text-[1.45rem]">{s.title}</h2>
                  <p className="mt-3 text-[0.95rem] leading-[2] text-sumi-2">{s.body}</p>
                  <p className="mt-3 text-[0.8rem] leading-[1.8] text-hai">{s.note}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="cv bg-kinari py-16 sm:py-24" aria-labelledby="prepare-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="line">
              <p className="eyebrow">ご相談のときにあると助かるもの</p>
              <h2 id="prepare-heading" className="display mt-4 text-[1.5rem] sm:text-[1.9rem]">
                写真と広さと、使い方。
              </h2>
              <ul className="mt-6 space-y-3">
                {prepare.map((p) => (
                  <li key={p} className="flex gap-3 text-[0.95rem] leading-[1.9] text-sumi-2">
                    <CheckIcon className="mt-[0.45em] shrink-0 text-shiba" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[0.86rem] leading-[1.9] text-hai">全部そろっていなくても構いません。分かる範囲でお送りください。</p>
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                <li>
                  <Link href="/estimate" className="rule-link text-fukami">
                    写真で概算見積り
                    <span aria-hidden>→</span>
                  </Link>
                </li>
                <li>
                  <Link href="/price" className="rule-link text-fukami">
                    費用の考え方
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <figure>
                <div className="relative aspect-[3/2] overflow-hidden bg-kinari-2">
                  <Photo photo={photos.workTagataAfter} fill sizes="(min-width: 1024px) 40vw, 100vw" quality={78} />
                </div>
                <figcaption className="mt-3 text-[0.78rem] leading-[1.8] text-hai">田方郡の戸建て。天然芝13㎡を1日でアメイジングターフに張り替えた</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand id="flow-cta" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
