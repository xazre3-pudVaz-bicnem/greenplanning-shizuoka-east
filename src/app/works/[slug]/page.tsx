import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BeforeAfter from '@/components/ui/BeforeAfter';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import LinkList from '@/components/ui/LinkList';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import Supervisor from '@/components/ui/Supervisor';
import WorkCard from '@/components/ui/WorkCard';
import { ExternalIcon } from '@/components/ui/icons';
import { breadcrumbJsonLd, workJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/blog';
import { photos } from '@/data/photos';
import { getWork, workCategories, works } from '@/data/works';

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};
  return buildMetadata({
    title: `${work.title}｜施工事例`,
    description: work.description,
    path: `/works/${work.slug}`,
    ogImage: photos[work.photoAfter].src,
    ogType: 'article',
    publishedTime: work.date,
    modifiedTime: work.date,
  });
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const before = photos[work.photoBefore];
  const after = photos[work.photoAfter];
  const others = works.filter((w) => w.slug !== work.slug).slice(0, 3);

  const crumbs = [
    { name: 'ホーム', href: '/' },
    { name: '施工事例', href: '/works' },
    { name: workCategories[work.category], href: `/works/category/${work.category}` },
    { name: work.title, href: `/works/${work.slug}` },
  ];

  const specs = [
    { label: '施工地域', value: work.area },
    { label: '施工場所', value: work.place },
    { label: '施工面積', value: work.size },
    { label: '施工前', value: work.before },
    { label: '工期', value: work.duration },
    { label: '使用商品', value: work.products.join('、') },
  ];

  const blocks = [
    { heading: '施工前の悩み', body: work.concern },
    { heading: '提案内容', body: work.proposal },
    { heading: '施工工程', body: work.process, ordered: true },
    { heading: '施工後', body: work.result },
  ];

  return (
    <>
      <header className="bg-shiro pt-24 sm:pt-32">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Breadcrumbs crumbs={crumbs} />
          <p className="eyebrow mt-8">施工事例／{workCategories[work.category]}</p>
          <h1 className="display mt-4 max-w-[46rem] text-[1.6rem] leading-[1.45] sm:text-[2.2rem]">{work.title}</h1>
          <p className="mt-5 text-[0.78rem] tracking-[0.08em] text-hai">
            {work.area}／{work.size}／工期{work.duration}／掲載 {formatDate(work.date)}
          </p>
        </div>
      </header>

      <section className="cv bg-shiro py-10 sm:py-14">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Reveal variant="clip">
            <BeforeAfter before={before} after={after} sizes="(min-width: 1280px) 80rem, 100vw" label={`${work.title} 施工前と施工後の比較`} priority />
            <p className="mt-3 text-[0.78rem] text-hai">スライダーを動かすと施工前・施工後を見比べられます</p>
          </Reveal>
        </div>
      </section>

      <section className="cv bg-shiro pb-16 sm:pb-24">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <Reveal>
              <div className="table-scroll">
                <table className="spec-table">
                  <tbody>
                    {specs.map((s) => (
                      <tr key={s.label}>
                        <th scope="row" className="!w-[7rem]">
                          {s.label}
                        </th>
                        <td className="text-sumi-2">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {work.hqUrl && (
                <a href={work.hqUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 py-1 text-[0.78rem] text-hai underline-offset-4 hover:text-fukami hover:underline">
                  本部サイトの掲載ページ
                  <ExternalIcon className="text-[0.85em]" />
                </a>
              )}
              <Supervisor className="mt-8" />
            </Reveal>

            <div className="space-y-12">
              {blocks.map((b) => (
                <Reveal key={b.heading} as="section">
                  <h2 className="display border-l-[3px] border-shiba pl-4 text-[1.25rem] sm:text-[1.4rem]">{b.heading}</h2>
                  {b.ordered ? (
                    <ol className="mt-5 space-y-3">
                      {b.body.map((p, i) => (
                        <li key={i} className="grid grid-cols-[2rem_1fr] gap-2 text-[0.95rem] leading-[1.95] text-sumi-2">
                          <span className="num text-fukami">{i + 1}.</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <div className="mt-5 space-y-4">
                      {b.body.map((p, i) => (
                        <p key={i} className="text-[0.95rem] leading-[2] text-sumi-2">
                          {p}
                        </p>
                      ))}
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 写真 */}
      <section className="cv border-t border-sen bg-shiro py-16 sm:py-24" aria-labelledby="gallery-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Reveal variant="line">
            <p className="eyebrow">写真</p>
            <h2 id="gallery-heading" className="display mt-4 text-[1.4rem] sm:text-[1.8rem]">
              施工前・施工後
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {work.gallery.map((g, i) => (
              <Reveal as="li" key={`${g.photo}-${i}`} delay={(i % 3) * 80}>
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden bg-kinari">
                    <Photo photo={photos[g.photo]} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" quality={78} />
                  </div>
                  <figcaption className="mt-3 text-[0.8rem] leading-[1.8] text-hai">{g.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 関連 */}
      <section className="cv bg-kinari py-16 sm:py-24" aria-labelledby="related-heading">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 id="related-heading" className="eyebrow">
                この事例に関連するページ
              </h2>
              <div className="mt-5">
                <LinkList items={work.related} columns={1} />
              </div>
            </Reveal>
            {others.length > 0 && (
              <Reveal delay={100}>
                <h2 className="eyebrow">ほかの施工事例</h2>
                <div className="mt-5 grid gap-8 sm:grid-cols-2">
                  {others.map((w) => (
                    <WorkCard key={w.slug} work={w} />
                  ))}
                </div>
              </Reveal>
            )}
          </div>
          <Reveal className="mt-12">
            <Link href="/works" className="rule-link text-fukami">
              施工事例の一覧へ
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand id="work-cta" title="似た条件の庭なら、写真から概算をお伝えできます。" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={workJsonLd({
          title: work.title,
          description: work.description,
          path: `/works/${work.slug}`,
          date: work.date,
          area: work.area,
          images: work.gallery.map((g) => ({ src: photos[g.photo].src, caption: g.caption })),
        })}
      />
    </>
  );
}
