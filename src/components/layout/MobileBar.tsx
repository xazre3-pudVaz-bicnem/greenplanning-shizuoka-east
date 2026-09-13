import Link from 'next/link';
import { shop } from '@/data/shop';
import { MailIcon, PhoneIcon } from '@/components/ui/icons';

/**
 * スマホの画面下に出す固定バー。「電話」「お問い合わせ」の2つだけ。
 * aria-label は付けず、見えている文字をそのまま名前にする（読み上げと表示の不一致を避ける）。
 */
export default function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sen bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      <ul className="grid grid-cols-2">
        <li className="border-r border-sen">
          <a href={shop.telHref} className="flex h-14 flex-col items-center justify-center gap-1">
            <PhoneIcon className="text-[1.15rem] text-fukami" />
            <span className="text-[0.7rem] tracking-[0.1em] text-sumi-2">電話する</span>
            <span className="sr-only">{shop.tel}</span>
          </a>
        </li>
        <li className="bg-fukami">
          <Link href="/contact" className="flex h-14 flex-col items-center justify-center gap-1 text-white">
            <MailIcon className="text-[1.15rem]" />
            <span className="text-[0.7rem] tracking-[0.1em]">お問い合わせ</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
