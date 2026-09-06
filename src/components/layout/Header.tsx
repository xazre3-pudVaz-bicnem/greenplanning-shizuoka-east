'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { companyLinks, guideLinks, mainNav, serviceLinks } from '@/data/nav';
import { shop } from '@/data/shop';
import { CameraIcon, InstagramIcon, PhoneIcon } from '@/components/ui/icons';
import Logo from './Logo';

/**
 * ヘッダー。白地に細い罫線。スクロールで影だけ足します。
 *
 * スマホのメニューは header の外に fixed で置いています。
 * backdrop-filter を持つ要素の中に fixed を入れると、その要素を基準に配置されて潰れるためです。
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
        className={`fixed inset-x-0 top-0 z-50 border-b bg-white/92 backdrop-blur-md transition-[border-color,box-shadow] duration-500 ${
          scrolled || open ? 'border-sen shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_30px_rgba(20,40,30,0.06)]' : 'border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[84rem] items-center justify-between px-5 sm:h-[4.75rem] sm:px-8">
          <Link href="/" className="flex items-center gap-3 text-sumi">
            <Logo />
            <span className="sr-only">トップページへ</span>
          </Link>

          <nav aria-label="メインメニュー" className="hidden items-center gap-7 xl:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`display relative py-2 text-[0.84rem] tracking-[0.06em] transition-colors ${
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
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a href={shop.telHref} className="flex items-center gap-2 text-sumi-2 transition-colors hover:text-fukami">
              <PhoneIcon className="text-[1.05rem] text-fukami" />
              <span className="num text-[1.02rem] leading-none">{shop.tel}</span>
            </a>
            <Link href="/estimate" className="btn btn-primary min-h-[2.75rem] px-5 py-2.5 text-[0.84rem]">
              <CameraIcon />
              写真見積り
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpenedAt(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 flex h-11 w-11 items-center justify-center text-sumi xl:hidden"
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

      {/* スマホ・タブレットのメニュー。header の外に置くことで backdrop-filter の影響を受けない */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-white px-5 pb-28 pt-24 sm:px-8 xl:hidden"
      >
        <nav aria-label="メインメニュー（スマートフォン）">
          <ul className="border-t border-sen">
            {mainNav.map((item) => (
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

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="eyebrow">用途から探す</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.86rem] text-sumi-2">
                {serviceLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={() => setOpenedAt(null)} className="underline-offset-4 hover:text-fukami hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">知る・比べる</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.86rem] text-sumi-2">
                {guideLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={() => setOpenedAt(null)} className="underline-offset-4 hover:text-fukami hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.86rem] text-sumi-2">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={() => setOpenedAt(null)} className="underline-offset-4 hover:text-fukami hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        <div className="mt-10 flex flex-col gap-3">
          <Link href="/estimate" onClick={() => setOpenedAt(null)} className="btn btn-primary">
            <CameraIcon />
            写真で概算見積り（無料）
          </Link>
          <a href={shop.telHref} className="btn btn-secondary">
            <PhoneIcon />
            <span className="num">{shop.tel}</span>
            <span className="text-[0.72rem] text-hai">{shop.hours.label}</span>
          </a>
          <a href={shop.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <InstagramIcon />
            Instagram {shop.instagramHandle}
          </a>
        </div>
        <p className="mt-6 text-[0.8rem] leading-[1.9] text-hai">{shop.address.full}</p>
      </div>
    </>
  );
}
