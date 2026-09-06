import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CtaBand from '@/components/ui/CtaBand';
import Faq from '@/components/ui/Faq';
import JsonLd from '@/components/ui/JsonLd';
import LinkList from '@/components/ui/LinkList';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import Supervisor from '@/components/ui/Supervisor';
import WorkCard from '@/components/ui/WorkCard';
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { getPhoto } from '@/data/photos';
import { shop } from '@/data/shop';
import { areaPages, getArea, regionLabel, areaPageForMunicipality } from '@/data/areas';
import { serviceLinks } from '@/data/nav';
import { getWork } from '@/data/works';

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return areaPages.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) return {};
  return buildMetadata({
    title: `${a.name}の人工芝施工｜庭・ドッグラン・雑草対策`,
    description: a.description,
    path: `/area/${a.slug}`,
    ogImage: getPhoto(a.photo).src,
    keywords: [`${a.name} 人工芝`, `人工芝 ${a.name}`, `${a.name} 人工芝 施工`, `${a.name} 雑草対策`, `${a.name} ドッグラン`],
  });
}

const flow = [
  { title: 'ご相談', body: '電話・メール・フォームから。「話だけ聞きたい」段階で構いません。' },
  { title: '写真見積り', body: '庭の写真とおおよその広さから、概算をお伝えします。' },
  { title: '現地調査・正式見積り', body: '下地・排水・搬入経路を確認して、正式なお見積りを作成します。' },
  { title: '施工', body: '多くの庭は1〜2日。下地から仕上げまで丁寧に施工します。' },
  { title: 'お引き渡し・アフター', body: '仕上がりをご確認いただき、5年品質保証・1年施工保証のもとでお使いいただきます。' },
];

