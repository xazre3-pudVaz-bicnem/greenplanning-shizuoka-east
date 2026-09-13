import type { Metadata } from 'next';
import Link from 'next/link';
import { footerNav } from '@/data/nav';

export const metadata: Metadata = {
  title: 'ページが見つかりません',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="bg-shiro px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-[44rem]">
        <p className="eyebrow">404</p>
        <h1 className="display mt-4 text-[1.7rem] sm:text-[2.2rem]">ページが見つかりませんでした</h1>
        <p className="mt-5 text-[0.95rem] leading-[2] text-sumi-2">URLが変わったか、ページが削除された可能性があります。</p>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[0.9rem]">
          {footerNav.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="rule-link text-fukami">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
