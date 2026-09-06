import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CtaBand from '@/components/ui/CtaBand';
import Faq from '@/components/ui/Faq';
import JsonLd from '@/components/ui/JsonLd';
import LinkList from '@/components/ui/LinkList';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import Supervisor from '@/components/ui/Supervisor';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { blogCategories, formatDate, getAllPosts, getPost, getRelatedPosts } from '@/lib/blog';
import { blogCategoryLinks } from '@/lib/blog-links';
import { renderMarkdown } from '@/lib/markdown';
import { getPhoto } from '@/data/photos';
import { shop } from '@/data/shop';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    ogImage: getPhoto(post.eyecatch ?? '').src,
    ogType: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { html, headings } = renderMarkdown(post.content);
  const related = getRelatedPosts(post, 3);
  const photo = getPhoto(post.eyecatch ?? '');
  const category = blogCategories[post.category];
  const links = blogCategoryLinks[post.category];

  const crumbs = [
    { name: 'ホーム', href: '/' },
    { name: '人工芝コラム', href: '/blog' },
    { name: category.label, href: `/blog/category/${post.category}` },
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <>
      <header className="bg-shiro pt-20 sm:pt-24">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
            <div className="pb-2 pt-6 lg:pb-10 lg:pt-10">
              <Breadcrumbs crumbs={crumbs} />
              <p className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[0.76rem] tracking-[0.1em] text-hai">
                <time dateTime={post.publishedAt} className="num">
                  {formatDate(post.publishedAt)}
                </time>
                <Link href={`/blog/category/${post.category}`} className="text-fukami underline-offset-4 hover:underline">
                  {category.label}
                </Link>
              </p>
              <h1 className="display mt-4 text-[1.6rem] leading-[1.45] sm:text-[2.1rem]">{post.title}</h1>
              {post.description && <p className="mt-5 max-w-[36rem] text-[0.95rem] leading-[2] text-sumi-2">{post.description}</p>}
            </div>
            <div className="hero-photo relative aspect-[4/3] overflow-hidden bg-kinari">
              <Photo photo={photo} fill sizes="(min-width: 1024px) 40vw, 100vw" priority quality={78} />
            </div>
          </div>
        </div>
      </header>

      <article className="cv bg-shiro py-14 sm:py-20">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Supervisor />
              {headings.filter((h) => h.level === 2).length >= 3 && (
                <nav aria-label="この記事の目次" className="mt-8 border-t border-sen pt-5">
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

            <div className="max-w-[46rem]">
              <div
                className="prose-gp"
                // renderMarkdown はエスケープ済みのHTMLだけを返す（生のHTMLは通していない）
                dangerouslySetInnerHTML={{ __html: html }}
              />

              {post.tags.length > 0 && (
                <p className="mt-12 flex flex-wrap gap-x-4 gap-y-2 text-[0.78rem] text-hai">
                  {post.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </p>
              )}

              {post.faq.length > 0 && (
                <section className="cv mt-14" aria-labelledby="post-faq-heading">
                  <h2 id="post-faq-heading" className="display text-[1.25rem]">
                    この記事に関するよくある質問
                  </h2>
                  <div className="mt-6">
                    <Faq items={post.faq} />
                  </div>
                </section>
              )}

              {/* 関連サービス・事例への導線。全記事の末尾に必ず置く */}
              <aside className="mt-14 border-t border-sen pt-8" aria-labelledby="post-links-heading">
                <h2 id="post-links-heading" className="eyebrow">
                  この記事に関連するページ
                </h2>
                <div className="mt-4">
                  <LinkList items={links} columns={1} />
                </div>
                <p className="mt-6 text-[0.86rem] leading-[1.9] text-sumi-2">
                  {shop.shortName}は、沼津市を拠点に静岡県東部・中部・伊豆で人工芝の施工を行っています。庭の写真と広さをお送りいただければ、無料で概算をお伝えします。
                </p>
              </aside>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="cv bg-kinari py-16 sm:py-20" aria-labelledby="related-heading">
          <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
            <Reveal variant="line">
              <h2 id="related-heading" className="display text-[1.3rem]">
                あわせて読みたい
              </h2>
            </Reveal>
            <ul className="mt-6 border-t border-sen">
              {related.map((r, i) => (
                <Reveal as="li" key={r.slug} delay={i * 70} className="border-b border-sen">
                  <Link href={`/blog/${r.slug}`} className="group grid gap-2 py-5 sm:grid-cols-[8rem_1fr] sm:gap-8">
                    <span className="num text-[0.74rem] tracking-[0.1em] text-hai">{formatDate(r.publishedAt)}</span>
                    <span>
                      <span className="display block text-[1rem] leading-[1.7] transition-colors group-hover:text-fukami">{r.title}</span>
                      <span className="mt-1.5 block text-[0.84rem] leading-[1.9] text-sumi-2">{r.description}</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-8">
              <Link href="/blog" className="rule-link text-fukami">
                コラムの一覧へ
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <CtaBand id="post-cta" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          path: `/blog/${post.slug}`,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
          image: photo.src,
          type: 'BlogPosting',
        })}
      />
      {post.faq.length > 0 && <JsonLd data={faqJsonLd(post.faq)} />}
    </>
  );
}
