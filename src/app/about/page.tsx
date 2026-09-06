import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBand from '@/components/ui/CtaBand';
import GoogleMap from '@/components/ui/GoogleMap';
import JsonLd from '@/components/ui/JsonLd';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import ShopInfoTable from '@/components/ui/ShopInfoTable';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { ExternalIcon, InstagramIcon } from '@/components/ui/icons';
import { breadcrumbJsonLd, personJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';

const title = '静岡EASTについて・代表 髙橋祐子｜誰が提案し、施工するのか';
const description =
  'グリーンプランニング静岡EAST（沼津市泉町）と代表・髙橋祐子の紹介。静岡で生まれ育ち、犬と暮らす代表が、庭・ドッグラン・ゴルフ・雑草対策の人工芝を提案。全国ネットワークの品質基準と5年品質保証・1年施工保証。事業内容・対応エリア・店舗情報。';

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: '/about',
  ogImage: photos.representative.src,
  keywords: ['グリーンプランニング静岡EAST', '髙橋祐子', '人工芝 沼津 会社', '人工芝 業者 静岡'],
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '静岡EASTについて', href: '/about' },
];

const values = [
  {
    title: '「何をしたいか」から考える',
    body: '人工芝は手段です。草取りをなくしたいのか、犬を走らせたいのか、パターを転がしたいのか。答えによって商品も下地も範囲も変わります。庭全体ではなく一部だけ、という提案もします。',
  },
  {
    title: '芝の下を、省かない',
    body: '仕上がりの差は下地・排水・継ぎ目・端部で決まります。グリーンプランニングの施工基準に沿って、現場ごとに工程を組み立てます。見えない工程を、見積りの内訳に書きます。',
  },
  {
    title: '分かりやすく説明する',
    body: '専門用語を並べず、なぜその商品か、なぜその工程かを言葉で説明します。小さな不安や質問に、気軽に声をかけてもらえる存在でありたいと考えています。',
  },
  {
    title: '施工後も、近くにいる',
    body: '沼津の店舗から伺える距離で仕事をしています。5年間の品質保証と1年間の施工保証に加え、年1回のブラッシングメンテナンスを含む延長保証プランもあります。',
  },
];

