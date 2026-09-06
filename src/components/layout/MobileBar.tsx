import Link from 'next/link';
import { shop } from '@/data/shop';
import { CameraIcon, MailIcon, PhoneIcon } from '@/components/ui/icons';

/**
 * スマホの画面下に出す固定バー。
 * 「電話」「写真見積り」「相談」の3つに絞り、画面を圧迫しない高さにしています。
 * aria-label は付けず、見えている文字をそのまま名前にする（読み上げと表示の不一致を避ける）。
 */
export default function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sen bg-white/96 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <ul className="grid grid-cols-3">
        <li className="border-r border-sen">
          <a href={shop.telHref} className="flex h-14 flex-col items-center justify-center gap-1">
            <PhoneIcon className="text-[1.15rem] text-fukami" />
            <span className="text-[0.66rem] tracking-[0.1em] text-sumi-2">電話で相談</span>
            <span className="sr-only">{shop.tel}</span>
          </a>
        </li>
        <li className="bg-fukami">
          <Link href="/estimate" className="flex h-14 flex-col items-center justify-center gap-1 text-white">
            <CameraIcon className="text-[1.15rem]" />
            <span className="text-[0.66rem] tracking-[0.1em]">写真で見積り</span>
          </Link>
        </li>
        <li className="border-l border-sen">
          <Link href="/contact" className="flex h-14 flex-col items-center justify-center gap-1">
            <MailIcon className="text-[1.15rem] text-fukami" />
            <span className="text-[0.66rem] tracking-[0.1em] text-sumi-2">無料相談</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