export default async function AreaPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) notFound();

  const photo = getPhoto(a.photo);
  const worksHere = a.workSlugs.map((s) => getWork(s)).filter((w): w is NonNullable<typeof w> => Boolean(w));

  const crumbs = [
    { name: 'ホーム', href: '/' },
    { name: '対応エリア', href: '/area' },
    { name: a.name, href: `/area/${a.slug}` },
  ];

  const neighborLinks = a.neighbors.map((n) => {
    const page = areaPageForMunicipality(n);
    return page && page.slug !== a.slug ? { href: `/area/${page.slug}`, label: `${n}の人工芝施工` } : null;
  });

  return (
    <>
      <PageHero
        eyebrow={`${regionLabel(a.region)}／対応エリア`}
        title={`${a.name}の人工芝施工。庭・ドッグラン・雑草対策まで`}
        lead={a.intro[0]}
        photo={photo}
        crumbs={crumbs}
      />

      {/* この地域について */}
      <section className="cv bg-shiro py-16 sm:py-20" aria-labelledby="intro-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <Reveal>
              <h2 id="intro-heading" className="eyebrow">
                {a.name}での対応
              </h2>
              <div className="mt-5 space-y-4">
                {a.intro.slice(1).map((p, i) => (
                  <p key={i} className="text-[0.96rem] leading-[2.05] text-sumi-2">
                    {p}
                  </p>
                ))}
                <p className="text-[0.96rem] leading-[2.05] text-sumi-2">
                  店舗からの対応：{a.access}。相談・写真見積り・現地調査はいずれも無料です。
                </p>
              </div>
              <Supervisor className="mt-10" />
            </Reveal>
            <Reveal delay={100}>
              <h2 className="eyebrow">{a.name}で対応できる施工</h2>
              <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {serviceLinks.map((s) => (
                  <li key={s.href} className="border-b border-sen">
                    <Link href={s.href} className="block py-2.5 text-[0.9rem] text-sumi-2 transition-colors hover:text-fukami">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 地域の事情 */}
      <section className="cv border-t border-sen bg-shiro py-16 sm:py-24" aria-labelledby="local-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Reveal variant="line">
            <p className="eyebrow">{a.name}の庭で気をつけていること</p>
            <h2 id="local-heading" className="display mt-4 text-[1.5rem] sm:text-[1.9rem]">
              地域の事情に合わせた施工
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-x-12 border-t border-sen lg:grid-cols-2">
            {a.localPoints.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 2) * 80} className="grid gap-3 border-b border-sen py-7 sm:grid-cols-[3.5rem_1fr] sm:gap-5">
                <span className="num text-[0.8rem] tracking-[0.16em] text-fukami">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="display text-[1.1rem]">{p.title}</h3>
                  <p className="mt-2 text-[0.93rem] leading-[1.95] text-sumi-2">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 施工実績 */}
      <section className="cv bg-kinari py-16 sm:py-24" aria-labelledby="works-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Reveal variant="line">
            <p className="eyebrow">施工実績</p>
            <h2 id="works-heading" className="display mt-4 text-[1.5rem] sm:text-[1.9rem]">
              {a.name}の施工事例
            </h2>
          </Reveal>
          {worksHere.length > 0 ? (
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {worksHere.map((w, i) => (
                <Reveal key={w.slug} delay={i * 80}>
                  <WorkCard work={w} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="mt-6 max-w-[40rem]">
              <p className="text-[0.95rem] leading-[2] text-sumi-2">
                {a.name}で詳細を公開できる施工事例は、現在準備中です。このサイトには静岡EASTの施工と確認できた事例だけを掲載しており、架空の事例は載せていません。近隣地域の事例や、グリーンプランニング全国の施工実績を参考にしてください。
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                <li>
                  <Link href="/works" className="rule-link text-fukami">
                    静岡EASTの施工事例
                    <span aria-hidden>→</span>
                  </Link>
                </li>
                <li>
                  <a href={shop.instagram} target="_blank" rel="noopener noreferrer" className="rule-link text-fukami">
                    Instagramの施工写真
                  </a>
                </li>
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      {/* 流れ・料金 */}
      <section className="cv bg-shiro py-16 sm:py-24" aria-labelledby="flow-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <Reveal>
              <h2 id="flow-heading" className="eyebrow">
                {a.name}での施工までの流れ
              </h2>
              <ol className="mt-5 border-t border-sen">
                {flow.map((f, i) => (
                  <li key={f.title} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-sen py-4">
                    <span className="num text-[0.8rem] text-fukami">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="display text-[1rem]">{f.title}</h3>
                      <p className="mt-1 text-[0.88rem] leading-[1.9] text-sumi-2">{f.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link href="/flow" className="rule-link mt-6 text-fukami">
                施工の流れをくわしく
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="eyebrow">料金の目安</h2>
              <p className="mt-5 text-[0.94rem] leading-[2] text-sumi-2">
                費用は面積・商品・下地で決まります。本部公式の参考例では、戸建ての庭12㎡で約140,000円、マンション専用庭17㎡で約180,000円、屋上テラス30㎡で約230,000円（いずれも工期1日）。{a.name}も同じ考え方でお見積りします。
              </p>
              <Link href="/price" className="rule-link mt-6 text-fukami">
                費用の考え方
                <span aria-hidden>→</span>
              </Link>
              {neighborLinks.some(Boolean) && (
                <>
                  <h2 className="eyebrow mt-12">周辺の地域</h2>
                  <div className="mt-5">
                    <LinkList items={neighborLinks.filter((x): x is { href: string; label: string } => x !== null)} columns={1} />
                  </div>
                </>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="cv bg-kinari py-16 sm:py-24" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <Reveal variant="line">
              <p className="eyebrow">よくある質問</p>
              <h2 id="faq-heading" className="display mt-4 text-[1.5rem] sm:text-[1.9rem]">
                {a.name}のお客様から
              </h2>
              <Link href="/faq" className="rule-link mt-6 text-fukami">
                すべての質問を見る
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
            <div>
              <Faq items={a.faq} />
            </div>
          </div>
        </div>
      </section>

      <CtaBand id="area-cta" title={`${a.name}の庭の写真を送るだけで、概算をお伝えします。`} />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(a.faq)} />
      <JsonLd
        data={serviceJsonLd({
          name: `${a.name}の人工芝施工`,
          description: a.description,
          path: `/area/${a.slug}`,
          image: photo.src,
        })}
      />
    </>
  );
}
