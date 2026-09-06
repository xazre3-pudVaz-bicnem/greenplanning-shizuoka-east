import Link from 'next/link';
import Photo from './Photo';
import { photos } from '@/data/photos';
import { workCategories, type Work } from '@/data/works';

/** 施工事例の一覧に使うカード（写真・カテゴリ・地域・面積）。見出しレベルは置く場所に合わせる */
export default function WorkCard({
  work,
  priority = false,
  headingLevel = 'h3',
}: {
  work: Work;
  priority?: boolean;
  headingLevel?: 'h2' | 'h3';
}) {
  const photo = photos[work.photoAfter];
  const Heading = headingLevel;
  return (
    <article className="group">
      <Link href={`/works/${work.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-kinari">
          <Photo
            photo={photo}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            quality={70}
            className="transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
          <span className="absolute left-3 top-3 bg-white/92 px-2.5 py-1 text-[0.68rem] tracking-[0.12em] text-fukami">
            {workCategories[work.category]}
          </span>
        </div>
        <div className="pt-4">
          <p className="text-[0.74rem] tracking-[0.08em] text-hai">
            {work.area}／{work.size}／工期{work.duration}
          </p>
          <Heading className="display mt-2 text-[1.02rem] leading-[1.6] text-sumi transition-colors group-hover:text-fukami">
            {work.title}
          </Heading>
          <p className="mt-2 text-[0.82rem] text-sumi-2">{work.products.join('・')}</p>
        </div>
      </Link>
    </article>
  );
}
