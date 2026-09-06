import Link from 'next/link';
import { shop } from '@/data/shop';
import { companyLinks, guideLinks, serviceLinks } from '@/data/nav';
import { areaPages } from '@/data/areas';
import { products } from '@/data/products';
import { ExternalIcon, InstagramIcon, MailIcon, MapPinIcon, PhoneIcon } from '@/components/ui/icons';
import Logo from './Logo';

/**
 * フッター。
 * NAP（店名・住所・電話）は data/shop.ts から取り、全ページで同じ表記にしています。
 * 用途・ガイド・エリア・商品への導線を置いて、下層ページが孤立しないようにしています。
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="cv border-t border-sen bg-kinari">
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* 店舗情報 */}
          <div>
            <Logo />
            <p className="mt-5 text-[0.8rem] leading-[1.8] text-hai">{shop.tagline}</p>
            <address className="mt-6 space-y-2.5 text-[0.88rem] not-italic leading-[1.9] text-sumi-2">
              <p className="flex items-start gap-3">
                <MapPinIcon className="mt-[0.4em] shrink-0 text-fukami" />
                <span>{shop.address.full}</span>
              </p>
              <p className="flex items-start gap-3">
                <PhoneIcon className="mt-[0.4em] shrink-0 text-fukami" />
                <span>
                  <a href={shop.telHref} className="num underline-offset-4 hover:underline">
                    {shop.tel}
                  </a>
                  <span className="ml-2 text-[0.78rem] text-hai">{shop.hours.label}</span>
                </span>
              </p>
              <p className="flex items-start gap-3">
                <MailIcon className="mt-[0.4em] shrink-0 text-fukami" />
                <a href={`mailto:${shop.email}`} className="break-all underline-offset-4 hover:underline">
                  {shop.email}
                </a>
              </p>
              <p className="flex items-start gap-3">
                <InstagramIcon className="mt-[0.4em] shrink-0 text-fukami" />
                <a href={shop.instagram} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                  {shop.instagramHandle}
                </a>
              </p>
            </address>
            <p className="mt-6 text-[0.8rem] leading-[1.8] text-hai">代表 {shop.representative}</p>
          </div>

          <nav aria-label="用途から探す">
            <p className="eyebrow">用途から探す</p>
            <ul className="mt-5 space-y-2.5 text-[0.86rem]">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sumi-2 underline-offset-4 hover:text-fukami hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="知る・比べる">
            <p className="eyebrow">知る・比べる</p>
            <ul className="mt-5 space-y-2.5 text-[0.86rem]">
              {guideLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sumi-2 underline-offset-4 hover:text-fukami hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-9">商品</p>
            <ul className="mt-5 space-y-2.5 text-[0.86rem]">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="text-sumi-2 underline-offset-4 hover:text-fukami hover:underline">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="会社・エリア">
            <p className="eyebrow">静岡EAST</p>
            <ul className="mt-5 space-y-2.5 text-[0.86rem]">
              <li>
                <Link href="/works" className="text-sumi-2 underline-offset-4 hover:text-fukami hover:underline">
                  施工事例
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sumi-2 underline-offset-4 hover:text-fukami hover:underline">
                  商品ラインナップ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sumi-2 underline-offset-4 hover:text-fukami hover:underline">
                  人工芝コラム
                </Link>
              </li>
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sumi-2 underline-offset-4 hover:text-fukami hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-9">対応エリア</p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[0.86rem]">
              <li>
                <Link href="/area" className="text-sumi-2 underline-offset-4 hover:text-fukami hover:underline">
                  エリア一覧
                </Link>
              </li>
              {areaPages.map((a) => (
                <li key={a.slug}>
                  <Link href={`/area/${a.slug}`} className="text-sumi-2 underline-offset-4 hover:text-fukami hover:underline">
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-sen pt-8 text-[0.74rem] leading-[1.8] text-hai sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {shop.name}
          </p>
          <p className="flex flex-wrap items-center gap-x-2">
            <span>全国ネットワーク</span>
            <a href={shop.hq.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:text-fukami hover:underline">
              {shop.hq.name}（本部）
              <ExternalIcon className="text-[0.85em]" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
