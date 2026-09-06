import Link from 'next/link';
import { ArrowIcon } from './icons';

type Item = { href: string; label: string; note?: string };

/**
 * 関連ページへの導線。カードを並べず、罫線で区切ったリストにする。
 */
export default function LinkList({ items, columns = 2 }: { items: Item[]; columns?: 1 | 2 | 3 }) {
  const cols = columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : columns === 2 ? 'sm:grid-cols-2' : '';
  return (
    <ul className={`grid gap-x-10 ${cols}`}>
      {items.map((item) => (
        <li key={item.href} className="border-b border-sen">
          <Link href={item.href} className="group flex items-center justify-between gap-4 py-4 text-sumi transition-colors hover:text-fukami">
            <span>
              <span className="display block text-[0.98rem]">{item.label}</span>
              {item.note && <span className="mt-1 block text-[0.8rem] text-hai">{item.note}</span>}
            </span>
            <ArrowIcon className="shrink-0 text-fukami transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
