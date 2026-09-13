import Link from 'next/link';
import { shop } from '@/data/shop';
import { footerNav } from '@/data/nav';
import { InstagramIcon, MailIcon, MapPinIcon, PhoneIcon } from '@/components/ui/icons';
import Logo from './Logo';

/**
 * フッター。NAP（店名・住所・電話）は data/shop.ts から取り、全ページで同じ表記にしています。
 * 本部公式サイトへのリンクは置きません（本部チェックリスト「本部公式へのリンク」：全ページ共通部分への過剰なリンクはNG）。
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="cv border-t border-sen bg-kinari">
      <div className="mx-auto max-w-[84rem] px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Logo height={48} />
            <address className="mt-7 space-y-2.5 text-[0.88rem] not-italic leading-[1.9] text-sumi-2">
              <p className="flex items-start gap-3">
                <MapPinIcon className="mt-[0.4em] shrink-0 text-fukami" />
                <span>{shop.address.full}</span>
              </p>
              <p className="flex items-start gap-3">
                <PhoneIcon className="mt-[0.4em] shrink-0 text-fukami" />
                <span>
                  <a href={shop.telHref} className="num inline-block py-0.5 underline-offset-4 hover:underline">
                    {shop.tel}
                  </a>
                  <span className="ml-2 text-[0.78rem] text-hai">{shop.hours.label}</span>
                </span>
              </p>
              <p className="flex items-start gap-3">
                <MailIcon className="mt-[0.4em] shrink-0 text-fukami" />
                <a href={`mailto:${shop.email}`} className="inline-block break-all py-0.5 underline-offset-4 hover:underline">
                  {shop.email}
                </a>
              </p>
              <p className="flex items-start gap-3">
                <InstagramIcon className="mt-[0.4em] shrink-0 text-fukami" />
                <a href={shop.instagram} target="_blank" rel="noopener noreferrer" className="inline-block py-0.5 underline-offset-4 hover:underline">
                  {shop.instagramHandle}
                </a>
              </p>
            </address>
            <p className="mt-5 text-[0.8rem] leading-[1.8] text-hai">担当エリア：{shop.areaLabel}</p>
          </div>

          <nav aria-label="サイト内のページ">
            <ul className="space-y-2.5 text-[0.9rem]">
              {footerNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block py-1 text-sumi-2 underline-offset-4 hover:text-fukami hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-sen pt-7 text-[0.74rem] leading-[1.8] text-hai">
          © {year} {shop.name}
        </p>
      </div>
    </footer>
  );
}
