import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CtaBand from '@/components/ui/CtaBand';
import Faq from '@/components/ui/Faq';
import JsonLd from '@/components/ui/JsonLd';
import LinkList from '@/components/ui/LinkList';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import Supervisor from '@/components/ui/Supervisor';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonld';
import { renderMarkdown } from '@/lib/markdown';
import { formatDate, getPostsForCategories } from '@/lib/blog';
import { photos } from '@/data/photos';
import type { Guide } from '@/data/guides';

/**
 * 検索意図別ガイドページの共通レイアウト（記事型）。
 * 「結論 → 要点の表 → 目次 → 本文 → FAQ → 関連 → CTA」。
 */
export default function GuidePage({ guide }: { guide: Guide }) {
  const hero = photos[guide.photo];
  const { html, headings } = renderMarkdown(guide.body);
  const posts = getPostsForCategories(guide.blogCategories, 3);
  const crumbs = [
    { name: 'ホーム', href: '/' },
    { name: guide.label, href: `/${guide.slug}` },
  ];

  return (
    <>
      <header className="bg-shiro pt-20 sm:pt-24">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div className="pb-2 pt-6 lg:pb-10 lg:pt-10">
              <Breadcrumbs crumbs={crumbs} />
              <p className="eyebrow mt-8">{guide.eyebrow}</p>
              <h1 className="display mt-4 text-[1.75rem] leading-[1.4] sm:text-[2.2rem] lg:text-[2.4rem]">{guide.title}</h1>
              <p className="mt-6 max-w-[36rem] text-[0.98rem] leading-[2.05] text-sumi-2">{guide.lead}</p>
              <p className="mt-6 text-[0.74rem] tracking-[0.08em] text-hai">
                公開 {formatDate(guide.publishedAt)}
                {guide.updatedAt !== guide.publishedAt && `／更新 ${formatDate(guide.updatedAt)}`}
              </p>
            </div>
            <div className="hero-photo relative aspect-[4/3] overflow-hidden bg-kinari">
              <Photo photo={hero} fill sizes="(min-width: 1024px) 45vw, 100vw" priority quality={78} position={guide.photoPosition} />
            </div>
          </div>
        </div>
      </header>

      {/* 結論 */}
      <section className="cv bg-shiro py-14 sm:py-20" aria-labelledby="conclusion-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <Reveal>
              <h2 id="conclusion-heading" className="eyebrow">
                結論
              </h2>
              <p className="display mt-5 text-[1.1rem] leading-[1.95] sm:text-[1.18rem]">{guide.conclusion}</p>
              <Supervisor className="mt-10" />
            </Reveal>
            {guide.keyFacts && (
              <Reveal delay={100}>
                <h2 className="eyebrow">要点</h2>
                <div className="table-scroll mt-5">
                  <table className="spec-table">
                    <tbody>
                      {guide.keyFacts.map((f) => (
                        <tr key={f.label}>
                          <th scope="row" className="!w-[9.5rem] !whitespace-normal">
                            {f.label}
                          </th>
                          <td className="text-sumi-2">{f.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* 本文 */}
      <section className="cv border-t border-sen bg-shiro py-16 sm:py-24">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              {headings.filter((h) => h.level === 2).length >= 3 && (
                <nav aria-label="このページの目次" className="border-t border-sen pt-5">
                  <p className="eyebrow">目次</p>
                  <ol className="mt-4 space-y-2.5">
                    {headings
                      .filter((h) => h.level === 2)
                      .map((h) => (
                        <li key={h.id}>
                          <a href={`#${h.id}`} className="block text-[0.86rem] leading-[1.7] text-sumi-2 underline-offset-4 hover:text-fukami hover:underline">
                            {h.text}
                          </a>
                        </li>
                      ))}
                  </ol>
                </nav>
              )}
            </aside>
            <article className="max-w-[46rem]">
              <div
                className="prose-gp"
                // renderMarkdown はエスケープ済みのHTMLだけを返す（生のHTMLは通していない）
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </article>
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
                {guide.label}について
              </h2>
              <Link href="/faq" className="rule-link mt-6 text-fukami">
                すべての質問を見る
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
            <div>
              <Faq items={guide.faq} />
            </div>
          </div>
        </div>
      </section>

      {/* 関連 */}
      <section className="cv bg-shiro py-16 sm:py-20" aria-labelledby="related-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 id="related-heading" className="eyebrow">
                あわせて読む
              </h2>
              <div className="mt-5">
                <LinkList items={guide.related} columns={1} />
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
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <CtaBand id="guide-cta" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={articleJsonLd({
          title: guide.title,
          description: guide.description,
          path: `/${guide.slug}`,
          publishedAt: guide.publishedAt,
          updatedAt: guide.updatedAt,
          image: hero.src,
        })}
      />
      <JsonLd data={faqJsonLd(guide.faq)} />
    </>
  );
}
