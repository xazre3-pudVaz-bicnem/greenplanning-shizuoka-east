import type { Metadata } from 'next';
import Link from 'next/link';
import BeforeAfter from '@/components/ui/BeforeAfter';
import CtaBand from '@/components/ui/CtaBand';
import Faq from '@/components/ui/Faq';
import GoogleMap from '@/components/ui/GoogleMap';
import JsonLd from '@/components/ui/JsonLd';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import ShopInfoTable from '@/components/ui/ShopInfoTable';
import WorkCard from '@/components/ui/WorkCard';
import { ArrowIcon, CameraIcon, CheckIcon, ExternalIcon, InstagramIcon } from '@/components/ui/icons';
import { faqJsonLd, itemListJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { defaultDescription, homeTitle } from '@/lib/site';
import { formatDate, getAllPosts } from '@/lib/blog';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';
import { products } from '@/data/products';
import { works } from '@/data/works';
import { regions, areaPages } from '@/data/areas';
import { faqItems } from '@/data/faq';
import { serviceLinks } from '@/data/nav';

const baseMeta = buildMetadata({
  title: homeTitle,
  description: defaultDescription,
  path: '/',
  keywords: ['静岡 人工芝', '静岡県 人工芝', '静岡 人工芝 施工', '人工芝 静岡市', '人工芝 沼津', '人工芝 三島', '人工芝 富士市', '静岡 ドッグラン 人工芝', '静岡 ゴルフ 人工芝', '人工芝 費用 静岡', '人工芝 業者 静岡'],
});

export const metadata: Metadata = {
  ...baseMeta,
  // トップだけはテンプレート（｜店名）を付けず、そのままのタイトルにする
  title: { absolute: homeTitle },
  ...(baseMeta.openGraph ? { openGraph: { ...baseMeta.openGraph, title: homeTitle } } : {}),
  ...(baseMeta.twitter ? { twitter: { ...baseMeta.twitter, title: homeTitle } } : {}),
};

/* ───────────── データ（このページだけで使う） ───────────── */

const concerns = [
  { text: '庭の雑草取りが大変で、夏は出る気にもなれない', href: '/weed-control', label: '雑草対策' },
  { text: '天然芝の芝刈り・水やり・冬の枯れに疲れた', href: '/natural-grass', label: '天然芝から人工芝へ' },
  { text: '雨のあと、庭が泥だらけになる', href: '/drainage', label: '水はけの考え方' },
  { text: '子どもを庭で遊ばせたいが、土と砂利では心配', href: '/kids', label: '子どもが遊べる庭' },
  { text: '犬を自由に走らせたい。自宅にドッグランがほしい', href: '/dogrun', label: '犬と暮らす庭' },
  { text: '庭が殺風景で、ほとんど使えていない', href: '/garden', label: '戸建ての庭' },
  { text: '自宅でパター練習をしたい', href: '/golf', label: '自宅ゴルフ' },
  { text: '新築の庭が土のままで、どうするか迷っている', href: '/garden', label: '新築の庭' },
  { text: 'マンションの専用庭・ベランダを活かしたい', href: '/mansion', label: 'マンション専用庭' },
  { text: '店舗や施設を、管理しやすい緑で演出したい', href: '/facility', label: '法人・施設' },
];

const uses = [
  { href: '/garden', title: '庭', copy: '土のまま、砂利のまま、荒れた天然芝のまま。その庭を、毎日使う場所へ。', photo: 'workTagataAfter' as const },
  { href: '/dogrun', title: 'ドッグラン', copy: '泥にならず、掘り返されず、雨のあとも走れる。愛犬の居場所を庭に。', photo: 'dogrunPoodles' as const },
  { href: '/golf', title: 'ゴルフ', copy: '庭の一角、テラスの一部に、毎日5分のパターグリーン。', photo: 'golfPuttingGreen' as const },
  { href: '/kids', title: '子どもの遊び場', copy: '裸足で、泥を気にせず、リビングの窓のすぐ外で。', photo: 'baHouseAfter' as const },
  { href: '/mansion', title: 'マンション専用庭', copy: '雑草と泥はねをなくして、カーテンを開けたくなる専用庭に。', photo: 'mansionGarden' as const },
  { href: '/balcony', title: 'ベランダ・テラス', copy: '洗濯物を干すだけの場所を、座って過ごす場所に。', photo: 'balconyTerrace' as const },
  { href: '/balcony', title: '屋上', copy: 'コンクリートの屋上を、空の近い緑のテラスに。', photo: 'baRooftopAfter' as const },
  { href: '/parking', title: '駐車場', copy: 'コンクリートの目地に、枯れない緑のラインを。', photo: 'parkingStripes' as const },
  { href: '/parking', title: '玄関・アプローチ', copy: '家の顔になる場所を、手入れなしで整える。', photo: 'entranceApproach' as const },
  { href: '/facility', title: '店舗・施設', copy: '園庭、店舗前、屋上、ショールーム。管理しやすい緑を。', photo: 'gardenFlowerbedWide' as const },
];

const qualitySteps = [
  { title: '撤去と下地づくり', body: '既存の天然芝・雑草・砂利を根から取り除き、下地をつくります。根が残ると、あとで持ち上がったり沈んだりします。' },
  { title: '不陸調整', body: '地面の高さをそろえます。ここを省くと、雨のあとに水たまりができ、芝が波打ちます。' },
  { title: '転圧', body: '転圧機で下地を締め固めます。歩くうちに沈む庭と、何年たっても平らな庭の差は、ここで生まれます。' },
  { title: '排水', body: '水の逃げ道を確認し、必要なら勾配や砕石の排水層をつくります。人工芝には水抜き穴があり、下地が整えば雨のあとも使えます。' },
  { title: '継ぎ目', body: 'ロールをつなぐ継ぎ目は、芝目をそろえ、段差なく接合します。光の当たり方で線が見えないように。' },
  { title: '端部処理', body: 'フェンスや建物の際、縁石との境目を隙間なく納め、ピンで固定します。雑草の芽とめくれは、端から始まります。' },
];

const priceExamples = [
  { place: 'マンション専用庭', product: 'AmazingTurf 35mm', size: '17㎡', base: '土・雑草', days: '1日', price: '約180,000円' },
  { place: '戸建ての庭', product: 'IslandGrass 35mm', size: '12㎡', base: '土・砂利・デッキ下', days: '1日', price: '約140,000円' },
  { place: '屋上テラス', product: 'AmazingTurf 35mm', size: '30㎡', base: 'コンクリート', days: '1日', price: '約230,000円' },
];

const reasons = [
  {
    title: '沼津から、静岡東部・中部・伊豆へ',
    body: '店舗は沼津市泉町。三島・富士・御殿場から静岡市、伊豆まで、地域の庭の事情を知ったうえで提案し、施工後も伺える距離にいます。',
  },
  {
    title: '全国ネットワークの品質基準と保証',
    body: 'グリーンプランニングの施工基準・商品を共有する加盟店です。5年間の品質保証と1年間の施工保証が付き、2年目以降の延長保証プランもあります。',
  },
  {
    title: '「何をしたいか」から提案する',
    body: '人工芝を売るのではなく、庭の使い方から逆算します。全面ではなく一部だけ、庭用とゴルフ用の組み合わせ、フェンスを含めた計画も。',
  },
  {
    title: '写真を送るだけで概算がわかる',
    body: '「まだ決めていない」段階でも大丈夫です。写真と広さから概算をお伝えし、そこから現地確認へ。相談・見積り・現地調査は無料です。',
  },
];

const homeFaq = faqItems.filter((f) =>
  ['写真を送るだけで見積りできますか？', '費用はどのくらいかかりますか？', '人工芝を敷くと雑草は生えなくなりますか？', '工事は何日くらいかかりますか？', '人工芝は何年くらい持ちますか？', '対応エリアはどこですか？'].includes(f.q),
);

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);
  const mainWork = works[0];

  return (
    <>
      {/* 1. HERO */}
      <section className="relative bg-shiro pt-16 sm:pt-[4.75rem]" aria-label="メインビジュアル">
        <div className="lg:grid lg:min-h-[calc(100svh-4.75rem)] lg:grid-cols-[minmax(0,46%)_minmax(0,54%)]">
          <div className="relative order-1 aspect-[4/3] overflow-hidden bg-kinari sm:aspect-[16/10] lg:order-2 lg:aspect-auto lg:h-full lg:min-h-[36rem]">
            <div className="absolute inset-0">
              <Photo photo={photos.gardenHouse} fill sizes="(min-width: 1024px) 54vw, 100vw" priority quality={70} position="50% 55%" />
            </div>
            <div className="fade-left absolute inset-0 hidden lg:block" aria-hidden />
          </div>
          <div className="order-2 flex flex-col justify-center px-5 py-12 sm:px-8 sm:py-16 lg:order-1 lg:py-20 lg:pl-[max(2rem,calc((100vw-84rem)/2+2rem))] lg:pr-12">
            <p className="hero-fade display text-[2rem] leading-[1.35] text-sumi sm:text-[2.7rem] lg:text-[2.6rem] xl:text-[3.1rem]" style={{ ['--hero-delay' as string]: '0.1s' }}>
              庭が変わると、
              <br />
              暮らしが変わる。
            </p>
            <h1 className="hero-fade mt-7 text-[0.98rem] leading-[1.9] tracking-[0.06em] text-sumi-2 sm:text-[1.05rem]" style={{ ['--hero-delay' as string]: '0.35s' }}>
              静岡県の人工芝施工なら、
              <br className="sm:hidden" />
              静岡県東部・中部・伊豆の人工芝専門店
              <br />
              <span className="display text-[1.15em] text-sumi">グリーンプランニング静岡EAST</span>
            </h1>
            <p className="hero-fade mt-6 max-w-[30rem] text-[0.9rem] leading-[2] text-hai" style={{ ['--hero-delay' as string]: '0.55s' }}>
              雑草のない庭から、もっと遊べる庭へ。沼津・三島・富士・御殿場・静岡市・伊豆。庭、ドッグラン、ゴルフ、マンション専用庭まで、人工芝を「庭で何をしたいか」から提案します。
            </p>
            <div className="hero-fade mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ ['--hero-delay' as string]: '0.75s' }}>
              <Link href="/estimate" className="rule-link text-fukami">
                <CameraIcon />
                写真で概算見積り
              </Link>
              <Link href="/works" className="rule-link text-sumi-2">
                施工事例を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 静岡EASTについて */}
      <section className="cv bg-shiro py-20 sm:py-28" aria-labelledby="about-heading">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <Reveal variant="line">
              <p className="eyebrow">静岡EASTについて</p>
              <h2 id="about-heading" className="display mt-4 text-[1.6rem] leading-[1.45] sm:text-[2.1rem]">
                人工芝を売る会社ではなく、
                <br />
                庭をもっと使える場所にする会社です。
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-5 text-[0.96rem] leading-[2.05] text-sumi-2">
                <p>
                  グリーンプランニング静岡EASTは、沼津市泉町を拠点に、静岡県東部・中部・伊豆地域で人工芝の施工・販売・メンテナンス、造園・外構工事を行う専門店です。代表の髙橋祐子は静岡で生まれ育ち、犬と暮らしています。
                </p>
                <p>
                  全国で人工芝施工を行うグリーンプランニングの品質基準と商品を共有しながら、この地域の庭の事情に合わせた提案をしています。本部公式サイトには全国で{shop.brandFacts.worksCount}・{shop.brandFacts.totalArea}の施工実績が掲載され、施工には{shop.brandFacts.qualityWarrantyYears}年間の品質保証と{shop.brandFacts.workWarrantyYears}年間の施工保証が付きます。
                </p>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-sen pt-6 text-[0.86rem] text-sumi-2">
                <li>
                  <span className="text-hai">拠点</span> 沼津市泉町
                </li>
                <li>
                  <span className="text-hai">対応</span> 静岡県東部・中部・伊豆
                </li>
                <li>
                  <span className="text-hai">保証</span> 品質5年・施工1年
                </li>
                <li>
                  <span className="text-hai">見積り</span> 写真で無料
                </li>
              </ul>
              <Link href="/about" className="rule-link mt-8 text-fukami">
                静岡EASTと代表について
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Before / After */}
      <section className="cv border-t border-sen bg-shiro py-20 sm:py-28" aria-labelledby="ba-heading">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <Reveal variant="line" className="max-w-[40rem]">
            <p className="eyebrow">Before / After</p>
            <h2 id="ba-heading" className="display mt-4 text-[1.6rem] sm:text-[2.1rem]">
              見るだけだった庭を、過ごす庭へ。
            </h2>
            <p className="mt-5 text-[0.95rem] leading-[2] text-sumi-2">スライダーを動かして、施工前と施工後を見比べてください。</p>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
            <Reveal variant="clip">
              <BeforeAfter before={photos.workTagataBefore} after={photos.workTagataAfter} sizes="(min-width: 1024px) 55vw, 100vw" label="田方郡の戸建て、施工前と施工後の比較" />
              <p className="mt-4 text-[0.8rem] leading-[1.8] text-hai">
                静岡県田方郡の戸建て。天然芝13㎡をアメイジングターフ35mm＋ジオフィルへ（工期1日）。
                <Link href={`/works/${mainWork.slug}`} className="ml-2 py-1 text-fukami underline underline-offset-4">
                  この事例を見る
                </Link>
              </p>
            </Reveal>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              <Reveal variant="clip" delay={100}>
                <BeforeAfter before={photos.baWeedsBefore} after={photos.baWeedsAfter} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" aspectClass="aspect-[16/10]" label="マンション専用庭、施工前と施工後の比較" />
                <p className="mt-3 text-[0.78rem] leading-[1.8] text-hai">マンション専用庭。雑草に覆われた庭が緑のテラスに（グリーンプランニング施工例）</p>
              </Reveal>
              <Reveal variant="clip" delay={200}>
                <BeforeAfter before={photos.baTerraceBefore} after={photos.baTerraceAfter} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" aspectClass="aspect-[16/10]" label="屋上テラス、施工前と施工後の比較" />
                <p className="mt-3 text-[0.78rem] leading-[1.8] text-hai">屋上テラス。コンクリートの床が過ごせる場所に（グリーンプランニング施工例）</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4. お悩み */}
      <section className="cv bg-kinari py-20 sm:py-28" aria-labelledby="concern-heading">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <Reveal variant="line">
              <p className="eyebrow">こんなお庭のお悩みありませんか</p>
              <h2 id="concern-heading" className="display mt-4 text-[1.6rem] leading-[1.45] sm:text-[2.1rem]">
                その悩み、
                <br />
                たいてい足元から解決できます。
              </h2>
              <p className="mt-5 text-[0.95rem] leading-[2] text-sumi-2">人工芝は「敷くもの」ではなく、庭に出られない理由をひとつずつ取り除く方法です。当てはまるものから読んでみてください。</p>
            </Reveal>
            <ul className="border-t border-sen">
              {concerns.map((c, i) => (
                <Reveal as="li" key={c.text} delay={Math.min(i, 5) * 50} className="border-b border-sen">
                  <Link href={c.href} className="group flex items-center justify-between gap-4 py-4 sm:py-5">
                    <span className="text-[0.96rem] leading-[1.8] text-sumi">{c.text}</span>
                    <span className="flex shrink-0 items-center gap-2 text-[0.78rem] tracking-[0.08em] text-fukami">
                      <span className="hidden sm:inline">{c.label}</span>
                      <ArrowIcon className="transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. 人工芝でできること */}
      <section className="cv bg-shiro py-20 sm:py-28" aria-labelledby="uses-heading">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <Reveal variant="line" className="max-w-[40rem]">
            <p className="eyebrow">人工芝でできること</p>
            <h2 id="uses-heading" className="display mt-4 text-[1.6rem] sm:text-[2.1rem]">
              一年中、外に出たくなる場所へ。
            </h2>
          </Reveal>

          <div className="mt-14 space-y-16 sm:space-y-20">
            {uses.slice(0, 4).map((u, i) => (
              <Reveal key={u.title} as="article">
                <Link href={u.href} className={`group grid items-center gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-14 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div className="relative aspect-[3/2] overflow-hidden bg-kinari">
                    <Photo photo={photos[u.photo]} fill sizes="(min-width: 1024px) 55vw, 100vw" quality={78} className="transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]" />
                  </div>
                  <div>
                    <p className="num text-[0.78rem] tracking-[0.16em] text-fukami">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="display mt-3 text-[1.55rem] sm:text-[1.9rem]">{u.title}</h3>
                    <p className="mt-4 text-[0.96rem] leading-[2] text-sumi-2">{u.copy}</p>
                    <span className="rule-link mt-6 text-fukami">
                      くわしく見る
                      <ArrowIcon className="transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <ul className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {uses.slice(4).map((u, i) => (
              <Reveal as="li" key={u.title} delay={(i % 3) * 80}>
                <Link href={u.href} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-kinari">
                    <Photo photo={photos[u.photo]} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" quality={70} className="transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]" />
                  </div>
                  <h3 className="display mt-4 text-[1.1rem] transition-colors group-hover:text-fukami">{u.title}</h3>
                  <p className="mt-2 text-[0.88rem] leading-[1.9] text-sumi-2">{u.copy}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. 犬と暮らす庭 */}
      <section className="cv relative isolate bg-fukami-2 text-white" aria-labelledby="dog-heading">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[38rem]">
            <Photo photo={photos.dogrunPoodles} fill sizes="(min-width: 1024px) 50vw, 100vw" quality={78} />
          </div>
          <div className="grain flex flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
            <Reveal variant="line">
              <p className="eyebrow text-shiba-2">犬と暮らす庭</p>
              <h2 id="dog-heading" className="display mt-4 text-[1.7rem] leading-[1.4] sm:text-[2.2rem]">
                愛犬に、家の中だけではない居場所を。
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 max-w-[32rem] text-[0.96rem] leading-[2.05] text-white/85">
                散歩だけでは足りない日、雨で泥だらけになる庭、掘り返された天然芝。人工芝と締め固めた下地、必要ならフェンスを組み合わせれば、庭はそのまま小さなドッグランになります。
              </p>
              <ul className="mt-8 space-y-3 text-[0.92rem] text-white/85">
                {['134万本/㎡の高密度で、足腰にやさしいクッション性', '水抜き穴と排水を整えた下地で、雨のあとも走れる', '天然ヤシ100%の充填材ジオフィルで、臭いと夏の熱さを抑える', '端部を丁寧に固定して、掘る・噛む・めくるに備える'].map((t) => (
                  <li key={t} className="flex gap-3">
                    <CheckIcon className="mt-[0.45em] shrink-0 text-shiba-2" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Link href="/dogrun" className="btn btn-white mt-10">
                ドッグランの人工芝をくわしく
                <ArrowIcon />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7. 自宅にゴルフスペース */}
      <section className="cv bg-shiro" aria-labelledby="golf-heading">
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 lg:order-1 lg:px-16 lg:py-24">
            <Reveal variant="line">
              <p className="eyebrow">自宅にゴルフスペース</p>
              <h2 id="golf-heading" className="display mt-4 text-[1.7rem] leading-[1.4] sm:text-[2.2rem]">
                庭の一角を、毎日使えるパターグリーンに。
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 max-w-[32rem] text-[0.96rem] leading-[2.05] text-sumi-2">
                ゴルフ練習に特化した芝丈13mmのゴルフグリーン用ターフは、転がりが安定し、屋外でも室内でも使えます。庭全体は通常の人工芝にして、幅2m×長さ3〜5mの一角だけをグリーンにする組み合わせが、費用と使い勝手のバランスの良い方法です。
              </p>
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[0.9rem] text-sumi-2">
                <li>ゴルフグリーン用ターフ 13mm</li>
                <li>手軽さ重視ならアイランドグラス タイプG 10mm</li>
                <li>カップの埋め込みにも対応</li>
              </ul>
              <Link href="/golf" className="btn btn-primary mt-10">
                ゴルフ用人工芝をくわしく
                <ArrowIcon />
              </Link>
            </Reveal>
          </div>
          <div className="relative aspect-[4/3] lg:order-2 lg:aspect-auto lg:min-h-[36rem]">
            <Photo photo={photos.golfPuttingGreen} fill sizes="(min-width: 1024px) 50vw, 100vw" quality={78} />
          </div>
        </div>
      </section>

      {/* 8. 雑草から解放される庭 */}
      <section className="cv border-t border-sen bg-kinari py-20 sm:py-28" aria-labelledby="weed-heading">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <Reveal variant="clip">
              <BeforeAfter before={photos.baMansionBefore} after={photos.baMansionAfter} sizes="(min-width: 1024px) 40vw, 100vw" label="雑草の庭、施工前と施工後の比較" />
              <p className="mt-3 text-[0.78rem] text-hai">雑草に覆われた専用庭が、草取りのいらない緑に（グリーンプランニング施工例）</p>
            </Reveal>
            <div>
              <Reveal variant="line">
                <p className="eyebrow">雑草から解放される庭</p>
                <h2 id="weed-heading" className="display mt-4 text-[1.7rem] leading-[1.4] sm:text-[2.2rem]">
                  雑草を抜く庭から、家族が集まる庭へ。
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-6 text-[0.96rem] leading-[2.05] text-sumi-2">
                  雑草は、光がなければ芽を出せません。防草シートで光を遮り、人工芝でシートを紫外線から守る。この組み合わせで、「毎週の草むしり」は「年に数回、数本つまむ」に変わります。静岡は温暖で雑草の季節が長いからこそ、一度きちんと施工しておく価値が大きい地域です。
                </p>
                <p className="mt-4 text-[0.96rem] leading-[2.05] text-sumi-2">
                  除草剤・砂利・防草シート単体との違いも、正直に比べて書いています。
                </p>
                <Link href="/weed-control" className="rule-link mt-8 text-fukami">
                  雑草対策としての人工芝
                  <span aria-hidden>→</span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 9. 施工品質 */}
      <section id="quality" className="cv bg-shiro py-20 sm:py-28" aria-labelledby="quality-heading">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <Reveal variant="line">
                <p className="eyebrow">施工品質</p>
                <h2 id="quality-heading" className="display mt-4 text-[1.6rem] leading-[1.45] sm:text-[2.1rem]">
                  仕上がりの差は、
                  <br />
                  芝の下にある。
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-6 text-[0.96rem] leading-[2.05] text-sumi-2">
                  人工芝は、敷いた直後はどれも同じに見えます。半年後、数年後に差が出るのは、下地・不陸調整・転圧・排水・継ぎ目・端部処理という、芝の下と端にある工程です。静岡EASTは、グリーンプランニングの施工基準に沿って、この工程を現場ごとに組み立てます。
                </p>
                <figure className="mt-8">
                  <div className="relative aspect-[3/2] overflow-hidden bg-kinari">
                    <Photo photo={photos.eastWorkInProgress} fill sizes="(min-width: 1024px) 35vw, 100vw" quality={78} />
                  </div>
                  <figcaption className="mt-3 text-[0.78rem] leading-[1.8] text-hai">静岡EASTの施工の様子。既存の天然芝をはがし、下地を整えているところ</figcaption>
                </figure>
              </Reveal>
            </div>
            <ol className="border-t border-sen">
              {qualitySteps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={Math.min(i, 5) * 60} className="grid gap-2 border-b border-sen py-6 sm:grid-cols-[4rem_1fr] sm:gap-6">
                  <span className="num text-[0.8rem] tracking-[0.16em] text-fukami">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="display text-[1.1rem]">{s.title}</h3>
                    <p className="mt-2 text-[0.92rem] leading-[1.95] text-sumi-2">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 10. 商品ラインナップ */}
      <section className="cv border-t border-sen bg-shiro py-20 sm:py-28" aria-labelledby="products-heading">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal variant="line" className="max-w-[40rem]">
              <p className="eyebrow">商品ラインナップ</p>
              <h2 id="products-heading" className="display mt-4 text-[1.6rem] sm:text-[2.1rem]">
                用途で選ぶ、7つの人工芝と充填材。
              </h2>
              <p className="mt-5 text-[0.95rem] leading-[2] text-sumi-2">134万本/㎡の超高密度アメイジングターフ、国産オリジナルのアイランドグラス、ゴルフ専用のターフ、天然素材の充填材ジオフィル。「どんな人に向いているか」で選べるように整理しました。</p>
            </Reveal>
            <Reveal>
              <Link href="/products" className="rule-link text-fukami">
                商品をすべて見る
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
          <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 4) * 70}>
                <Link href={`/products/${p.slug}`} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden bg-kinari">
                    <Photo photo={photos[p.photo]} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 50vw, 100vw" quality={70} />
                  </div>
                  <p className="mt-4 text-[0.7rem] tracking-[0.14em] text-hai">
                    {p.nameEn}
                    {p.pile !== '—' && ` / ${p.pile}`}
                  </p>
                  <h3 className="display mt-1 text-[1.02rem] transition-colors group-hover:text-fukami">{p.name}</h3>
                  <p className="mt-2 text-[0.84rem] leading-[1.8] text-sumi-2">{p.catch}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 11. 料金目安 */}
      <section className="cv bg-kinari py-20 sm:py-28" aria-labelledby="price-heading">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
            <Reveal variant="line">
              <p className="eyebrow">料金の目安</p>
              <h2 id="price-heading" className="display mt-4 text-[1.6rem] leading-[1.45] sm:text-[2.1rem]">
                費用は「面積 × 商品 ＋ 下地」で決まります。
              </h2>
              <p className="mt-5 text-[0.95rem] leading-[2] text-sumi-2">本部公式の参考例です。下地の状態（雑草・天然芝・砂利・コンクリート）と搬入条件で上下します。写真と広さをお送りいただければ、無料で概算をお伝えします。</p>
              <Link href="/price" className="rule-link mt-8 text-fukami">
                費用の考え方をくわしく
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
            <Reveal delay={100}>
              <div className="table-scroll">
                <table className="spec-table">
                  <thead>
                    <tr className="text-[0.76rem] tracking-[0.08em] text-hai">
                      <th scope="col" className="!w-auto">場所</th>
                      <th scope="col" className="!w-auto">商品</th>
                      <th scope="col" className="!w-auto">面積</th>
                      <th scope="col" className="!w-auto">下地</th>
                      <th scope="col" className="!w-auto">工期</th>
                      <th scope="col" className="!w-auto">価格</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceExamples.map((e) => (
                      <tr key={e.place}>
                        <td className="display whitespace-nowrap">{e.place}</td>
                        <td className="whitespace-nowrap text-sumi-2">{e.product}</td>
                        <td className="num whitespace-nowrap text-sumi-2">{e.size}</td>
                        <td className="whitespace-nowrap text-sumi-2">{e.base}</td>
                        <td className="whitespace-nowrap text-sumi-2">{e.days}</td>
                        <td className="num whitespace-nowrap text-fukami">{e.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[0.76rem] leading-[1.8] text-hai">本部公式サイト掲載の参考価格（2026年9月確認）。人工芝の材料価格は税込3,630〜9,680円/㎡（商品による・施工料別）。</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 12. 施工事例 */}
      <section className="cv bg-shiro py-20 sm:py-28" aria-labelledby="works-heading">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal variant="line" className="max-w-[40rem]">
              <p className="eyebrow">施工事例</p>
              <h2 id="works-heading" className="display mt-4 text-[1.6rem] sm:text-[2.1rem]">
                静岡EASTの施工事例
              </h2>
              <p className="mt-5 text-[0.95rem] leading-[2] text-sumi-2">掲載しているのは、静岡EASTの施工と確認できた事例だけです。日々の施工の様子はInstagramでも発信しています。</p>
            </Reveal>
            <Reveal>
              <Link href="/works" className="rule-link text-fukami">
                施工事例の一覧へ
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {works.slice(0, 3).map((w, i) => (
              <Reveal key={w.slug} delay={i * 80}>
                <WorkCard work={w} />
              </Reveal>
            ))}
            <Reveal delay={100} className="flex flex-col justify-center border-t border-sen pt-6 sm:border-t-0 sm:pt-0">
              <p className="display text-[1.05rem]">最新の施工はInstagramで</p>
              <p className="mt-2 text-[0.88rem] leading-[1.9] text-sumi-2">庭、ドッグラン、施設、ゴルフ。施工の様子を写真で投稿しています。</p>
              <a href={shop.instagram} target="_blank" rel="noopener noreferrer" className="rule-link mt-5 text-fukami">
                <InstagramIcon />
                {shop.instagramHandle}
                <ExternalIcon className="text-[0.85em]" />
              </a>
              <a href={shop.hq.worksUrl} target="_blank" rel="noopener noreferrer" className="rule-link mt-4 text-sumi-2">
                全国の施工実績（本部サイト）
                <ExternalIcon className="text-[0.85em]" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 13. 選ばれる理由 */}
      <section className="cv border-t border-sen bg-shiro py-20 sm:py-28" aria-labelledby="reasons-heading">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <Reveal variant="line" className="max-w-[40rem]">
            <p className="eyebrow">選ばれる理由</p>
            <h2 id="reasons-heading" className="display mt-4 text-[1.6rem] sm:text-[2.1rem]">
              静岡EASTにお願いする、4つの理由。
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-x-12 gap-y-0 border-t border-sen lg:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={(i % 2) * 80} className="grid gap-3 border-b border-sen py-8 sm:grid-cols-[4rem_1fr] sm:gap-6">
                <span className="num text-[0.8rem] tracking-[0.16em] text-fukami">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="display text-[1.15rem]">{r.title}</h3>
                  <p className="mt-3 text-[0.93rem] leading-[1.95] text-sumi-2">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 14. 代表者紹介 */}
      <section className="cv bg-kinari py-20 sm:py-28" aria-labelledby="rep-heading">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
            <Reveal variant="clip">
              <div className="relative mx-auto aspect-square max-w-[24rem] overflow-hidden bg-kinari-2 lg:max-w-none">
                <Photo photo={photos.representative} fill sizes="(min-width: 1024px) 35vw, 24rem" quality={78} />
              </div>
            </Reveal>
            <div>
              <Reveal variant="line">
                <p className="eyebrow">代表者紹介</p>
                <h2 id="rep-heading" className="display mt-4 text-[1.6rem] leading-[1.45] sm:text-[2.1rem]">
                  誰が提案し、誰が施工するのか。
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-6 text-[0.96rem] leading-[2.05] text-sumi-2">
                  代表の{shop.representative}は静岡県で生まれ育ちました。素敵な家や庭を見るのが好きで、「ここをこうしたら、もっと良くなる」と想像する時間が楽しみだと言います。動物が大好きで、犬や家族が笑顔で過ごせる庭づくりに、いちばんのやりがいを感じています。
                </p>
                <p className="mt-4 text-[0.96rem] leading-[2.05] text-sumi-2">
                  ご相談では分かりやすい説明を心がけ、小さな不安や質問にも気軽に声をかけてもらえる存在でありたい。相談から施工後のアフターフォローまで、責任を持って対応します。
                </p>
                <p className="mt-6 text-[0.8rem] tracking-[0.06em] text-hai">
                  {shop.name} 代表 {shop.representative}
                </p>
                <Link href="/about" className="rule-link mt-6 text-fukami">
                  代表からのメッセージを読む
                  <span aria-hidden>→</span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 15. 対応エリア */}
      <section className="cv bg-shiro py-20 sm:py-28" aria-labelledby="area-heading">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <Reveal variant="line">
              <p className="eyebrow">対応エリア</p>
              <h2 id="area-heading" className="display mt-4 text-[1.6rem] leading-[1.45] sm:text-[2.1rem]">
                沼津から、静岡県東部・中部・伊豆へ。
              </h2>
              <p className="mt-5 text-[0.95rem] leading-[2] text-sumi-2">店舗は沼津市泉町。同じ静岡でも、海沿い・高原・湧水の街では庭の事情が違います。地域ごとの考え方をまとめたページを用意しています。</p>
              <Link href="/area" className="rule-link mt-8 text-fukami">
                対応エリアをくわしく
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
            <div className="space-y-8">
              {regions.map((r, i) => (
                <Reveal key={r.key} delay={i * 80} className="border-t border-sen pt-5">
                  <h3 className="display text-[1.05rem]">{r.label}</h3>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[0.9rem]">
                    {r.municipalities.map((m) => {
                      const page = areaPages.find((a) => a.name === m) ?? (r.key === 'izu' ? areaPages.find((a) => a.slug === 'izu') : undefined);
                      return page ? (
                        <li key={m}>
                          <Link href={`/area/${page.slug}`} className="inline-block py-1 text-fukami underline underline-offset-4 decoration-1 hover:decoration-2">
                            {m}
                          </Link>
                        </li>
                      ) : (
                        <li key={m} className="text-sumi-2">
                          {m}
                        </li>
                      );
                    })}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 16. FAQ */}
      <section className="cv bg-kinari py-20 sm:py-28" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <Reveal variant="line">
              <p className="eyebrow">よくある質問</p>
              <h2 id="faq-heading" className="display mt-4 text-[1.6rem] sm:text-[2.1rem]">
                はじめての方から、よく聞かれること。
              </h2>
              <Link href="/faq" className="rule-link mt-8 text-fukami">
                すべての質問を見る
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
            <div>
              <Faq items={homeFaq} />
            </div>
          </div>
        </div>
      </section>

      {/* 17. コラム */}
      {posts.length > 0 && (
        <section className="cv bg-shiro py-20 sm:py-28" aria-labelledby="blog-heading">
          <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <Reveal variant="line">
                <p className="eyebrow">人工芝コラム</p>
                <h2 id="blog-heading" className="display mt-4 text-[1.6rem] sm:text-[2.1rem]">
                  人工芝と庭のこと、すこしずつ。
                </h2>
              </Reveal>
              <Reveal>
                <Link href="/blog" className="rule-link text-fukami">
                  コラムの一覧へ
                  <span aria-hidden>→</span>
                </Link>
              </Reveal>
            </div>
            <ul className="mt-10 border-t border-sen">
              {posts.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={i * 70} className="border-b border-sen">
                  <Link href={`/blog/${p.slug}`} className="group grid gap-2 py-6 sm:grid-cols-[8rem_1fr] sm:gap-8">
                    <span className="num text-[0.76rem] tracking-[0.1em] text-hai">{formatDate(p.publishedAt)}</span>
                    <span>
                      <span className="display block text-[1.05rem] leading-[1.7] transition-colors group-hover:text-fukami">{p.title}</span>
                      <span className="mt-2 block text-[0.86rem] leading-[1.9] text-sumi-2">{p.description}</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 18. 写真見積りCTA */}
      <CtaBand id="home-cta" title="庭の写真を送るだけで、概算をお伝えします。" />

      {/* 19. 店舗情報 / map */}
      <section className="cv bg-shiro py-20 sm:py-28" aria-labelledby="shop-heading">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal variant="line">
              <p className="eyebrow">店舗情報</p>
              <h2 id="shop-heading" className="display mt-4 text-[1.6rem] sm:text-[2.1rem]">
                {shop.name}
              </h2>
              <div className="mt-8">
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
        </div>
      </section>

      <JsonLd data={faqJsonLd(homeFaq)} />
      <JsonLd data={itemListJsonLd({ name: '人工芝でできること', items: serviceLinks.map((s) => ({ name: s.label, href: s.href })) })} />
    </>
  );
}
