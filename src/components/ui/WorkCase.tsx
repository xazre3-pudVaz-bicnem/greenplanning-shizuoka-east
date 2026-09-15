import Image from 'next/image';
import type { Work } from '@/data/works';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';
import Pending from './Pending';

/**
 * 施工事例1件。/works で全文、トップでは compact（写真と概要だけ）で使う。
 * 静岡EASTの事例であることを「施工」の行で明示する（本部チェックリスト「施工実績」）。
 */
export default function WorkCase({ work, compact = false, headingLevel = 'h2' }: { work: Work; compact?: boolean; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  const facts = [
    { label: '施工', value: shop.shortName },
    { label: '地域', value: work.area },
    { label: '場所', value: work.place },
    { label: '広さ', value: work.size },
  ];

  return (
    <article className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
      <div>
        {work.photos.length > 0 ? (
          <ul className={`grid gap-4 ${work.photos.length > 1 ? 'sm:grid-cols-2' : ''}`}>
            {(compact ? work.photos.slice(0, 2) : work.photos).map(({ photo, caption }) => {
              const p = photos[photo];
              return (
                <li key={photo}>
                  <figure>
                    <div className="relative overflow-hidden bg-kinari-2" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
                      <Image src={p.src} alt={p.alt} fill unoptimized className="object-cover" />
                    </div>
                    <figcaption className="mt-2 text-[0.76rem] leading-[1.7] text-hai">
                      {caption}／{p.credit}
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

      <div>
        <Heading className="display text-[1.2rem] leading-[1.5] sm:text-[1.35rem]">
          {work.area.replace('静岡県', '')}・{work.place}
        </Heading>
        <dl className="mt-5 grid grid-cols-[4.5rem_1fr] border-t border-sen text-[0.9rem]">
          {facts.map((f) => (
            <div key={f.label} className="contents">
              <dt className="border-b border-sen py-2.5 text-hai">{f.label}</dt>
              <dd className="border-b border-sen py-2.5 text-sumi-2">{f.value}</dd>
            </div>
          ))}
        </dl>
        {!compact && (
          <div className="mt-8 space-y-7">
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
        {compact && <p className="mt-5 text-[0.92rem] leading-[1.95] text-sumi-2">{work.request}</p>}
      </div>
    </article>
  );
}
