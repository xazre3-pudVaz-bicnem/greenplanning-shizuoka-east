import Link from 'next/link';
import { shop } from '@/data/shop';
import { MailIcon, PhoneIcon } from './icons';
import Reveal from './Reveal';

/**
 * 問い合わせ先の帯。ページの末尾に置く。
 * 静岡EASTに確認できていない約束（無料・対応の早さ・保証など）は書かない。
 */
export default function CtaBand({ id = 'cta' }: { id?: string }) {
  return (
    <section id={id} className="cv grain bg-fukami py-16 text-white sm:py-20" aria-labelledby={`${id}-heading`}>
      <div className="mx-auto max-w-[72rem] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <Reveal>
            <h2 id={`${id}-heading`} className="display text-[1.6rem] leading-[1.45] sm:text-[2rem]">
              お問い合わせ
            </h2>
            <p className="mt-4 max-w-[34rem] text-[0.95rem] leading-[2] text-white/85">
              電話・メール・お問い合わせフォームで受け付けています。
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-3">
              <a href={shop.telHref} className="btn btn-white w-full">
                <PhoneIcon />
                <span>
                  <span className="num text-[1.05rem]">{shop.tel}</span>
                  <span className="ml-2 text-[0.72rem] text-hai">{shop.hours.label}</span>
                </span>
              </a>
              <Link href="/contact" className="btn w-full border border-white/50 text-white hover:bg-white/10">
                <MailIcon />
                お問い合わせフォーム
              </Link>
              <p className="mt-1 break-all text-[0.8rem] leading-[1.8] text-white/75">メール {shop.email}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
