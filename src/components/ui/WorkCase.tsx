import Link from 'next/link';
import { type Work, workAreaShort } from '@/data/works';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';
import Pending from './Pending';
import Photo from './Photo';
import { ArrowIcon } from './icons';

/**
 * 施工事例1件。
 * - 通常   … 詳細ページ（/works/[slug]）で全文
 * - compact … 一覧・トップで、写真と概要と詳細へのリンク
 * 静岡EASTの事例であることを「施工」の行で明示する（本部チェックリスト「施工実績」）。
 */
export default function WorkCase({ work, compact = false, headingLevel = 'h2' }: { work: Work; compact?: boolean; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  const href = `/works/${work.slug}`;
  const facts = [
    { label: '施工', value: shop.shortName },
    { label: '地域', value: work.area },
    { label: '場所', value: work.place },
    { label: '広さ', value: work.size },
    ...(work.product ? [{ label: '使用商品', value: work.product }] : []),
  ];

  return (
    <article className={compact ? 'grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12' : 'space-y-10'}>
      <div>
        {work.photos.length > 0 ? (
          <ul className={`grid gap-4 ${work.photos.length > 1 ? 'sm:grid-cols-2' : ''}`}>
            {(compact ? work.photos.slice(0, 2) : work.photos).map(({ photo, caption }, i) => {
              const p = photos[photo];
              return (
                <li key={photo}>
                  <figure>
                    <div className="relative overflow-hidden bg-kinari-2" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
                      <Photo photo={p} sizes={compact ? '(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw' : '(min-width: 1280px) 38rem, (min-width: 640px) 50vw, 100vw'} priority={!compact && i === 0} />
                    </div>
                    <figcaption className="mt-2 text-[0.76rem] leading-[1.7] text-hai">
                      <span className="text-sumi-2">{caption}</span>／{p.credit}
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        ) : (
          <Pending block>施工前・施工後の写真（静岡EASTで撮影したもの）</Pending>
        )}
      </div>

      <div className={compact ? '' : 'grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16'}>
        <div>
        <Heading className="display text-[1.2rem] leading-[1.5] sm:text-[1.35rem]">
          {compact ? (
            <Link href={href} className="underline-offset-4 hover:text-fukami hover:underline">
              {workAreaShort(work)}・{work.place}
            </Link>
          ) : (
            '施工の概要'
          )}
        </Heading>
        <dl className="mt-5 grid grid-cols-[4.5rem_1fr] border-t border-sen text-[0.9rem]">
          {facts.map((f) => (
            <div key={f.label} className="contents">
              <dt className="border-b border-sen py-2.5 text-hai">{f.label}</dt>
              <dd className="border-b border-sen py-2.5 text-sumi-2">{f.value}</dd>
            </div>
          ))}
        </dl>
        </div>
        {compact ? (
          <>
            <p className="mt-5 text-[0.92rem] leading-[1.95] text-sumi-2">{work.request}</p>
            <Link href={href} className="rule-link mt-6 text-fukami">
              この施工事例を見る
              <ArrowIcon />
            </Link>
          </>
        ) : (
          <div className="mt-8 space-y-7 lg:mt-0">
            <section>
              <h3 className="display text-[1rem] text-fukami">お客様のご要望</h3>
              <p className="mt-2.5 text-[0.95rem] leading-[2] text-sumi-2">{work.request}</p>
            </section>
            <section>
              <h3 className="display text-[1rem] text-fukami">工夫したこと</h3>
              <p className="mt-2.5 text-[0.95rem] leading-[2] text-sumi-2">{work.ingenuity}</p>
            </section>
          </div>
        )}
      </div>
    </article>
  );
}
