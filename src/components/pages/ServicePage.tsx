import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CtaBand from '@/components/ui/CtaBand';
import Faq from '@/components/ui/Faq';
import JsonLd from '@/components/ui/JsonLd';
import LinkList from '@/components/ui/LinkList';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import RichText from '@/components/ui/RichText';
import Supervisor from '@/components/ui/Supervisor';
import WorkCard from '@/components/ui/WorkCard';
import { CheckIcon } from '@/components/ui/icons';
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '@/lib/jsonld';
import { getPostsForCategories, formatDate } from '@/lib/blog';
import { photos } from '@/data/photos';
import { products as allProducts } from '@/data/products';
import { getWorksFor } from '@/data/works';
import type { Service } from '@/data/services';

/**
 * 用途別サービスページの共通レイアウト。
 * 「結論 → 向いている人 → 本文 → 費用・期間 → 商品 → 事例 → FAQ → 関連 → CTA」の順。
 */
export default function ServicePage({ service }: { service: Service }) {
  const hero = photos[service.photo];
  const crumbs = [
    { name: 'ホーム', href: '/' },
    { name: '人工芝でできること', href: '/artificial-grass' },
    { name: service.label, href: `/${service.slug}` },
  ];
  if (service.slug === 'artificial-grass') crumbs.splice(1, 1);

  const products = service.products
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const works = getWorksFor(service.workCategories, 3);
  const posts = getPostsForCategories(service.blogCategories, 3);

  return (
    <>
      {/* 見出し */}
      <header className="bg-shiro pt-20 sm:pt-24">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div className="pb-2 pt-6 lg:pb-10 lg:pt-10">
              <Breadcrumbs crumbs={crumbs} />
              <p className="eyebrow mt-8">{service.eyebrow}</p>
              <h1 className="display mt-4 text-[1.75rem] leading-[1.4] sm:text-[2.3rem] lg:text-[2.5rem]">{service.title}</h1>
              <p className="mt-6 max-w-[36rem] text-[0.98rem] leading-[2.05] text-sumi-2">{service.lead}</p>
            </div>
            <div className="hero-photo relative aspect-[4/3] overflow-hidden bg-kinari lg:aspect-[5/4]">
              <Photo photo={hero} fill sizes="(min-width: 1024px) 50vw, 100vw" priority quality={78} position={service.photoPosition} />
            </div>
          </div>
        </div>
      </header>

      {/* 結論・向いている人 */}
      <section className="cv bg-shiro py-16 sm:py-20" aria-labelledby="conclusion-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <Reveal>
              <h2 id="conclusion-heading" className="eyebrow">
                結論
              </h2>
              <p className="display mt-5 text-[1.12rem] leading-[1.95] text-sumi sm:text-[1.2rem]">{service.conclusion}</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="eyebrow">こんな方に向いています</h2>
              <ul className="mt-5 space-y-3">
                {service.suitableFor.map((s) => (
                  <li key={s} className="flex gap-3 text-[0.95rem] leading-[1.9] text-sumi-2">
                    <CheckIcon className="mt-[0.45em] shrink-0 text-shiba" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Supervisor className="mt-12 max-w-[44rem]" />
        </div>
      </section>

      {/* 本文 */}
      <section className="cv border-t border-sen bg-shiro py-16 sm:py-24">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="space-y-16 sm:space-y-24">
            {service.sections.map((sec, i) => {
              const photo = sec.photo ? photos[sec.photo] : null;
              const flip = i % 2 === 1;
              return (
                <Reveal key={sec.heading} as="article">
                  <div className={`grid gap-8 lg:gap-16 ${photo ? 'lg:grid-cols-2' : 'lg:grid-cols-[1fr_1fr]'} lg:items-start`}>
                    <div className={`${flip && photo ? 'lg:order-2' : ''}`}>
                      <p className="num text-[0.78rem] tracking-[0.16em] text-fukami">{String(i + 1).padStart(2, '0')}</p>
                      <h2 className="display mt-3 text-[1.35rem] leading-[1.5] sm:text-[1.65rem]">{sec.heading}</h2>
                      <div className="mt-6 space-y-5">
                        {sec.body.map((p, j) => (
                          <RichText key={j} text={p} className="text-[0.96rem] leading-[2.05] text-sumi-2" />
                        ))}
                      </div>
                      {sec.list && (
                        <ul className="mt-6 space-y-2.5">
                          {sec.list.map((item) => (
                            <li key={item} className="flex gap-3 text-[0.94rem] leading-[1.9] text-sumi-2">
                              <span aria-hidden className="mt-[0.95em] h-px w-4 shrink-0 bg-shiba" />
                              <RichText text={item} className="flex-1" />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {photo ? (
                      <figure className={flip ? 'lg:order-1' : ''}>
                        <div className="relative aspect-[4/3] overflow-hidden bg-kinari">
                          <Photo photo={photo} fill sizes="(min-width: 1024px) 40vw, 100vw" quality={78} />
                        </div>
                        {sec.caption && <figcaption className="mt-3 text-[0.78rem] leading-[1.8] text-hai">{sec.caption}</figcaption>}
                      </figure>
                    ) : (
                      <div className="hidden lg:block" aria-hidden />
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 費用・期間 */}
      <section className="cv bg-kinari py-16 sm:py-20" aria-labelledby="cost-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 id="cost-heading" className="eyebrow">
                費用の目安
              </h2>
              <div className="mt-5 space-y-4">
                {service.cost.map((p, i) => (
                  <RichText key={i} text={p} className="text-[0.95rem] leading-[2] text-sumi-2" />
                ))}
              </div>
              <Link href="/price" className="rule-link mt-6 text-fukami">
                費用の考え方をくわしく
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="eyebrow">施工期間の目安</h2>
              <p className="mt-5 text-[0.95rem] leading-[2] text-sumi-2">{service.duration}</p>
              <h2 className="eyebrow mt-10">保証</h2>
              <p className="mt-5 text-[0.95rem] leading-[2] text-sumi-2">
                グリーンプランニング共通の5年間の品質保証と1年間の施工保証が付きます。2年目以降は年1回のブラッシングメンテナンスを含む延長保証プランもあります。
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 商品 */}
      {products.length > 0 && (
        <section className="cv bg-shiro py-16 sm:py-24" aria-labelledby="products-heading">
          <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
            <Reveal variant="line">
              <p className="eyebrow">この用途に向いている商品</p>
              <h2 id="products-heading" className="display mt-4 text-[1.5rem] sm:text-[1.9rem]">
                商品の選び方
              </h2>
            </Reveal>
            <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={i * 80}>
                  <Link href={`/products/${p.slug}`} className="group block">
                    <div className="relative aspect-[16/9] overflow-hidden bg-kinari">
                      <Photo photo={photos[p.photo]} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" quality={70} />
                    </div>
                    <p className="mt-4 text-[0.72rem] tracking-[0.14em] text-hai">
                      {p.nameEn} / {p.pile}
                    </p>
                    <h3 className="display mt-1.5 text-[1.05rem] transition-colors group-hover:text-fukami">{p.name}</h3>
                    <p className="mt-2 text-[0.86rem] leading-[1.8] text-sumi-2">{p.catch}</p>
                  </Link>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-10">
              <Link href="/products" className="rule-link text-fukami">
                商品ラインナップをすべて見る
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* 施工事例 */}
      {works.length > 0 && (
        <section className="cv border-t border-sen bg-shiro py-16 sm:py-24" aria-labelledby="works-heading">
          <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
            <Reveal variant="line">
              <p className="eyebrow">施工事例</p>
              <h2 id="works-heading" className="display mt-4 text-[1.5rem] sm:text-[1.9rem]">
                静岡EASTの施工事例
              </h2>
              <p className="mt-4 max-w-[40rem] text-[0.92rem] leading-[1.9] text-sumi-2">
                掲載しているのは、静岡EASTの施工と確認できた事例だけです。事例は順次追加しています。
              </p>
            </Reveal>
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {works.map((w, i) => (
                <Reveal key={w.slug} delay={i * 80}>
                  <WorkCard work={w} />
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10">
              <Link href="/works" className="rule-link text-fukami">
                施工事例の一覧へ
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="cv bg-kinari py-16 sm:py-24" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <Reveal variant="line">
              <p className="eyebrow">よくある質問</p>
              <h2 id="faq-heading" className="display mt-4 text-[1.5rem] sm:text-[1.9rem]">
                {service.label}について
              </h2>
              <Link href="/faq" className="rule-link mt-6 text-fukami">
                すべての質問を見る
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
            <div>
              <Faq items={service.faq} />
            </div>
          </div>
        </div>
      </section>

      {/* 関連ページ・コラム */}
      <section className="cv bg-shiro py-16 sm:py-20" aria-labelledby="related-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 id="related-heading" className="eyebrow">
                あわせて読む
              </h2>
              <div className="mt-5">
                <LinkList items={service.related} columns={1} />
              </div>
            </Reveal>
            {posts.length > 0 && (
              <Reveal delay={100}>
                <h2 className="eyebrow">関連するコラム</h2>
                <ul className="mt-5">
                  {posts.map((p) => (
                    <li key={p.slug} className="border-b border-sen">
                      <Link href={`/blog/${p.slug}`} className="group block py-4">
                        <span className="text-[0.72rem] tracking-[0.1em] text-hai">{formatDate(p.publishedAt)}</span>
                        <span className="display mt-1 block text-[0.98rem] leading-[1.7] transition-colors group-hover:text-fukami">{p.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/blog" className="rule-link mt-6 text-fukami">
                  人工芝コラムへ
                  <span aria-hidden>→</span>
                </Link>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <CtaBand id="service-cta" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={serviceJsonLd({
          name: service.title,
          description: service.description,
          path: `/${service.slug}`,
          image: hero.src,
        })}
      />
      <JsonLd data={faqJsonLd(service.faq)} />
    </>
  );
}
