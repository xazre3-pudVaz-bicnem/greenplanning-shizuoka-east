import Link from 'next/link';
import type { Crumb } from '@/lib/jsonld';

export default function Breadcrumbs({
  crumbs,
  tone = 'light',
  className = '',
}: {
  crumbs: Crumb[];
  /** 'light' = 白い背景の上 / 'dark' = 写真の上 */
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const color = tone === 'dark' ? 'text-white/70' : 'text-hai';
  return (
    <nav aria-label="パンくずリスト" className={`text-[0.72rem] tracking-[0.08em] ${color} ${className}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="inline-block max-w-[18rem] truncate py-1 sm:max-w-none">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="inline-block py-1 underline-offset-4 hover:underline">
                    {c.name}
                  </Link>
                  <span aria-hidden className="opacity-60">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
