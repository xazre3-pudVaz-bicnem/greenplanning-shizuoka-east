import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryNav from '@/components/blog/CategoryNav';
import PostList from '@/components/blog/PostList';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import LinkList from '@/components/ui/LinkList';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { blogCategories, blogCategoryKeys, getPostsByCategory, type BlogCategory } from '@/lib/blog';
import { blogCategoryLinks } from '@/lib/blog-links';
import { getPhoto, photos } from '@/data/photos';

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return blogCategoryKeys.filter((k) => getPostsByCategory(k).length > 0).map((slug) => ({ slug }));
}

function isCategory(v: string): v is BlogCategory {
  return v in blogCategories;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isCategory(slug)) return {};
  const c = blogCategories[slug];
  return buildMetadata({
    title: `${c.label}の記事一覧｜人工芝コラム`,
    description: `${c.description} グリーンプランニング静岡EASTの人工芝コラム「${c.label}」カテゴリの記事一覧。静岡県東部・中部・伊豆で人工芝を検討している方に向けて、1記事1テーマで書いています。`,
    path: `/blog/category/${slug}`,
  });
}

export default async function BlogCategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (!isCategory(slug)) notFound();
  const posts = getPostsByCategory(slug);
  if (posts.length === 0) notFound();
  const c = blogCategories[slug];
  const crumbs = [
    { name: 'ホーム', href: '/' },
    { name: '人工芝コラム', href: '/blog' },
    { name: c.label, href: `/blog/category/${slug}` },
  ];

  return (
    <>
      <PageHero eyebrow="人工芝コラム" title={c.label} lead={c.description} photo={posts[0].eyecatch ? getPhoto(posts[0].eyecatch) : photos.gardenHouse} crumbs={crumbs} />
      <section className="cv bg-shiro py-14 sm:py-20">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
            <div>
              <Reveal>
                <CategoryNav current={slug} />
              </Reveal>
              <div className="mt-8">
                <PostList posts={posts} />
              </div>
            </div>
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal delay={100}>
                <h2 className="eyebrow">関連するページ</h2>
                <div className="mt-4">
                  <LinkList items={blogCategoryLinks[slug]} columns={1} />
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
      <CtaBand id="blog-cat-cta" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
