import Link from 'next/link';
import { shop } from '@/data/shop';
import { CameraIcon, MailIcon, PhoneIcon } from './icons';
import Reveal from './Reveal';

type Props = {
  title?: string;
  lead?: string;
  /** 'deep' = 深緑の帯 / 'light' = 生成りの帯 */
  tone?: 'deep' | 'light';
  id?: string;
};

/**
 * 「写真見積り」への導線。全ページ共通で、下層ページの末尾に置く。
 * コピーは「まだ決めていない段階でも相談できる」ことを伝える。
 */
export default function CtaBand({
  title = '写真を送るだけで、概算をお伝えします。',
  lead = '「まだ依頼するか決めていない」段階でも大丈夫です。庭の写真とおおよその広さをお送りいただければ、費用の目安と、人工芝が向いているかどうかをお返事します。相談・見積り・現地調査はすべて無料です。',
  tone = 'deep',
  id,
}: Props) {
  const deep = tone === 'deep';
  return (
    <section
      id={id}
      className={`cv ${deep ? "grain bg-fukami text-white" : "bg-kinari text-sumi"} py-20 sm:py-24`}
      aria-labelledby={`${id ?? 'cta'}-heading`}
    >
      <div className="mx-auto max-w-[72rem] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <Reveal>
            <p className={`eyebrow ${deep ? 'text-shiba-2' : ''}`}>ご相談・写真見積り</p>
            <h2 id={`${id ?? 'cta'}-heading`} className="display mt-4 text-[1.6rem] leading-[1.45] sm:text-[2.1rem]">
              {title}
            </h2>
            <p className={`mt-5 max-w-[34rem] text-[0.95rem] leading-[2] ${deep ? 'text-white/82' : 'text-sumi-2'}`}>
              {lead}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-3">
              <Link href="/estimate" className={`btn ${deep ? 'btn-white' : 'btn-primary'} w-full`}>
                <CameraIcon />
                写真で概算見積り（無料）
              </Link>
              <Link
                href="/contact"
                className={`btn w-full ${deep ? 'border border-white/50 text-white hover:bg-white/10' : 'btn-secondary'}`}
              >
                <MailIcon />
                まずは相談する
              </Link>
              <a
                href={shop.telHref}
                className={`btn w-full ${deep ? 'border border-white/50 text-white hover:bg-white/10' : 'btn-secondary'}`}
              >
                <PhoneIcon />
                <span>
                  <span className="num text-[1.05rem]">{shop.tel}</span>
                  <span className={`ml-2 text-[0.72rem] ${deep ? 'text-white/70' : 'text-hai'}`}>{shop.hours.label}</span>
                </span>
              </a>
              <p className={`mt-1 text-[0.78rem] leading-[1.8] ${deep ? 'text-white/65' : 'text-hai'}`}>
                メール {shop.email}／担当 {shop.representative}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