export default function AboutPage() {
  return (
    <>
      <header className="bg-shiro pt-20 sm:pt-24">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
            <div className="pb-2 pt-6 lg:pb-10 lg:pt-10">
              <Breadcrumbs crumbs={crumbs} />
              <p className="eyebrow mt-8">静岡EASTについて</p>
              <h1 className="display mt-4 text-[1.75rem] leading-[1.4] sm:text-[2.3rem] lg:text-[2.6rem]">
                誰が提案し、誰が施工するのか。
                <br />
                顔の見える人工芝専門店でありたい。
              </h1>
              <p className="mt-6 max-w-[36rem] text-[0.98rem] leading-[2.05] text-sumi-2">
                グリーンプランニング静岡EASTは、沼津市泉町を拠点に、静岡県東部・中部・伊豆地域で人工芝の施工・販売・メンテナンス、造園・外構工事を行う専門店です。代表の{shop.representative}が、ご相談から施工後まで責任を持って担当します。
              </p>
            </div>
            <div className="hero-photo relative mx-auto aspect-square w-full max-w-[26rem] overflow-hidden bg-kinari lg:max-w-none">
              <Photo photo={photos.representative} fill sizes="(min-width: 1024px) 40vw, 26rem" priority quality={78} />
            </div>
          </div>
        </div>
      </header>

      {/* 代表メッセージ */}
      <section className="cv bg-shiro py-16 sm:py-24" aria-labelledby="message-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <Reveal variant="line">
              <p className="eyebrow">代表からのメッセージ</p>
              <h2 id="message-heading" className="display mt-4 text-[1.5rem] leading-[1.45] sm:text-[1.9rem]">
                静岡で生まれ育ち、
                <br />
                犬と暮らしています。
              </h2>
              <p className="mt-6 text-[0.8rem] tracking-[0.06em] text-hai">
                {shop.name}
                <br />
                代表 {shop.representative}（{shop.representativeReading}）
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-5 text-[0.98rem] leading-[2.1] text-sumi-2">
                <p>はじめまして。グリーンプランニング静岡EASTの髙橋です。</p>
                <p>
                  私は静岡県で生まれ育ちました。この地域の皆さんに喜んでもらえる仕事がしたい。その気持ちから、人工芝の施工に携わるようになりました。もともと素敵な家や庭を見るのが好きで、「ここをこうしたら、もっと良くなるのに」と想像している時間が、私の楽しみです。
                </p>
                <p>
                  動物が大好きで、自宅でも犬と暮らしています。だから、ワンちゃんが思いきり走れる庭や、家族が笑顔で過ごせる庭をつくるお手伝いに、いちばんのやりがいを感じています。庭は、人工芝を敷いた日から「使う場所」になります。その変化を、お客様と一緒に喜びたいと思っています。
                </p>
                <p>
                  ご相談のときは、専門用語を並べずに分かりやすくお伝えすることを心がけています。「こんなことを聞いてもいいのかな」という小さな不安や質問こそ、気軽に声をかけてください。人工芝が向いているかどうかも含めて、正直にお答えします。
                </p>
                <p>
                  一つひとつのご縁を大切に、ご希望や理想を丁寧にかたちにしていきます。「静岡EASTにお願いしてよかった」と思っていただけるよう、ご相談から施工後のアフターフォローまで、責任を持って対応します。庭のことなら、どうぞお気軽にご相談ください。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 大切にしていること */}
      <section className="cv border-t border-sen bg-shiro py-16 sm:py-24" aria-labelledby="values-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Reveal variant="line" className="max-w-[40rem]">
            <p className="eyebrow">大切にしていること</p>
            <h2 id="values-heading" className="display mt-4 text-[1.5rem] sm:text-[1.9rem]">
              人工芝を売る会社ではなく、庭をもっと使える場所にする会社
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-x-12 border-t border-sen lg:grid-cols-2">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={(i % 2) * 80} className="grid gap-3 border-b border-sen py-8 sm:grid-cols-[3.5rem_1fr] sm:gap-5">
                <span className="num text-[0.8rem] tracking-[0.16em] text-fukami">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="display text-[1.12rem]">{v.title}</h3>
                  <p className="mt-3 text-[0.93rem] leading-[1.95] text-sumi-2">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 施工の様子 */}
      <section className="cv bg-kinari py-16 sm:py-24" aria-labelledby="work-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <Reveal variant="line">
              <p className="eyebrow">施工の様子</p>
              <h2 id="work-heading" className="display mt-4 text-[1.5rem] sm:text-[1.9rem]">
                静岡EASTの現場から
              </h2>
              <p className="mt-5 text-[0.94rem] leading-[2] text-sumi-2">
                既存の天然芝をはがし、下地を整え、人工芝を敷き込む。静岡EASTの施工の様子と、施工後の庭です。日々の現場はInstagramでも発信しています。
              </p>
              <a href={shop.instagram} target="_blank" rel="noopener noreferrer" className="rule-link mt-6 text-fukami">
                <InstagramIcon />
                {shop.instagramHandle}
                <ExternalIcon className="text-[0.85em]" />
              </a>
            </Reveal>
            <ul className="grid gap-6 sm:grid-cols-2">
              {[
                { photo: photos.eastWorkInProgress, caption: '施工の様子。天然芝をはがして下地を整える' },
                { photo: photos.eastWorkAfter, caption: '施工後。室外機まわりまで隙間なく納める' },
              ].map((f, i) => (
                <Reveal as="li" key={f.photo.src} delay={i * 80}>
                  <figure>
                    <div className="relative aspect-[3/2] overflow-hidden bg-kinari-2">
                      <Photo photo={f.photo} fill sizes="(min-width: 640px) 30vw, 100vw" quality={78} />
                    </div>
                    <figcaption className="mt-3 text-[0.78rem] leading-[1.8] text-hai">{f.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 本部との関係 */}
      <section className="cv bg-shiro py-16 sm:py-24" aria-labelledby="brand-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <Reveal variant="line">
              <p className="eyebrow">グリーンプランニングについて</p>
              <h2 id="brand-heading" className="display mt-4 text-[1.5rem] leading-[1.45] sm:text-[1.9rem]">
                全国ネットワークの品質基準を、静岡で。
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-5 text-[0.96rem] leading-[2.05] text-sumi-2">
                <p>
                  グリーンプランニングは、関西を拠点に全国で人工芝施工を行う専門店で、公式サイトには全国で{shop.brandFacts.worksCount}・施工面積{shop.brandFacts.totalArea}の実績が掲載されています。134万本/㎡の超高密度人工芝アメイジングターフや、国産オリジナルのアイランドグラスは、グリーンプランニングが現場の声から開発・選定した商品です。
                </p>
                <p>
                  静岡EASTは、その品質基準・施工基準・商品を共有する加盟店として、静岡県東部・中部・伊豆地域を担当しています。施工には本部共通の{shop.brandFacts.qualityWarrantyYears}年間の品質保証と{shop.brandFacts.workWarrantyYears}年間の施工保証が付き、2年目以降は年1回のブラッシングメンテナンスを含む延長保証プランもあります。
                </p>
                <p>このサイトの主役は、静岡県のお客様と、静岡EASTです。全国の施工実績や商品の詳しい情報は、本部の公式サイトでご覧いただけます。</p>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                <li>
                  <a href={shop.hq.url} target="_blank" rel="noopener noreferrer" className="rule-link text-fukami">
                    本部公式サイト
                    <ExternalIcon className="text-[0.85em]" />
                  </a>
                </li>
                <li>
                  <a href={shop.hq.eastPageUrl} target="_blank" rel="noopener noreferrer" className="rule-link text-fukami">
                    本部サイトの静岡EASTページ
                    <ExternalIcon className="text-[0.85em]" />
                  </a>
                </li>
                <li>
                  <Link href="/products" className="rule-link text-fukami">
                    商品ラインナップ
                    <span aria-hidden>→</span>
                  </Link>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 店舗情報 */}
      <section className="cv border-t border-sen bg-shiro py-16 sm:py-24" aria-labelledby="shop-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="line">
              <p className="eyebrow">店舗情報</p>
              <h2 id="shop-heading" className="display mt-4 text-[1.5rem] sm:text-[1.9rem]">
                {shop.name}
              </h2>
              <div className="mt-8">
                <ShopInfoTable />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <GoogleMap />
              <p className="mt-3 text-[0.8rem] leading-[1.8] text-hai">
                {shop.address.full}
                <a href={shop.mapLinkUrl} target="_blank" rel="noopener noreferrer" className="ml-3 text-fukami underline underline-offset-4">
                  Googleマップで開く
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand id="about-cta" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={personJsonLd()} />
    </>
  );
}
