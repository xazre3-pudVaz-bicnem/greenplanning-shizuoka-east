import type { Metadata } from 'next';
import Link from 'next/link';
import { serviceLinks } from '@/data/nav';

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
        <p className="mt-5 text-[0.95rem] leading-[2] text-sumi-2">
          URLが変わったか、ページが削除された可能性があります。お探しの内容は、次のページからたどれます。
        </p>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[0.9rem]">
          <li>
            <Link href="/" className="rule-link text-fukami">
              トップページ
            </Link>
          </li>
          <li>
            <Link href="/works" className="rule-link text-fukami">
              施工事例
            </Link>
          </li>
          <li>
            <Link href="/price" className="rule-link text-fukami">
              料金の目安
            </Link>
          </li>
          <li>
            <Link href="/estimate" className="rule-link text-fukami">
              写真で概算見積り
            </Link>
          </li>
        </ul>
        <p className="eyebrow mt-12">用途から探す</p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.88rem] text-sumi-2">
          {serviceLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:text-fukami hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
