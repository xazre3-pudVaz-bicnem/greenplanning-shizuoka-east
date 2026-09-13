'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { mainNav } from '@/data/nav';
import { shop } from '@/data/shop';
import { MailIcon, PhoneIcon } from '@/components/ui/icons';
import Logo from './Logo';

/**
 * ヘッダー。白地に細い罫線。スクロールで影だけ足します。
 * 本部公式サイトへのリンクは置きません（本部チェックリスト「本部公式へのリンク」）。
 */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // メニューは「どのページで開いたか」で持つ。ページ移動で自然に閉じる
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenedAt(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b bg-white transition-[border-color,box-shadow] duration-500 ${
          scrolled || open ? 'border-sen shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_30px_rgba(20,40,30,0.06)]' : 'border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[84rem] items-center justify-between gap-4 px-5 sm:h-[4.75rem] sm:px-8">
          <Link href="/" className="flex items-center">
            <span className="sm:hidden">
              <Logo height={32} priority />
            </span>
            <span className="hidden sm:block">
              <Logo height={44} priority />
            </span>
          </Link>

          <nav aria-label="メインメニュー" className="hidden items-center gap-8 lg:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`display relative py-2 text-[0.86rem] tracking-[0.06em] transition-colors ${
                  isActive(item.href) ? 'text-fukami' : 'text-sumi-2 hover:text-fukami'
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 -bottom-0.5 h-px bg-fukami transition-transform duration-500 ${
                    isActive(item.href) ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </Link>
            ))}
            <a href={shop.telHref} className="flex items-center gap-2 text-sumi-2 transition-colors hover:text-fukami">
              <PhoneIcon className="text-[1.05rem] text-fukami" />
              <span className="num text-[1.02rem] leading-none">{shop.tel}</span>
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpenedAt(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-sumi lg:hidden"
          >
            <span className="sr-only">{open ? 'メニューを閉じる' : 'メニューを開く'}</span>
            <span aria-hidden className="relative block h-4 w-6">
              <span className={`absolute left-0 block h-px w-6 bg-current transition-all duration-400 ${open ? 'top-2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-2 block h-px w-6 bg-current transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 block h-px w-6 bg-current transition-all duration-400 ${open ? 'top-2 -rotate-45' : 'top-4'}`} />
            </span>
          </button>
        </div>
      </header>

      {/* スマホ・タブレットのメニュー */}
      <div id="mobile-menu" hidden={!open} className="fixed inset-0 z-40 overflow-y-auto bg-white px-5 pb-28 pt-24 sm:px-8 lg:hidden">
        <nav aria-label="メインメニュー（スマートフォン）">
          <ul className="border-t border-sen">
            {[{ href: '/', label: 'トップ' }, ...mainNav].map((item) => (
              <li key={item.href} className="border-b border-sen">
                <Link href={item.href} onClick={() => setOpenedAt(null)} className="display flex items-center justify-between py-4 text-[1.05rem] text-sumi">
                  {item.label}
                  <span aria-hidden className="text-fukami">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 flex flex-col gap-3">
          <a href={shop.telHref} className="btn btn-primary">
            <PhoneIcon />
            <span className="num">{shop.tel}</span>
            <span className="text-[0.72rem] text-white/80">{shop.hours.label}</span>
          </a>
          <a href={`mailto:${shop.email}`} className="btn btn-secondary">
            <MailIcon />
            メールで問い合わせる
          </a>
        </div>
        <p className="mt-6 text-[0.8rem] leading-[1.9] text-hai">{shop.address.full}</p>
      </div>
    </>
  );
}
