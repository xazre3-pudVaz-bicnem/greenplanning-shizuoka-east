import Link from 'next/link';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import { getPhoto } from '@/data/photos';
import { blogCategories, formatDate, type BlogPost } from '@/lib/blog';

export default function PostList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return <p className="text-[0.95rem] leading-[2] text-sumi-2">記事はまだありません。準備ができ次第、公開します。</p>;
  }
  return (
    <ul className="border-t border-sen">
      {posts.map((p, i) => (
        <Reveal as="li" key={p.slug} delay={Math.min(i, 5) * 50} className="border-b border-sen">
          <Link href={`/blog/${p.slug}`} className="group grid gap-4 py-6 sm:grid-cols-[11rem_1fr] sm:gap-8 sm:py-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-kinari">
              <Photo photo={getPhoto(p.eyecatch ?? '')} fill sizes="(min-width: 640px) 11rem, 100vw" quality={62} />
            </div>
            <div>
              <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[0.74rem] tracking-[0.08em] text-hai">
                <time dateTime={p.publishedAt} className="num">
                  {formatDate(p.publishedAt)}
                </time>
                <span className="text-fukami">{blogCategories[p.category].label}</span>
              </p>
              <h2 className="display mt-2 text-[1.08rem] leading-[1.65] transition-colors group-hover:text-fukami sm:text-[1.15rem]">{p.title}</h2>
              <p className="mt-2 text-[0.88rem] leading-[1.9] text-sumi-2">{p.description}</p>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
